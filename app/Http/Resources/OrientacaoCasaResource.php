<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class OrientacaoCasaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'orc_id_orc','orc_descricao','orc_local','orc_created_at','orc_updated_at','orc_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'orc_id_orc' => $this->orc_id_fer,
               'orc_descricao' => $this->orc_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'orc_id_orc' => $this->orc_id_orc,
                'orc_descricao' => $this->orc_descricao,
                'orc_local' => $this->orc_local,
                'orc_ativo' => false,
                'orc_created_at' => Carbon::parse($this->orc_created_at)->format('d/m/Y H:i:s'),
                'orc_updated_at' => $this->orc_updated_at != null ? Carbon::parse($this->orc_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'orc_id_orc' => $this->orc_id_orc,
                'orc_descricao' => $this->orc_descricao,
                'orc_local' => $this->orc_local,
                'orc_created_at' => Carbon::parse($this->orc_created_at)->format('d/m/Y H:i:s'),
                'orc_updated_at' => $this->orc_updated_at != null ? Carbon::parse($this->orc_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
