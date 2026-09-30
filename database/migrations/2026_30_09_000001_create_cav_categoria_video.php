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
        Schema::create('cav_categoria_video', function (Blueprint $table) {
            $table->Increments('cav_id_cav');
            $table->string('cav_descricao',500);
            $table->timestamp('cav_created_at');
            $table->timestamp('cav_updated_at')->nullable();
            $table->timestamp('cav_deleted_at')->nullable();
            $table->primary(array('cav_id_cav'));
        });
    }
    /**
     * Rcavrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cav_categoria_video');
    }
};
