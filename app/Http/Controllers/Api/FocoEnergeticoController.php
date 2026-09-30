<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\FocoEnergetico;
use App\Http\Resources\FocoEnergeticoResource;

/*
use App\Jobs\ProcessMail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Cliente;
use App\Models\ClienteAgendado;
use App\Models\HorarioAgenda;
use App\Models\Pix;
use App\Http\Resources\ClienteResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

*/

class FocoEnergeticoController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_foco = FocoEnergetico::orderBy('foc_descricao')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = FocoEnergeticoResource::collection($result_foco); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Foco Energeticos',
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
        $request->merge(['foc_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'foc_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $FocoEnergetico = FocoEnergetico::create($input);

        $foc = new FocoEnergeticoResource(FocoEnergetico::findOrFail($FocoEnergetico->foc_id_foc));

        $arr_result = [
            "status" => true,
            "mensagem" => "FocoEnergetico Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = FocoEnergetico::find($id);

       $cli = new FocoEnergeticoResource(FocoEnergetico::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do FocoEnergetico!!!",
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
       $FocoEnergetico = FocoEnergetico::find($id);
       $FocoEnergetico->update($input);

       $foc = new FocoEnergeticoResource($FocoEnergetico);
       $arr_result = [
            "status" => true,
            "mensagem" => "FocoEnergetico Atualizado com Sucesso!!!",
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
