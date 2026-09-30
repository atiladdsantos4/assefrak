<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PalestraResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *pal_id_pal,pal_id_col,pal_id_cae,pal_estado,pal_cidade,pal_tema,pal_texto,pal_data_inicio,pal_data_fim,pal_hora_inicio,
     *pal_hora_fim,pal_local,pal_concluido,pal_created_at,pal_updated_at,pal_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'pal_id_pal' => $this->pal_id_fer,
               'pal_descricao' => $this->pal_tema
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'pal_id_pal' => $this->pal_id_pal,
                'pal_tema' => $this->pal_tema,
                'pal_texto' => $this->pal_texto,
                'pal_id_col' => $this->pal_id_col,
                'pal_colaborador' => $this->colaborador->col_name,
                'pal_id_cae' => $this->pal_id_cae,
                'pal_categoria' => $this->categoria->cae_descricao,
                'pal_estado' => $this->estado->est_codigo,
                'pal_uf' => $this->estado->est_sigla,
                'pal_cidade' => $this->pal_cidade,
                'pal_desc_cidade' => $this->cidade->cid_descricao,
                'pal_local' => $this->pal_local,
                'pal_folder' => $this->pal_folder,
                'pal_concluido' => $this->pal_concluido,
                'pal_load' => false,
                'pal_image' => null,
                'pal_datasort' => Carbon::parse($this->pal_data_inicio)->format('Ymd'),
                'pal_data_inicio' => Carbon::parse($this->pal_data_inicio)->format('d/m/Y'),
                'pal_data_ext_dia' => Carbon::parse($this->pal_data_inicio)->format('d'),
                'pal_data_ext_mes' => strtoupper(Carbon::parse($this->pal_data_inicio)->translatedFormat('M')),
                'pal_data_inicio_format' => Carbon::parse($this->pal_data_inicio)->format('Y/m/d'),
                'pal_data_fim' => Carbon::parse($this->pal_data_fim)->format('d/m/Y'),
                'pal_data_fim_format' => Carbon::parse($this->pal_data_fim)->format('Y/m/d'),
                'pal_hora_inicio' => Carbon::parse($this->pal_hora_inicio)->format('H:i'),
                'pal_hora_inicio_format' => Carbon::parse($this->pal_hora_inicio)->format('Y/m/d H:i:s'),
                'pal_hora_fim' => Carbon::parse($this->pal_hora_fim)->format('H:i'),
                'pal_hora_fim_format' => Carbon::parse($this->pal_hora_fim)->format('Y/m/d H:i:s'),
                'pal_created_at' => Carbon::parse($this->pal_created_at)->format('d/m/Y H:i:s'),
                'pal_updated_at' => $this->pal_updated_at != null ? Carbon::parse($this->pal_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'pal_id_pal' => $this->pal_id_pal,
                'pal_tema' => $this->pal_tema,
                'pal_texto' => $this->pal_texto,
                'pal_id_col' => $this->pal_id_col,
                'pal_colaborador' => $this->colaborador->col_name,
                'pal_id_cae' => $this->pal_id_cae,
                'pal_categoria' => $this->categoria->cae_descricao,
                'pal_estado' => $this->estado->est_codigo,
                'pal_uf' => $this->estado->est_sigla,
                'pal_cidade' => $this->pal_cidade,
                'pal_desc_cidade' => $this->cidade->cid_descricao,
                'pal_local' => $this->pal_local,
                'pal_folder' => $this->pal_folder,
                'pal_concluido' => $this->pal_concluido,
                'pal_load' => false,
                'pal_data_inicio' => Carbon::parse($this->pal_data_inicio)->format('d/m/Y'),
                'pal_data_ext_dia' => Carbon::parse($this->pal_data_inicio)->format('d'),
                'pal_data_ext_mes' => strtoupper(Carbon::parse($this->pal_data_inicio)->translatedFormat('M')),
                'pal_data_inicio_format' => Carbon::parse($this->pal_data_inicio)->format('Y/m/d'),
                'pal_data_fim' => Carbon::parse($this->pal_data_fim)->format('d/m/Y'),
                'pal_data_fim_format' => Carbon::parse($this->pal_data_fim)->format('Y/m/d'),
                'pal_hora_inicio' => Carbon::parse($this->pal_hora_inicio)->format('H:i'),
                'pal_hora_inicio_format' => Carbon::parse($this->pal_hora_inicio)->format('Y/m/d H:i:s'),
                'pal_hora_fim' => Carbon::parse($this->pal_hora_fim)->format('H:i'),
                'pal_hora_fim_format' => Carbon::parse($this->pal_hora_fim)->format('Y/m/d H:i:s'),
                'pal_created_at' => Carbon::parse($this->pal_created_at)->format('d/m/Y H:i:s'),
                'pal_updated_at' => $this->pal_updated_at != null ? Carbon::parse($this->pal_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
