<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LivroResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'liv_id_liv','liv_id_aut','liv_id_edi','liv_titulo','liv_traducao','liv_sinopse','liv_isbn','liv_paginas','liv_created_at','liv_updated_at','liv_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'liv_id_liv' => $this->liv_id_fer,
               'liv_titulo' => $this->liv_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'liv_id_liv' => $this->liv_id_liv,
                'liv_id_aut' => $this->liv_id_aut,
                'liv_autor' => $this->autor->aut_nome,
                'liv_filter' => 'f_'.$this->autor->aut_id_aut,
                'liv_filter_busca' => (int) $this->estoque > 0 ? 'f_'.$this->autor->aut_id_aut.' disponivel' :'f_'.$this->autor->aut_id_aut,
                'liv_id_edi' => $this->liv_id_edi,
                'liv_editora' => $this->editora->edi_descricao,
                'liv_titulo'  => $this->liv_titulo,
                'liv_traducao' => $this->liv_traducao,
                'liv_sinopse'  => $this->liv_sinopse,
                'liv_isbn'  => $this->liv_isbn,
                'liv_paginas'  => $this->liv_paginas,
                'liv_edicao'  => $this->liv_edicao,
                'liv_imagem' => $this->liv_imagem,
                'liv_ativo' => $this->liv_ativo,
                'liv_preco' => $this->precoatual != null ? $this->precoatual->prl_valor_desconto : 0,
                'liv_estoque' => (int) $this->estoque,
                'liv_qrcode' => $this->qrcode != null ? $this->qrcode->lip_id_lip : 0,
                'liv_created_at' => Carbon::parse($this->liv_created_at)->format('d/m/Y H:i:s'),
                'liv_updated_at' => $this->liv_updated_at != null ? Carbon::parse($this->liv_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'liv_id_liv' => $this->liv_id_liv,
                'liv_id_aut' => $this->liv_id_aut,
                'liv_autor' => $this->autor->aut_nome,
                'liv_id_edi' => $this->liv_id_edi,
                'liv_editora' => $this->editora->edi_descricao,
                'liv_titulo' => $this->liv_titulo,
                'liv_traducao' => $this->liv_traducao,
                'liv_sinopse' => $this->liv_sinopse,
                'liv_isbn' => $this->liv_isbn,
                'liv_paginas' => $this->liv_paginas,
                'liv_edicao' => $this->liv_edicao,
                'liv_imagem' => $this->liv_imagem,
                'liv_ativo' => $this->liv_ativo,
                'liv_estoque' => $this->estoque,
                'liv_created_at' => Carbon::parse($this->liv_created_at)->format('d/m/Y H:i:s'),
                'liv_updated_at' => $this->liv_updated_at != null ? Carbon::parse($this->liv_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
