<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ComportamentoReativoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'cpr_id_cpr','cpr_descricao','cpr_local','cpr_created_at','cpr_updated_at','cpr_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cpr_id_cpr' => $this->cpr_id_fer,
               'cpr_descricao' => $this->cpr_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cpr_id_cpr' => $this->cpr_id_cpr,
                'cpr_descricao' => $this->cpr_descricao,
                'cpr_local' => $this->cpr_local,
                'cpr_ativo' => false,
                'cpr_created_at' => Carbon::parse($this->cpr_created_at)->format('d/m/Y H:i:s'),
                'cpr_updated_at' => $this->cpr_updated_at != null ? Carbon::parse($this->cpr_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cpr_id_cpr' => $this->cpr_id_cpr,
                'cpr_descricao' => $this->cpr_descricao,
                'cpr_local' => $this->cpr_local,
                'cpr_created_at' => Carbon::parse($this->cpr_created_at)->format('d/m/Y H:i:s'),
                'cpr_updated_at' => $this->cpr_updated_at != null ? Carbon::parse($this->cpr_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
