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
        Schema::create('tipo_parametro', function (Blueprint $table) {
            $table->Increments('tip_id_tip');
            $table->string('tip_nome',50);
            $table->timestamp('tip_created_at');
            $table->timestamp('tip_updated_at')->nullable();
            $table->timestamp('tip_deleted_at')->nullable();
            $table->primary(array('tip_id_tip'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_parametro');
    }
};
