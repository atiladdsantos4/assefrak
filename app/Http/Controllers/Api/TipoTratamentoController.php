<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\TipoTratamento;
use App\Http\Resources\TipoTratamentoResource;

class TipoTratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_tit = TipoTratamento::orderBy('tit_descricao')->get();
           $result = TipoTratamentoResource::collection($result_tit); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Tipo Tratamento',
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
        $request->merge(['tit_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'tit_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $TipoTratamento = TipoTratamento::create($input);

        $foc = new TipoTratamentoResource(TipoTratamento::findOrFail($TipoTratamento->tit_id_tit));

        $arr_result = [
            "status" => true,
            "mensagem" => "Tipo Tratamento Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = TipoTratamento::find($id);

       $cli = new TipoTratamentoResource(TipoTratamento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Tipo Tratamento!!!",
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
       $TipoTratamento = TipoTratamento::find($id);
       $TipoTratamento->update($input);

       $foc = new TipoTratamentoResource($TipoTratamento);
       $arr_result = [
            "status" => true,
            "mensagem" => "Tipo Tratamento Atualizado com Sucesso!!!",
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
