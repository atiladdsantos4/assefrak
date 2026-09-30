<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CategoriaEventoResource extends JsonResource
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
               'cae_id_cae' => $this->cae_id_fer,
               'cae_descricao' => $this->cae_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cae_id_cae' => $this->cae_id_cae,
                'cae_descricao' => $this->cae_descricao,
                'cae_ativo' => $this->cae_ativo,
                'cae_created_at' => Carbon::parse($this->cae_created_at)->format('d/m/Y H:i:s'),
                'cae_updated_at' => $this->cae_updated_at != null ? Carbon::parse($this->cae_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cae_id_cae' => $this->cae_id_cae,
                'cae_descricao' => $this->cae_descricao,
                'cae_created_at' => Carbon::parse($this->cae_created_at)->format('d/m/Y H:i:s'),
                'cae_updated_at' => $this->cae_updated_at != null ? Carbon::parse($this->cae_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
