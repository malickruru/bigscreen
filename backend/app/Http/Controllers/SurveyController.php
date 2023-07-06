<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    use ApiResponseTrait;
    /**
     * Méthode "index" pour afficher tous les sondages :
     */
    public function index()
    {
        return $this->sendSuccessResponse(Survey::all());
    }

    /**
     * Méthode "store" pour enregistrer un nouveau sondage dans la base de données :
     */
    public function store(Request $request)
    {
        $survey = new Survey();
        $survey->title = $request->title;
        $survey->description = $request->description;
        $survey->save();

        return $this->sendSuccessResponse($survey,'Le sondage a été créé avec succès.'); 
    }

    /**
     * Méthode mettre un sondage test en ligne:
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
     * Méthode mettre un sondage test en ligne:
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
     * Méthode mettre un sondage test en ligne:
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
