<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CondicoesRelatadaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'cor_id_cor','cor_descricao','cor_local','cor_created_at','cor_updated_at','cor_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cor_id_cor' => $this->cor_id_fer,
               'cor_descricao' => $this->cor_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cor_id_cor' => $this->cor_id_cor,
                'cor_descricao' => $this->cor_descricao,
                'cor_local' => $this->cor_local,
                'cor_ativo' => false,
                'cor_created_at' => Carbon::parse($this->cor_created_at)->format('d/m/Y H:i:s'),
                'cor_updated_at' => $this->cor_updated_at != null ? Carbon::parse($this->cor_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cor_id_cor' => $this->cor_id_cor,
                'cor_descricao' => $this->cor_descricao,
                'cor_local' => $this->cor_local,
                'cor_created_at' => Carbon::parse($this->cor_created_at)->format('d/m/Y H:i:s'),
                'cor_updated_at' => $this->cor_updated_at != null ? Carbon::parse($this->cor_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
