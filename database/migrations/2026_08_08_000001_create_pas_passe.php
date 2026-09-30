<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pas_passe', function (Blueprint $table) {
            $table->Increments('pas_id_pas');
            $table->string('pas_descricao',400);
            $table->string('pas_local',400)->nullable();
            $table->timestamp('pas_created_at');
            $table->timestamp('pas_updated_at')->nullable();
            $table->timestamp('pas_deleted_at')->nullable();
            $table->primary(array('pas_id_pas'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pas_passe');
    }
};
