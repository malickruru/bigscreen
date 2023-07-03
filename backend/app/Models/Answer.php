<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = '*';

    /**
     * Relation un à plusieurs entre une question ces réponses
     * retourne tous la question parent à la réponse 
     */

     public function question(){
        return $this->belongsTo(Question::class);
    }
}
