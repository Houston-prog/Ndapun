<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Loyers;
use App\Models\Annonce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnonceController extends Controller
{
    public function viewannonce()
    {
        $properties = Annonce::all();

        return Inertia::render("Annonces/Annonce", [
            'properties' => $properties,
            'image' => asset('storage/' . $properties->first()->image),
        ]);
    }

    // Liste des annonces dans le dashboard
    public function dash()
    {
        return Inertia::render("Annonces/AnnonceDashboard", [
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

    // Enregistrer une nouvelle annonce
    public function store(Request $request)
    {
        $fields = $request->validate([
            'titre' => 'required|string',
            'lien_url' => 'nullable|string',
            'description'=> 'required|string',
            'contact'=> 'required|string',
            'name'=> 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:8048',
        ]);

        // Traitement des images
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('annonces', 'public');
            }
            $fields['images'] = $imagePaths;
        }


        Annonce::create($fields);

        return redirect()->back()->with('success', 'Annonce créée avec succès !');
    }

    // Modifier une annonce
    public function update(Request $request, Annonce $loyer)
    {
        $fields = $request->validate([
            'titre' => 'required',
            'prix' => 'required|numeric',
            'description' => 'required',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($loyer->image);
            $fields['images'] = $request->file('image')->store('annonces', 'public');
        }

        $loyer->update($fields);

        return redirect()->back();
    }

    // Supprimer
    public function destroy(Annonce $loyer)
    {
        Storage::disk('public')->delete($loyer->image);
        $loyer->delete();

        return redirect()->back();
    }

}
