<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EventoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *'eve_id_eve','eve_id_puf','eve_titulo','eve_foco','eve_data_inicio','eve_data_fim','eve_hora_inicio','eve_hora_fim','eve_local','eve_concluido','eve_created_at','eve_updated_at','eve_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'eve_id_eve' => $this->eve_id_fer,
               'eve_descricao' => $this->eve_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'eve_id_eve' => $this->eve_id_eve,
                'eve_titulo' => $this->eve_titulo,
                'eve_foco' => $this->eve_foco,
                'eve_id_puf' => $this->eve_id_puf,
                'eve_publico' => $this->publico->puf_descricao,
                'eve_id_cae' => $this->eve_id_cae,
                'eve_categoria' => $this->categoria->cae_descricao,
                'eve_estado' => $this->estado->est_codigo,
                'eve_uf' => $this->estado->est_sigla,
                'eve_cidade' => $this->eve_cidade,
                'eve_desc_cidade' => $this->cidade->cid_descricao,
                'eve_local' => $this->eve_local,
                'eve_concluido' => $this->eve_concluido,
                'eve_load' => false,
                'eve_data_inicio' => Carbon::parse($this->eve_data_inicio)->format('d/m/Y'),
                'eve_data_ext_dia' => Carbon::parse($this->eve_data_inicio)->format('d'),
                'eve_data_ext_mes' => strtoupper(Carbon::parse($this->eve_data_inicio)->translatedFormat('M')),
                'eve_data_inicio_format' => Carbon::parse($this->eve_data_inicio)->format('Y/m/d'),
                'eve_data_fim' => Carbon::parse($this->eve_data_fim)->format('d/m/Y'),
                'eve_data_fim_format' => Carbon::parse($this->eve_data_fim)->format('Y/m/d'),
                'eve_hora_inicio' => Carbon::parse($this->eve_hora_inicio)->format('H:i'),
                'eve_hora_fim' => Carbon::parse($this->eve_hora_fim)->format('H:i'),
                'eve_created_at' => Carbon::parse($this->eve_created_at)->format('d/m/Y H:i:s'),
                'eve_updated_at' => $this->eve_updated_at != null ? Carbon::parse($this->eve_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'eve_id_eve' => $this->eve_id_eve,
                'eve_titulo' => $this->eve_titulo,
                'eve_foco' => $this->eve_foco,
                'eve_id_cae' => $this->eve_id_cae,
                'eve_categoria' => $this->categoria->cae_descricao,
                'eve_id_puf' => $this->eve_id_puf,
                'eve_publico' => $this->publico->puf_descricao,
                'eve_estado' => $this->estado->est_codigo,
                'eve_uf' => $this->estado->est_sigla,
                'eve_cidade' => $this->eve_cidade,
                'eve_desc_cidade' => $this->cidade->cid_descricao,
                'eve_local' => $this->eve_local,
                'eve_concluido' => $this->eve_concluido,
                'eve_data_inicio' => Carbon::parse($this->eve_data_inicio)->format('d/m/Y'),
                'eve_data_inicio_format' => Carbon::parse($this->eve_data_inicio)->format('Y/m/d H:i:s'),
                'eve_data_fim' => Carbon::parse($this->eve_data_fim)->format('d/m/Y'),
                'eve_data_fim_format' => Carbon::parse($this->eve_data_fim)->format('Y/m/d H:i:s'),
                'eve_hora_inicio' => Carbon::parse($this->eve_hora_inicio)->format('H:i'),
                'eve_hora_inicio_format' => Carbon::parse($this->eve_hora_inicio)->format('Y/m/d H:i:s'),
                'eve_hora_fim' => Carbon::parse($this->eve_hora_fim)->format('H:i'),
                'eve_hora_fim_format' => Carbon::parse($this->eve_hora_fim)->format('Y/m/d H:i:s'),
                'eve_created_at' => Carbon::parse($this->eve_created_at)->format('d/m/Y H:i:s'),
                'eve_updated_at' => $this->eve_updated_at != null ? Carbon::parse($this->eve_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
