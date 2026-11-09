<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\ComportamentoReativo;
use App\Http\Resources\ComportamentoReativoResource;

class ComportamentoReativoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cpr = ComportamentoReativo::orderBy('cpr_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = ComportamentoReativoResource::collection($result_cpr); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados ComportamentoReativos',
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
        $request->merge(['cpr_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cpr_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cossono = ComportamentoReativo::create($input);

        $cos = new ComportamentoReativoResource(ComportamentoReativo::findOrFail($cossono->cpr_id_cpr));

        $arr_result = [
            "status" => true,
            "mensagem" => "ComportamentoReativo Inserido com sucesso!!!",
            "data" => $cos,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = ComportamentoReativo::find($id);

       $cli = new ComportamentoReativoResource(ComportamentoReativo::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do ComportamentoReativo!!!",
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
       $cossono = ComportamentoReativo::find($id);
       $cossono->update($input);

       $cos = new ComportamentoReativoResource($cossono);
       $arr_result = [
            "status" => true,
            "mensagem" => "ComportamentoReativo Atualizado com Sucesso!!!",
            "data" => $cos
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
 * Remove the specified resource from storage.
 */
    public function destroy(string $id)
    {
        $cpr = ComportamentoReativo::find($id);
        $cpr->delete();

        $arr_result = [
            "status" => true,
            "mensagem" => "Registro excluido com Sucesso!!!",
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }

}
