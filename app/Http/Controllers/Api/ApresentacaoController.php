<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\Apresentacao;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ApresentacaoResource;



class ApresentacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_apr = Apresentacao::orderBy('apr_id_pal')->get();
           $result = ApresentacaoResource::collection($result_apr); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Apresentacao',
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
        $request->merge(['apr_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();



        $validator = Validator::make($input, [
            'apr_id_pal' => 'required',
            'apr_id_col' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Apresentacao = Apresentacao::create($input);

        $apr = new ApresentacaoResource(Apresentacao::findOrFail($Apresentacao->apr_id_apr));

        $arr_result = [
            "status" => true,
            "mensagem" => "Apresentacao Inserido com sucesso!!!",
            "data" => $apr,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$apr = Apresentacao::find($id);

       $cli = new ApresentacaoResource(Apresentacao::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Apresentacao!!!",
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
       $Apresentacao = Apresentacao::find($id);

       if( isset($input["has_image_slide"]) ){
            $idfolder = str_pad($input["apr_id_apr"], 2, '0', STR_PAD_LEFT);
            $postjson = json_decode($input["apr_dados_inf"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/apresentacao/'.$idfolder.'/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));

            //atualiza o campo meta com o id do item evento para posterior atualizaçao de imagem
            $postjson["meta"][0]["idslideitem"] = $eventoItem->evi_id_evi;
            $postjson["meta"][0]["file"] = [];
            $input["evi_dados_inf"] = json_encode($postjson);
            $eviItem = Apresentacao::find($input["apr_id_apr"]);
            $eviItem->update($input);
            // fim atualiza //
        }


       $Apresentacao->update($input);

       $apr = new ApresentacaoResource($Apresentacao);
       $arr_result = [
            "status" => true,
            "mensagem" => "Apresentacao Atualizado com Sucesso!!!",
            "data" => $apr
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

