<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string('titre'); // Titre de l'annonce
            $table->decimal('prix', 10, 2)->nullable(); // Prix avec deux décimales
            $table->text('description'); // Description détaillée
            $table->json('images')->nullable(); // Images des annonces
            $table->string('contact'); // Contact du proprietaire
            $table->string('name'); // Nom du propriertaire
            $table->string('lien_url')->nullable(); // Lien whatsapp
            $table->string('type')->default('Location'); // Optionnel : Maison, Appartement, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
