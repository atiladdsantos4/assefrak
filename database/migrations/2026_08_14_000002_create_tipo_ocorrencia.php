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
        Schema::create('top_tipo_ocorrencia', function (Blueprint $table) {
            $table->Increments('top_id_top');
            $table->string('top_descricao',300);
            $table->timestamp('top_created_at');
            $table->timestamp('top_updated_at')->nullable();
            $table->timestamp('top_deleted_at')->nullable();
            $table->primary(array('top_id_top'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('top_tipo_ocorrencia');
    }
};
