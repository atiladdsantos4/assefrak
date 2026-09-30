<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EditoraResource extends JsonResource
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
               'edi_id_edi' => $this->edi_id_fer,
               'edi_descricao' => $this->edi_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'edi_id_edi' => $this->edi_id_edi,
                'edi_descricao' => $this->edi_descricao,
                'edi_ativo' => $this->edi_ativo,
                'edi_created_at' => Carbon::parse($this->edi_created_at)->format('d/m/Y H:i:s'),
                'edi_updated_at' => $this->edi_updated_at != null ? Carbon::parse($this->edi_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'edi_id_edi' => $this->edi_id_edi,
                'edi_descricao' => $this->edi_descricao,
                'edi_created_at' => Carbon::parse($this->edi_created_at)->format('d/m/Y H:i:s'),
                'edi_updated_at' => $this->edi_updated_at != null ? Carbon::parse($this->edi_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
