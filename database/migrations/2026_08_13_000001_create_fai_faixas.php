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
        Schema::create('fai_faixas', function (Blueprint $table) {
            $table->Increments('fai_id_fai');
            $table->string('fai_descricao',300);
            $table->timestamp('fai_created_at');
            $table->timestamp('fai_updated_at')->nullable();
            $table->timestamp('fai_deleted_at')->nullable();
            $table->primary(array('fai_id_fai'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fai_faixas');
    }
};
