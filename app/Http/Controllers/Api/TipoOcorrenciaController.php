<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\TipoOcorrencia;
use App\Http\Resources\TipoOcorrenciaResource;

class TipoOcorrenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_top = TipoOcorrencia::orderBy('top_descricao')->get();
           $result = TipoOcorrenciaResource::collection($result_top); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Tipo Ocorrencia',
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
        $request->merge(['top_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'top_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $TipoOcorrencia = TipoOcorrencia::create($input);

        $foc = new TipoOcorrenciaResource(TipoOcorrencia::findOrFail($TipoOcorrencia->top_id_top));

        $arr_result = [
            "status" => true,
            "mensagem" => "Tipo Ocorrencia Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = TipoOcorrencia::find($id);

       $cli = new TipoOcorrenciaResource(TipoOcorrencia::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Tipo Ocorrencia!!!",
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
       $TipoOcorrencia = TipoOcorrencia::find($id);
       $TipoOcorrencia->update($input);

       $foc = new TipoOcorrenciaResource($TipoOcorrencia);
       $arr_result = [
            "status" => true,
            "mensagem" => "Tipo Ocorrencia Atualizado com Sucesso!!!",
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
