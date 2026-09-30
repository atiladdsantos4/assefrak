<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CursoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *cur_id_cur,cur_id_puf,cur_id_cae,cur_id_col,cur_id_est,cur_id_cid,cur_titulo,cur_descricao,
     *cur_conteudo,cur_programacao,cur_galeria,cur_data_inicio,cur_data_fim,cur_hora_inicio,cur_hora_fim,
     *cur_local,cur_concluido,cur_created_at,cur_updated_at,cur_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cur_id_cur' => $this->cur_id_fer,
               'cur_descricao' => $this->cur_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cur_id_cur' => $this->cur_id_cur,
                'cur_titulo' => $this->cur_titulo,
                'cur_descricao' => $this->cur_descricao,
                'cur_id_col' => $this->cur_id_col,
                'cur_colaborador' => $this->colaborador->col_name,
                'cur_colaborador_avatar' => $this->colaborador->col_imagem,
                'cur_colaborador_titulo' => $this->colaborador->col_titulo,
                'cur_id_puf' => $this->cur_id_puf,
                'cur_publico' => $this->publico->puf_descricao,
                'cur_id_cae' => $this->cur_id_cae,
                'cur_categoria' => $this->categoria->cae_descricao,
                'cur_estado' => $this->estado->est_codigo,
                'cur_uf' => $this->estado->est_sigla,
                'cur_id_cid' => $this->cur_id_cid,
                'cur_desc_cidade' => $this->cidade->cid_descricao,
                'cur_local' => $this->cur_local,
                'cur_concluido' => $this->cur_concluido,
                'cur_conteudo' => $this->cur_conteudo,
                'cur_programacao' => $this->cur_programacao,
                'cur_galeria' => $this->cur_galeria,
                'cur_load' => false,
                'cur_imagem' => $this->itens_main,
                'cur_qtde_inscritos' => $this->qtdeinscritos[0]->total,
                'cur_data_inicio' => Carbon::parse($this->cur_data_inicio)->format('d/m/Y'),
                'cur_data_ext_dia' => Carbon::parse($this->cur_data_inicio)->format('d'),
                'cur_data_ext_mes' => ucfirst(Carbon::parse($this->cur_data_inicio)->translatedFormat('M')),
                'cur_data_ext_ano' => Carbon::parse($this->cur_data_inicio)->format('Y'),
                'cur_data_inicio_format' => Carbon::parse($this->cur_data_inicio)->format('Y/m/d'),
                'cur_data_fim' => Carbon::parse($this->cur_data_fim)->format('d/m/Y'),
                'cur_data_fim_format' => Carbon::parse($this->cur_data_fim)->format('Y/m/d'),
                'cur_hora_inicio' => Carbon::parse($this->cur_hora_inicio)->format('H:i'),
                'cur_hora_fim' => Carbon::parse($this->cur_hora_fim)->format('H:i'),
                'cur_created_at' => Carbon::parse($this->cur_created_at)->format('d/m/Y H:i:s'),
                'cur_updated_at' => $this->cur_updated_at != null ? Carbon::parse($this->cur_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cur_id_cur' => $this->cur_id_cur,
                'cur_titulo' => $this->cur_titulo,
                'cur_descricao' => $this->cur_descricao,
                'cur_id_col' => $this->cur_id_col,
                'cur_colaborador' => $this->colaborador->col_name,
                'cur_colaborador_avatar' => $this->colaborador->col_imagem,
                'cur_colaborador_titulo' => $this->colaborador->col_titulo,
                'cur_colaborador_dados' => $this->colaborador,
                'cur_id_puf' => $this->cur_id_puf,
                'cur_publico' => $this->publico->puf_descricao,
                'cur_id_cae' => $this->cur_id_cae,
                'cur_categoria' => $this->categoria->cae_descricao,
                'cur_estado' => $this->estado->est_codigo,
                'cur_uf' => $this->estado->est_sigla,
                'cur_id_cid' => $this->cur_id_cid,
                'cur_desc_cidade' => $this->cidade->cid_descricao,
                'cur_local' => $this->cur_local,
                'cur_concluido' => $this->cur_concluido,
                'cur_conteudo' => $this->cur_conteudo,
                'cur_programacao' => $this->cur_programacao,
                'cur_galeria' => $this->cur_galeria,
                'cur_load' => false,
                'cur_itens' => $this->itens,
                'cur_qtde_inscritos' => $this->qtdeinscritos[0]->total,
                'cur_data_inicio' => Carbon::parse($this->cur_data_inicio)->format('d/m/Y'),
                'cur_data_ext_dia' => Carbon::parse($this->cur_data_inicio)->format('d'),
                'cur_data_ext_mes' => ucfirst(Carbon::parse($this->cur_data_inicio)->translatedFormat('M')),
                'cur_data_ext_ano' => Carbon::parse($this->cur_data_inicio)->format('Y'),
                'cur_data_inicio_format' => Carbon::parse($this->cur_data_inicio)->format('Y/m/d'),
                'cur_data_fim' => Carbon::parse($this->cur_data_fim)->format('d/m/Y'),
                'cur_data_fim_format' => Carbon::parse($this->cur_data_fim)->format('Y/m/d'),
                'cur_hora_inicio' => Carbon::parse($this->cur_hora_inicio)->format('H:i'),
                'cur_hora_inicio_format' => Carbon::parse($this->cur_hora_inicio)->format('Y/m/d H:i:s'),
                'cur_hora_fim' => Carbon::parse($this->cur_hora_fim)->format('H:i'),
                'cur_hora_fim_format' => Carbon::parse($this->cur_hora_fim)->format('Y/m/d H:i:s'),
                'cur_created_at' => Carbon::parse($this->cur_created_at)->format('d/m/Y H:i:s'),
                'cur_updated_at' => $this->cur_updated_at != null ? Carbon::parse($this->cur_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
