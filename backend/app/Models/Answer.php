<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    
    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<String>
     */
    protected $fillable = [
        'question_id',
        'user_id',
        'answer_value'
    ];

   
    
    /**
     * Relation un à plusieurs entre une question ces réponses
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo retourne tous la question parent à la réponse 
     */
    public function question(){
        return $this->belongsTo(Question::class);
    }
    
    /**
     * Relation un à un entre une réponse de type A et le choix auquel elle est liée
     *
     * @return mixed Retourne l'option choisie de la réponse  
     */
    public function choice(){
        if ($this->question->type == 'A') {
            return $this->hasOne(Choice::class,'id','answer_value');
        }
        return null;
    }
}
