<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class OcupacaoResource extends JsonResource
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
               'ocu_id_ocu' => $this->ocu_id_fer,
               'ocu_descricao' => $this->ocu_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ocu_id_ocu' => $this->ocu_id_ocu,
                'ocu_descricao' => $this->ocu_descricao,
                'ocu_created_at' => Carbon::parse($this->ocu_created_at)->format('d/m/Y H:i:s'),
                'ocu_updated_at' => $this->ocu_updated_at != null ? Carbon::parse($this->ocu_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'ocu_id_ocu' => $this->ocu_id_ocu,
                'ocu_descricao' => $this->ocu_descricao,
                'ocu_created_at' => Carbon::parse($this->ocu_created_at)->format('d/m/Y H:i:s'),
                'ocu_updated_at' => $this->ocu_updated_at != null ? Carbon::parse($this->ocu_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
