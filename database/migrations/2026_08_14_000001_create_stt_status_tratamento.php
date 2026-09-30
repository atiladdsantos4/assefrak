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
        Schema::create('stt_status_tratamento', function (Blueprint $table) {
            $table->Increments('stt_id_stt');
            $table->string('stt_descricao',500);
            $table->timestamp('stt_created_at');
            $table->timestamp('stt_updated_at')->nullable();
            $table->timestamp('stt_deleted_at')->nullable();
            $table->primary(array('stt_id_stt'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stt_status_tratamento');
    }
};
