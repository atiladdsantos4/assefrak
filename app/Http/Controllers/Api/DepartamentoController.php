<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Departamento;
use App\Http\Resources\DepartamentoResource;

 //'dep_id_dep','dep_descricao','dep_email','dep_ativo','dep_created_at','dep_updated_at','dep_deleted_at'

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();
        $valor = Departamento::BuscaEmail('Acolhimento');

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_dep = Departamento::orderBy('dep_descricao')->get();
           $result = DepartamentoResource::collection($result_dep); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Departamentos',
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
        $request->merge(['dep_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'dep_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $departamento = Departamento::create($input);

        $dep = new DepartamentoResource(Departamento::findOrFail($departamento->dep_id_dep));

        $arr_result = [
            "status" => true,
            "mensagem" => "Departamento Inserida com sucesso!!!",
            "data" => $dep,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$dep = Departamento::find($id);

       $cli = new DepartamentoResource(Departamento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Departamento!!!",
            "data" => $cli
       ];

       return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Show the form for depting the specified resource.
     */
    public function dept(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

       $input = $request->all();
       $departamento = Departamento::find($id);
       $departamento->update($input);

       $dep = new DepartamentoResource($departamento);
       $arr_result = [
            "status" => true,
            "mensagem" => "Departamento Atualizado com Sucesso!!!",
            "data" => $dep
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
