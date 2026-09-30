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
        Schema::create('ocu_ocupacao', function (Blueprint $table) {
            $table->Increments('ocu_id_ocu');
            $table->string('ocu_descricao',300);
            $table->timestamp('ocu_created_at');
            $table->timestamp('ocu_updated_at')->nullable();
            $table->timestamp('ocu_deleted_at')->nullable();
            $table->primary(array('ocu_id_ocu'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ocu_ocupacao');
    }
};
