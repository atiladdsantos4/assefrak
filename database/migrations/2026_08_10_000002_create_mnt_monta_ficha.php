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
        Schema::create('mnt_monta_ficha', function (Blueprint $table) {
            $table->Increments('mnt_id_mnt');
            $table->string('mnt_cabecalho',500);
            $table->string('mnt_endereco1',300);
            $table->string('mnt_endereco2',300);
            $table->string('mnt_titulo_horario',300);
            $table->string('mnt_titulo_fechamento',300);
            $table->string('mnt_inicio',40);
            $table->string('mnt_texto_passes',40);
            $table->string('mnt_texto_agua',40);
            $table->string('mnt_itens_obs',3000);
            $table->timestamp('man_created_at');
            $table->string('mnt_texto_controle',40);
            $table->timestamp('man_updated_at')->nullable();
            $table->timestamp('man_deleted_at')->nullable();
            $table->primary(array('mnt_id_mnt'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mnt_monta_ficha');
    }
};
