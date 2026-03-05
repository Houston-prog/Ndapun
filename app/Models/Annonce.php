<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    /**
     * Les attributs qui peuvent être assignés en masse.
     */
    protected $fillable = [
        'titre',
        'prix',
        'contact',
        'name',
        'description',
        'lien_url',
        'images',
    ];

    protected $casts = [
        'images' => 'array',
        'prix' => 'decimal:2',
    ];
}
