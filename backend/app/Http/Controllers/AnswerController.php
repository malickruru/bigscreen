<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Http\Resources\DataResource;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use App\Models\UserSurvey;
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
                'email' => $request->email,
                'role_id' => 2,
                
            ]);
        }else{
            $hasRelation = $user->surveys()->where('survey_id', $request->survey_id)->exists();
            if ($hasRelation) {
                $answerUrl = UserSurvey::where([['user_id','=',$user->id],['survey_id','=',$request->survey_id]])->first()->answer_url;
                return $this->sendSuccessResponse(['link'  => 'reponse/'.$answerUrl],'vous avez déja répondu au sondage, visionner vos réponses à l\'adresse : ');
            }
        }
        // parcourir le tableau data et inserer une question à chaque iteration
        foreach ($request->data as $key => $value) {
            $answerData = [];
            $answerData['user_id'] = $user->id;
            $answerData['question_id'] = $key;
            $answerData['answer_value'] = $value;
            Answer::create($answerData);
        }
        $answer_url = base64_encode($user->email.'|'.$request->survey_id);
        // lier l'utilisateur et le sondage
        $user->surveys()->attach($request->survey_id,[
            'created_at' => now(),
            // pour créer des urls uniques, encoder l'email et l'id du sondage
            //  ex : email|1
            // la valeur de cet encodage sera passé en parametre lors qu'un utilisateur voudra récupérer ses réponses
            'answer_url' => $answer_url
        ]);

        return $this->sendSuccessResponse(['link'  => 'reponse/'.$answer_url],'Toute l’équipe de Bigscreen vous remercie pour votre engagement. Grâce à
        votre investissement, nous vous préparons une application toujours plus facile
        à utiliser, seul ou en famille.
        Si vous désirez consulter vos réponses ultérieurement, vous pouvez consultez
        cette adresse: ');
    }

    /**
     * lister les réponses de l'utilisateur pour un sondage
     * @param
     * email
     */
    public function answersByUserAndSurvey(string $encoded){
        $answers = UserSurvey::where('answer_url','=',$encoded)->first()->answersByUserAndSurvey();
        return $this->sendSuccessResponse(AnswerResource::collection($answers) );
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
     * pour établir un graphe de type radar
     * (id 11 à 15)
     */
    public function radarData(){
        // 1.récuperer les questions de type qualité
        $question = Question::all()->whereIn('id',[11,12,13,14,15]);
        // tableau des labels
        $label = [];
        // tableau des données
        $data = [];
        // pour chaque questions, calculer sa note moyenne 
        foreach ($question as $item) {
            array_push($label,$item->yardstick);
            
            $rating_array = $item->answers->map(function ($answer){
                return $answer->answer_value;
            });
            // calculer la moyenne
            $average = collect($rating_array)->avg();
            // ajouter la moyenne au donnée
            array_push($data,round($average,2));
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
    public function index(int $surveyId ,int $page){
        $data = [];

        $totalCount = User::count();
        $totalPages = ceil($totalCount / 5); //nombre total de pages sachant qu'il ya 5 utilisateurs par page

        $users = User::all()->skip(($page - 1) * 5)->take(5);

        foreach ($users as $user) {
            array_push($data , [$user->email => AnswerResource::collection($user->answersBySurvey($surveyId))]);
        }

        $data['totalPages'] = $totalPages;
        
        return $this->sendSuccessResponse($data);
    }
}
