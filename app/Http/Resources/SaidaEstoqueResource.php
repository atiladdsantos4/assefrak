<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class SaidaEstoqueResource extends JsonResource
{
    //'sae_id_sae','sae_id_ene','sae_qtde','sae_valor_unit','sae_valor_total','qtde_saida','sae_confirmado','sae_created_at','sae_updated_at','sae_deleted_at'
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'sae_id_sae' => $this->sae_id_fer,
               'sae_descricao' => $this->sae_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'sae_id_sae' => $this->sae_id_sae,
                'sae_id_ene' => $this->sae_id_ene,
                'sae_livro' => $this->entrada->livro->liv_titulo,
                'sae_autor' => $this->entrada->livro->autor->aut_nome,
                'sae_qtde_saida' => $this->sae_qtde_saida,
                'sae_valor_unit' => $this->sae_valor_unit,
                'sae_valor_total' => $this->sae_valor_total,
                'sae_confirmado' => $this->sae_confirmado,
                'sae_cancelado'  => $this->sae_cancelado,
                'sae_hash' => $this->sae_hash,
                'sae_load'  => false,
                'sae_created_at' => Carbon::parse($this->sae_created_at)->format('d/m/Y H:i:s'),
                'sae_updated_at' => $this->sae_updated_at != null ? Carbon::parse($this->sae_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'sae_id_sae' => $this->sae_id_sae,
                'sae_id_ene' => $this->sae_id_ene,
                'sae_livro' => $this->entrada->livro->liv_titulo,
                'sae_autor' => $this->entrada->livro->autor->aut_nome,
                'sae_qtde_saida' => $this->sae_qtde_saida,
                'sae_valor_unit' => $this->sae_valor_unit,
                'sae_valor_total' => $this->sae_valor_total,
                'sae_confirmado' => $this->sae_confirmado,
                'sae_hash' => $this->sae_hash,
                'sae_cancelado'  => $this->sae_cancelado,
                'sae_created_at' => Carbon::parse($this->sae_created_at)->format('d/m/Y H:i:s'),
                'sae_updated_at' => $this->sae_updated_at != null ? Carbon::parse($this->sae_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
