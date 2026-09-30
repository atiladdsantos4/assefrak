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
        Schema::create('ocp_ocorrencia_passe', function (Blueprint $table) {
            $table->Increments('ocp_id_ocp');
            $table->Increments('ocp_id_tra');
            $table->Increments('ocp_id_top');
            $table->string('ocp_descricao',2000);
            $table->timestamp('ocp_created_at');
            $table->timestamp('ocp_updated_at')->nullable();
            $table->timestamp('ocp_deleted_at')->nullable();
            $table->primary(array('ocp_id_ocp'));
            $table->foreign('ocp_id_tra')->references('tra_id_tra')->on('tra_tratamento');
            $table->foreign('ocp_id_top')->references('top_id_top')->on('top_tipo_ocorrencia');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ocp_ocorrencia_passe');
    }
};
