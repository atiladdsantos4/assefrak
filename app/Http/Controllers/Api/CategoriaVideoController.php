<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\CategoriaVideo;
use App\Http\Resources\CategoriaVideoResource;

class CategoriaVideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cav = CategoriaVideo::orderBy('cav_descricao')->get();
           $result = CategoriaVideoResource::collection($result_cav); //only works for colection

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
        $request->merge(['cav_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cav_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $status = CategoriaVideo::create($input);

        $cav = new CategoriaVideoResource(CategoriaVideo::findOrFail($status->cav_id_cav));

        $arr_result = [
            "status" => true,
            "mensagem" => "Status do Tratamento Inserido com sucesso!!!",
            "data" => $cav,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = CategoriaVideo::find($id);

       $cli = new CategoriaVideoResource(CategoriaVideo::findOrFail($id));

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
       $categoriaevento = CategoriaVideo::find($id);
       $categoriaevento->update($input);

       $cav = new CategoriaVideoResource($categoriaevento);
       $arr_result = [
            "status" => true,
            "mensagem" => "CategoriaVideo Atualizado com Sucesso!!!",
            "data" => $cav
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
