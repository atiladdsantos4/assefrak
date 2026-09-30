<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * //pac_id_esp,pac_titulo,pac_texto,pac_display,pac_dat_created,pac_dat_updated,pac_dat_deleted
     */
    public function up(): void
    {
        Schema::create('aco_acolhido', function (Blueprint $table) {
            $table->Increments('aco_id_aco');
            $table->string('aco_name',400);
            $table->string('aco_cpf',14)->nullable();
            $table->string('aco_email',100);
            $table->string('aco_sexo',1);
            $table->integer('aco_tipo_telefone');
            $table->string('aco_telefone',20);
            $table->char('aco_ativo',1);
            $table->integer('aco_estado');
            $table->integer('aco_cidade');
            $table->integer('aco_faixa');
            $table->date('aco_nascimento');
            $table->timestamp('aco_created_at');
            $table->timestamp('aco_updated_at')->nullable();
            $table->timestamp('aco_deleted_at')->nullable();
            $table->primary(array('aco_id_aco'));
            $table->foreign('aco_estado')->references('est_id_est')->on('est_estados');
            $table->foreign('aco_cidade')->references('cid_id_cid')->on('cid_cidades');
            $table->foreign('aco_faixa')->references('fai_id_fai')->on('fai_faixas');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('aco_acolhido');
    }
};
