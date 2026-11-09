<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * men_id_men,men_id_pai,men_name,men_classe,men_click,men_nivel,men_created_at,men_updated_at,men_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =  [
                'men_id_men' => $this->men_id_men,
                'men_id_pai' => $this->men_id_pai,
                'men_name' => $this->men_name,
                'men_classe' => $this->men_classe,
                'men_click' => $this->men_click,
                'men_nivel' => $this->men_nivel,
                'men_position' => $this->men_position,
                'menu_pai' => $this->menupai,
                'men_exclui' => false,
                'men_loadexclui' => false,
                'men_created_at' => Carbon::parse($this->men_created_at)->format('d/m/Y H:i:s'),
                'men_updated_at' => $this->men_updated_at != null ? Carbon::parse($this->men_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'men_id_men' => $this->men_id_men,
                'men_id_pai' => $this->men_id_pai,
                'men_name' => $this->men_name,
                'men_classe' => $this->men_classe,
                'men_click' => $this->men_click,
                'men_nivel' => $this->men_nivel,
                'men_position' => $this->men_position,
                'menu_pai' => $this->menupai,
                'men_created_at' => Carbon::parse($this->men_created_at)->format('d/m/Y H:i:s'),
                'men_updated_at' => $this->men_updated_at != null ? Carbon::parse($this->men_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
