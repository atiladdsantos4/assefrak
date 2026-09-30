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
        Schema::create('aut_autor', function (Blueprint $table) {
            $table->Increments('aut_id_aut');
            $table->string('aut_nome',500);
            $table->timestamp('aut_created_at');
            $table->timestamp('aut_updated_at')->nullable();
            $table->timestamp('aut_deleted_at')->nullable();
            $table->primary(array('aut_id_aut'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aut_autor');
    }
};
