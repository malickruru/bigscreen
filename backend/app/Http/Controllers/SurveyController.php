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

    
}
