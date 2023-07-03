<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'text',
        'type',
        'yardstick'
    ];

    /**
     * Relation un à plusieurs entre les sondages et les question
     * retourne le sondage parent de la question
     */

    public function survey(){
        return $this->belongsTo(Survey::class);
    }

    /**
     * Relation un à plusieurs entre une question de type A et ces choix
     * retourne tous les choix liée à un question de type A
     */

    public function choices(){
        if($this->type === 'A'){
            return $this->hasMany(Choice::class);
        }
        return null;
    }

    /**
     * Relation un à plusieurs entre une question ces réponses
     * retourne tous les réponses liée à une question
     */

    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
