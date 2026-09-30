<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FortalecimentoResource extends JsonResource
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
               'for_id_for' => $this->for_id_fer,
               'for_descricao' => $this->for_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'for_id_for' => $this->for_id_for,
                'for_descricao' => $this->for_descricao,
                'for_ativo' => false,
                'for_created_at' => Carbon::parse($this->for_created_at)->format('d/m/Y H:i:s'),
                'for_updated_at' => $this->for_updated_at != null ? Carbon::parse($this->for_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'for_id_for' => $this->for_id_for,
                'for_descricao' => $this->for_descricao,
                'for_created_at' => Carbon::parse($this->for_created_at)->format('d/m/Y H:i:s'),
                'for_updated_at' => $this->for_updated_at != null ? Carbon::parse($this->for_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
