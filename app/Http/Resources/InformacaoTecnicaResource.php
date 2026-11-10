<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class InformacaoTecnicaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'inf_id_inf' => $this->inf_id_inf,
            'inf_autor' => $this->inf_autor,
            'inf_url_dev' => $this->inf_url_dev,
            'inf_url_prod' => $this->inf_url_prod,
            'inf_env_dev' => $this->inf_env_dev,
            'inf_env_prod' => $this->inf_env_prod,
            'inf_db_dev' => $this->inf_db_dev,
            'inf_db_prod' => $this->inf_db_prod,
            'inf_url_git' => $this->inf_url_git,
            'inf_ftp_url' => $this->inf_ftp_url,
            'inf_ftp_senhas' => $this->inf_ftp_senhas,
            'inf_ssh_url' => $this->inf_ssh_url,
            'inf_ssh_senha' => $this->inf_ssh_senha,
            'inf_versao_laravel' => $this->inf_versao_laravel,

            'inf_created_at' => $this->inf_created_at
                ? Carbon::parse($this->inf_created_at)->format('d/m/Y H:i:s')
                : null,

            'inf_updated_at' => $this->inf_updated_at
                ? Carbon::parse($this->inf_updated_at)->format('d/m/Y H:i:s')
                : null,

            'inf_deleted_at' => $this->inf_deleted_at
                ? Carbon::parse($this->inf_deleted_at)->format('d/m/Y H:i:s')
                : null,
        ];
    }
}
