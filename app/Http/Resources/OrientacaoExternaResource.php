<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class OrientacaoExternaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'ori_id_ori','ori_descricao','ori_local','ori_created_at','ori_updated_at','ori_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'ori_id_ori' => $this->ori_id_fer,
               'ori_descricao' => $this->ori_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ori_id_ori' => $this->ori_id_ori,
                'ori_descricao' => $this->ori_descricao,
                'ori_local' => $this->ori_local,
                'ori_ativo' => false,
                'ori_created_at' => Carbon::parse($this->ori_created_at)->format('d/m/Y H:i:s'),
                'ori_updated_at' => $this->ori_updated_at != null ? Carbon::parse($this->ori_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'ori_id_ori' => $this->ori_id_ori,
                'ori_descricao' => $this->ori_descricao,
                'ori_local' => $this->ori_local,
                'ori_created_at' => Carbon::parse($this->ori_created_at)->format('d/m/Y H:i:s'),
                'ori_updated_at' => $this->ori_updated_at != null ? Carbon::parse($this->ori_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
