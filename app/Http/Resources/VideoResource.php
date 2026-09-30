<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     * 'vid_id_vid','vid_id_cav','vid_descricao','vid_hash_link','vid_ativo','vid_created_at','vid_updated_at','vid_deleted_at'
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'vid_id_vid' => $this->vid_id_fer,
               'vid_descricao' => $this->vid_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'vid_id_vid' => $this->vid_id_vid,
                'vid_descricao' => $this->vid_descricao,
                'vid_id_cav' => $this->vid_id_cav,
                'vid_categoria' => $this->categoria->cav_descricao,
                'vid_hash_link' => $this->vid_hash_link,
                'vid_ativo' => $this->vid_ativo,
                'vid_created_at' => Carbon::parse($this->vid_created_at)->format('d/m/Y H:i:s'),
                'vid_updated_at' => $this->vid_updated_at != null ? Carbon::parse($this->vid_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'vid_id_vid' => $this->vid_id_vid,
                'vid_descricao' => $this->vid_descricao,
                'vid_id_cav' => $this->vid_id_cav,
                'vid_categoria' => $this->categoria->cav_descricao,
                'vid_hash_link' => $this->vid_hash_link,
                'vid_ativo' => $this->vid_ativo,
                'vid_created_at' => Carbon::parse($this->vid_created_at)->format('d/m/Y H:i:s'),
                'vid_updated_at' => $this->vid_updated_at != null ? Carbon::parse($this->vid_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
