<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CondicaoEnergeticaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'coe_id_coe' => $this->coe_id_fer,
               'coe_descricao' => $this->coe_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'coe_id_coe' => $this->coe_id_coe,
                'coe_descricao' => $this->coe_descricao,
                'coe_ativo' => false,
                'coe_created_at' => Carbon::parse($this->coe_created_at)->format('d/m/Y H:i:s'),
                'coe_updated_at' => $this->coe_updated_at != null ? Carbon::parse($this->coe_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'coe_id_coe' => $this->coe_id_coe,
                'coe_descricao' => $this->coe_descricao,
                'coe_created_at' => Carbon::parse($this->coe_created_at)->format('d/m/Y H:i:s'),
                'coe_updated_at' => $this->coe_updated_at != null ? Carbon::parse($this->coe_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
