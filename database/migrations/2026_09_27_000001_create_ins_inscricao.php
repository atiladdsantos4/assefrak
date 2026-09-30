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
        Schema::create('ins_inscricao', function (Blueprint $table) {
            $table->Increments('ins_id_ins');
            $table->unsignedBigInteger('ins_id_cur')->nullable();
            $table->unsignedBigInteger('ins_id_eve')->nullable();
            $table->unsignedBigInteger('ins_id_puf');
            $table->string('ins_nome',300);
            $table->string('ins_email',300);
            $table->string('ins_telefone',20);
            $table->char('ins_tipo',1);
            $table->char('ins_ativo',1);
            $table->char('ins_envio_email',1);
            $table->timestamp('ins_created_at')->nullable();
            $table->timestamp('ins_updated_at')->nullable();
            $table->timestamp('ins_deleted_at')->nullable();
            $table->primary(array('ins_id_ins'));
            $table->foreign('ins_id_cur')->references('cur_id_cur')->on('cur_cursos');
            $table->foreign('ins_id_eve')->references('eve_id_eve')->on('eve_evento');
            $table->foreign('ins_id_puf')->references('puf_id_puf')->on('puf_publico_foco');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('ins_livro_pix');
    }
};
