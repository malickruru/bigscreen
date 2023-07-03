<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    /**
     * Relation plusieurs à plusieurs entre les utilisateurs et les sondages
     * retourne tous les utilisateur ayant répondu à un sondage 
     */

    public function users(){
        return $this->belongsToMany(User::class,'pivot_user_survey');
    }


    /**
     * Relation un à plusieurs entre les sondages et les question
     * retourne toutes les questions liées à un sondage 
     */

    public function questions(){
        return $this->hasMany(Question::class);
    }

    /**
     * retourne le nombre total de questions liées à un sondage 
     */

    public function totalQuestions(){
        return $this->questions()->get()->count();
    }
}
