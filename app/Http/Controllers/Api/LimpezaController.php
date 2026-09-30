<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Limpeza;
use App\Http\Resources\LimpezaResource;

class LimpezaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_lim = Limpeza::orderBy('lim_descricao')->get();
           $result = LimpezaResource::collection($result_lim); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Limpeza',
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
        $request->merge(['lim_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'lim_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Limpeza = Limpeza::create($input);

        $foc = new LimpezaResource(Limpeza::findOrFail($Limpeza->lim_id_lim));

        $arr_result = [
            "status" => true,
            "mensagem" => "Limpeza Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = Limpeza::find($id);

       $cli = new LimpezaResource(Limpeza::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Limpeza!!!",
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
       $Limpeza = Limpeza::find($id);
       $Limpeza->update($input);

       $foc = new LimpezaResource($Limpeza);
       $arr_result = [
            "status" => true,
            "mensagem" => "Limpeza Atualizado com Sucesso!!!",
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
