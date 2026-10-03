Inscrito<?php

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
        Schema::create('sae_saida_estoque', function (Blueprint $table) {
            $table->Increments('sae_id_sae');
            $table->unsignedBigInteger('sae_id_ene');
            $table->integer('sae_qtde_saida');
            $table->decimal('sae_valor_unit',10,2);
            $table->decimal('sae_valor_total',10,2);
            $table->char('sae_confirmado',1);
            $table->char('sae_cancelado',1);
            $table->string('sae_hash',6);
            $table->timestamp('sae_created_at');
            $table->timestamp('sae_updated_at')->nullable();
            $table->timestamp('sae_deleted_at')->nullable();
            $table->primary(array('sae_id_sae'));
            $table->foreign('sae_id_ene')->references('ene_id_ene')->on('ene_entrada_estoque');
        });
    }
    /**
     * Rsaerse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sae_saeartamento');
    }
};
