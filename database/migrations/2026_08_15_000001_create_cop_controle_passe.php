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
        Schema::create('cop_controle_passe', function (Blueprint $table) {
            $table->Increments('cop_id_cop');
            $table->Increments('cop_id_tra');
            $table->Increments('cop_id_col');
            $table->date('cop_data_prevista');
            $table->date('cop_data_atendimento')->nullable();
            $table->char('cop_concluido',1);
            $table->timestamp('cop_created_at');
            $table->timestamp('cop_updated_at')->nullable();
            $table->timestamp('cop_deleted_at')->nullable();
            $table->primary(array('cop_id_cop'));
            $table->foreign('cop_id_tra')->references('tra_id_tra')->on('tra_tratamento');
            $table->foreign('cop_id_col')->references('col_id_col')->on('col_colaborador');

        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cop_controle_passe');
    }
};
