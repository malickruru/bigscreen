<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    /**
     * Relation plusieurs à plusieurs entre les utilisateurs et les sondages
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany retourne tous les sondages auquels un utilisateur a répondu
     */
    public function surveys()
    {
        return $this->belongsToMany(Survey::class, 'pivot_user_survey');
    }



    /**
     * Relation un à un entre un utilisateurs et son role
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasOne retourne le role de l'utilisateur
     */
    public function role()
    {
        return $this->HasOne(Role::class);
    }

    
    /**
     * Relation un à plusieurs entre un utilisateurs et ses réponses
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany retourne les réponses d'un utilisateur
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Réponses d'un utilisateur en fonction d'un sondage
     *
     * @param  int $survey_id
     * @return Collection retourne les réponses d'un utilisateur en fonction d'un sondage
     */
    public function answersBySurvey(int $survey_id)
    {
        $questions = Survey::findOrFail($survey_id)->questions->map(function ($question) {
            return $question->id;
        });
        return $this->hasMany(Answer::class)->whereIn('question_id', $questions)->get();
    }
}
