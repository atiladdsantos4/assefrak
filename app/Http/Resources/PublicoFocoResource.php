<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PublicoFocoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'puf_id_puf','puf_descricao','puf_local','puf_created_at','puf_updated_at','puf_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'puf_id_puf' => $this->puf_id_fer,
               'puf_descricao' => $this->puf_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'puf_id_puf' => $this->puf_id_puf,
                'puf_descricao' => $this->puf_descricao,
                'puf_created_at' => Carbon::parse($this->puf_created_at)->format('d/m/Y H:i:s'),
                'puf_updated_at' => $this->puf_updated_at != null ? Carbon::parse($this->puf_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'puf_id_puf' => $this->puf_id_puf,
                'puf_descricao' => $this->puf_descricao,
                'puf_created_at' => Carbon::parse($this->puf_created_at)->format('d/m/Y H:i:s'),
                'puf_updated_at' => $this->puf_updated_at != null ? Carbon::parse($this->puf_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
