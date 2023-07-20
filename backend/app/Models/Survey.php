<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    
    /**
     * 
     * Les attributs qui sont assignables en masse.
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'isOnline',
    ];
    
    /**
     * Relation plusieurs à plusieurs entre les utilisateurs et les sondages
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany retourne tous les utilisateur ayant répondu à un sondage 
     */
    
    public function users(){
        return $this->belongsToMany(User::class,'pivot_user_survey');
    }

    
    /**
     * 
     * Relation un à plusieurs entre les sondages et les question
     * @return \Illuminate\Database\Eloquent\Relations\HasMany retourne toutes les questions liées à un sondage 
     */
    public function questions(){
        return $this->hasMany(Question::class);
    }

    
    
    /**
     * nombre total de questions liées à un sondage 
     *
     * @return int retourne le nombre total de questions liées à un sondage 
     */
    public function totalQuestions(){
        return $this->questions()->get()->count();
    }
}
