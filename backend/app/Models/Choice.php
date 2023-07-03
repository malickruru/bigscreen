<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'text',
    ];

    /**
     * Relation un à plusieurs entre une question de type A et ces choix
     * retourne la question liée ce choix 
     */

    public function question(){
        return $this->belongsTo(Question::class);
    }
}
