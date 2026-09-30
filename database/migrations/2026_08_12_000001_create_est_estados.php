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
        Schema::create('est_estados', function (Blueprint $table) {
            $table->Increments('est_id_est');
            $table->integer('est_codigo');
            $table->string('est_nome',500);
            $table->string('est_sigla',300);
            $table->timestamp('est_created_at');
            $table->timestamp('est_updated_at')->nullable();
            $table->timestamp('est_deleted_at')->nullable();
            $table->primary(array('est_id_est'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('est_estados');
    }
};
