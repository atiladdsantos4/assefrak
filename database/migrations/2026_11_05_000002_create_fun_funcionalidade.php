
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
        Schema::create('fun_funcionalidade', function (Blueprint $table) {
            $table->Increments('fun_id_fun');
            $table->unsignedBigInteger('fun_id_tfu');
            $table->unsignedInteger('fun_id_men')->nullable();
            $table->string('fun_descricao',2000);
            $table->string('fun_link',300);
            $table->timestamp('fun_created_at');
            $table->timestamp('fun_updated_at')->nullable();
            $table->timestamp('fun_deleted_at')->nullable();

            $table->primary(array('fun_id_fun'));

            $table->foreign('fun_id_tfu')
                ->references('tfu_id_tfu')
                ->on('tfu_tipo_funcionalidade');

            $table->foreign('fun_id_men')
                ->references('men_id_men')
                ->on('men_menu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fun_funcionalidade');
    }
};
