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
        Schema::create('apr_apresentacao', function (Blueprint $table) {
            $table->Increments('apr_id_apr');
            $table->unsignedBigInteger('apr_id_pal');
            $table->unsignedBigInteger('apr_id_col');
            $table->string('apr_tema',1000);
            $table->date('apr_data_exibe');
            $table->char('apr_ativo',1);
            $table->timestamp('apr_created_at');
            $table->timestamp('apr_updated_at')->nullable();
            $table->timestamp('apr_deleted_at')->nullable();
            $table->primary(array('apr_id_apr'));
            $table->foreign('apr_id_pal')->references('pal_id_pal')->on('pal_palestra');
            $table->foreign('apr_id_col')->references('col_id_col')->on('col_colaborador');
        });
    }
    /**
     * Raprrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apr_apresentacao');
    }
};
