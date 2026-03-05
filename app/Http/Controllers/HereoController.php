<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Properties;
use Illuminate\Http\Request;

class HereoController extends Controller
{
    public function index() {
        return Inertia::render('Hereo', [
            'Slides' => [
                ['id' => 1, 'title' => 'Modern Luxury Penthouse', 'url' => '/images/hero1.jpg', 'color' => '#1a1a2e'],
                ['id' => 2, 'title' => 'Waterfront Villa Estate', 'url' => '/images/hero2.jpg', 'color' => '#1e3a5f'],
                ['id' => 3, 'title' => 'Chic Brooklyn Townhouse', 'url' => '/images/hero3.jpg', 'color' => '#3d2914'],
            ]
        ]);
    }

    /**
     * Affiche une liste filtrée des propriétés.
     * C'est la méthode qui reçoit la recherche du formulaire sur la page d'accueil.
     */
    public function filterHereo(Request $request)
    {
        // On commence par ne prendre que les propriétés disponibles
        $query = Properties::query()->whereIn('status', ['A Louer', 'A Vendre']);

        // Applique les filtres de la requête
        if ($request->filled('location')) {
            $query->where('location', $request->input('location'));
        }

        if ($request->filled('locality')) {
            $query->where('locality', $request->input('locality'));
        }

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('price')) {
            $priceValue = (int) $request->input('price');
            if ($priceValue === 10) {
                $query->whereBetween('price', [10, 49999]);
            } elseif ($priceValue === 50000) {
                $query->whereBetween('price', [50000, 99999]);
            } elseif ($priceValue === 100000) {
                $query->whereBetween('price', [100000, 149999]);
            } elseif ($priceValue === 150000) {
                $query->where('price', '>=', 150000);
            }
        }

        // On récupère les propriétés filtrées, avec pagination
        $properties = $query->latest()->paginate(9)->withQueryString();

        // On retourne la vue Inertia avec les propriétés et les filtres actuels
        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['location', 'locality', 'type', 'price']),
        ]);
    }

    // ... autres méthodes du contrôleur (store, update, destroy, etc.)
}
