<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ColaboradorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * col_id_col,col_ocupacao,col_name,col_cpf,col_email,col_sexo,col_tipo_telefone,col_telefone,col_ativo,col_estado,col_cidade,col_nascimento,col_imagem,col_created_at,col_updated_at,col_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'col_id_fer' => $this->col_id_fer,
               'col_descricao' => $this->col_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'col_id_col' => $this->col_id_col,
                'col_name' => $this->col_name,
                'col_cpf' => $this->col_cpf != null ? $this->col_cpf : '',
                'col_email' => $this->col_email,
                'col_titulo' => $this->col_titulo,
                'col_sexo' => $this->col_sexo,
                'col_tipo_telefone' => $this->col_tipo_telefone,
                'col_telefone' => $this->col_telefone,
                'col_ativo' => $this->col_ativo,
                'col_ocupacao' => $this->col_ocupacao,
                'col_desc_ocupacao' => $this->ocupacao->ocu_descricao,
                'col_uf_sigla' => $this->estado->est_sigla,
                'col_estado' => $this->estado->est_codigo,
                'col_cidade' => $this->cidade->cid_descricao,
                'col_imagem' => $this->col_imagem,
                'col_nascimento' => Carbon::parse($this->col_nascimento)->format('d/m/Y'),
                'col_load' => false,
                'col_created_at' => Carbon::parse($this->col_created_at)->format('d/m/Y H:i:s'),
                'col_updated_at' => $this->col_updated_at != null ? Carbon::parse($this->col_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'col_id_col' => $this->col_id_col,
                'col_name' => $this->col_name,
                'col_cpf' => $this->col_cpf != null ? $this->col_cpf : '',
                'col_email' => $this->col_email,
                'col_titulo' => $this->col_titulo,
                'col_sexo' => $this->col_sexo,
                'col_tipo_telefone' => $this->col_tipo_telefone,
                'col_telefone' => $this->col_telefone,
                'col_ativo' => $this->col_ativo,
                'col_ocupacao' => $this->col_ocupacao,
                'col_desc_ocupacao' => $this->ocupacao->ocu_descricao,
                'col_cidade' => $this->col_cidade,
                'col_estado' => $this->estado->est_codigo,
                'col_imagem' => $this->col_imagem,
                'col_nascimento' => Carbon::parse($this->col_nascimento)->format('d/m/Y'),
                'col_nascimento_form' => Carbon::parse($this->col_nascimento)->format('Y/m/d'),
                'col_load' => false,
                'col_created_at' => Carbon::parse($this->col_created_at)->format('d/m/Y H:i:s'),
                'col_updated_at' => $this->col_updated_at != null ? Carbon::parse($this->col_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
