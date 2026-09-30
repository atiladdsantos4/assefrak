<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class StatusTratamentoResource extends JsonResource
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
               'stt_id_stt' => $this->stt_id_fer,
               'stt_descricao' => $this->stt_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'stt_id_stt' => $this->stt_id_stt,
                'stt_descricao' => $this->stt_descricao,
                'stt_ativo' => $this->stt_ativo,
                'stt_created_at' => Carbon::parse($this->stt_created_at)->format('d/m/Y H:i:s'),
                'stt_updated_at' => $this->stt_updated_at != null ? Carbon::parse($this->stt_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'stt_id_stt' => $this->stt_id_stt,
                'stt_descricao' => $this->stt_descricao,
                'stt_created_at' => Carbon::parse($this->stt_created_at)->format('d/m/Y H:i:s'),
                'stt_updated_at' => $this->stt_updated_at != null ? Carbon::parse($this->stt_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
