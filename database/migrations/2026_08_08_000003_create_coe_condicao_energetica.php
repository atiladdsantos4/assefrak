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
        Schema::create('coe_condicao_energetica', function (Blueprint $table) {
            $table->Increments('coe_id_coe');
            $table->string('coe_descricao',400);
            $table->timestamp('coe_created_at');
            $table->timestamp('coe_updated_at')->nullable();
            $table->timestamp('coe_deleted_at')->nullable();
            $table->primary(array('coe_id_coe'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coe_condicao_energetica');
    }
};
