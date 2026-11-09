<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FichaEntrevistaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'fie_id_fie' => $this->fie_id_fie,
               'fie_descricao' => $this->fie_descricao
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'fie_id_fie' => $this->fie_id_fie,
                'fie_id_aco' => $this->fie_id_aco,
                'fie_acolhido' => $this->acolhido,
                'fie_id_col' => $this->fie_id_col,
                'fie_colaborador' => $this->colaborador,
                'fie_id_tra' => $this->fie_id_tra,
                'fie_motivo' => $this->fie_motivo,
                'fie_humor' => $this->fie_humor,
                'fie_desc_humor' => $this->fie_desc_humor,
                'fie_reativos' => $this->fie_reativos,
                'fie_desc_reativos' => $this->fie_desc_reativos,
                'fie_passivos' => $this->fie_passivos,
                'fie_desc_passivos' => $this->fie_desc_passivos,
                'fie_sono' => $this->fie_sono,
                'fie_desc_sono' => $this->fie_desc_sono,
                'fie_gravidade' => $this->fie_gravidade,
                'fie_desc_gravidade' => $this->fie_desc_gravidade,
                'fie_percebidas' => $this->fie_percebidas,
                'fie_desc_percebidas' => $this->fie_desc_percebidas,
                'fie_diapasse' => $this->fie_diapasse,
                'fie_orientacoes_casa' => $this->fie_orientacoes_casa,
                'fie_orientacoes_externa' => $this->fie_orientacoes_externa,
                'fie_anotacao' => $this->fie_anotacao,
                'fie_ativo' => $this->fie_ativo,
                'fie_retorno' => $this->fie_retorno,
                'fie_exclui' => false,
                'fie_loadexclui' => false,
                'fie_data' => Carbon::parse($this->fie_created_at)->format('d/m/Y'),
                'fie_created_at' => Carbon::parse($this->fie_created_at)->format('d/m/Y H:i:s'),
                'fie_updated_at' => $this->fie_updated_at != null ? Carbon::parse($this->fie_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
             $data =  [
                'fie_id_fie' => $this->fie_id_fie,
                'fie_id_aco' => $this->fie_id_aco,
                'fie_acolhido' => $this->acolhido,
                'fie_id_col' => $this->fie_id_col,
                'fie_colaborador' => $this->colaborador,
                'fie_id_tra' => $this->fie_id_tra,
                'fie_motivo' => $this->fie_motivo,
                'fie_humor' => $this->fie_humor,
                'fie_desc_humor' => $this->fie_desc_humor,
                'fie_reativos' => $this->fie_reativos,
                'fie_desc_reativos' => $this->fie_desc_reativos,
                'fie_passivos' => $this->fie_passivos,
                'fie_desc_passivos' => $this->fie_desc_passivos,
                'fie_sono' => $this->fie_sono,
                'fie_desc_sono' => $this->fie_desc_sono,
                'fie_gravidade' => $this->fie_gravidade,
                'fie_desc_gravidade' => $this->fie_desc_gravidade,
                'fie_percebidas' => $this->fie_percebidas,
                'fie_desc_percebidas' => $this->fie_desc_percebidas,
                'fie_diapasse' => $this->fie_diapasse,
                'fie_orientacoes_casa' => $this->fie_orientacoes_casa,
                'fie_orientacoes_externa' => $this->fie_orientacoes_externa,
                'fie_anotacao' => $this->fie_anotacao,
                'fie_ativo' => $this->fie_ativo,
                'fie_data' => Carbon::parse($this->fie_created_at)->format('d/m/Y'),
                'fie_retorno' => $this->retorno,
                'fie_created_at' => Carbon::parse($this->fie_created_at)->format('d/m/Y H:i:s'),
                'fie_updated_at' => $this->fie_updated_at != null ? Carbon::parse($this->fie_updated_at)->format('d/m/Y H:i:s') : null,
            ];

        }

         return $data;
    }
}
