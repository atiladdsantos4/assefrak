<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\CursoItem;
use App\Http\Resources\CursoItemResource;
use Illuminate\Support\Facades\Storage;

class CursoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["curso"]) ){
              $result_cui = CursoItem::where('cui_id_cur',$all["curso"])->orderBy('cui_tipo_informacao','DESC')->get();
           } else {
              $result_cui = CursoItem::orderBy('cui_id_cur')->get();
           }

           $result = CursoItemResource::collection($result_cui); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Curso Item',
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
        $request->merge(['cui_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cui_id_cur' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cursoitem = CursoItem::create($input);
        if( isset($input["has_image_itemcurso"]) ){
            $postjson = json_decode($input["cui_dados_inf"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));

            //atualiza o campo meta com o id do item curso para posterior atualizaçao de imagem
            $postjson["meta"][0]["idcursoitem"] = $cursoitem->cui_id_cui;
            $postjson["meta"][0]["file"] = [];
            $input["cui_dados_inf"] = json_encode($postjson);
            $cuiItem = CursoItem::find($cursoitem->cui_id_cui);
            $cuiItem->update($input);
            // fim atualiza //
        }

        if( isset($input["has_image"]) ){
            $postjson = json_decode($input["cui_dados_inf"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));

            //atualiza o campo meta com o id do item curso para posterior atualizaçao de imagem
            $postjson["meta"][0]["idcursoitem"] = $cursoitem->cui_id_cui;
            $postjson["meta"][0]["file"] = [];
            $input["cui_dados_inf"] = json_encode($postjson);
            $cuiItem = CursoItem::find($cursoitem->cui_id_cui);
            $cuiItem->update($input);
            // fim atualiza //
        }


        $cui = new CursoItemResource(CursoItem::findOrFail($cursoitem->cui_id_cui));

        $arr_result = [
            "status" => true,
            "mensagem" => "CursoItem Inserido com sucesso!!!",
            "data" => $cui,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$cui = CursoItem::find($id);

       $cli = new CursoItemResource(CursoItem::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do CursoItem!!!",
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
       $cursoitem = CursoItem::find($id);
       $deletejson = json_decode($cursoitem->cui_dados_inf, true); // define nome da imagem pra exclusao //
       $cursoitem->update($input);

       if( isset($input["has_image"])){
            $id = str_pad($cursoitem->cui_id_cur,2,'0',STR_PAD_LEFT); //pega o id do curso
            $path_delete = 'img/curso/'.$id.'/'.$deletejson["meta"][0]["imagem"]; //define a imagema ser excluida
            Storage::disk('inertia_img')->delete($path_delete); //deleta a imagem antiga
            $postjson = json_decode($input["cui_dados_inf"], true);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/'.$postjson["meta"][0]["path"];
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
       } else {

            if( isset($input["has_image_itemcurso"]) ){
                $path_delete = 'img/'.$deletejson["meta"][0]["path"]; //define a imagema ser excluida
                Storage::disk('inertia_img')->delete($path_delete); //deleta a imagem antiga
                //$postjson = json_decode($input["cui_dados_inf"], true);
                $file = $request->file('file');
                $fileName  = $file->getClientOriginalName();
                $id = str_pad($cursoitem->cui_id_cur,2,'0',STR_PAD_LEFT); //pega o id do curso
                $path = 'img/curso/lista/'.$id.'/'.$fileName;
                //Adiciona a nova imagem e atualiza o conteudo
                Storage::disk('inertia_img')->put($path, file_get_contents($file));

                $arr_result = [
                "status" => true,
                "mensagem" => "Imagem do Atualizada com sucesso!!!",
                "cursoitemid" => $cursoitem->cui_id_cui,
                ];

                return json_encode($arr_result,JSON_PRETTY_PRINT);
           }
       }


       $cui = new CursoItemResource($cursoitem);
       $arr_result = [
            "status" => true,
            "mensagem" => "CursoItem Atualizado com Sucesso!!!",
            "data" => $cui
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
