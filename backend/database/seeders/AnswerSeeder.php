<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AnswerSeeder extends Seeder
{
    /**
     * Créer 20 réponses par utilisateurs
     */
    public function run(): void
    {

        function AnswerData(Question $question, User $user)
        {
            switch ($question->type) {
                case 'A':
                    return [
                        'answer_value' => $question->choices()->get()->random()->id,
                    ];
                case 'C':
                    return [
                        'answer_value' => collect([1,2,3,4,5])->random(),
                    ];
                default:
                    if ($question->yardstick == 'email') {
                        return [
                            'answer_value' => $user->email,
                        ];
                    }else if($question->yardstick == 'âge'){
                        return [
                            'answer_value' => rand(18, 65),
                        ];
                    }else if($question->yardstick == 'profession'){
                        return [
                            'answer_value' => fake()->jobTitle,
                        ];
                    }else if($question->yardstick == 'Besoins future'){
                        return [
                            'answer_value' => fake()->sentence(),
                        ];
                    }
                
            }
        }

        User::all()->each(function (User $customer){
            foreach (Question::all() as $question) {
                Answer::create(
                    array_merge(
                        ["question_id" => $question->id,
                        "user_id" => $customer->id] ,
                        AnswerData( $question, $customer))
                );
            }
            
            $customer->surveys()->attach(1,[
                'created_at' => now(),
                // pour créer des urls uniques, encoder l'email et l'id du sondage
                //  ex : email|1
                // la valeur de cet encodage sera passé en parametre lors qu'un utilisateur voudra récupérer ses réponses
                'answer_url' => base64_encode($customer->email.'|'.'1')
            ]);
        }); 

    }
}
