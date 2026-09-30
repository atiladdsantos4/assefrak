<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ControlePasseResource extends JsonResource
{
     //cop_id_tra,cop_id_col,cop_data_prevista,cop_concluido,cop_created_at,cop_updated_at
    /**
     * Transform the resource into an array.
     * 
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cop_id_cop' => $this->cop_id_fer,
               'cop_descricao' => $this->cop_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cop_id_cop' => $this->cop_id_cop,
                'cop_id_tra' => $this->cop_id_tra,
                'cop_tratamento' => $this->tratamento->tipotratamento->tit_descricao,
                'cop_id_col' => $this->cop_id_col,
                'cop_colaborador' => $this->colaborador->col_name,
                'cop_data_prevista' => Carbon::parse($this->cop_data_prevista)->format('d/m/Y'),
                'cop_data_prevista_form' => Carbon::parse($this->cop_data_prevista)->format('Y-m-d H:i:s'),
                'cop_data_atendimento' => $this->cop_data_atendimento != null ? Carbon::parse($this->cop_data_atendimento)->format('d/m/Y') : null,
                'cop_data_atendimento_form' => $this->cop_data_atendimento != null ? Carbon::parse($this->cop_data_atendimento)->format('Y-m-d H:i:s') : null,
                'cop_concluido' => $this->cop_concluido,
                'cop_load' => false,
                'cop_created_at' => Carbon::parse($this->cop_created_at)->format('d/m/Y H:i:s'),
                'cop_updated_at' => $this->cop_updated_at != null ? Carbon::parse($this->cop_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cop_id_cop' => $this->cop_id_cop,
                'cop_id_tra' => $this->cop_id_tra,
                'cop_tratamento' => $this->tratamento->tipotratamento->tit_descricao,
                'cop_id_col' => $this->cop_id_col,
                'cop_colaborador' => $this->colaborador->col_name,
                'cop_data_prevista' => $this->cop_data_prevista,
                'cop_concluido' => $this->cop_concluido,
                'cop_created_at' => Carbon::parse($this->cop_created_at)->format('d/m/Y H:i:s'),
                'cop_updated_at' => $this->cop_updated_at != null ? Carbon::parse($this->cop_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
