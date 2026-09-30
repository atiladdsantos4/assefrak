<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\CondicaoEnergetica;
use App\Http\Resources\CondicaoEnergeticaResource;

class CondicaoEnergeticaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_condicao = CondicaoEnergetica::orderBy('coe_descricao')->get();
           $result = CondicaoEnergeticaResource::collection($result_condicao); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Condição Energética',
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
        $request->merge(['coe_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'coe_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $CondicaoEnergetica = CondicaoEnergetica::create($input);

        $foc = new CondicaoEnergeticaResource(CondicaoEnergetica::findOrFail($CondicaoEnergetica->coe_id_coe));

        $arr_result = [
            "status" => true,
            "mensagem" => "Condição Energética Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = CondicaoEnergetica::find($id);

       $cli = new CondicaoEnergeticaResource(CondicaoEnergetica::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Condicao Energetica!!!",
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
       $CondicaoEnergetica = CondicaoEnergetica::find($id);
       $CondicaoEnergetica->update($input);

       $foc = new CondicaoEnergeticaResource($CondicaoEnergetica);
       $arr_result = [
            "status" => true,
            "mensagem" => "Condicao Energetica Atualizado com Sucesso!!!",
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
