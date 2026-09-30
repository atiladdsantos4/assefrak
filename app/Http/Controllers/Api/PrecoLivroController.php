<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\PrecoLivro;
use App\Http\Resources\PrecoLivroResource;
use App\Rules\datavigorExist;

class PrecoLivroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_prl = PrecoLivro::orderBy('prl_id_liv')->get();
           $result = PrecoLivroResource::collection($result_prl); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Preco Livros',
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
        $request->merge(['prl_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'prl_id_liv' => ['required', new datavigorExist($input['prl_data_vigor'],$input['prl_id_liv'])],
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        if($input["prl_valor_atual"] == 1){
          PrecoLivro::where('prl_id_liv',$input["prl_id_liv"])->update(['prl_valor_atual'=> '0']);
        }

        $precolivro = PrecoLivro::create($input);

        $request->merge(['id' => $precolivro->prl_id_prl]);
        $request->merge(['livro' => $precolivro->livro->liv_titulo]);
        $request->merge(['valor' => $precolivro->prl_valor_desconto]);
        PrecoLivro::geraQrcode($request);

        $prl = new PrecoLivroResource(PrecoLivro::findOrFail($precolivro->prl_id_prl));

        $arr_result = [
            "status" => true,
            "mensagem" => "Preco Livro Inserido com sucesso!!!",
            "data" => $prl,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$prl = PrecoLivro::find($id);

       $cli = new PrecoLivroResource(PrecoLivro::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Preco Livro!!!",
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
       $precolivro = PrecoLivro::find($id);

       if($input["prl_valor_atual"] == 1){
          PrecoLivro::where('prl_id_liv',$input["prl_id_liv"])->where('prl_id_prl','<>',$precolivro->prl_id_prl)->update(['prl_valor_atual'=> '0']);
          $request->merge(['id' => $precolivro->prl_id_prl]);
          $request->merge(['livro' => $precolivro->livro->liv_titulo]);
          $request->merge(['valor' => $input["prl_valor_desconto"]]);
          PrecoLivro::geraQrcode($request);
       }

       $precolivro->update($input);

       $prl = new PrecoLivroResource($precolivro);
       $arr_result = [
            "status" => true,
            "mensagem" => "Preco Livro Atualizado com Sucesso!!!",
            "data" => $prl
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
