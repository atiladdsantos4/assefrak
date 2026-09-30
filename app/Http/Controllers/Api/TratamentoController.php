<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Tratamento;
use App\Http\Resources\TratamentoResource;

class TratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["acolhido"]) && isset($all["tratamento"]) ){
             $result_tra = Tratamento::where('tra_id_aco',$all["acolhido"])->where('tra_id_tra',$all["tratamento"])->orderBy('tra_created_at')->get();
           } elseif( isset($all["acolhido"]) ){
             $result_tra = Tratamento::where('tra_id_aco',$all["acolhido"])->orderBy('tra_created_at')->get();
           } else {
             $result_tra = Tratamento::orderBy('tra_created_at')->get();
           }
           $result = TratamentoResource::collection($result_tra); //only works for traection

           $response = [
                'status' => true,
                'message' => 'Dados Tratamentoes',
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
        $request->merge(['tra_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'tra_pri_impressao' => 'required',
            'tra_id_aco' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $tratamento = Tratamento::create($input);

        $tratamento = new TratamentoResource(Tratamento::findOrFail($tratamento->tra_id_tra));

        $arr_result = [
            "status" => true,
            "mensagem" => "Tratamento Inserido com sucesso!!!",
            "data" => $tratamento,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$tratamento = Tratamento::find($id);

       $tra = new TratamentoResource(Tratamento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Tratamento!!!",
            "data" => $tra
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
       $tratamento = Tratamento::find($id);
       $tratamento->update($input);

       $tratamento = new TratamentoResource($tratamento);
       $arr_result = [
            "status" => true,
            "mensagem" => "cliente Atualizado com Sucesso!!!",
            "data" => $tratamento
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
