<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\ApresentacaoItem;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ApresentacaoItemResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;



class ApresentacaoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_apr = ApresentacaoItem::orderBy('apr_id_pal')->get();
           $result = ApresentacaoItemResource::collection($result_apr); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados ApresentacaoItem',
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
        $request->merge(['api_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        // Reordenar a Apresentação //
        if(isset($input["ordenacao"])){
           $cont = 0;
           $postjson = json_decode($input["api_ordena"], true);
            for($i = 0; $i < count($postjson["meta"]);$i++){
                $cont++;
                ApresentacaoItem::where('api_id_api',$postjson["meta"][$i]["id"])->update(['api_posicao' =>$postjson["meta"][$i]["posicao"]]);
            }
            $arr_result = [
                "status" => true,
                "mensagem" => "Apresentacao Reordenada com sucesso!!!",
            ];

            return json_encode($arr_result,JSON_PRETTY_PRINT);

        }



        $validator = Validator::make($input, [
            'api_id_apr' => 'required',
            'api_tipo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $apresentacaoitem = ApresentacaoItem::create($input);
        if( isset($input["has_image_slide"]) ){
            $idfolder = str_pad($apresentacaoitem->api_id_apr, 2, '0', STR_PAD_LEFT);
            $postjson = json_decode($input["api_conteudo"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/apresentacao/'.$idfolder.'/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));

            //atualiza o campo meta com o id do item evento para posterior atualizaçao de imagem
            $postjson["meta"][0]["idslideitem"] = $apresentacaoitem->api_id_api;
            $postjson["meta"][0]["saved"] = true;
            $postjson["meta"][0]["file"] = [];
            $input["api_conteudo"] = json_encode($postjson);
            $input["api_posicao"] = $postjson["meta"][0]["posicao"];
            $eviItem = ApresentacaoItem::find($apresentacaoitem->api_id_api);
            $eviItem->update($input);
            // fim atualiza //
        } else {
            $postjson = json_decode($input["api_conteudo"], true);
            if($input["api_tipo"] == 'V'){
               $postjson["meta"][0]["idvideoitem"] = $apresentacaoitem->api_id_api;
               $postjson["meta"][0]["load"] = false;
               $postjson["meta"][0]["saved"] = true;
            }
            if($input["api_tipo"] == 'A'){
               $postjson["meta"][0]["idaudioitem"] = $apresentacaoitem->api_id_api;
               $postjson["meta"][0]["load"] = false;
               $postjson["meta"][0]["saved"] = true;
            }
            $input["api_conteudo"] = json_encode($postjson);
            $apr = ApresentacaoItem::find($apresentacaoitem->api_id_api);
            $apr->update($input);
        }

        $apr = new ApresentacaoItemResource(ApresentacaoItem::findOrFail($apresentacaoitem->api_id_api));

        $arr_result = [
            "status" => true,
            "mensagem" => "ApresentacaoItem Inserido com sucesso!!!",
            "data" => $apr,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$apr = ApresentacaoItem::find($id);

       $cli = new ApresentacaoItemResource(ApresentacaoItem::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do ApresentacaoItem!!!",
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
       $apresentacaoitem = ApresentacaoItem::find($id);

       if( isset($input["has_image_slide"]) ){
            $idfolder = str_pad($apresentacaoitem->api_id_apr, 2, '0', STR_PAD_LEFT);
            $postjson = json_decode($input["api_conteudo"], true);
            $postjson_old = json_decode($apresentacaoitem->api_conteudo, true);
            $path_delete ='assets/img/apresentacao/'.$idfolder.'/'.$postjson_old["meta"][0]["path"];
            //remove imagem antiga//
            if( File::exists(public_path($path_delete))) {
                File::delete(public_path($path_delete));
            }
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/apresentacao/'.$idfolder.'/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
       }  else {
            $postjson = json_decode($input["api_conteudo"], true);
            if($input["api_tipo"] == 'V'){
               $postjson["meta"][0]["load"] = false;
               $postjson["meta"][0]["saved"] = true;
            }
            if($input["api_tipo"] == 'A'){
               $postjson["meta"][0]["load"] = false;
               $postjson["meta"][0]["saved"] = true;
            }
            $input["api_conteudo"] = json_encode($postjson);
            $apr = ApresentacaoItem::find($apresentacaoitem->api_id_api);
            $apr->update($input);
        }


       $apresentacaoitem->update($input);

       $apr = new ApresentacaoItemResource($apresentacaoitem);
       $arr_result = [
            "status" => true,
            "mensagem" => "ApresentacaoItem Atualizado com Sucesso!!!",
            "data" => $apr
       ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $apresentacaoitem = ApresentacaoItem::find($id);
        $api_id_apr = $apresentacaoitem->api_id_apr;
        $tipo = $apresentacaoitem->api_tipo;
        $apresentacaoitem->delete();

        //tipo video
        if( $tipo == 'V' ){
            $apresentacaoitem = ApresentacaoItem::where('api_id_apr',$apresentacaoitem->api_id_apr)
            ->where('api_tipo','V')
            ->orderBy('api_id_api')
            ->get();
            $cont = 0;
            for($i = 0; $i < count($apresentacaoitem);$i++){
                $cont++;
                $dados =  json_decode($apresentacaoitem[$i]["api_conteudo"], true);
                $dados["meta"][0]["id"] = $cont;
                $json = json_encode($dados,JSON_UNESCAPED_UNICODE);
                ApresentacaoItem::where('api_id_api',$dados["meta"][0]["idvideoitem"])->update(['api_conteudo' =>$json]);
            }
        }

        //tipo slide
        if( $tipo == 'S' ){
            $apresentacaoitem = ApresentacaoItem::where('api_id_apr',$apresentacaoitem->api_id_apr)
            ->where('api_tipo','S')
            ->orderBy('api_id_api')
            ->get();
            $cont = 0;
            for($i = 0; $i < count($apresentacaoitem);$i++){
                $cont++;
                $dados =  json_decode($apresentacaoitem[$i]["api_conteudo"], true);
                $dados["meta"][0]["id"] = $cont;
                $json = json_encode($dados,JSON_UNESCAPED_UNICODE);
                ApresentacaoItem::where('api_id_api',$dados["meta"][0]["idslideitem"])->update(['api_conteudo' =>$json]);
            }
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Exclucão efetuada com Sucesso!!!",
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

}

/*
 $input["api_conteudo"] = json_encode($postjson);
 $apr = ApresentacaoItem::find($apresentacaoitem->api_id_api);
 $apr->update($input);
*/

