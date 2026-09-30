<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PrecoLivroResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *prl_id_prl,prl_id_liv,prl_data_vigor,prl_max_desconto,prl_valor_desconto,prl_valor,prl_valor_atual,prl_created_at,prl_updated_at,prl_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'prl_id_prl' => $this->prl_id_fer,
               'prl_descricao' => $this->prl_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'prl_id_prl' => $this->prl_id_prl,
                'prl_id_liv' => $this->prl_id_liv,
                'prl_livro' => $this->livro,
                'prl_data_vigor' => Carbon::parse($this->prl_data_vigor)->format('d/m/Y'),
                'prl_max_desconto'=> $this->prl_max_desconto,
                'prl_valor_desconto'=> $this->prl_valor_desconto,
                'prl_valor'=> $this->prl_valor,
                'prl_valor_atual' => $this->prl_valor_atual,
                'prl_qrcode' => $this->qrcode != null ? $this->qrcode->lip_id_lip : null,
                'prl_load' => false,
                'prl_created_at' => Carbon::parse($this->prl_created_at)->format('d/m/Y H:i:s'),
                'prl_vigor_format'=> Carbon::parse($this->prl_data_vigor)->format('Y-m-d H:i:s'),
                'prl_updated_at' => $this->prl_updated_at != null ? Carbon::parse($this->prl_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'prl_id_prl' => $this->prl_id_prl,
                'prl_id_liv' => $this->prl_id_liv,
                'prl_livro' => $this->livro->liv_titulo,
                'prl_data_vigor' => Carbon::parse($this->prl_data_vigor)->format('d/m/Y'),
                'prl_max_desconto'=> $this->prl_max_desconto,
                'prl_valor_desconto'=> $this->prl_valor_desconto,
                'prl_valor'=> $this->prl_valor,
                'prl_valor_atual' => $this->prl_valor_atual,
                'prl_qrcode' => $this->qrcode != null ? $this->qrcode->lip_id_lip : null,
                'prl_copia' => $this->qrcode != null ? $this->qrcode->lip_copy_qrcode : null,
                'prl_created_at' => Carbon::parse($this->prl_created_at)->format('d/m/Y H:i:s'),
                'prl_updated_at' => $this->prl_updated_at != null ? Carbon::parse($this->prl_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
