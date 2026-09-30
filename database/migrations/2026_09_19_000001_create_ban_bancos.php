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
        Schema::create('ban_bancos', function (Blueprint $table) {
            $table->Increments('ban_id_ban');
            $table->integer('ban_numero');
            $table->string('ban_nome',400);
            $table->string('ban_sigla',40)->nullable();
            $table->string('ban_complemento',200)->nullable();
            $table->timestamp('ban_created_at');
            $table->timestamp('ban_updated_at')->nullable();
            $table->timestamp('ban_deleted_at')->nullable();
            $table->primary(array('ban_id_ban'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('ban_bancos');
    }
};
