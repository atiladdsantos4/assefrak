<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CategoriaVideoResource extends JsonResource
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
               'cav_id_cav' => $this->cav_id_fer,
               'cav_descricao' => $this->cav_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cav_id_cav' => $this->cav_id_cav,
                'cav_descricao' => $this->cav_descricao,
                'cav_ativo' => $this->cav_ativo,
                'cav_qtde_videos' => count($this->videos),
                'cav_created_at' => Carbon::parse($this->cav_created_at)->format('d/m/Y H:i:s'),
                'cav_updated_at' => $this->cav_updated_at != null ? Carbon::parse($this->cav_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cav_id_cav' => $this->cav_id_cav,
                'cav_descricao' => $this->cav_descricao,
                'cav_created_at' => Carbon::parse($this->cav_created_at)->format('d/m/Y H:i:s'),
                'cav_updated_at' => $this->cav_updated_at != null ? Carbon::parse($this->cav_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
