<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * //pac_id_esp,pac_titulo,pac_texto,pac_display,pac_dat_created,pac_dat_updated,pac_dat_deleted
     */
    public function up(): void
    {
        Schema::create('lip_livro_pix', function (Blueprint $table) {
            $table->Increments('lip_id_lip');
            $table->unsignedBigInteger('lip_id_prl');
            $table->unsignedBigInteger('lip_id_pix');
            $table->longText('lip_qrcode');
            $table->string('lip_copy_qrcode',1500);
            $table->decimal('lip_valor_qrcode',10,2);
            $table->timestamp('lip_created_at')->nullable();
            $table->timestamp('lip_updated_at')->nullable();
            $table->timestamp('lip_deleted_at')->nullable();
            $table->primary(array('lip_id_lip'));
            $table->foreign('lip_id_prl')->references('prl_id_prl')->on('prl_preco_livro');
            $table->foreign('lip_id_pix')->references('pix_id_pix')->on('pix_dados_pix');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('lip_livro_pix');
    }
};
