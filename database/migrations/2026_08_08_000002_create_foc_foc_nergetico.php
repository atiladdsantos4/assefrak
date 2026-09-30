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
        Schema::create('foc_foco_energetivo', function (Blueprint $table) {
            $table->Increments('foc_id_foc');
            $table->string('foc_descricao',400);
            $table->timestamp('foc_created_at');
            $table->timestamp('foc_updated_at')->nullable();
            $table->timestamp('foc_deleted_at')->nullable();
            $table->primary(array('foc_id_foc'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foc_foco_energetivo');
    }
};
