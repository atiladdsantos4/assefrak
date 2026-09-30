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
        Schema::create('ale_alertas', function (Blueprint $table) {
            $table->Increments('ale_id_ale');
            $table->string('ale_descricao',400);
            $table->timestamp('ale_created_at');
            $table->timestamp('ale_updated_at')->nullable();
            $table->timestamp('ale_deleted_at')->nullable();
            $table->primary(array('ale_id_ale'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ale_alertas');
    }
};
