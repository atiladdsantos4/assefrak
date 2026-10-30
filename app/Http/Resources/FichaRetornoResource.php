<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FichaRetornoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * fir_id_fir,fir_id_fie,fir_id_col,fir_sequencia,fir_observacao,fir_data_retorno,fir_created_at,fir_updated_at,fir_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'fir_id_fir' => $this->fir_id_fer,
               'fir_descricao' => $this->fir_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'fir_id_fir' => $this->fir_id_fir,
                'fir_id_fie' => $this->fir_id_fie,
                'fir_id_col' => $this->fir_id_col,
                'fir_colaborador' => $this->colaborador->col_name,
                'fir_sequencia' => $this->fir_sequencia,
                'fir_observacao' => $this->fir_observacao,
                'fir_data_retorno' => Carbon::parse($this->fir_data_retorno,'d/m/Y'),
                'fir_data_retorno_format' => Carbon::parse($this->fir_data_retorno)->format('Y/m/d'),
                'fir_ativo' => false,
                'fir_created_at' => Carbon::parse($this->fir_created_at)->format('d/m/Y H:i:s'),
                'fir_updated_at' => $this->fir_updated_at != null ? Carbon::parse($this->fir_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'fir_id_fir' => $this->fir_id_fir,
                'fir_id_fie' => $this->fir_id_fie,
                'fir_id_col' => $this->fir_id_col,
                'fir_colaborador' => $this->colaborador->col_name,
                'fir_sequencia' => $this->fir_sequencia,
                'fir_observacao' => $this->fir_observacao,
                'fir_data_retorno' => Carbon::parse($this->fir_data_retorno,'d/m/Y'),
                'fir_data_retorno_format' => Carbon::parse($this->fir_data_retorno)->format('Y/m/d'),
                'fir_ativo' => false,
                'fir_created_at' => Carbon::parse($this->fir_created_at)->format('d/m/Y H:i:s'),
                'fir_updated_at' => $this->fir_updated_at != null ? Carbon::parse($this->fir_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
