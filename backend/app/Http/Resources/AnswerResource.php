<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $ressource = [
            'id' => $this->id,
            'question' => $this->question()->text,
            'answer' => ''
        ];

        switch ($this->question()->type) {
            case 'A':
                $ressource['answer'] = $this->choice()->text;
                break;
            case 'B':
                $ressource['answer'] = $this->B_type;
                break;
            default:
                $ressource['answer'] = $this->C_type;
                break;
        }

        return $ressource;
    }
}
