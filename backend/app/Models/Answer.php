<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'user_id',
        'A_type',
        'B_type',
        'C_type'
    ];

    /**
     * Relation un à plusieurs entre une question ces réponses
     * retourne tous la question parent à la réponse 
     */

    public function question(){
        return $this->belongsTo(Question::class);
    }
    /**
     * Relation un à un entre une réponse de type A et le choix auquel elle est liée
     * retourne l'option choisie de la réponse  
     */

    public function choice(){
        return $this->hasOne(Choice::class,'id','A_type');
    }
}
