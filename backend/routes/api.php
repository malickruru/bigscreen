<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// routes public
// * user
Route::post('/login', [UserController::class,'login']);
Route::post('/login_admin', [UserController::class,'login']);
Route::post('/logout', [UserController::class,'logout']);
// * question
Route::post('/try_survey', [QuestionController::class,'trySurvey']);
// * answer
Route::post('/answer/add', [AnswerController::class,'store']);
Route::post('/answer/list_by_user', [AnswerController::class,'answersByUser']);



// routes privé
Route::group(['middleware' => ['auth:sanctum']], function () {
    // route nécessitant d'être admin
    Route::group(['middleware' => ['admin']], function () {
        // * survey
        Route::get('/survey/list', [SurveyController::class,'index']);
        Route::post('/survey/add', [SurveyController::class,'store']);
        Route::get('/release_survey/{id}', [SurveyController::class,'releaseSurvey']);
        Route::post('/survey/edit/{id}', [SurveyController::class,'update']);
        Route::get('/survey/delete/{id}', [SurveyController::class,'destroy']);
        // * question
        Route::get('/question/list/{id}', [QuestionController::class,'index']);
        Route::post('/question/add', [QuestionController::class,'store']);
        Route::get('/question/delete/{id}', [QuestionController::class,'destroy']);
        // * answer 
        Route::get('/answer/Atype_data/{id}', [AnswerController::class,'getAnswerData']);
        Route::get('/answer/quality_data', [AnswerController::class,'radarData']);
        Route::get('/answer/list/{page}', [AnswerController::class,'index']);
    });
});

// si la route demandée n'existe pas , retourner une erreur 404
Route::fallback(function(){
    return response()->json([
        'success' => false,
        'message' => 'page introuvable',
    ], 404);
});