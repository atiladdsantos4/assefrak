<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\CategoriaEvento;
use App\Http\Resources\CategoriaEventoResource;

class CategoriaEventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cae = CategoriaEvento::orderBy('cae_descricao')->get();
           $result = CategoriaEventoResource::collection($result_cae); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Categoria Evento',
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
        $request->merge(['cae_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cae_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $status = CategoriaEvento::create($input);

        $cae = new CategoriaEventoResource(CategoriaEvento::findOrFail($status->cae_id_cae));

        $arr_result = [
            "status" => true,
            "mensagem" => "Status do Tratamento Inserido com sucesso!!!",
            "data" => $cae,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = CategoriaEvento::find($id);

       $cli = new CategoriaEventoResource(CategoriaEvento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados Categoria Evento!!",
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
       $categoriaevento = CategoriaEvento::find($id);
       $categoriaevento->update($input);

       $cae = new CategoriaEventoResource($categoriaevento);
       $arr_result = [
            "status" => true,
            "mensagem" => "CategoriaEvento Atualizado com Sucesso!!!",
            "data" => $cae
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
