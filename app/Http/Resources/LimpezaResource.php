<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LimpezaResource extends JsonResource
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
               'lim_id_lim' => $this->lim_id_fer,
               'lim_descricao' => $this->lim_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'lim_id_lim' => $this->lim_id_lim,
                'lim_descricao' => $this->lim_descricao,
                'lim_ativo' => $this->lim_ativo,
                'lim_created_at' => Carbon::parse($this->lim_created_at)->format('d/m/Y H:i:s'),
                'lim_updated_at' => $this->lim_updated_at != null ? Carbon::parse($this->lim_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'lim_id_lim' => $this->lim_id_lim,
                'lim_descricao' => $this->lim_descricao,
                'lim_created_at' => Carbon::parse($this->lim_created_at)->format('d/m/Y H:i:s'),
                'lim_updated_at' => $this->lim_updated_at != null ? Carbon::parse($this->lim_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
