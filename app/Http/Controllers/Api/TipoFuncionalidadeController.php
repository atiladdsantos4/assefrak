<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\TipoFuncionalidade;
use App\Http\Resources\TipoFuncionalidadeResource;

class TipoFuncionalidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_tfu = TipoFuncionalidade::orderBy('tfu_descricao')->get();
           $result = TipoFuncionalidadeResource::collection($result_tfu); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados TipoFuncionalidades',
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
        $request->merge(['tfu_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'tfu_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $TipoFuncionalidade = TipoFuncionalidade::create($input);

        $tfu = new TipoFuncionalidadeResource(TipoFuncionalidade::findOrFail($TipoFuncionalidade->tfu_id_tfu));

        $arr_result = [
            "status" => true,
            "mensagem" => "TipoFuncionalidade Inserido com sucesso!!!",
            "data" => $tfu,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$tfu = TipoFuncionalidade::find($id);

       $tfu = new TipoFuncionalidadeResource(TipoFuncionalidade::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados da TipoFuncionalidade!!!",
            "data" => $tfu
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
       $TipoFuncionalidade = TipoFuncionalidade::find($id);
       $TipoFuncionalidade->update($input);

       $tfu = new TipoFuncionalidadeResource($TipoFuncionalidade);
       $arr_result = [
            "status" => true,
            "mensagem" => "TipoFuncionalidade Atualizado com Sucesso!!!",
            "data" => $tfu
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = TipoFuncionalidade::find($id);

        if ($model) {
            $model->delete();
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Registro excluido com Sucesso!!!",
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }

}
