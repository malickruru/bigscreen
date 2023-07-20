<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    use ApiResponseTrait;

    
    /**
     * Cette methode retourne toutes les questions d'un sondage en ligne
     *
     * @param  int $id - id du sondage
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $id){
        $survey = Survey::findOrFail($id);
        if(!$survey->isOnline){
            return $this->sendErrorResponse('Ce sondage n\'est pas encore mis en production',404);
        }
        return $this->sendSuccessResponse(QuestionResource::collection($survey->questions));
    }

    
    /**
     * Cette methode retourne toutes les questions d'un sondage ,elle n'est accessible que pour l'administrateur
     *
     * @param  mixed $id - id du sondage
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUnreleasedQuestion(int $id){
        $survey = Survey::findOrFail($id);
        return $this->sendSuccessResponse(QuestionResource::collection($survey->questions));
    }

    /**
     * Méthode "store" pour enregistrer une nouvelle question dans la base de données :
     *
     * @param  Request $request - id du sondage (survey_id)
     * - libellé de la question (text)
     * - critère étudié par le question (yardstick)
     * - valeur attendu pour la réponse (validateAs)
     * - type de la question (type)
     * - ensemble des choix lié à une question (choices)
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $survey = Survey::findOrFail($request->input('survey_id'));
        if($survey->isOnline){
            return $this->sendErrorResponse('Ce sondage est  en production il ne peut plus reçevoir de question',404);
        }
        $question = new Question();
        $question->survey_id = $request->input('survey_id');
        $question->text = $request->input('text');
        $question->yardstick = $request->input('yardstick');
        $question->validateAs = $request->input('validateAs');
        $question->type = $request->input('type');
        $question->save();
        if($question->type == 'A'){
            $question->choices()->createMany(
                collect($request->choices)->map(function ($item){
                    return ['text' => $item];
                })
            );
        }
        

        return $this->sendSuccessResponse(new QuestionResource($question),'La question a été créée avec succès.'); 
    }

    /**
     *  Méthode  pour supprimer une  question :
     *
     * @param  int $id - id de la question
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        $question =  Question::findOrFail($id);
        if ($question->survey->isOnline) {
            return $this->sendErrorResponse('un sondage en production ne peut pas être modifié , ses questions non plus.',403); 
        }
        if ($question->yardstick == 'email') {
            return $this->sendErrorResponse('Cette question est obligatoire pour tous les sondages , suppression impossible',403); 
        }
        $question->delete();
        return $this->sendSuccessResponse(new QuestionResource($question),'La question a été suprimer avec succès.'); 
    }
}
