<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\InfAssefrak;
use App\Http\Resources\InfAssefrakResource;

class InfAssefrakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_ina = InfAssefrak::orderBy('ina_url_nome_centro')->get();
           $result = InfAssefrakResource::collection($result_ina);

           $response = [
                'status' => true,
                'message' => 'Dados Assefrak',
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
        $request->merge(['ina_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'ina_url_nome_centro' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $InfAssefrak = InfAssefrak::create($input);

        $ina = new InfAssefrakResource(
            InfAssefrak::findOrFail($InfAssefrak->ina_id_ina)
        );

        $arr_result = [
            "status" => true,
            "mensagem" => "Informações Assefrak inseridas com sucesso!!!",
            "data" => $ina,
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
       //$ina = InfAssefrak::find($id);

       $ina = new InfAssefrakResource(
           InfAssefrak::findOrFail($id)
       );

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados Assefrak!!!",
            "data" => $ina
       ];

       return json_encode($arr_result, JSON_PRETTY_PRINT);
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

       $InfAssefrak = InfAssefrak::find($id);
       $InfAssefrak->update($input);

       $ina = new InfAssefrakResource($InfAssefrak);

       $arr_result = [
            "status" => true,
            "mensagem" => "Informações Assefrak atualizadas com sucesso!!!",
            "data" => $ina
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = InfAssefrak::find($id);

        if ($model) {
            $model->delete();
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Registro Assefrak excluído com sucesso!!!",
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }
}
