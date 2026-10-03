<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\SaidaEstoque;
use App\Models\EntradaEstoque;
use App\Http\Resources\SaidaEstoqueResource;


class SaidaEstoqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_sae = SaidaEstoque::orderBy('sae_created_at')->get();
           $result = SaidaEstoqueResource::collection($result_sae); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados SaidaEstoques',
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
        $exist = true;
        $random = null;
        while($exist):
           $random = rand(10,999999);
           $exist = SaidaEstoque::where('sae_hash',$random)->exists();
        endwhile;
        $input = $request->all();
        //buscando o estoque mais antigo//
        $disponivel = EntradaEstoque::where('ene_id_liv',$input["sae_id_liv"])
        ->whereRaw('(ene_qtde - ene_saida) > 0')
        ->orderBy('ene_created_at', 'DESC')
        ->first();
        //criar a data de criação
        //$qtdatual = $disponivel->ene_qtde
        $request->merge(['sae_hash' => $random]);
        $request->merge(['sae_created_at' => date("Y-m-d H:i:s")]);
        $request->merge(['sae_id_ene' => $disponivel->ene_id_ene]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'sae_id_liv' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $saida = SaidaEstoque::create($input);
        $qtdesaida = $disponivel->ene_saida + 1;
        EntradaEstoque::where('ene_id_ene',$disponivel->ene_id_ene)->update(['ene_saida'=> $qtdesaida]);

        $sae = new SaidaEstoqueResource(SaidaEstoque::findOrFail($saida->sae_id_sae));

        $arr_result = [
            "status" => true,
            "mensagem" => "Saida Estoque Inserida com sucesso!!!",
            "data" => $sae,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$sae = SaidaEstoque::find($id);

       $cli = new SaidaEstoqueResource(SaidaEstoque::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Saida Estoque!!!",
            "data" => $cli
       ];

       return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Show the form for saeting the specified resource.
     */
    public function saet(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

       $input = $request->all();
       $saida = SaidaEstoque::find($id);
       $estavacancelado = $saida->sae_cancelado;
       $saida->update($input);

       //cancela a transação
       if( $input["sae_cancelado"] == 'S'){
          $entrada = EntradaEstoque::find($saida->sae_id_ene);
          $qtderetornoestoque = $entrada->ene_saida - 1;
          EntradaEstoque::where('ene_id_ene',$entrada->ene_id_ene)->update(['ene_saida'=> $qtderetornoestoque]);
       }

       //reverte  cancelamento a transação
       if( $estavacancelado == 'S' && $input["sae_cancelado"] == 'N'){
          $entrada = EntradaEstoque::find($saida->sae_id_ene);
          $qtdesaida = $entrada->ene_saida +1 ;
          EntradaEstoque::where('ene_id_ene',$entrada->ene_id_ene)->update(['ene_saida'=> $qtdesaida]);
       }


       $sae = new SaidaEstoqueResource($saida);
       $arr_result = [
            "status" => true,
            "mensagem" => "Saida Estoque Atualizado com Sucesso!!!",
            "data" => $sae
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
