<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\EntradaEstoque;
use App\Http\Resources\EntradaEstoqueResource;

class EntradaEstoqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_ene = EntradaEstoque::orderBy('ene_id_liv')->get();
           $result = EntradaEstoqueResource::collection($result_ene); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados EntradaEstoques',
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
        $request->merge(['ene_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'ene_id_liv' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $EntradaEstoque = EntradaEstoque::create($input);

        $ene = new EntradaEstoqueResource(EntradaEstoque::findOrFail($EntradaEstoque->ene_id_ene));

        $arr_result = [
            "status" => true,
            "mensagem" => "EntradaEstoque Inserido com sucesso!!!",
            "data" => $ene,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$ene = EntradaEstoque::find($id);

       $cli = new EntradaEstoqueResource(EntradaEstoque::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do EntradaEstoque!!!",
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
       $EntradaEstoque = EntradaEstoque::find($id);
       $EntradaEstoque->update($input);

       $ene = new EntradaEstoqueResource($EntradaEstoque);
       $arr_result = [
            "status" => true,
            "mensagem" => "EntradaEstoque Atualizado com Sucesso!!!",
            "data" => $ene
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
