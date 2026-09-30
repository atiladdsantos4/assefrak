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
        Schema::create('col_colaborador', function (Blueprint $table) {
            $table->Increments('col_id_col');
            $table->unsignedBigInteger('col_ocupacao');
            $table->string('col_name',400);
            $table->string('col_cpf',14)->nullable();
            $table->string('col_email',100);
            $table->string('col_sexo',1);
            $table->integer('col_tipo_telefone');
            $table->string('col_telefone',20);
            $table->char('col_ativo',1);
            $table->integer('col_estado');
            $table->integer('col_cidade');
            $table->date('col_nascimento');
            $table->string('col_titulo',300);
            $table->string('col_imagem',400)->nullable();
            $table->timestamp('col_created_at');
            $table->timestamp('col_updated_at')->nullable();
            $table->timestamp('col_deleted_at')->nullable();
            $table->primary(array('col_id_col'));
            $table->foreign('col_estado')->references('est_id_est')->on('est_estados');
            $table->foreign('col_cidade')->references('cid_id_cid')->on('cid_cidades');
            $table->foreign('col_ocupacao')->references('ocu_id_ocu')->on('ocu_ocupacao');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('col_colaborador');
    }
};
