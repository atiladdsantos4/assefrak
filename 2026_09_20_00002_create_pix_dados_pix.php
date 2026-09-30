<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     */
    public function up(): void
    {
        Schema::create('pix_dados_pix', function (Blueprint $table) {
            $table->Increments('pix_id_pix');
            $table->string('pix_tipo',10);
            $table->string('pix_chave',100);
            $table->string('pix_nome_fantasia',400);
            $table->string('pix_cidade',400);
            $table->unsignedBigInteger('pix_id_ban');
            $table->char('pix_ativo',1);
            $table->char('pix_atual',1);
            $table->timestamp('pix_created_at');
            $table->timestamp('pix_updated_at')->nullable();
            $table->timestamp('pix_deleted_at')->nullable();
            $table->primary(array('pix_id_pix'));
            $table->foreign('pix_id_ban')->references('ban_id_ban')->on('ban_bancos');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('hoa_horario_agenda');
    }
};
