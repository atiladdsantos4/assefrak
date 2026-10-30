<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void//hue_humor_energia
    {

        Schema::create('hue_humor_energia', function (Blueprint $table) {
            $table->Increments('hue_id_hue');
            $table->string('hue_descricao',300);
            $table->timestamp('hue_created_at');
            $table->timestamp('hue_updated_at')->nullable();
            $table->timestamp('hue_deleted_at')->nullable();
            $table->primary(array('hue_id_hue'));
        });

        Schema::create('cor_condicoes_relatada', function (Blueprint $table) {
            $table->Increments('cor_id_cor');
            $table->string('cor_descricao',300);
            $table->timestamp('cor_created_at');
            $table->timestamp('cor_updated_at')->nullable();
            $table->timestamp('cor_deleted_at')->nullable();
            $table->primary(array('cor_id_cor'));
        });

        Schema::create('cpr_comportamento_reativo', function (Blueprint $table) {
            $table->Increments('cpr_id_cpr');
            $table->string('cpr_descricao',300);
            $table->timestamp('cpr_created_at');
            $table->timestamp('cpr_updated_at')->nullable();
            $table->timestamp('cpr_deleted_at')->nullable();
            $table->primary(array('cpr_id_cpr'));
        });

        Schema::create('cpp_comportamento_passivo', function (Blueprint $table) {
            $table->Increments('cpp_id_cpp');
            $table->string('cpp_descricao',300);
            $table->timestamp('cpp_created_at');
            $table->timestamp('cpp_updated_at')->nullable();
            $table->timestamp('cpp_deleted_at')->nullable();
            $table->primary(array('cpp_id_cpp'));
        });

        Schema::create('cos_cognicao_sono', function (Blueprint $table) {
            $table->Increments('cos_id_cos');
            $table->string('cos_descricao',300);
            $table->timestamp('cos_created_at');
            $table->timestamp('cos_updated_at')->nullable();
            $table->timestamp('cos_deleted_at')->nullable();
            $table->primary(array('cos_id_cos'));
        });

		Schema::create('gac_gravidade_clinica', function (Blueprint $table) {
            $table->Increments('gac_id_gac');
            $table->string('gac_descricao',300);
            $table->timestamp('gac_created_at');
            $table->timestamp('gac_updated_at')->nullable();
            $table->timestamp('gac_deleted_at')->nullable();
            $table->primary(array('gac_id_gac'));
        });

		Schema::create('per_condicao_percebida', function (Blueprint $table) {
            $table->Increments('per_id_per');
            $table->string('per_descricao',300);
            $table->timestamp('per_created_at');
            $table->timestamp('per_updated_at')->nullable();
            $table->timestamp('per_deleted_at')->nullable();
            $table->primary(array('per_id_per'));
        });

		Schema::create('dip_dia_passe', function (Blueprint $table) {
            $table->Increments('dip_id_dip');
            $table->string('dip_descricao',300);
            $table->timestamp('dip_created_at');
            $table->timestamp('dip_updated_at')->nullable();
            $table->timestamp('dip_deleted_at')->nullable();
            $table->primary(array('dip_id_dip'));
        });

		Schema::create('orc_orientacao_casa', function (Blueprint $table) {
            $table->Increments('orc_id_orc');
            $table->string('orc_descricao',300);
            $table->timestamp('orc_created_at');
            $table->timestamp('orc_updated_at')->nullable();
            $table->timestamp('orc_deleted_at')->nullable();
            $table->primary(array('orc_id_orc'));
        });

		Schema::create('ori_orientacao_externa', function (Blueprint $table) {
            $table->Increments('ori_id_ori');
            $table->string('ori_descricao',300);
            $table->timestamp('ori_created_at');
            $table->timestamp('ori_updated_at')->nullable();
            $table->timestamp('ori_deleted_at')->nullable();
            $table->primary(array('ori_id_ori'));
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hue_humor_energia');
        Schema::dropIfExists('cor_condicoes_relatada');
        Schema::dropIfExists('cpr_comportamento_reativo');
        Schema::dropIfExists('cpp_comportamento_passivo');
        Schema::dropIfExists('cos_cognicao_sono');
		Schema::dropIfExists('gac_gravidade_clinica');
        Schema::dropIfExists('per_condicao_percebida');
        Schema::dropIfExists('dip_dia_passe');
		Schema::dropIfExists('orc_orientacao_casa');
		Schema::dropIfExists('ori_orientacao_externa');
    }
};
