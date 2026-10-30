<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\OrientacaoCasa;
use App\Http\Resources\OrientacaoCasaResource;

class OrientacaoCasaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_orc = OrientacaoCasa::orderBy('orc_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = OrientacaoCasaResource::collection($result_orc); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados OrientacaoCasas',
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
        $request->merge(['orc_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'orc_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cossono = OrientacaoCasa::create($input);

        $cos = new OrientacaoCasaResource(OrientacaoCasa::findOrFail($cossono->orc_id_orc));

        $arr_result = [
            "status" => true,
            "mensagem" => "OrientacaoCasa Inserido com sucesso!!!",
            "data" => $cos,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = OrientacaoCasa::find($id);

       $cli = new OrientacaoCasaResource(OrientacaoCasa::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do OrientacaoCasa!!!",
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
       $cossono = OrientacaoCasa::find($id);
       $cossono->update($input);

       $cos = new OrientacaoCasaResource($cossono);
       $arr_result = [
            "status" => true,
            "mensagem" => "OrientacaoCasa Atualizado com Sucesso!!!",
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
