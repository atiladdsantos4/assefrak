<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Colaborador;
use App\Http\Resources\ColaboradorResource;
use Illuminate\Support\Facades\Storage;

class ColaboradorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["palestrante"]) ){
              $desc = 'Palestrante';
              $result_pal = Colaborador::whereRaw("exists(select 1 from ocu_ocupacao where ocu_id_ocu = col_ocupacao and ocu_descricao='Palestrante')")
              ->orderBy('col_name')->get();
            } else {
              $result_pal = Colaborador::orderBy('col_name')->get();
           }
           $result = ColaboradorResource::collection($result_pal); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Colaboradores',
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
        $request->merge(['col_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'col_name' => 'required',
            'col_nascimento' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $colaborador = Colaborador::create($input);

        if( isset($input["has_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/equipe/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
        }

        $aco = new ColaboradorResource(Colaborador::findOrFail($colaborador->col_id_col));

        $arr_result = [
            "status" => true,
            "mensagem" => "Colaborador Inserido com sucesso!!!",
            "data" => $aco,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$aco = Colaborador::find($id);

       $cli = new ColaboradorResource(Colaborador::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Colaborador!!!",
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
       $colaborador = Colaborador::find($id);
       $colaborador->update($input);

       if( isset($input["has_only_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/equipe/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));

            $arr_result = [
               "status" => true,
               "mensagem" => "Imagem do Atulizada com sucesso!!!",
               "palestra" => $colaborador
            ];

            return json_encode($arr_result,JSON_PRETTY_PRINT);
       }

       if( isset($input["has_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/equipe/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
       }

       $aco = new ColaboradorResource($colaborador);
       $arr_result = [
            "status" => true,
            "mensagem" => "cliente Atualizado com Sucesso!!!",
            "data" => $aco
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
