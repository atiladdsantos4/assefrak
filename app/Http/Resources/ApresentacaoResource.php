<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ApresentacaoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *  'apr_id_apr','apr_id_pal','apr_id_col','apr_slide','apr_video','apr_audio','apr_data_exibe','apr_ativo','apr_created_at','apr_updated_at','apr_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
     {
        if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'apr_id_apr' => $this->apr_id_fer,
               'apr_descricao' => $this->apr_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'apr_id_apr' => $this->apr_id_apr,
                'apr_id_pal' => $this->apr_id_pal,
                'apr_id_col' => $this->apr_id_col,
                'apr_tema' => $this->apr_tema,
                'apr_data_exibe' => Carbon::parse($this->apr_data_exibe)->format('d/m/Y'),
                'apr_ativo' => $this->apr_ativo,
                'apr_path_exibicao' => 'apresentacao/'.str_pad($this->apr_id_apr, 2, '0', STR_PAD_LEFT).'/',
                'apr_created_at' => Carbon::parse($this->apr_created_at)->format('d/m/Y H:i:s'),
                'apr_updated_at' => $this->apr_updated_at != null ? Carbon::parse($this->apr_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'apr_id_apr' => $this->apr_id_apr,
                'apr_id_pal' => $this->apr_id_pal,
                'apr_id_col' => $this->apr_id_col,
                'apr_tema' => $this->apr_tema,
                'apr_itens' => $this->itens,
                'apr_path_exibicao' => 'apresentacao/'.str_pad($this->apr_id_apr, 2, '0', STR_PAD_LEFT).'/',
                'apr_data_exibe' => Carbon::parse($this->apr_data_exibe)->format('d/m/Y'),
                'apr_data_exibe_format' => Carbon::parse($this->apr_data_exibe)->format('Y/m/d'),
                'apr_ativo' => $this->apr_ativo,
                'apr_created_at' => Carbon::parse($this->apr_created_at)->format('d/m/Y H:i:s'),
                'apr_updated_at' => $this->apr_updated_at != null ? Carbon::parse($this->apr_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
