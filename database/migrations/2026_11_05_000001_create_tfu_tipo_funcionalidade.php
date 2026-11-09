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
        Schema::create('tfu_tipo_funcionalidade', function (Blueprint $table) {
            $table->Increments('tfu_id_tfu');
            $table->string('tfu_descricao',500);
            $table->timestamp('tfu_created_at');
            $table->timestamp('tfu_updated_at')->nullable();
            $table->timestamp('tfu_deleted_at')->nullable();
            $table->primary(array('tfu_id_tfu'));
        });
    }
    /**
     * Rtfurse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tfu_tipo_funcionalidade');
    }
};
