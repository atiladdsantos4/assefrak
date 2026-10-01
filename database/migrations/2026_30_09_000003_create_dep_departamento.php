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
        Schema::create('dep_departamento', function (Blueprint $table) {
            $table->Increments('dep_id_dep');
            $table->string('dep_descricao',500);
            $table->string('dep_email',500)->nullable();
            $table->char('dep_ativo',1);
            $table->timestamp('dep_created_at');
            $table->timestamp('dep_updated_at')->nullable();
            $table->timestamp('dep_deleted_at')->nullable();
            $table->primary(array('dep_id_dep'));
        });
    }
    /**
     * Rdeprse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dep_departamento');
    }
};
