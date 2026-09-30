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
        Schema::create('lim_limpeza', function (Blueprint $table) {
            $table->Increments('lim_id_lim');
            $table->string('lim_descricao',400);
            $table->timestamp('lim_created_at');
            $table->timestamp('lim_updated_at')->nullable();
            $table->timestamp('lim_deleted_at')->nullable();
            $table->primary(array('lim_id_lim'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lim_limpeza');
    }
};
