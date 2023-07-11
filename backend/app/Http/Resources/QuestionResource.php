<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        

        $ressource =  [
            'id' => $this->id,
            'text' => $this->text,
            'type' => $this->type,
            'yardstick' => $this->yardstick,
            'validateAs' => $this->validateAs,
        ];

        if($this->type == 'A'){
            $ressource['choices'] = ChoiceResource::collection($this->choices);
        }

        return $ressource;
    }
}
