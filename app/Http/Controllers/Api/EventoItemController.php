<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\EventoItem;
use App\Http\Resources\EventoItemResource;
use Illuminate\Support\Facades\Storage;


class EventoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["evento"]) ){
              $result_evi = EventoItem::where('evi_id_eve',$all["evento"])->orderBy('evi_tipo_informacao','DESC')->get();
           } else {
              $result_evi = EventoItem::orderBy('evi_id_eve')->get();
           }

           $result = EventoItemResource::collection($result_evi); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Evento Item',
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
        $request->merge(['evi_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'evi_id_eve' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $eventoItem = EventoItem::create($input);
        if( isset($input["has_image"]) ){
            $postjson = json_decode($input["evi_dados_inf"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));

            //atualiza o campo meta com o id do item evento para posterior atualizaçao de imagem
            $postjson["meta"][0]["ideventoitem"] = $eventoItem->evi_id_evi;
            $postjson["meta"][0]["file"] = [];
            $input["evi_dados_inf"] = json_encode($postjson);
            $eviItem = EventoItem::find($eventoItem->evi_id_evi);
            $eviItem->update($input);
            // fim atualiza //
        }

        $evi = new EventoItemResource(EventoItem::findOrFail($eventoItem->evi_id_evi));

        $arr_result = [
            "status" => true,
            "mensagem" => "EventoItem Inserido com sucesso!!!",
            "data" => $evi,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$evi = EventoItem::find($id);

       $cli = new EventoItemResource(EventoItem::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do EventoItem!!!",
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
       $eventoItem = EventoItem::find($id);
       $eventoItem->update($input);
       if( isset($input["has_image"]) || isset($input["has_image_itemevento"])){
            $postjson = json_decode($input["evi_dados_inf"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
       } else {

            if( isset($input["has_image"]) ){

                $file = $request->file('file');
                $fileName  = $file->getClientOriginalName();
                $path = 'img/evento/'.$fileName;
                //Adiciona a nova imagem e atualiza o conteudo
                Storage::disk('inertia_img')->put($path, file_get_contents($file));

                $arr_result = [
                "status" => true,
                "mensagem" => "Imagem do Atualizada com sucesso!!!",
                "enventoitemid" => $eventoItem->evi_id_evi,
                ];

                return json_encode($arr_result,JSON_PRETTY_PRINT);
           }
       }


       $evi = new EventoItemResource($eventoItem);
       $arr_result = [
            "status" => true,
            "mensagem" => "EventoItem Atualizado com Sucesso!!!",
            "data" => $evi
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
