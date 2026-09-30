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
        Schema::create('tra_tratamento', function (Blueprint $table) {
            $table->Increments('tra_id_tra');
            $table->unsignedBigInteger('tra_id_aco');
            $table->unsignedBigInteger('tra_id_col');
            $table->unsignedBigInteger('tra_id_tit');
            $table->unsignedBigInteger('tra_id_stt');
            $table->string('tra_passe',1000);
            $table->string('tra_foco_energetico',1000);
            $table->string('tra_cond_energetica',1000);
            $table->string('tra_fortalecimento',1000);
            $table->string('tra_limpeza',1000);
            $table->string('tra_alerta',1000);
            $table->string('tra_pri_impressao',4000);
            $table->timestamp('tra_created_at');
            $table->timestamp('tra_updated_at')->nullable();
            $table->timestamp('tra_deleted_at')->nullable();
            $table->foreign('tra_id_aco')->references('aco_id_aco')->on('aco_acolhido');
            $table->foreign('tra_id_col')->references('col_id_col')->on('col_colaborador');
            $table->foreign('tra_id_tit')->references('tit_id_tit')->on('tit_tipo_tratamento');
            $table->foreign('tra_id_stt')->references('stt_id_stt')->on('stt_status_tratamento');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tra_tratamento');
    }
};
