<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ComportamentoPassivoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'cpp_id_cpp','cpp_descricao','cpp_local','cpp_created_at','cpp_updated_at','cpp_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cpp_id_cpp' => $this->cpp_id_fer,
               'cpp_descricao' => $this->cpp_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cpp_id_cpp' => $this->cpp_id_cpp,
                'cpp_descricao' => $this->cpp_descricao,
                'cpp_local' => $this->cpp_local,
                'cpp_ativo' => false,
                'cpp_exclui' => false,
                'cpp_loadexclui' => false,
                'cpp_created_at' => Carbon::parse($this->cpp_created_at)->format('d/m/Y H:i:s'),
                'cpp_updated_at' => $this->cpp_updated_at != null ? Carbon::parse($this->cpp_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cpp_id_cpp' => $this->cpp_id_cpp,
                'cpp_descricao' => $this->cpp_descricao,
                'cpp_local' => $this->cpp_local,
                'cpp_created_at' => Carbon::parse($this->cpp_created_at)->format('d/m/Y H:i:s'),
                'cpp_updated_at' => $this->cpp_updated_at != null ? Carbon::parse($this->cpp_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
