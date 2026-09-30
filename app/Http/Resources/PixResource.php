<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class PixResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     * pix_id_pix,pix_tipo,pix_chave,pix_nome_fantasia,pix_cidade,pix_id_ban,pix_ativo,pix_atual,pix_created_at,pix_updated_at,pix_deleted_at
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
           $data =  [
                'pix_id_pix' => $this->pix_id_pix,
                'pix_tipo' => $this->pix_tipo,
                'pix_chave' => $this->pix_chave,
                'pix_nome_fantasia' => $this->pix_nome_fantasia,
                'pix_id_ban' => $this->pix_id_ban,
                'pix_banco' => $this->banco->ban_nome,
                'pix_cidade' => $this->pix_cidade,
                'pix_ativo' => $this->pix_ativo,
                'pix_atual' => $this->pix_atual,
                'pix_load' => false,
                'pix_ativo_load' => false,
                'pix_created_at' => Carbon::parse($this->pix_created_at)->format('d/m/Y H:i:s'),
                'pix_updated_at' => $this->pix_updated_at != null ? Carbon::parse($this->pix_updated_at)->format('d/m/Y H:i:s') : null,
           ];
         }  else if($request->has('filtro')){
          $data =  [
                'pix_id_ban' => $this->pix_id_ban,
                'pix_nome' => $this->pix_nome,
                'pix_sigla' => $this->pix_sigla,
          ];
         } else {
            $data =  [
                'pix_id_pix' => $this->pix_id_pix,
                'pix_tipo' => $this->pix_tipo,
                'pix_chave' => $this->pix_chave,
                'pix_nome_fantasia' => $this->pix_nome_fantasia,
                'pix_id_ban' => $this->pix_id_ban,
                'pix_banco' => $this->banco->ban_nome,
                'pix_cidade' => $this->pix_cidade,
                'pix_ativo' => $this->pix_ativo,
                'pix_atual' => $this->pix_atual,
                'pix_load' => false,
                'pix_created_at' => Carbon::parse($this->pix_created_at)->format('d/m/Y H:i:s'),
                'pix_updated_at' => $this->pix_updated_at != null ? Carbon::parse($this->pix_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}

