<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\LivroPix;
use App\Http\Resources\LivroPixResource;

class LivroPixController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_lip = LivroPix::orderBy('lip_id_prl')->get();
           $result = LivroPixResource::collection($result_lip); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Livro Pix',
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
        $request->merge(['lip_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'lip_id_prl' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $LivroPix = LivroPix::create($input);

        $foc = new LivroPixResource(LivroPix::findOrFail($LivroPix->lip_id_lip));

        $arr_result = [
            "status" => true,
            "mensagem" => "LivroPix Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = LivroPix::find($id);

       $cli = new LivroPixResource(LivroPix::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do LivroPix!!!",
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
       $LivroPix = LivroPix::find($id);
       $LivroPix->update($input);

       $foc = new LivroPixResource($LivroPix);
       $arr_result = [
            "status" => true,
            "mensagem" => "LivroPix Atualizado com Sucesso!!!",
            "data" => $foc
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
