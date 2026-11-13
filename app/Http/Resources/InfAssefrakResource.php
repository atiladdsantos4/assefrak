<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class InfAssefrakResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') && $request->has('init') ){
            $data = [
                'ina_id_ina' => $this->ina_id_ina,
                'ina_url_nome_centro' => $this->ina_url_nome_centro
            ];
        } else if( $request->has('listagem') ){
            $data = [
                'ina_id_ina' => $this->ina_id_ina,
                'ina_url_nome_centro' => $this->ina_url_nome_centro,
                'ina_url_instagran' => $this->ina_url_instagran,
                'ina_url_inst_credencial' => $this->ina_url_inst_credencial,
                'ina_url_facebook' => $this->ina_url_facebook,
                'ina_url_face_credencial' => $this->ina_url_face_credencial,
                'ina_url_site' => $this->ina_url_site,
                'ina_url_site_admin' => $this->ina_url_site_admin,
                'ina_telefone_admin' => $this->ina_telefone_admin,
                'ina_telefone_contato' => $this->ina_telefone_contato,
                'ina_telefone_fincanceiro' => $this->ina_telefone_fincanceiro,
                'ina_email' => $this->ina_email,
                'ina_exclui' => false,
                'ina_loadexclui' => false,
                'ina_created_at' => Carbon::parse($this->ina_created_at)->format('d/m/Y H:i:s'),
                'ina_updated_at' => $this->ina_updated_at != null ? Carbon::parse($this->ina_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        } else {
            $data = [
                'ina_id_ina' => $this->ina_id_ina,
                'ina_url_nome_centro' => $this->ina_url_nome_centro,
                'ina_url_instagran' => $this->ina_url_instagran,
                'ina_url_inst_credencial' => $this->ina_url_inst_credencial,
                'ina_url_facebook' => $this->ina_url_facebook,
                'ina_url_face_credencial' => $this->ina_url_face_credencial,
                'ina_url_site' => $this->ina_url_site,
                'ina_url_site_admin' => $this->ina_url_site_admin,
                'ina_telefone_admin' => $this->ina_telefone_admin,
                'ina_telefone_contato' => $this->ina_telefone_contato,
                'ina_telefone_fincanceiro' => $this->ina_telefone_fincanceiro,
                'ina_email' => $this->ina_email,
                'ina_created_at' => Carbon::parse($this->ina_created_at)->format('d/m/Y H:i:s'),
                'ina_updated_at' => $this->ina_updated_at != null ? Carbon::parse($this->ina_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}
