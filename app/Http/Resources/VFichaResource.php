<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class VFichaResource extends JsonResource
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
                'total'=>$this->total
            ];

        } else if( $request->has('listagem') ){
            $data = [
                'seq_id' => $this->seq_id,
                'descricao' => $this->descricao,
                'option' => $this->option,
                'fie_id_fie' => $this->fie_id_fie,
                'fie_id_aco' => $this->fie_id_aco,
                'fie_id_col' => $this->fie_id_col,
                'id' => $this->id,
                'fie_ano' => $this->ano,
                'fie_mes' => $this->mes,
                'descricao_item' => $this->descricao_item,
                'ativo' => $this->ativo,
                'ficha' => $this->ficha,
                'acolhido' => $this->acolhido,
                'vfi_exclui' => false,
                'vfi_loadexclui' => false,
            ];

        } else {
            $data = [
                'seq_id' => $this->seq_id,
                'descricao' => $this->descricao,
                'option' => $this->option,
                'fie_id_fie' => $this->fie_id_fie,
                'fie_id_aco' => $this->fie_id_aco,
                'fie_id_col' => $this->fie_id_col,
                'id' => $this->id,
                'descricao_item' => $this->descricao_item,
                'ativo' => $this->ativo,
                'fie_ano' => $this->ano,
                'fie_mes' => $this->mes,
            ];
        }

        return $data;
    }
}
