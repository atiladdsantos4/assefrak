<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AcolhidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * aco_id_aco,aco_name,aco_cpf,aco_email,aco_sexo,aco_tipo_telefone,aco_telefone,aco_ativo,aco_created_at,aco_updated_at,aco_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'aco_id_fer' => $this->aco_id_fer,
               'aco_descricao' => $this->aco_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'aco_id_aco' => $this->aco_id_aco,
                'aco_name' => $this->aco_name,
                'aco_cpf' => $this->aco_cpf != null ? $this->aco_cpf : '',
                'aco_email' => $this->aco_email,
                'aco_sexo' => $this->aco_sexo,
                'aco_tipo_telefone' => $this->aco_tipo_telefone,
                'aco_telefone' => $this->aco_telefone,
                'aco_ativo' => $this->aco_ativo,
                'aco_faixa' => $this->aco_faixa,
                'aco_desc_faixa' => $this->faixa->fai_descricao,
                'aco_uf_sigla' => $this->estado->est_sigla,
                'aco_estado' => $this->estado->est_codigo,
                'aco_cidade' => $this->cidade->cid_descricao,
                'aco_nascimento' => Carbon::parse($this->aco_nascimento)->format('d/m/Y'),
                'aco_idade' => Carbon::parse($this->aco_nascimento)->age,
                'aco_load' => false,
                'aco_created_at' => Carbon::parse($this->aco_created_at)->format('d/m/Y H:i:s'),
                'aco_updated_at' => $this->aco_updated_at != null ? Carbon::parse($this->aco_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'aco_id_aco' => $this->aco_id_aco,
                'aco_name' => $this->aco_name,
                'aco_cpf' => $this->aco_cpf != null ? $this->aco_cpf : '',
                'aco_email' => $this->aco_email,
                'aco_sexo' => $this->aco_sexo,
                'aco_tipo_telefone' => $this->aco_tipo_telefone,
                'aco_telefone' => $this->aco_telefone,
                'aco_ativo' => $this->aco_ativo,
                'aco_faixa' => $this->aco_faixa,
                'aco_idade' => Carbon::parse($this->aco_nascimento)->age,
                'aco_cidade' => $this->aco_cidade,
                'aco_estado' => $this->aco_estado,
                'aco_nascimento' => Carbon::parse($this->aco_nascimento)->format('d/m/Y'),
                'aco_nascimento_form' => Carbon::parse($this->aco_nascimento)->format('Y/m/d'),
                'aco_load' => false,
                'aco_created_at' => Carbon::parse($this->aco_created_at)->format('d/m/Y H:i:s'),
                'aco_updated_at' => $this->aco_updated_at != null ? Carbon::parse($this->aco_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
