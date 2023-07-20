<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    
    /**
     * Les attributs qui sont assignables en masse.
     * @var array<String>
     */
    protected $fillable = [
        'name',
    ];
    
    /**
     *
     * Désactiver l'insertion des champs updated_at et created_at
     * @var bool
     */
    public $timestamps = false;
}
