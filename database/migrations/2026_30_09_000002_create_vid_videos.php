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
        Schema::create('vid_videos', function (Blueprint $table) {
            $table->Increments('vid_id_vid');
            $table->unsignedBigInteger('vid_id_cav')->nullable();
            $table->string('vid_descricao',500);
            $table->string('vid_hash_link',500);
            $table->char('vid_ativo',1);
            $table->timestamp('vid_created_at');
            $table->timestamp('vid_updated_at')->nullable();
            $table->timestamp('vid_deleted_at')->nullable();
            $table->primary(array('vid_id_vid'));
            $table->foreign('vid_id_cav')->references('cav_id_cav')->on('cav_categoria_video');
        });
    }
    /**
     * Rvidrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vid_videos');
    }
};
