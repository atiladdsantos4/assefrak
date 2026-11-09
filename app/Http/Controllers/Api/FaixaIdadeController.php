<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\FaixaIdade;
use App\Http\Resources\FaixaIdadeResource;

class FaixaIdadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_fai = FaixaIdade::orderBy('fai_descricao')->get();
           $result = FaixaIdadeResource::collection($result_fai); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados FaixaIdades',
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
        $request->merge(['fai_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'fai_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $FaixaIdade = FaixaIdade::create($input);

        $fai = new FaixaIdadeResource(FaixaIdade::findOrFail($FaixaIdade->fai_id_fai));

        $arr_result = [
            "status" => true,
            "mensagem" => "FaixaIdade Inserido com sucesso!!!",
            "data" => $fai,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$fai = FaixaIdade::find($id);

       $cli = new FaixaIdadeResource(FaixaIdade::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do FaixaIdade!!!",
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
       $FaixaIdade = FaixaIdade::find($id);
       $FaixaIdade->update($input);

       $fai = new FaixaIdadeResource($FaixaIdade);
       $arr_result = [
            "status" => true,
            "mensagem" => "FaixaIdade Atualizado com Sucesso!!!",
            "data" => $fai
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $registro = FaixaIdade::find($id);

        if (!$registro) {
            return response()->json([
                'status' => false,
                'mensagem' => 'Registro não encontrado!!!'
            ], 404);
        }

        $registro->delete();

        return response()->json([
            'status' => true,
            'mensagem' => 'FaixaIdade excluída com sucesso!!!'
        ]);
    }

}
