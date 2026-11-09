<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class HumorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * hue_id_hue,hue_descricao,hue_local,hue_ativo,hue_created_at,hue_updated_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data = [
                'hue_id_hue' => $this->hue_id_hue,
                'hue_descricao' => $this->hue_descricao,
                'hue_local' => $this->hue_local,
                'hue_ativo' => $this->hue_ativo,
                'hue_created_at' => Carbon::parse($this->hue_created_at)->format('d/m/Y H:i:s'),
                'hue_updated_at' => $this->hue_updated_at != null ? Carbon::parse($this->hue_updated_at)->format('d/m/Y H:i:s') : null,
                'hue_exclui' => false,
                'hue_loadexclui' => false,
            ];
        } else {
            $data = [
                'hue_id_hue' => $this->hue_id_hue,
                'hue_descricao' => $this->hue_descricao,
                'hue_local' => $this->hue_local,
                'hue_ativo' => $this->hue_ativo,
                'hue_created_at' => Carbon::parse($this->hue_created_at)->format('d/m/Y H:i:s'),
                'hue_updated_at' => $this->hue_updated_at != null ? Carbon::parse($this->hue_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}
