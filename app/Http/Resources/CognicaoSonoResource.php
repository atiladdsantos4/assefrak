<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CognicaoSonoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'cos_id_cos','cos_descricao','cos_local','cos_created_at','cos_updated_at','cos_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cos_id_cos' => $this->cos_id_fer,
               'cos_descricao' => $this->cos_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cos_id_cos' => $this->cos_id_cos,
                'cos_descricao' => $this->cos_descricao,
                'cos_local' => $this->cos_local,
                'cos_ativo' => false,
                'cos_created_at' => Carbon::parse($this->cos_created_at)->format('d/m/Y H:i:s'),
                'cos_updated_at' => $this->cos_updated_at != null ? Carbon::parse($this->cos_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cos_id_cos' => $this->cos_id_cos,
                'cos_descricao' => $this->cos_descricao,
                'cos_local' => $this->cos_local,
                'cos_created_at' => Carbon::parse($this->cos_created_at)->format('d/m/Y H:i:s'),
                'cos_updated_at' => $this->cos_updated_at != null ? Carbon::parse($this->cos_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
