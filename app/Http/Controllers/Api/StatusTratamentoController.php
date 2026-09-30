<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\StatusTratamento;
use App\Http\Resources\StatusTratamentoResource;

class StatusTratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_stt = StatusTratamento::orderBy('stt_descricao')->get();
           $result = StatusTratamentoResource::collection($result_stt); //only works for colection

           $response = [
                'StatusTratamento' => true,
                'message' => 'Dados StatusTratamento',
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
        $request->merge(['stt_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'stt_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $status = StatusTratamento::create($input);

        $stt = new StatusTratamentoResource(StatusTratamento::findOrFail($status->stt_id_stt));

        $arr_result = [
            "status" => true,
            "mensagem" => "Status do Tratamento Inserido com sucesso!!!",
            "data" => $stt,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = StatusTratamento::find($id);

       $cli = new StatusTratamentoResource(StatusTratamento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados Status do Tratamento!!!",
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
       $StatusTratamento = StatusTratamento::find($id);
       $StatusTratamento->update($input);

       $stt = new StatusTratamentoResource($StatusTratamento);
       $arr_result = [
            "status" => true,
            "mensagem" => "StatusTratamento Atualizado com Sucesso!!!",
            "data" => $stt
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
