<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Editora;
use App\Http\Resources\EditoraResource;

class EditoraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_edi = Editora::orderBy('edi_descricao')->get();
           $result = EditoraResource::collection($result_edi); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Editoras',
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
        $request->merge(['edi_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'edi_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Editora = Editora::create($input);

        $edi = new EditoraResource(Editora::findOrFail($Editora->edi_id_edi));

        $arr_result = [
            "status" => true,
            "mensagem" => "Editora Inserida com sucesso!!!",
            "data" => $edi,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$edi = Editora::find($id);

       $cli = new EditoraResource(Editora::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Editora!!!",
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
       $Editora = Editora::find($id);
       $Editora->update($input);

       $edi = new EditoraResource($Editora);
       $arr_result = [
            "status" => true,
            "mensagem" => "Editora Atualizado com Sucesso!!!",
            "data" => $edi
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
