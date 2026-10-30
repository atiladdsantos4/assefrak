<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\ComportamentoPassivo;
use App\Http\Resources\ComportamentoPassivoResource;

class ComportamentoPassivoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cpp = ComportamentoPassivo::orderBy('cpp_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = ComportamentoPassivoResource::collection($result_cpp); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados ComportamentoPassivos',
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
        $request->merge(['cpp_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cpp_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cossono = ComportamentoPassivo::create($input);

        $cos = new ComportamentoPassivoResource(ComportamentoPassivo::findOrFail($cossono->cpp_id_cpp));

        $arr_result = [
            "status" => true,
            "mensagem" => "ComportamentoPassivo Inserido com sucesso!!!",
            "data" => $cos,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = ComportamentoPassivo::find($id);

       $cli = new ComportamentoPassivoResource(ComportamentoPassivo::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do ComportamentoPassivo!!!",
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
       $cossono = ComportamentoPassivo::find($id);
       $cossono->update($input);

       $cos = new ComportamentoPassivoResource($cossono);
       $arr_result = [
            "status" => true,
            "mensagem" => "ComportamentoPassivo Atualizado com Sucesso!!!",
            "data" => $cos
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
