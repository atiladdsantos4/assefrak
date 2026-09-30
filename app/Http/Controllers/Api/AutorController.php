<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Autor;
use App\Http\Resources\AutorResource;

class AutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_aut = Autor::orderBy('aut_nome')->get();
           $result = AutorResource::collection($result_aut); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Autores',
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
        $request->merge(['aut_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'aut_nome' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Autor = Autor::create($input);

        $aut = new AutorResource(Autor::findOrFail($Autor->aut_id_aut));

        $arr_result = [
            "status" => true,
            "mensagem" => "Autor Inserido com sucesso!!!",
            "data" => $aut,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$aut = Autor::find($id);

       $cli = new AutorResource(Autor::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Autor!!!",
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
       $Autor = Autor::find($id);
       $Autor->update($input);

       $aut = new AutorResource($Autor);
       $arr_result = [
            "status" => true,
            "mensagem" => "Autor Atualizado com Sucesso!!!",
            "data" => $aut
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
