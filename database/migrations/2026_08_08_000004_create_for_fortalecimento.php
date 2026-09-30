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
        Schema::create('for_fortalecimento', function (Blueprint $table) {
            $table->Increments('for_id_for');
            $table->string('for_descricao',400);
            $table->timestamp('for_created_at');
            $table->timestamp('for_updated_at')->nullable();
            $table->timestamp('for_deleted_at')->nullable();
            $table->primary(array('for_id_for'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('for_fortalecimento');
    }
};
