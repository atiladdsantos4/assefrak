<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AutorResource extends JsonResource
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
               'aut_id_aut' => $this->aut_id_fer,
               'aut_nome' => $this->aut_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'aut_id_aut' => $this->aut_id_aut,
                'aut_nome' => $this->aut_nome,
                'aut_ativo' => $this->aut_ativo,
                'aut_created_at' => Carbon::parse($this->aut_created_at)->format('d/m/Y H:i:s'),
                'aut_updated_at' => $this->aut_updated_at != null ? Carbon::parse($this->aut_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'aut_id_aut' => $this->aut_id_aut,
                'aut_nome' => $this->aut_nome,
                'aut_created_at' => Carbon::parse($this->aut_created_at)->format('d/m/Y H:i:s'),
                'aut_updated_at' => $this->aut_updated_at != null ? Carbon::parse($this->aut_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
