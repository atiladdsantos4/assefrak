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
        Schema::create('edi_editora', function (Blueprint $table) {
            $table->Increments('edi_id_edi');
            $table->string('edi_descricao',500);
            $table->timestamp('edi_created_at');
            $table->timestamp('edi_updated_at')->nullable();
            $table->timestamp('edi_deleted_at')->nullable();
            $table->primary(array('edi_id_edi'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edi_editora');
    }
};
