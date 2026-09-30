<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class BancoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     * 'ban_numero','ban_nome','ban_sigla','ban_complemento','ban_created_at', 'ban_updated_at', 'ban_deleted_at'
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
           $data =  [
                'ban_id_ban' => $this->ban_id_ban,
                'ban_nome' => $this->ban_nome,
                'ban_sigla' => $this->ban_sigla,
                'ban_complemento' => $this->pac_display,
                'ban_created_at' => Carbon::parse($this->ban_created_at)->format('d/m/Y H:i:s'),
                'ban_updated_at' => $this->ban_updated_at != null ? Carbon::parse($this->ban_updated_at)->format('d/m/Y H:i:s') : null,
           ];
         }  else if($request->has('filtro')){
          $data =  [
                'ban_id_ban' => $this->ban_id_ban,
                'ban_nome' => $this->ban_nome,
                'ban_sigla' => $this->ban_sigla,
          ];
         } else {
            $data =  [
                'ban_id_ban' => $this->ban_id_ban,
                'ban_nome' => $this->ban_nome,
                'ban_sigla' => $this->ban_sigla,
                'ban_complemento' => $this->pac_display,
                'ban_created_at' => Carbon::parse($this->ban_created_at)->format('d/m/Y H:i:s'),
                'ban_updated_at' => $this->ban_updated_at != null ? Carbon::parse($this->ban_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}

