<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class GravidadeClinicaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'gac_id_gac','gac_descricao','gac_local','gac_created_at','gac_updated_at','gac_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'gac_id_gac' => $this->gac_id_fer,
               'gac_descricao' => $this->gac_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'gac_id_gac' => $this->gac_id_gac,
                'gac_descricao' => $this->gac_descricao,
                'gac_local' => $this->gac_local,
                'gac_ativo' => false,
                'gac_exclui' => false,
                'gac_loadexclui' => false,
                'gac_created_at' => Carbon::parse($this->gac_created_at)->format('d/m/Y H:i:s'),
                'gac_updated_at' => $this->gac_updated_at != null ? Carbon::parse($this->gac_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'gac_id_gac' => $this->gac_id_gac,
                'gac_descricao' => $this->gac_descricao,
                'gac_local' => $this->gac_local,
                'gac_created_at' => Carbon::parse($this->gac_created_at)->format('d/m/Y H:i:s'),
                'gac_updated_at' => $this->gac_updated_at != null ? Carbon::parse($this->gac_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
