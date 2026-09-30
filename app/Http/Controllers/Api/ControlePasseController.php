<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\ControlePasse;
use App\Models\Tratamento;
use App\Models\StatusTratamento;
use App\Http\Resources\ControlePasseResource;
use Carbon\Carbon;

class ControlePasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["tratamento"]) ){
             $result_cop = ControlePasse::where('cop_id_tra',$all["tratamento"])->orderBy('cop_data_prevista')->get();
           } else {
             $result_cop = ControlePasse::orderBy('cop_created_at')->get();
           }
           $result = ControlePasseResource::collection($result_cop); //only works for traection

           $response = [
                'status' => true,
                'message' => 'Dados ControlePassees',
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
        $request->merge(['cop_created_at' => date("Y-m-d H:i:s")]);
        //$request->merge(['cop_data_prevista' => date("Y-m-d")]);
        $request->merge(['cop_concluido' => 'N']);
        $input = $request->all();
        $qtde = (int) $input['cop_qtde'];

        $data = $input['cop_data_prevista'];


        for($i = 0; $i < $qtde; $i++){
           $ControlePasse = ControlePasse::create($input);
           $novaData = Carbon::parse($data)->addDays(7);
           $data = $novaData;
           $input['cop_data_prevista'] = $novaData;
        }


        $arr_result = [
            "status" => true,
            "mensagem" => "Controle de Passe Gerado com sucesso!!!",
            "data" => $ControlePasse,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

        $validator = Validator::make($input, [
            'cop_id_col' => 'required',
            'cop_id_tra' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $ControlePasse = ControlePasse::create($input);

        $ControlePasse = new ControlePasseResource(ControlePasse::findOrFail($ControlePasse->cop_id_cop));

        $arr_result = [
            "status" => true,
            "mensagem" => "Controle de Passe Gerado com sucesso!!!",
            "data" => $ControlePasse,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$ControlePasse = ControlePasse::find($id);

       $tra = new ControlePasseResource(ControlePasse::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do ControlePasse!!!",
            "data" => $tra
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
       $ControlePasse = ControlePasse::find($id);
       $ControlePasse->update($input);
       //atualiza a tabela de tratamento para o status em andamento ou finalizado //
       $existe = ControlePasse::where('cop_id_tra',$input["cop_id_tra"])
       ->where('cop_concluido','N')
       ->count();
       if($existe > 0){
          $id =  StatusTratamento::getIdStatus('Tratamento em Andamento');
          Tratamento::where('tra_id_tra',$input["cop_id_tra"])->update(['tra_id_stt'=> $id]);
       } else {
          $id =  StatusTratamento::getIdStatus('Tratamento Finalizado');
          Tratamento::where('tra_id_tra',$input["cop_id_tra"])->update(['tra_id_stt'=> $id]);
       }

       $ControlePasse = new ControlePasseResource($ControlePasse);
       $arr_result = [
            "status" => true,
            "mensagem" => "Presença Registrada com Sucesso!!!",
            "data" => $ControlePasse
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
