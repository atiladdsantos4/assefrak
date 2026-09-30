<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class InscricaoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'pas_id_pas','pas_descricao','pas_local','pas_created_at','pas_updated_at','pas_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'pas_id_pas' => $this->pas_id_fer,
               'pas_descricao' => $this->pas_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ins_id_ins'=> $this->ins_id_ins,
                'ins_id_cur'=> $this->ins_id_cur,
                'ins_id_eve'=> $this->ins_id_eve,
                'ins_id_puf'=> $this->ins_id_puf,
                'ins_nome'=> $this->ins_nome,
                'ins_email'=> $this->ins_email,
                'ins_telefone'=> $this->ins_telefone,
                'ins_tipo'=> $this->ins_tipo,
                'ins_ativo'=> $this->ins_ativo,
                'ins_envio_email'=> $this->ins_envio_email,
                'ins_load'=> false,
                'ins_modal_load'=> false,
                'ins_created_at'=> Carbon::parse($this->ins_created_at)->format('d/m/Y H:i:s'),
                'ins_updated_at'=> $this->ins_updated_at != null ? Carbon::parse($this->ins_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'ins_id_ins'=> $this->ins_id_ins,
                'ins_id_cur'=> $this->ins_id_cur,
                'ins_id_eve'=> $this->ins_id_eve,
                'ins_id_puf'=> $this->ins_id_puf,
                'ins_nome'=> $this->ins_nome,
                'ins_email'=> $this->ins_email,
                'ins_telefone'=> $this->ins_telefone,
                'ins_descricao'=> $this->ins_id_cur != null ? $this->curso->cur_titulo : $this->evento->eve_titulo,
                'ins_tipo'=> $this->ins_tipo,
                'ins_ativo'=> $this->ins_ativo,
                'ins_envio_email'=> $this->ins_envio_email,
                'ins_created_at'=> Carbon::parse($this->ins_created_at)->format('d/m/Y H:i:s'),
                'ins_updated_at'=> $this->ins_updated_at != null ? Carbon::parse($this->ins_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
