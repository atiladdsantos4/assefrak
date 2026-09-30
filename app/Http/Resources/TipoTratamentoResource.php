<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TipoTratamentoResource extends JsonResource
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
               'tit_id_tit' => $this->tit_id_fer,
               'tit_descricao' => $this->tit_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'tit_id_tit' => $this->tit_id_tit,
                'tit_descricao' => $this->tit_descricao,
                'tit_qtde_semana' => $this->tit_qtde_semana,
                'tit_created_at' => Carbon::parse($this->tit_created_at)->format('d/m/Y H:i:s'),
                'tit_updated_at' => $this->tit_updated_at != null ? Carbon::parse($this->tit_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'tit_id_tit' => $this->tit_id_tit,
                'tit_descricao' => $this->tit_descricao,
                'tit_qtde_semana' => $this->tit_qtde_semana,
                'tit_created_at' => Carbon::parse($this->tit_created_at)->format('d/m/Y H:i:s'),
                'tit_updated_at' => $this->tit_updated_at != null ? Carbon::parse($this->tit_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
