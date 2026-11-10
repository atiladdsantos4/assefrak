
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inf_informacao_tecnica', function (Blueprint $table) {
            $table->id('inf_id_inf');

            $table->string('inf_autor', 200);
            $table->string('inf_url_dev', 300);
            $table->string('inf_url_prod', 300);
            $table->string('inf_env_dev', 1500);
            $table->string('inf_env_prod', 1500);
            $table->string('inf_db_dev', 1500);
            $table->string('inf_db_prod', 1500);
            $table->string('inf_url_git', 300);
            $table->string('inf_ftp_url', 300);
            $table->string('inf_ftp_senhas', 300);
            $table->string('inf_ssh_url', 100);
            $table->string('inf_ssh_senha', 100);
            $table->string('inf_versao_laravel', 150);

            $table->timestamp('inf_created_at');
            $table->timestamp('inf_updated_at')->nullable();
            $table->timestamp('inf_deleted_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inf_informacao_tecnica');
    }
};
