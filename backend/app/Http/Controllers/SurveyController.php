<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Question;
use App\Models\Survey;
use App\Models\User;
use App\Models\UserSurvey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    use ApiResponseTrait;
    
    /**
     * Méthode "index" pour afficher tous les sondages :
     *
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function index()
    {
        return $this->sendSuccessResponse(Survey::all());
    }

    /**
     * Méthode "isOnline" pour afficher tous les sondages en lignes:
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function isOnline()
    {
        return $this->sendSuccessResponse(Survey::where('isOnline','=',1)->get());
    }

    
    /**
     * Méthode "isSurveyCompleted" pour verifier si un utilisateur a déja répondu au sondage:
     *
     * @param  Request $request -email de l'utilisateur
     * @param  int $id - id du sondage
     * @return \Illuminate\Http\JsonResponse
     */
    public function isSurveyCompleted(Request $request, int $id)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return $this->sendSuccessResponse(['hasCompleted'  => false],'c\'est la première fois que vous répondez au sondage');
        }else{
            $hasRelation = $user->surveys()->where('survey_id', $id)->exists();
            if ($hasRelation) {
                $answerUrl = UserSurvey::where([['user_id','=',$user->id],['survey_id','=',$id]])->first()->answer_url;
                return $this->sendSuccessResponse(['hasCompleted'  => true ,'link'  => 'response/'.$answerUrl],'vous avez déja répondu au sondage, visionnez vos réponses à l\'adresse : ');
            }else{
                return $this->sendSuccessResponse(['hasCompleted'  => false],'c\'est la première fois que vous répondez au sondage');
            }
        }
    }

    /**
     * Méthode "store" pour enregistrer un nouveau sondage dans la base de données :
     *
     * @param  Request $request - titre du sondage (title)
     * - description du sondage (description)
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $survey = new Survey();
        $survey->title = $request->title;
        $survey->description = $request->description;
        $survey->save();

        // par convention tous les sondages demanderont le mail de l'utilisateur ,
        // donc créer automatiquement une question pour le mail (cette question ne pourras pas être supprimé)
        $question = new Question();
        $question->survey_id = $survey->id;
        $question->text = 'Votre adresse mail ?';
        $question->yardstick = 'email';
        $question->validateAs = 'email';
        $question->type = 'B';
        $question->save();

        return $this->sendSuccessResponse($survey,'Le sondage a été créé avec succès.'); 
    }

    /**
     * 
     */    
    /**
     * Méthode mettre un sondage test en ligne:
     *
     * @param  int $id - id du sondage
     * @return \Illuminate\Http\JsonResponse
     */
    public function releaseSurvey(int $id)
    {
        $survey =  Survey::findOrFail($id);
        if ($survey->isOnline) {
            return $this->sendErrorResponse('Le sondage est déja en ligne.',403); 
        }
        $survey->isOnline = true;
        $survey->save();

        return $this->sendSuccessResponse($survey,'Le sondage est désormais visible pour le grand public.'); 
    }

    
    /**
     * Méthode mettre à jour un sondage:
     *
     * @param  Request $request - titre du sondage (title)
     * - description du sondage (description)
     * @param  int $id - id du sondage
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request,int $id)
    {
        $survey =  Survey::findOrFail($id);
        $survey->title = $request->title;
        $survey->description = $request->description;
        $survey->save();

        return $this->sendSuccessResponse($survey,'Le sondage a été modifié avec succès'); 
    }


    /**
     * Méthode supprimer un sondage :
     *
     * @param  int $id - id du sondage
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        $survey =  Survey::findOrFail($id);
        if ($survey->isOnline) {
            return $this->sendErrorResponse('un sondage en production ne peut pas être suprimé.',403); 
        }
        $survey->delete() ;
        return $this->sendSuccessResponse($survey,'Le sondage a été supprimer avec succès'); 
    }
}
