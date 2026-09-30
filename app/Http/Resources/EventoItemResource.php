<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EventoItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'evi_id_evi','evi_id_evi','evi_tipo_informacao','evi_dados_inf','evi_created_at','evi_updated_at','evi_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'evi_id_evi' => $this->evi_id_fer,
               'evi_descricao' => $this->evi_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
               'evi_id_evi' => $this->evi_id_evi,
               'evi_id_eve' => $this->evi_id_eve,
               'evi_tipo_informacao' => $this->evi_tipo_informacao,
               'evi_dados_inf' => $this->evi_dados_inf,
               'evi_created_at' => Carbon::parse($this->evi_created_at)->format('d/m/Y H:i:s'),
               'evi_updated_at' => $this->evi_updated_at != null ? Carbon::parse($this->evi_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
               'evi_id_evi' => $this->evi_id_evi,
               'evi_id_eve' => $this->evi_id_eve,
               'evi_tipo_informacao' => $this->evi_tipo_informacao,
               'evi_dados_inf' => $this->evi_dados_inf,
               'evi_created_at' => Carbon::parse($this->evi_created_at)->format('d/m/Y H:i:s'),
               'evi_updated_at' => $this->evi_updated_at != null ? Carbon::parse($this->evi_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
