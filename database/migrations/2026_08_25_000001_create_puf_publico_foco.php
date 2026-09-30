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
        Schema::create('puf_publico_foco', function (Blueprint $table) {
            $table->Increments('puf_id_puf');
            $table->string('puf_descricao',500);
            $table->timestamp('puf_created_at');
            $table->timestamp('puf_updated_at')->nullable();
            $table->timestamp('puf_deleted_at')->nullable();
            $table->primary(array('puf_id_puf'));
        });
    }
    /**
     * Rpufrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puf_publico_foco');
    }
};
