<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
                        'A_type' => $question->choices()->get()->random()->id,
                        'B_type' => null,
                        'C_type' => null,
                    ];
                case 'C':
                    return [
                        'A_type' => null,
                        'B_type' => null,
                        'C_type' => collect([1,2,3,4,5])->random(),
                    ];
                default:
                    if ($question->text == 'Votre adresse mail ?') {
                        return [
                            'A_type' => null,
                            'B_type' => $user->email,
                            'C_type' => null,
                        ];
                    }else if($question->yardstick == 'âge'){
                        return [
                            'A_type' => null,
                            'B_type' => rand(18, 65),
                            'C_type' => null,
                        ];
                    }else if($question->yardstick == 'profession'){
                        return [
                            'A_type' => null,
                            'B_type' => fake()->jobTitle,
                            'C_type' => null,
                        ];
                    }else if($question->yardstick == 'Besoins future'){
                        return [
                            'A_type' => null,
                            'B_type' => fake()->sentence(),
                            'C_type' => null,
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
            
            $customer->surveys()->attach(1,['created_at' => now()]);
        }); 

    }
}
