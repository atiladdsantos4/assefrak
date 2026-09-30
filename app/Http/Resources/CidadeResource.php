<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CidadeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * //cid_id_cid,cid_id_cid,cid_ibge,cid_descricao,cid_created_at,cid_updated_at,cid_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cid_id_cid' => $this->cid_id_fer,
               'cid_descricao' => $this->cid_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cid_id_cid' => $this->cid_id_cid,
                'cid_id_est' => $this->cid_id_est,
                'cid_ibge' => $this->cid_ibge,
                'cid_descricao' => $this->cid_descricao,
                'cid_created_at' => Carbon::parse($this->cid_created_at)->format('d/m/Y H:i:s'),
                'cid_updated_at' => $this->cid_updated_at != null ? Carbon::parse($this->cid_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cid_id_cid' => $this->cid_id_cid,
                'cid_id_est' => $this->cid_id_est,
                'cid_ibge' => $this->cid_ibge,
                'cid_descricao' => $this->cid_descricao,
                'cid_created_at' => Carbon::parse($this->cid_created_at)->format('d/m/Y H:i:s'),
                'cid_updated_at' => $this->cid_updated_at != null ? Carbon::parse($this->cid_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
