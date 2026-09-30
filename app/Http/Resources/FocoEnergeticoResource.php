<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FocoEnergeticoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * foc_id_foc,foc_descricao,foc_created_at,foc_updated_at,foc_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'foc_id_foc' => $this->foc_id_fer,
               'foc_descricao' => $this->foc_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'foc_id_foc' => $this->foc_id_foc,
                'foc_descricao' => $this->foc_descricao,
                'foc_ativo' => false,
                'foc_created_at' => Carbon::parse($this->foc_created_at)->format('d/m/Y H:i:s'),
                'foc_updated_at' => $this->foc_updated_at != null ? Carbon::parse($this->foc_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'foc_id_foc' => $this->foc_id_foc,
                'foc_descricao' => $this->foc_descricao,
                'foc_created_at' => Carbon::parse($this->foc_created_at)->format('d/m/Y H:i:s'),
                'foc_updated_at' => $this->foc_updated_at != null ? Carbon::parse($this->foc_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
