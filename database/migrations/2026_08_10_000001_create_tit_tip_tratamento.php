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
        Schema::create('tit_tipo_tratamento', function (Blueprint $table) {
            $table->Increments('tit_id_tit');
            $table->string('tit_descricao',500);
            $table->integer('tit_qtde_semana');
           $table->timestamp('tit_created_at');
            $table->timestamp('tit_updated_at')->nullable();
            $table->timestamp('tit_deleted_at')->nullable();
            $table->primary(array('tit_id_tit'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tit_tipo_tratamento');
    }
};
