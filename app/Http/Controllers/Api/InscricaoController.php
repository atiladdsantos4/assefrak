<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Inscricao;
use App\Models\Curso;
use App\Models\Evento;
use App\Http\Resources\InscricaoResource;
use App\Jobs\ProcessMail;
use Carbon\Carbon;

class InscricaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["filtro"]) && ($all["filtro"] == 'evento') ){
              $result_insse = Inscricao::where('ins_id_eve',$all["id"])->orderBy('ins_created_at')->get();
           }
           if( isset($all["filtro"]) && ($all["filtro"] == 'curso') ){
              $result_insse = Inscricao::where('ins_id_cur',$all["id"])->orderBy('ins_created_at')->get();
           }

           $result = InscricaoResource::collection($result_insse); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Inscrição',
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
        $input = $request->all();

        if($input["ins_id_cur"] != null){
             $curso = Curso::find($input["ins_id_cur"]);
             $data_inicio = Carbon::parse($curso->cur_data_inicio)->format('d/m/Y H:i:s');
             $data_fim = Carbon::parse($curso->cur_data_fim)->format('d/m/Y H:i:s');
             $titulo = $curso->cur_titulo;
        } else {
             $evento = Evento::find($input["ins_id_eve"]);
             $data_inicio = Carbon::parse($evento->eve_data_inicio)->format('d/m/Y H:i:s');
             $data_fim = Carbon::parse($evento->eve_data_fim)->format('d/m/Y H:i:s');
             $titulo = $evento->eve_titulo;
        }


        // $curso = Curso::find($input["ins_id_cur"]);
        // $data_inicio = Carbon::parse($curso->cur_data_inicio)->format('d/m/Y H:i:s');
        // $data_fim = Carbon::parse($curso->cur_data_fim)->format('d/m/Y H:i:s');
        //criar a data de criação e campos pra o envio de email
        $request->merge(['ins_created_at' => date("Y-m-d H:i:s")]);
        $request->merge(['titulo' => $titulo]);
        $request->merge(['inscricao' => 'S']);
        $request->merge(['periodo' => $data_inicio.' à '.$data_fim]);
        $input = $request->all();



        $validator = Validator::make($input, [
            'ins_tipo' => 'required',
            'ins_id_puf' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $insc = Inscricao::create($input);
        $request->merge(['ins_id_ins' => $insc->ins_id_ins]);
        //job de envio de email
        ProcessMail::dispatch($request)->onConnection('sync');

        $pas = new InscricaoResource(Inscricao::findOrFail($insc->ins_id_ins));

        $arr_result = [
            "status" => true,
            "mensagem" => "Inscricao Inserido com sucesso!!!",
            "data" => $pas,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$aco = Inscricao::find($id);

       $cli = new InscricaoResource(Inscricao::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Inscricao!!!",
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
       $insc = Inscricao::find($id);
       $insc->update($input);

       if(isset($input["ins_renvia_email"])){
          if($input["ins_id_cur"] != null){
             $curso = Curso::find($input["ins_id_cur"]);
             $data_inicio = Carbon::parse($curso->cur_data_inicio)->format('d/m/Y H:i:s');
             $data_fim = Carbon::parse($curso->cur_data_fim)->format('d/m/Y H:i:s');
             $titulo = $curso->cur_titulo;
          } else {
             $evento = Evento::find($input["ins_id_eve"]);
             $data_inicio = Carbon::parse($evento->eve_data_inicio)->format('d/m/Y H:i:s');
             $data_fim = Carbon::parse($evento->eve_data_fim)->format('d/m/Y H:i:s');
             $titulo = $evento->eve_titulo;
          }
          //criar a data de criação e campos pra o envio de email
          $request->merge(['ins_id_ins' => $insc->ins_id_ins]);
          $request->merge(['titulo' => $titulo]);
          $request->merge(['inscricao' => 'S']);
          $request->merge(['periodo' => $data_inicio.' à '.$data_fim]);
          $input = $request->all();
          ProcessMail::dispatch($request)->onConnection('sync');
       }

       $pas = new InscricaoResource($insc);
       $arr_result = [
            "status" => true,
            "mensagem" => "Inscricao Atualizado com Sucesso!!!",
            "data" => $pas
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
