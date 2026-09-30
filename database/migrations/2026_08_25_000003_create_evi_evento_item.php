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
        Schema::create('evi_evento_item', function (Blueprint $table) {
            $table->Increments('evi_id_evi');
            $table->unsignedBigInteger('evi_id_eve');
            $table->char('evi_tipo_informacao',2);
            $table->string('evi_dados_inf',1000);
            $table->timestamp('evi_created_at');
            $table->timestamp('evi_updated_at')->nullable();
            $table->timestamp('evi_deleted_at')->nullable();
            $table->primary(array('evi_id_evi'));
            $table->foreign('evi_id_eve')->references('eve_id_eve')->on('eve_evento');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evi_evento_item');
    }
};
