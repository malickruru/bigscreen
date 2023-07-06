<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Question;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    use ApiResponseTrait;

    /**
     * Cette methode retourne toutes les questions d'un sondage lorsqu'un client prévois d'y répondre
     * 
     * @param
     * email du sondé
     * id du sondage voulu
     */
    public function trySurvey(Request $request){
        // 1. vérifier si l'email n'a pas déja répondu au sondage
            // 1a. valider les données
            $request->validate([
                'email' => 'required|email',
                'survey_id' => 'required'
            ]);
            // 1b.si l'email existe pas dans la base de données donc l'utilisateur n'a jamais participé au sondage
            $user = User::where('email', $request->email)->first();
            $survey = Survey::findOrFail($request->survey_id);

            if (!$user) {
                return $this->sendSuccessResponse(QuestionResource::collection($survey->questions));
            }

            // 1c. si l'utilisateur existe déja dans la base et qu'il n'ya pas de relation entre lui et le sondage , cela signifie qu'il n'ya pas participé
            $hasRelation = $user->surveys()->where('survey_id', $request->survey_id)->exists();
            if (!$hasRelation) {
                return $this->sendSuccessResponse(QuestionResource::collection($survey->questions));
            }
        
        
            // refuser l'accès au sondage
        return $this->sendErrorResponse('vous avez déja répondu au sondage',401);
    }


    /**
     * Cette methode retourne toutes les questions d'un sondage à l'administrateur en lecture seul
     * 
     * @param
     * id du sondage voulu
     */
    public function index(int $id){
        $survey = Survey::findOrFail($id);
        return $this->sendSuccessResponse(QuestionResource::collection($survey->questions));
    }

    /**
     * Méthode "store" pour enregistrer une nouvelle question dans la base de données :
     */
    public function store(Request $request)
    {
        
        $question = new Question();
        $question->survey_id = $request->input('survey_id');
        $question->text = $request->input('text');
        $question->yardstick = $request->input('yardstick');
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
     * Méthode  pour supprimer une  question :
     */
    public function destroy(int $id)
    {
        $question =  Question::findOrFail($id);
        if ($question->survey->isOnline) {
            return $this->sendErrorResponse('un sondage en production ne peut pas être modifié , ses questions non plus.',403); 
        }
        $question->delete();
        return $this->sendSuccessResponse(new QuestionResource($question),'La question a été suprimmer avec succès.'); 
    }
}
