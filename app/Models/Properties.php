<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Properties extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'type',
        'status',
        'location',
        'locality',
        'bedrooms',
        'bathrooms',
        'area',
        'contact',
        'name',
        'images',
    ];

    // Pour transformer automatiquement le tableau d'images JSON en Array PHP
    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
    ];
}
