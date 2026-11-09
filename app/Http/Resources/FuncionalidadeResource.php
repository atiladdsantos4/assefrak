<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FuncionalidadeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        if($request->has('listagem')){

            $data = [
                'fun_id_fun' => $this->fun_id_fun,
                'fun_id_tfu' => $this->fun_id_tfu,
                'fun_descricao' => $this->fun_descricao,
                'fun_link' => $this->fun_link,
                'fun_tipo' => $this->tipo,
                'fun_id_men' => $this->fun_id_men,
                'fun_menu' => $this->menu ?? null,
                'fun_created_at' => Carbon::parse($this->fun_created_at)->format('d/m/Y H:i:s'),
                'fun_updated_at' => $this->fun_updated_at ? Carbon::parse($this->fun_updated_at)->format('d/m/Y H:i:s') : null,
                'fun_deleted_at' => $this->fun_deleted_at,
                'fun_exclui' => false,
                'fun_loadexclui' => false,
            ];

        }else{

            $data = [
                'fun_id_fun' => $this->fun_id_fun,
                'fun_id_tfu' => $this->fun_id_tfu,
                'fun_descricao' => $this->fun_descricao,
                'fun_link' => $this->fun_link,
                'fun_tipo' => $this->tipo,
                'fun_id_men' => $this->fun_id_men,
                'fun_menu' => $this->menu ?? null,
                'fun_created_at' => Carbon::parse($this->fun_created_at)->format('d/m/Y H:i:s'),
                'fun_updated_at' => $this->fun_updated_at ? Carbon::parse($this->fun_updated_at)->format('d/m/Y H:i:s') : null,
                'fun_deleted_at' => $this->fun_deleted_at,
            ];

        }

        return $data;
    }
}
