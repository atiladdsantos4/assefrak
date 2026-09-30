<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\PublicoFoco;
use App\Http\Resources\PublicoFocoResource;

class PublicoFocoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_foco = PublicoFoco::orderBy('puf_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = PublicoFocoResource::collection($result_foco); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Publico Foco',
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
        $request->merge(['puf_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'puf_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $foco = PublicoFoco::create($input);

        $pas = new PublicoFocoResource(PublicoFoco::findOrFail($foco->puf_id_puf));

        $arr_result = [
            "status" => true,
            "mensagem" => "PublicoFoco Inserido com sucesso!!!",
            "data" => $pas,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = PublicoFoco::find($id);

       $cli = new PublicoFocoResource(PublicoFoco::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do PublicoFoco!!!",
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
       $passe = PublicoFoco::find($id);
       $passe->update($input);

       $pas = new PublicoFocoResource($passe);
       $arr_result = [
            "status" => true,
            "mensagem" => "PublicoFoco Atualizado com Sucesso!!!",
            "data" => $pas
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
