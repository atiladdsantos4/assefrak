<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TipoOcorrenciaResource extends JsonResource
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
               'top_id_top' => $this->top_id_fer,
               'top_descricao' => $this->top_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'top_id_top' => $this->top_id_top,
                'top_descricao' => $this->top_descricao,
                'top_ativo' => $this->top_ativo,
                'top_created_at' => Carbon::parse($this->top_created_at)->format('d/m/Y H:i:s'),
                'top_updated_at' => $this->top_updated_at != null ? Carbon::parse($this->top_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'top_id_top' => $this->top_id_top,
                'top_descricao' => $this->top_descricao,
                'top_created_at' => Carbon::parse($this->top_created_at)->format('d/m/Y H:i:s'),
                'top_updated_at' => $this->top_updated_at != null ? Carbon::parse($this->top_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
