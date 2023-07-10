<?php

namespace Database\Seeders;

use App\Models\Survey;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SurveySeeder extends Seeder
{
    /**
     * Créer un sondage
     */
    public function run(): void
    {
        $survey = new Survey();
        $survey->title = 'Sondage BigScreen';
        $survey->description = 'Afin de préparer la prochaine itération de leur application, l’entreprise Bigscreen désire collecter
        des informations de la part de ses utilisateurs via un sondage en ligne.
        ';
        $survey->isOnline = true;
        $survey->save();
    }
}
