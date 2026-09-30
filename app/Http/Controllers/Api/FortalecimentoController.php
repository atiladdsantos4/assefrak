<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Fortalecimento;
use App\Http\Resources\FortalecimentoResource;

class FortalecimentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_for = Fortalecimento::orderBy('for_descricao')->get();
           $result = FortalecimentoResource::collection($result_for); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Fortalecimentos',
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
        $request->merge(['for_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'for_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Fortalecimento = Fortalecimento::create($input);

        $foc = new FortalecimentoResource(Fortalecimento::findOrFail($Fortalecimento->for_id_for));

        $arr_result = [
            "status" => true,
            "mensagem" => "Fortalecimento Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = Fortalecimento::find($id);

       $cli = new FortalecimentoResource(Fortalecimento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Fortalecimento!!!",
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
       $Fortalecimento = Fortalecimento::find($id);
       $Fortalecimento->update($input);

       $foc = new FortalecimentoResource($Fortalecimento);
       $arr_result = [
            "status" => true,
            "mensagem" => "Fortalecimento Atualizado com Sucesso!!!",
            "data" => $foc
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
