<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Ressource de réponse
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $ressource = [
            'id' => $this->id,
            'question' => $this->question->text,
        ];
        
        if ($this->question->type == 'A') {
            $ressource['answer'] = $this->choice->text;
        }else{
            $ressource['answer'] = $this->answer_value;
        }

        
        return $ressource;
    }
}
