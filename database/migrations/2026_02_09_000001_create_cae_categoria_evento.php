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
        Schema::create('cae_categoria_evento', function (Blueprint $table) {
            $table->Increments('cae_id_cae');
            $table->string('cae_descricao',500);
            $table->timestamp('cae_created_at');
            $table->timestamp('cae_updated_at')->nullable();
            $table->timestamp('cae_deleted_at')->nullable();
            $table->primary(array('cae_id_cae'));
        });
    }
    /**
     * Rcaerse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cae_categoria_evento');
    }
};
