<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSurvey extends Model
{
    use HasFactory;
    
    /**
     * table
     * 
     *
     * @var string
     */

    protected $table = 'pivot_user_survey';

        
    /**
     * answersByUserAndSurvey
     *
     * @return Collection retourne les réponses d'un utilisateur en fonction d'un sondage
     */
    public function answersByUserAndSurvey(){
            $user = $this->belongsTo(User::class,'user_id','id')->first();
            $survey = $this->belongsTo(Survey::class,'survey_id','id')->first();
            return $user->answersBySurvey($survey->id);
    }

}
