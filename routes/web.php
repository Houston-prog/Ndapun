<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoyersController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertiesController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [PropertiesController::class,'index'])->name('welcome');
Route::get('/vue', [AnnonceController::class,'viewannonce'])->name('annonces');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [LoyersController::class,'index'])->name('dashboard');
    Route::post('/dashboard', [LoyersController::class,'store'])->name('dashboard.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/annonces', [AnnonceController::class, 'index'])->name('annonces');
    Route::get('/annonces/dashboard', [AnnonceController::class, 'dash'])->name('annonces.dash');
    Route::post('/annonces/dashboard', [AnnonceController::class, 'store'])->name('annonces.store');
    Route::post('/annonces/{loyer}', [AnnonceController::class, 'update'])->name('annonces.update'); // Post car envoi de fichier
    Route::delete('/annonces/{loyer}', [AnnonceController::class, 'destroy'])->name('annonces.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
