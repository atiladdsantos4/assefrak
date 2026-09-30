<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class OcorrenciaPasseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'ocp_id_ocp' => $this->ocp_id_fer,
               'ocp_descricao' => $this->ocp_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ocp_id_ocp' => $this->ocp_id_ocp,
                'ocp_id_tra' => $this->ocp_id_tra,
                'ocp_id_top' => $this->ocp_id_top,
                'ocp_tipoocorrencia' => $this->tipoocorrencia->top_descricao,
                'ocp_descricao' => $this->ocp_descricao,
                'ocp_ativo' => $this->ocp_ativo,
                'ocp_created_at' => Carbon::parse($this->ocp_created_at)->format('d/m/Y H:i:s'),
                'ocp_updated_at' => $this->ocp_updated_at != null ? Carbon::parse($this->ocp_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'ocp_id_ocp' => $this->ocp_id_ocp,
                'ocp_id_tra' => $this->ocp_id_tra,
                'ocp_id_top' => $this->ocp_id_top,
                'ocp_tipoocorrencia' => $this->tipoocorrencia->top_descricao,
                'ocp_descricao' => $this->ocp_descricao,
                'ocp_created_at' => Carbon::parse($this->ocp_created_at)->format('d/m/Y H:i:s'),
                'ocp_updated_at' => $this->ocp_updated_at != null ? Carbon::parse($this->ocp_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
