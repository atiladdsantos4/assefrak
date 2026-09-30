<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LivroPixResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * lip_id_lip,lip_id_prl,lip_id_pix,lip_qrcode,lip_copy_qrcode,lip_valor_qrcode,lip_created_at,lip_updated_at,lip_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'lip_id_lip' => $this->lip_id_fer,
               'lip_descricao' => $this->lip_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'lip_id_lip' => $this->lip_id_lip,
                'lip_id_prl' => $this->lip_id_prl,
                'lip_qrcode' => $this->lip_qrcode,
                'lip_copy_qrcode' => $this->lip_copy_qrcode,
                'lip_valor_qrcode' => $this->lip_valor_qrcode,
                'lip_created_at' => Carbon::parse($this->lip_created_at)->format('d/m/Y H:i:s'),
                'lip_updated_at' => $this->lip_updated_at != null ? Carbon::parse($this->lip_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'lip_id_lip' => $this->lip_id_lip,
                'lip_id_prl' => $this->lip_id_prl,
                'lip_qrcode' => $this->lip_qrcode,
                'lip_copy_qrcode' => $this->lip_copy_qrcode,
                'lip_valor_qrcode' => $this->lip_valor_qrcode,
                'lip_created_at' => Carbon::parse($this->lip_created_at)->format('d/m/Y H:i:s'),
                'lip_updated_at' => $this->lip_updated_at != null ? Carbon::parse($this->lip_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
