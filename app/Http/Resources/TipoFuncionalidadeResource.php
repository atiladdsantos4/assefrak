<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TipoFuncionalidadeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * tfu_id_tfu,tfu_descricao,tfu_created_at,tfu_updated_at,tfu_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =  [
                'tfu_id_tfu' => $this->tfu_id_tfu,
                'tfu_descricao' => $this->tfu_descricao,
                'tfu_exclui' => false,
                'tfu_loadexclui' => false,
                'tfu_created_at' => Carbon::parse($this->tfu_created_at)->format('d/m/Y H:i:s'),
                'tfu_updated_at' => $this->tfu_updated_at != null ? Carbon::parse($this->tfu_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'tfu_id_tfu' => $this->tfu_id_tfu,
                'tfu_descricao' => $this->tfu_descricao,
                'tfu_created_at' => Carbon::parse($this->tfu_created_at)->format('d/m/Y H:i:s'),
                'tfu_updated_at' => $this->tfu_updated_at != null ? Carbon::parse($this->tfu_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
