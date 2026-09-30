<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Alerta;
use App\Http\Resources\AlertaResource;

class AlertaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_ale = Alerta::orderBy('ale_descricao')->get();
           $result = AlertaResource::collection($result_ale); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Alertas',
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
        $request->merge(['ale_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'ale_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Alerta = Alerta::create($input);

        $ale = new AlertaResource(Alerta::findOrFail($Alerta->ale_id_ale));

        $arr_result = [
            "status" => true,
            "mensagem" => "Alerta Inserido com sucesso!!!",
            "data" => $ale,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$ale = Alerta::find($id);

       $cli = new AlertaResource(Alerta::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Alerta!!!",
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
       $Alerta = Alerta::find($id);
       $Alerta->update($input);

       $ale = new AlertaResource($Alerta);
       $arr_result = [
            "status" => true,
            "mensagem" => "Alerta Atualizado com Sucesso!!!",
            "data" => $ale
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
