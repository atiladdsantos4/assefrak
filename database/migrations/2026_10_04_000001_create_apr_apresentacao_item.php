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
        Schema::create('api_apresentacao_item', function (Blueprint $table) {
            $table->Increments('api_id_api');
            $table->unsignedBigInteger('api_id_apr');
            $table->char('api_tipo',1);
            $table->integer('api_posicao');
            $table->string('api_conteudo',3000);
            $table->char('api_exibe',1);
            $table->timestamp('api_created_at');
            $table->timestamp('api_updated_at')->nullable();
            $table->timestamp('api_deleted_at')->nullable();
            $table->primary(array('api_id_api'));
            $table->foreign('api_id_apr')->references('apr_id_apr')->on('apr_apresentacao');
        });
    }
    /**
     * Rapirse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_apresentacao_item');
    }
};
