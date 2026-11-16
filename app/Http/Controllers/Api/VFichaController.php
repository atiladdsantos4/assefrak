<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VFicha;
use App\Models\FichaEntrevista;
use App\Http\Resources\VFichaResource;

class VFichaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["filtro"]) ){ //filtro do grafico por contexto
            $descricao = $request->input('descricao');
            $ano = $request->input('ano');
            $mes = $request->input('mes');
            $result_vfi = VFicha::select('id', 'descricao','descricao_item')
            ->selectRaw('COUNT(*) AS total')
            ->where('descricao', $descricao)
            ->where('ativo', 1)
            ->where('ano', $ano)
            ->where('mes', $mes)
            ->groupBy('id', 'descricao','descricao_item')
            ->get();
        }

        if( isset($all["grupo"]) ){ //select interface
            $result = VFicha::select('descricao','option')
            ->distinct()
            ->orderBy('descricao','ASC')
            ->get();
            $response = [
                'status' => true,
                'message' => 'Dados Ficha',
                'data' => $result
            ];
            return response()->json($response, 200);
        }

        if(isset($all["datas"])){
            $listaDatas = FichaEntrevista::query()
                ->whereNull('fie_deleted_at')
                ->selectRaw("
                    EXTRACT(YEAR FROM fie_created_at)::INTEGER AS ano,
                    EXTRACT(MONTH FROM fie_created_at)::INTEGER AS mes
                ")
                ->distinct()
                ->orderBy('ano')
                ->orderBy('mes')
                ->get()
                ->groupBy('ano')
                ->map(fn($meses, $ano) => [
                    'ano' => (string) $ano,
                    'meses' => $meses->pluck('mes')
                        ->map(fn($mes) => str_pad(
                            $mes, 2, '0', STR_PAD_LEFT
                        ))
                        ->values()
                ])
                ->values();

            $response = [
                'status' => true,
                'message' => 'Lista Datas',
                'data' => $listaDatas
            ];

           return response()->json($response, 200);

        }

        if(isset($all["drill"])) { // select interface
            $ano = $request->input('ano');
            $mes = $request->input('mes');
            $descricao = $request->input('descricao');
            $id = $request->input('id');

            $result = VFicha::select()
                ->where('descricao', $descricao)
                ->where('id', $id)
                ->where('ano', $ano)
                ->where('mes', $mes)
                ->where('ativo', 1)
                ->with('acolhido')
                ->get();

            $sexo = $result->groupBy('acolhido.aco_sexo')
                ->map(fn($items) => $items->count())
                ->map(fn($total, $name) => [
                    'name' => $name == 'M' ? 'Masculino' : 'Feminino',
                    'value' => $total
                ])
                ->values();

            $faixa = $result->groupBy('acolhido.faixa.fai_descricao')
                ->map(fn($items) => $items->count())
                ->map(fn($total, $name) => [
                    'name' => $name,
                    'value' => $total
                ])
                ->values();

            $response = [
                'status' => true,
                'message' => 'Dados Ficha',
                'data_sexo' => $sexo,
                'data_faixa' => $faixa
            ];

           return response()->json($response, 200);
       }


        if( isset($all["listagem"]) ){
            $result_vfi = VFicha::orderBy('fie_id_fie')
                               ->orderBy('descricao')
                               ->orderBy('id')
                               ->get();
        }

        $result = VFichaResource::collection($result_vfi);

        $response = [
           'status' => true,
           'message' => 'Dados Ficha',
           'data' => $result
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $vfi = new VFichaResource(
            VFicha::findOrFail($id)
        );

        $arr_result = [
            "status" => true,
            "mensagem" => "Dados da Ficha!!!",
            "data" => $vfi
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }
}
