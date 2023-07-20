<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    
    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<String>
     */
    protected $fillable = [
        'survey_id',
        'text',
        'type',
        'yardstick',
        'validateAs'
    ];

    /**
     * 
     * 
     */
    
    /**
     * Relation un à plusieurs entre les sondages et les question
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo retourne le sondage parent de la question
     */
    public function survey(){
        return $this->belongsTo(Survey::class);
    }

    /**
     * 
     * 
     */
    
    /**
     * Relation un à plusieurs entre une question de type A et ces choix
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany retourne tous les choix liée à un question de type A
     */
    public function choices(){
        if($this->type === 'A'){
            return $this->hasMany(Choice::class);
        }
        return null;
    }

    
    /**
     * Relation un à plusieurs entre une question ces réponses
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany retourne tous les réponses liée à une question
     */
    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
