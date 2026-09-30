<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AlertaResource extends JsonResource
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
               'ale_id_ale' => $this->ale_id_fer,
               'ale_descricao' => $this->ale_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ale_id_ale' => $this->ale_id_ale,
                'ale_descricao' => $this->ale_descricao,
                'ale_ativo' => $this->ale_ativo,
                'ale_created_at' => Carbon::parse($this->ale_created_at)->format('d/m/Y H:i:s'),
                'ale_updated_at' => $this->ale_updated_at != null ? Carbon::parse($this->ale_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'ale_id_ale' => $this->ale_id_ale,
                'ale_descricao' => $this->ale_descricao,
                'ale_created_at' => Carbon::parse($this->ale_created_at)->format('d/m/Y H:i:s'),
                'ale_updated_at' => $this->ale_updated_at != null ? Carbon::parse($this->ale_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
