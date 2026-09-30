<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\OcorrenciaPasse;
use App\Http\Resources\OcorrenciaPasseResource;

class OcorrenciaPasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["tratamento"]) ){
              $result_ocp = OcorrenciaPasse::where('ocp_id_tra',$all["tratamento"])->orderBy('ocp_descricao')->get();
           } else {
              $result_ocp = OcorrenciaPasse::orderBy('ocp_descricao')->get();
           }
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = OcorrenciaPasseResource::collection($result_ocp); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados OcorrenciaPasses',
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
        $request->merge(['ocp_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'ocp_descricao' => 'required',
            'ocp_created_at' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $passe = OcorrenciaPasse::create($input);

        $pas = new OcorrenciaPasseResource(OcorrenciaPasse::findOrFail($passe->ocp_id_ocp));

        $arr_result = [
            "status" => true,
            "mensagem" => "Ocorrencia de Passe Inserido com sucesso!!!",
            "data" => $pas,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = OcorrenciaPasse::find($id);

       $cli = new OcorrenciaPasseResource(OcorrenciaPasse::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Ocorrencia Passe!!!",
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
       $passe = OcorrenciaPasse::find($id);
       $passe->update($input);

       $pas = new OcorrenciaPasseResource($passe);
       $arr_result = [
            "status" => true,
            "mensagem" => "Ocorrencia de  Passe Atualizado com Sucesso!!!",
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
