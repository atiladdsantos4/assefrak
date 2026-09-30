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
        Schema::create('prl_preco_livro', function (Blueprint $table) {
            $table->Increments('prl_id_prl');
            $table->unsignedBigInteger('prl_id_liv');
            $table->date('prl_data_vigor');
            $table->decimal('prl_max_desconto',12,2);
            $table->decimal('prl_valor_desconto',12,2);
            $table->decimal('prl_valor',12,2);
            $table->char('prl_valor_atual',1);
            $table->timestamp('prl_created_at');
            $table->timestamp('prl_updated_at')->nullable();
            $table->timestamp('prl_deleted_at')->nullable();
            $table->primary(array('prl_id_prl'));
            $table->foreign('prl_id_liv')->references('liv_id_liv')->on('liv_livros');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prl_preco_livro');
    }
};
