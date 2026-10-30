<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\CondicaoPercebida;
use App\Http\Resources\CondicaoPercebidaResource;

class CondicaoPercebidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_per = CondicaoPercebida::orderBy('per_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = CondicaoPercebidaResource::collection($result_per); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Condicao Percebidas',
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
        $request->merge(['per_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'per_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cossono = CondicaoPercebida::create($input);

        $cos = new CondicaoPercebidaResource(CondicaoPercebida::findOrFail($cossono->per_id_per));

        $arr_result = [
            "status" => true,
            "mensagem" => "Condicao Percebida Inserido com sucesso!!!",
            "data" => $cos,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = CondicaoPercebida::find($id);

       $cli = new CondicaoPercebidaResource(CondicaoPercebida::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Condicao Percebida!!!",
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
       $cossono = CondicaoPercebida::find($id);
       $cossono->update($input);

       $cos = new CondicaoPercebidaResource($cossono);
       $arr_result = [
            "status" => true,
            "mensagem" => "Condicao Percebida Atualizado com Sucesso!!!",
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
