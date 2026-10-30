<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\CondicoesRelatada;
use App\Http\Resources\CondicoesRelatadaResource;

class CondicoesRelatadaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cor = CondicoesRelatada::orderBy('cor_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = CondicoesRelatadaResource::collection($result_cor); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados CondicoesRelatadas',
                'data'    => $result
            ];

            return response()->json($response, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = null;
        //criar a data de criação
        $request->merge(['cor_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cor_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cossono = CondicoesRelatada::create($input);

        $cos = new CondicoesRelatadaResource(CondicoesRelatada::findOrFail($cossono->cor_id_cor));

        $arr_result = [
            "status" => true,
            "mensagem" => "CondicoesRelatada Inserido com sucesso!!!",
            "data" => $cos,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = CondicoesRelatada::find($id);

       $cli = new CondicoesRelatadaResource(CondicoesRelatada::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do CondicoesRelatada!!!",
            "data" => $cli
       ];

       return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $input = $request->all();
       $cossono = CondicoesRelatada::find($id);
       $cossono->update($input);

       $cos = new CondicoesRelatadaResource($cossono);
       $arr_result = [
            "status" => true,
            "mensagem" => "CondicoesRelatada Atualizado com Sucesso!!!",
            "data" => $cos
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
