<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\DiaPasse;
use App\Http\Resources\DiaPasseResource;

class DiaPasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_dip = DiaPasse::orderBy('dip_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = DiaPasseResource::collection($result_dip); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados DiaPasses',
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
        $request->merge(['dip_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'dip_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cossono = DiaPasse::create($input);

        $cos = new DiaPasseResource(DiaPasse::findOrFail($cossono->dip_id_dip));

        $arr_result = [
            "status" => true,
            "mensagem" => "DiaPasse Inserido com sucesso!!!",
            "data" => $cos,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = DiaPasse::find($id);

       $cli = new DiaPasseResource(DiaPasse::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do DiaPasse!!!",
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
       $cossono = DiaPasse::find($id);
       $cossono->update($input);

       $cos = new DiaPasseResource($cossono);
       $arr_result = [
            "status" => true,
            "mensagem" => "DiaPasse Atualizado com Sucesso!!!",
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
