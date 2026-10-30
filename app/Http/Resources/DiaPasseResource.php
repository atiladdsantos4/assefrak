<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class DiaPasseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'dip_id_dip','dip_descricao','dip_local','dip_created_at','dip_updated_at','dip_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'dip_id_dip' => $this->dip_id_fer,
               'dip_descricao' => $this->dip_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'dip_id_dip' => $this->dip_id_dip,
                'dip_descricao' => $this->dip_descricao,
                'dip_local' => $this->dip_local,
                'dip_ativo' => false,
                'dip_created_at' => Carbon::parse($this->dip_created_at)->format('d/m/Y H:i:s'),
                'dip_updated_at' => $this->dip_updated_at != null ? Carbon::parse($this->dip_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'dip_id_dip' => $this->dip_id_dip,
                'dip_descricao' => $this->dip_descricao,
                'dip_local' => $this->dip_local,
                'dip_created_at' => Carbon::parse($this->dip_created_at)->format('d/m/Y H:i:s'),
                'dip_updated_at' => $this->dip_updated_at != null ? Carbon::parse($this->dip_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
