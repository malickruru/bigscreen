<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'corps' => 'Votre adresse mail ?',
                'type' => 'B',
                'critère étudié' => 'email',
                'validateAs' => 'email'
            ],
            [
                'corps' => 'Votre âge ?',
                'type' => 'B',
                'critère étudié' => 'âge',
                'validateAs' => 'number'
            ],
            [
                'corps' => 'Votre sexe ?',
                'type' => 'A',
                'choix' => ['Homme', 'Femme', 'Préfère ne pas répondre'],
                'critère étudié' => 'sexe',
            ],
            [
                'corps' => 'Nombre de personnes dans votre foyer (adulte & enfants – répondant inclus) ?',
                'type' => 'C',
                'critère étudié' => 'nombre de personnes dans le foyer',
            ],
            [
                'corps' => 'Votre profession ?',
                'type' => 'B',
                'critère étudié' => 'profession',
                'validateAs' => 'text'
            ],
            [
                'corps' => 'Quelle marque de casque VR utilisez-vous ?',
                'type' => 'A',
                'choix' => ['Oculus Quest', 'Oculus Rift/s', 'HTC Vive', 'Windows Mixed Reality', 'Valve Index'],
                'critère étudié' => 'marque de casque VR',
            ],
            [
                'corps' => 'Sur quel magasin d’application achetez-vous des contenus VR ?',
                'type' => 'A',
                'choix' => ['SteamVR', 'Oculus Store', 'Viveport', 'Windows Store'],
                'critère étudié' => 'magasin les plus vendeur',
            ],
            [
                'corps' => 'Quel casque envisagez-vous d’acheter dans un futur proche ?',
                'type' => 'A',
                'choix' => ['Oculus Quest', 'Oculus Go', 'HTC Vive Pro', 'PSVR', 'Autre', 'Aucun'],
                'critère étudié' => 'casque VR les plus demandés',
            ],
            [
                'corps' => 'Au sein de votre foyer, combien de personnes utilisent votre casque VR pour regarder Bigscreen ?',
                'type' => 'C',
                'critère étudié' => 'nombre de personnes utilisant un casque VR pour Bigscreen par foyer',
            ],
            [
                'corps' => 'Vous utilisez principalement Bigscreen pour…',
                'type' => 'A',
                'choix' => ['Regarder la TV en direct', 'Regarder des films', 'Travailler', 'Jouer en solo', 'Jouer en équipe'],
                'critère étudié' => 'utilisation principale de Bigscreen',
            ],
            [
                'corps' => 'Combien de points (de 1 à 5) donnez-vous à la qualité de l’image sur Bigscreen ?',
                'type' => 'C',
                'critère étudié' => 'qualité de l’image ',
            ],
            [
                'corps' => 'Combien de points (de 1 à 5) donnez-vous au confort d’utilisation de l’interface Bigscreen ?',
                'type' => 'C',
                'critère étudié' => 'confort d’utilisation ',
            ],
            [
                'corps' => 'Combien de points (de 1 à 5) donnez-vous à la connexion réseau de Bigscreen ?',
                'type' => 'C',
                'critère étudié' => 'qualité de la connexion réseau ',
            ],
            [
                'corps' => 'Combien de points (de 1 à 5) donnez-vous à la qualité des graphismes 3D dans Bigscreen ?',
                'type' => 'C',
                'critère étudié' => 'qualité des graphismes 3D ',
            ],
            [
                'corps' => 'Combien de points (de 1 à 5) donnez-vous à la qualité audio dans Bigscreen ?',
                'type' => 'C',
                'critère étudié' => 'qualité audio ',
            ],
            [
                'corps' => 'Aimeriez-vous avoir des notifications plus précises au cours de vos sessions Bigscreen ?',
                'type' => 'A',
                'choix' => ['Oui', 'Non'],
                'critère étudié' => 'volonté à reçevoir des notifications',
            ],
            [
                'corps' => 'Aimeriez-vous pouvoir inviter un ami à rejoindre votre session via son smartphone ?',
                'type' => 'A',
                'choix' => ['Oui', 'Non'],
                'critère étudié' => 'volonté à inviter un ami via smartphone ',
            ],
            [
                'corps' => 'Aimeriez-vous pouvoir enregistrer des émissions TV pour pouvoir les regarder ultérieurement ?',
                'type' => 'A',
                'choix' => ['Oui', 'Non'],
                'critère étudié' => 'volonté à enregistrer des émissions TV ',
            ],
            [
                'corps' => 'Aimeriez-vous jouer à des jeux exclusifs sur votre Bigscreen ?',
                'type' => 'A',
                'choix' => ['Oui', 'Non'],
                'critère étudié' => 'volonté à profiter de jeux exclusifs ',
            ],
            [
                'corps' => 'Selon vous, quelle nouvelle fonctionnalité devrait exister sur Bigscreen ?',
                'type' => 'B',
                'critère étudié' => 'Besoins future',
                'validateAs' => 'textarea'
            ],
        ];

        // ajouter un ensemble de 20 questions dans le premier sondage
        collect($questions)->each(function (array $question) {
            $data = new Question();
            $data->survey_id = 1; // toutes les questions seront liées au premier sondage
            $data->text = $question['corps'];
            $data->type = $question['type'];
            $data->yardstick = $question['critère étudié'];
            if(isset($question['validateAs'])){
                $data->validateAs = $question['validateAs']; 
            }
            $data->save();
            // si il s'agit d'une question de type A , lié l'id de la question à ces propositions dans la table choice
            if ($data->type == 'A') {
                $data->choices()->createMany(
                    collect($question['choix'])->map(function (string $choix) {
                        return ["text" => $choix];
                    })->all()
                );
            }
        });
    }
}
