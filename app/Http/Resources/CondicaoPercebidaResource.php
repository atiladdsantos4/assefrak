<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CondicaoPercebidaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'per_id_per','per_descricao','per_local','per_created_at','per_updated_at','per_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'per_id_per' => $this->per_id_fer,
               'per_descricao' => $this->per_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'per_id_per' => $this->per_id_per,
                'per_descricao' => $this->per_descricao,
                'per_local' => $this->per_local,
                'per_ativo' => false,
                'per_created_at' => Carbon::parse($this->per_created_at)->format('d/m/Y H:i:s'),
                'per_updated_at' => $this->per_updated_at != null ? Carbon::parse($this->per_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'per_id_per' => $this->per_id_per,
                'per_descricao' => $this->per_descricao,
                'per_local' => $this->per_local,
                'per_created_at' => Carbon::parse($this->per_created_at)->format('d/m/Y H:i:s'),
                'per_updated_at' => $this->per_updated_at != null ? Carbon::parse($this->per_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
