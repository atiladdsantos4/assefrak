<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PasseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'pas_id_pas','pas_descricao','pas_local','pas_created_at','pas_updated_at','pas_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'pas_id_pas' => $this->pas_id_fer,
               'pas_descricao' => $this->pas_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'pas_id_pas' => $this->pas_id_pas,
                'pas_descricao' => $this->pas_descricao,
                'pas_local' => $this->pas_local,
                'pas_ativo' => false,
                'pas_created_at' => Carbon::parse($this->pas_created_at)->format('d/m/Y H:i:s'),
                'pas_updated_at' => $this->pas_updated_at != null ? Carbon::parse($this->pas_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'pas_id_pas' => $this->pas_id_pas,
                'pas_descricao' => $this->pas_descricao,
                'pas_local' => $this->pas_local,
                'pas_created_at' => Carbon::parse($this->pas_created_at)->format('d/m/Y H:i:s'),
                'pas_updated_at' => $this->pas_updated_at != null ? Carbon::parse($this->pas_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
