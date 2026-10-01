<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class DepartamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *  'dep_id_dep','dep_descricao','dep_email','dep_ativo','dep_created_at','dep_updated_at','dep_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'dep_id_dep' => $this->dep_id_fer,
               'dep_descricao' => $this->dep_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'dep_id_dep' => $this->dep_id_dep,
                'dep_descricao' => $this->dep_descricao,
                'dep_email' => $this->dep_email,
                'dep_ativo' => $this->dep_ativo,
                'dep_load' => false,
                'dep_created_at' => Carbon::parse($this->dep_created_at)->format('d/m/Y H:i:s'),
                'dep_updated_at' => $this->dep_updated_at != null ? Carbon::parse($this->dep_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'dep_id_dep' => $this->dep_id_dep,
                'dep_descricao' => $this->dep_descricao,
                'dep_email' => $this->dep_email,
                'dep_ativo' => $this->dep_ativo,
                'dep_load' => false,
                'dep_created_at' => Carbon::parse($this->dep_created_at)->format('d/m/Y H:i:s'),
                'dep_updated_at' => $this->dep_updated_at != null ? Carbon::parse($this->dep_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
