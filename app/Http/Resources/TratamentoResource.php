<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TratamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * //tra_id_tra,tra_id_aco,tra_id_col,tra_id_tit,tra_passe,tra_foco_energetico,tra_cond_energetica,
     * //tra_fortalecimento,tra_limpeza,tra_alerta,tra_pri_impressao,tra_created_at,tra_updated_at,tra_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'tra_id_fer' => $this->tra_id_fer,
               'tra_descricao' => $this->tra_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'tra_id_tra' => $this->tra_id_tra,
                'tra_id_aco' => $this->tra_id_aco,
                'tra_acolhido' => $this->acolhido->aco_name,
                'tra_id_col' => $this->tra_id_col,
                'tra_colaborador' => $this->colaborador->col_name,
                'tra_id_tit' => $this->tra_id_tit,
                'tra_tipo' => $this->tipotratamento->tit_descricao,
                'tra_qtde_tipo' => $this->tipotratamento->tit_qtde_semana,
                'tra_passe' => $this->tra_passe,
                'tra_foco_energetico' => $this->tra_foco_energetico,
                'tra_cond_energetica' => $this->tra_cond_energetica,
                'tra_fortalecimento' => $this->tra_fortalecimento,
                'tra_limpeza' => $this->tra_limpeza,
                'tra_alerta' => $this->tra_alerta,
                'tra_pri_impressao' => $this->tra_pri_impressao,
                'tra_id_stt' => $this->tra_id_stt,
                'tra_status' => $this->status->stt_descricao,
                'tra_controle' => $this->controle,
                'tra_created_at' => Carbon::parse($this->tra_created_at)->format('d/m/Y H:i:s'),
                'tra_updated_at' => $this->tra_updated_at != null ? Carbon::parse($this->tra_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'tra_id_tra' => $this->tra_id_tra,
                'tra_id_aco' => $this->tra_id_aco,
                'tra_id_col' => $this->tra_id_col,
                'tra_id_tit' => $this->tra_id_tit,
                'tra_passe' => $this->tra_passe,
                'tra_foco_energetico' => $this->tra_foco_energetico,
                'tra_cond_energetica' => $this->tra_cond_energetica,
                'tra_fortalecimento' => $this->tra_fortalecimento,
                'tra_limpeza' => $this->tra_limpeza,
                'tra_alerta' => $this->tra_alerta,
                'tra_pri_impressao' => $this->tra_pri_impressao,
                'tra_id_stt' => $this->tra_id_stt,
                'tra_created_at' => Carbon::parse($this->tra_created_at)->format('d/m/Y H:i:s'),
                'tra_updated_at' => $this->tra_updated_at != null ? Carbon::parse($this->tra_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
