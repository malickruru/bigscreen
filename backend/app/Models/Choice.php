<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;
    
    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array<String>
     */
    protected $fillable = [
        'question_id',
        'text',
    ];

    
    
    /**
     * Relation un à plusieurs entre une question de type A et ces choix
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo retourne la question liée ce choix 
     */
    public function question(){
        return $this->belongsTo(Question::class);
    }
}
