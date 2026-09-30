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
        Schema::create('cui_curso_item', function (Blueprint $table) {
            $table->Increments('cui_id_cui');
            $table->unsignedBigInteger('cui_id_cur');
            $table->char('cui_tipo_informacao',2);
            $table->string('cui_dados_inf',1000);
            $table->timestamp('cui_created_at');
            $table->timestamp('cui_updated_at')->nullable();
            $table->timestamp('cui_deleted_at')->nullable();
            $table->primary(array('cui_id_cui'));
            $table->foreign('cui_id_cur')->references('cur_id_cur')->on('cur_cursos');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cui_curso_item');
    }
};
