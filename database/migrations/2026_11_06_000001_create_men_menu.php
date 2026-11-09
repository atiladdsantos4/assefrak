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
        Schema::create('men_menu', function (Blueprint $table) {
            $table->Increments('men_id_men');
            $table->unsignedBigInteger('men_id_pai')->nullable();
            $table->string('men_name',100);
            $table->string('men_classe',200);
            $table->string('men_click',200);
            $table->string('men_nivel',200);
            $table->integer('menu_position');
            $table->timestamp('men_created_at');
            $table->timestamp('men_updated_at')->nullable();
            $table->timestamp('men_deleted_at')->nullable();
            $table->primary(array('men_id_men'));
            $table->foreign('men_id_pai')->references('men_id_men')->on('men_menu');
        });
    }
    /**
     * Rfunrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('men_menu');
    }
};
