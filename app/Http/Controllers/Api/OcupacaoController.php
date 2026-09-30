<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Ocupacao;
use App\Http\Resources\OcupacaoResource;

class OcupacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_ale = Ocupacao::orderBy('ocu_descricao')->get();
           $result = OcupacaoResource::collection($result_ale); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Ocupação',
                'data'    => $result
            ];

            return response()->json($response, 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = null;
        //criar a data de criação
        $request->merge(['ocu_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'ocu_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Ocupacao = Ocupacao::create($input);

        $ocu = new OcupacaoResource(Ocupacao::findOrFail($Ocupacao->ocu_id_ocu));

        $arr_result = [
            "status" => true,
            "mensagem" => "Ocupacao Inserido com sucesso!!!",
            "data" => $ocu,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$ocu = Ocupacao::find($id);

       $cli = new OcupacaoResource(Ocupacao::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Ocupacao!!!",
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
       $Ocupacao = Ocupacao::find($id);
       $Ocupacao->update($input);

       $ocu = new OcupacaoResource($Ocupacao);
       $arr_result = [
            "status" => true,
            "mensagem" => "Ocupacao Atualizado com Sucesso!!!",
            "data" => $ocu
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
