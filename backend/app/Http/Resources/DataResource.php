<?php

namespace App\Http\Resources;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DataResource extends JsonResource
{
    function __construct(Question $question)
    {
        parent::__construct($question);
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $counts = collect($this->answers)->countBy(function ($item) {
            return $item->answer_value;
        });

        return [
            'title' => $this->text,
            'labels' => collect($counts->keys())->map(function ($item){
                return Choice::findOrFail($item)->text;
            }),
            'data' => $counts->flatten()
        ];
    }
}
