
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ina_inf_assefrak', function (Blueprint $table) {

            $table->bigIncrements('ina_id_ina');

            $table->string('ina_url_nome_centro', 200)->nullable();
            $table->string('ina_url_instagran', 200)->nullable();
            $table->string('ina_url_inst_credencial', 500)->nullable();
            $table->string('ina_url_facebook', 200)->nullable();
            $table->string('ina_url_face_credencial', 500)->nullable();
            $table->string('ina_url_site', 200)->nullable();
            $table->string('ina_url_site_admin', 200)->nullable();

            $table->string('ina_telefone_admin', 20)->nullable();
            $table->string('ina_telefone_contato', 20)->nullable();
            $table->string('ina_telefone_fincanceiro', 20)->nullable();

            $table->string('ina_email', 2000)->nullable();

            $table->timestamp('ina_created_at')->nullable();
            $table->timestamp('ina_updated_at')->nullable();
            $table->timestamp('ina_deleted_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ina_inf_assefrak');
    }
};
