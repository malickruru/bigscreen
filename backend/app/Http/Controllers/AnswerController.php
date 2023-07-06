<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Http\Resources\DataResource;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AnswerController extends Controller
{
    use ApiResponseTrait;
    

    /**
     * créer plusieurs réponse a partir d'un tableau
     * 
     * @param
     * email
     * objet data avec l'id de la question en clé , la réponse en valeur
     * survey_id
     */
    public function store(Request $request){
        
        $request->validate([
            'email' => 'required|email',
            'data' => 'array',
            'survey_id' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        // inserer l'utilistateur dans la bd si il n'existe pas
        if (!$user) {
            $user = User::create([
                'name' => '',
                'email' => $request->email,
                'password' => Hash::make('password'),
                'role_id' => 2,
            ]);
        }else{
            $hasRelation = $user->surveys()->where('survey_id', $request->survey_id)->exists();
            if ($hasRelation) {
                return $this->sendErrorResponse('vous avez déja répondu au sondage',401);
            }
        }
        // parcourir le tableau data et inserer une question à chaque iteration
        foreach ($request->data as $key => $value) {
            $answerData = [];
            $answerData['user_id'] = $user->id;
            $answerData['question_id'] = $key;

            $question = Question::find($key);

            switch ($question->type) {
                case 'A':
                    $answerData['A_type'] = $value;
                    break;
                case 'B':
                    $answerData['B_type'] = $value;
                    break;
                default:
                    $answerData['C_type'] = $value;
                    break;
            }

            Answer::create($answerData);
        }
        // lier l'utilisateur et le sondage
        $user->surveys()->attach($request->survey_id,['created_at' => now()]);

        return $this->sendSuccessResponse(AnswerResource::collection($user->answers) );
    }

    /**
     * lister les réponses de l'utilisateur 
     * @param
     * email
     */
    public function answersByUser(Request $request){
        $user = User::where('email', $request->email)->first();
        return $this->sendSuccessResponse(AnswerResource::collection($user->answers) );
    }

    /**
     * pour une question de type A donné , 
     * récuperer la sommes de chaque options 
     * @param
     * question_id
     */
    public function getAnswerData(int $id){
        $question = Question::findOrFail($id);
        if($question->type != 'A'){
            return $this->sendErrorResponse('Ce n\'est pas une question de type A', 404);
        }
        return $this->sendSuccessResponse(new DataResource($question) );
    }

    /**
     * récuperer les notes moyenne des questions de type qualité 
     * pour établir un graph de type radar
     * (id 11 à 15)
     */
    public function radarData(){
        // 1.récuperer les questions de type qualité
        $question = Question::all()->whereIn('id',[11,12,13,14,15]);
        // tableau des labels
        $label = [];
        // tableau des données
        $data = [];
        // pour chaque questions, calculé sa note moyenne et  retourner son pourcentage
        // e.g une note de 2.5/5 devient 50%

        foreach ($question as $item) {
            array_push($label,$item->yardstick);
            
            $rating_array = $item->answers->map(function ($answer){
                return $answer->C_type ;
            });
            // calculer la moyenne
            $average = collect($rating_array)->avg();
            // retourner le pourcentage
            array_push($data,round(($average*100)/5));
        }

        return $this->sendSuccessResponse([
            'label' => $label ,
            'data' => $data 
        ]);
    }


    /**
     * lister les réponses de tous les utilisateurs 
     * @param
     * page demandé
     * 
     */
    public function index(int $page){
        $data = [];

        $totalCount = User::count();
        $totalPages = ceil($totalCount / 5); //nombre total de pages sachant qu'il ya 5 utilisateurs par page

        $users = User::all()->skip(($page - 1) * 5)->take(5);

        foreach ($users as $user) {
            array_push($data , [$user->email => AnswerResource::collection($user->answers)]);
        }

        $data['totalPages'] = $totalPages;
        
        return $this->sendSuccessResponse($data);
    }
}
