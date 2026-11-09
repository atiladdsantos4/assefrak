<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FaixaIdadeResource extends JsonResource
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
               'fai_id_fai' => $this->fai_id_fer,
               'fai_descricao' => $this->fai_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'fai_id_fai' => $this->fai_id_fai,
                'fai_descricao' => $this->fai_descricao,
                'fai_ativo' => $this->fai_ativo,
                'fai_exclui' => false,
                'fai_loadexclui' => false,
                'fai_created_at' => Carbon::parse($this->fai_created_at)->format('d/m/Y H:i:s'),
                'fai_updated_at' => $this->fai_updated_at != null ? Carbon::parse($this->fai_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'fai_id_fai' => $this->fai_id_fai,
                'fai_descricao' => $this->fai_descricao,
                'fai_created_at' => Carbon::parse($this->fai_created_at)->format('d/m/Y H:i:s'),
                'fai_updated_at' => $this->fai_updated_at != null ? Carbon::parse($this->fai_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
