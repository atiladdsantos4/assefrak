<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class VTratamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('filtro')){
            $data = [
                'id' => $this->id,
                'descricao' => $this->descricao_item,
                'option' => $this->descricao,
                'total' => $this->total
            ];

        } else if( $request->has('listagem') ){
            $data = [
                'seq_id' => $this->seq_id,
                'descricao' => $this->descricao,
                'option' => $this->option,
                'tra_id_tra' => $this->tra_id_tra,
                'tra_id_aco' => $this->tra_id_aco,
                'tra_id_col' => $this->tra_id_col,
                'tra_id_tit' => $this->tra_id_tit,
                'tra_id_stt' => $this->tra_id_stt,
                'tra_ano' => $this->ano,
                'tra_mes' => $this->mes,
                'id' => $this->id,
                'descricao_item' => $this->descricao_item,
                'tra_exclui' => false,
                'tra_loadexclui' => false,
            ];

        } else {
            $data = [
                'seq_id' => $this->seq_id,
                'descricao' => $this->descricao,
                'option' => $this->option,
                'tra_id_tra' => $this->tra_id_tra,
                'tra_id_aco' => $this->tra_id_aco,
                'tra_id_col' => $this->tra_id_col,
                'tra_id_tit' => $this->tra_id_tit,
                'tra_id_stt' => $this->tra_id_stt,
                'tra_ano' => $this->ano,
                'tra_mes' => $this->mes,
                'id' => $this->id,
                'descricao_item' => $this->descricao_item,
            ];
        }

        return $data;
    }
}
