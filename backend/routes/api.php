<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



// routes publiques
// * user
Route::post('/login', [UserController::class,'login']);
Route::post('/logout', [UserController::class,'logout']);
// * question
Route::get('/survey/{id}/questions', [QuestionController::class,'index']);
// * answer
Route::post('/answers', [AnswerController::class,'store']);
Route::get('/answers/{encoded}', [AnswerController::class,'answersByUserAndSurvey']);
// * survey
Route::get('/surveys/online', [SurveyController::class,'isOnline']);
Route::post('/survey/{id}/isCompleted', [SurveyController::class,'isSurveyCompleted']);

// routes privées
Route::group(['middleware' => ['auth:sanctum']], function () {
        // * survey
        Route::get('/surveys', [SurveyController::class,'index']);
        Route::post('/survey', [SurveyController::class,'store']);
        Route::get('/survey/{id}/release', [SurveyController::class,'releaseSurvey']);
        Route::post('/survey/{id}/update', [SurveyController::class,'update']);
        Route::get('/survey/{id}/delete', [SurveyController::class,'destroy']);
        // * question
        Route::post('/question', [QuestionController::class,'store']);
        Route::get('/question/{id}/delete', [QuestionController::class,'destroy']);
        Route::get('/survey/{id}/questions/unreleased', [QuestionController::class,'getUnreleasedQuestion']);
        // * answer 
        Route::get('/answer/{id}/Atype_data', [AnswerController::class,'getAnswerData']);
        Route::get('/answer/quality_data', [AnswerController::class,'radarData']);
        Route::get('/survey/{surveyId}/answers/{page}', [AnswerController::class,'index']);
});

// si la route demandée n'existe pas , retourner une erreur 404
Route::fallback(function(){
    return response()->json([
        'success' => false,
        'message' => 'page introuvable',
    ], 404);
});