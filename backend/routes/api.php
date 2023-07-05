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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/sondage', [SurveyController::class,'store']);
Route::post('/question', [QuestionController::class,'store']);

// si la route demandée n'existe pas , retourner une erreur 404
Route::fallback(function(){
    return response()->json([
        'success' => false,
        'message' => 'page introuvable',
    ], 404);
});