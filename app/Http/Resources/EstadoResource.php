<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EstadoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * est_id_est,est_codigo,est_nome,est_sigla,est_created_at,est_updated_at,est_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'est_id_est' => $this->est_id_fer,
               'est_descricao' => $this->est_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'est_id_est' => $this->est_id_est,
                'est_codigo' => $this->est_codigo,
                'est_nome' => $this->est_nome,
                'est_sigla' => $this->est_sigla,
                'est_created_at' => Carbon::parse($this->est_created_at)->format('d/m/Y H:i:s'),
                'est_updated_at' => $this->est_updated_at != null ? Carbon::parse($this->est_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'est_id_est' => $this->est_id_est,
                'est_codigo' => $this->est_codigo,
                'est_nome' => $this->est_nome,
                'est_sigla' => $this->est_sigla,
                'est_created_at' => Carbon::parse($this->est_created_at)->format('d/m/Y H:i:s'),
                'est_updated_at' => $this->est_updated_at != null ? Carbon::parse($this->est_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
