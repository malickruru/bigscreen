<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSurvey extends Model
{
    use HasFactory;

    protected $table = 'pivot_user_survey';

    public function answersByUserAndSurvey(){
            $user = $this->belongsTo(User::class,'user_id','id')->first();
            $survey = $this->belongsTo(Survey::class,'survey_id','id')->first();
            return $user->answersBySurvey($survey->id);
    }
}
