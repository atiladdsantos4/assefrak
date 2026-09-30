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
        Schema::create('tag_campo', function (Blueprint $table) {
            $table->Increments('tag_id_tag');
            $table->string('tag_nome',50);
            $table->timestamp('tag_created_at');
            $table->timestamp('tag_updated_at')->nullable();
            $table->timestamp('tag_deleted_at')->nullable();
            $table->primary(array('tag_id_tag'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_campo');
    }
};
