<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Livro;
use App\Http\Resources\LivroResource;
use Illuminate\Support\Facades\Storage;

class LivroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_liv = Livro::orderBy('liv_titulo')->get();
           $result = LivroResource::collection($result_liv); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Livros',
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
        $request->merge(['liv_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'liv_titulo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Livro = Livro::create($input);

        if( isset($input["has_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/livraria/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
        }

        $liv = new LivroResource(Livro::findOrFail($Livro->liv_id_liv));

        $arr_result = [
            "status" => true,
            "mensagem" => "Livro Inserido com sucesso!!!",
            "data" => $liv,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$liv = Livro::find($id);

       $cli = new LivroResource(Livro::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Livro!!!",
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
       $Livro = Livro::find($id);
       $Livro->update($input);

       if( isset($input["has_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/livraria/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
        }

       $liv = new LivroResource($Livro);
       $arr_result = [
            "status" => true,
            "mensagem" => "Livro Atualizado com Sucesso!!!",
            "data" => $liv
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
