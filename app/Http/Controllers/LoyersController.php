<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Loyers;
use App\Models\Annonce;
use Illuminate\Http\Request;

class LoyersController extends Controller
{
    public function index()
    {
        //$properties = Properties::all();

        return Inertia::render("Dashboard", [
            'properties' => Loyers::latest()->get(),
            'annonces' => Annonce::latest()->get(),
            'stats' => [
                'total' => Loyers::count(),
                'forSale' => Loyers::where('status', 'A Vendre')->count(),
                'forRent' => Loyers::where('status', 'A Louer')->count(),
                'locations' => Loyers::distinct('location')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'price' => 'required|numeric',
            'status' => 'required|string',
            'location' => 'required|string',
            'locality' => 'required|string',
            'bedrooms'=> 'required|numeric',
            'bathrooms' =>'required|numeric',
            'area'=> 'required|numeric',
            'description'=> 'nullable|string',
            'contact'=> 'required|string',
            'name'=> 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8048',
        ]);

        // Traitement des images
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('properties', 'public');
            }
            $validated['images'] = $imagePaths;
        }

        // Création simple et efficace
        Loyers::create($validated);

        return redirect()->back()->with('message', 'Propriété ajoutée !');
    }

}
