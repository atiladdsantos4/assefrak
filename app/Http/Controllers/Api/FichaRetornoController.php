<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\FichaRetorno;
use App\Http\Resources\FichaRetornoResource;

class FichaRetornoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
          if( isset($all["entrevista"]) ){
              $result_fir = FichaRetorno::where('fir_id_fie',$all["entrevista"])->orderBy('fir_sequencia','ASC')->get();
           } else {
              $result_fir = FichaRetorno::orderBy('fir_id_fie')->get();
           }

           $result = FichaRetornoResource::collection($result_fir); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Ficha Retorno',
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
        $request->merge(['fir_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'fir_id_fie' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $FichaRetorno = FichaRetorno::create($input);

        $foc = new FichaRetornoResource(FichaRetorno::findOrFail($FichaRetorno->fir_id_fir));

        $arr_result = [
            "status" => true,
            "mensagem" => "Ficha Retorno Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = FichaRetorno::find($id);

       $cli = new FichaRetornoResource(FichaRetorno::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do FichaRetorno!!!",
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
       $FichaRetorno = FichaRetorno::find($id);
       $FichaRetorno->update($input);

       $foc = new FichaRetornoResource($FichaRetorno);
       $arr_result = [
            "status" => true,
            "mensagem" => "FichaRetorno Atualizado com Sucesso!!!",
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
