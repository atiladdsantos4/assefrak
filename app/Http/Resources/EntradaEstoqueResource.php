<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EntradaEstoqueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'ene_id_ene','ene_id_liv','ene_qtde','ene_valor_unit','ene_valor_total','ene_saida','ene_created_at','ene_updated_at','ene_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'ene_id_ene' => $this->ene_id_fer,
               'ene_id_liv' => $this->ene_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ene_id_ene' => $this->ene_id_ene,
                'ene_id_liv' => $this->ene_id_liv,
                'ene_livro'=> $this->livro->liv_titulo,
                'ene_autor'=> $this->livro->autor->aut_nome,
                'ene_qtde' => $this->ene_qtde,
                'ene_valor_unit' => $this->ene_valor_unit,
                'ene_valor_total' => $this->ene_valor_total,
                'ene_saida' => $this->ene_saida == null ? 0 :$this->ene_saida,
                'ene_created_at' => Carbon::parse($this->ene_created_at)->format('d/m/Y H:i:s'),
                'ene_updated_at' => $this->ene_updated_at != null ? Carbon::parse($this->ene_updated_at)->format('d/m/Y H:i:s') : null,
            ];
         } else {
            $data =  [
                'ene_id_ene' => $this->ene_id_ene,
                'ene_id_liv' => $this->ene_id_liv,
                'ene_livro'=> $this->livro->liv_titulo,
                'ene_autor'=> $this->livro->autor->aut_nome,
                'ene_qtde' => $this->ene_qtde,
                'ene_valor_unit' => $this->ene_valor_unit,
                'ene_valor_total' => $this->ene_valor_total,
                'ene_saida' => $this->ene_saida == null ? 0 :$this->ene_saida,
                'ene_created_at' => Carbon::parse($this->ene_created_at)->format('d/m/Y H:i:s'),
                'ene_updated_at' => $this->ene_updated_at != null ? Carbon::parse($this->ene_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
