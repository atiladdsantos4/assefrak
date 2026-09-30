<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Acolhido;
use App\Http\Resources\AcolhidoResource;

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

class AcolhidoController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if(isset($all["tratamento"])){
                $result_cliente = Acolhido::join('tra_tratamento','tra_id_aco','aco_id_aco')
                //selectRaw('distinct aco_id_aco,aco_name,aco_nascimento,aco_faixa')
                //->join('tra_tratamento','tra_id_aco','aco_id_aco')
                ->orderBy('aco_name')->get();
                // ->whereRaw("exists (select age_id_hoa from medical.age_agendamento where age_emp = $empresa and age_id_hoa = hoa_id_hoa)")
                // ->where('hoa_emp',$empresa)
                // ->orderBy('ano','asc')
                // ->orderBy('mes','asc')
           } else { 
               $result_cliente = Acolhido::orderBy('aco_name')->get();
           }
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = AcolhidoResource::collection($result_cliente); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Acolhidos',
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
        $request->merge(['aco_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'aco_name' => 'required',
            'aco_nascimento' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $acolhido = Acolhido::create($input);

        $aco = new AcolhidoResource(Acolhido::findOrFail($acolhido->aco_id_aco));

        $arr_result = [
            "status" => true,
            "mensagem" => "Cliente Inserido com sucesso!!!",
            "data" => $aco,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);



        $cliente = Cliente::where('cli_cpf',$input["cli_cpf"])->first();// verifica se existe o cpf //
        //Cria o cliente caso não exista na base de clientes//
        if( $cliente == null){
           $cliente = Cliente::create($input);
        }
        $request->merge(['cla_created_at' => date("Y-m-d H:i:s")]);
        $request->merge(['cla_id_cli' => $cliente->cli_id_cli]);
        $input = $request->all();

        //salva o vinculo da cliente <--> agenda
        $clagenda = ClienteAgendado::create($input);
        if( $request->input('cla_tipo_agenda') == 'S'){ // Aplica Apenas para Agendamento de Serviços

           //Atualiza status do horario agendado
           HorarioAgenda::where('hoa_id_hoa',$input["cla_id_hoa"])->update(['hoa_agendado' => 'S','hoa_status_atual'=>'A']);
           //envio de email//
            $clienteagendado = ClienteAgendado::where('cla_id_hoa',$input["cla_id_hoa"])
            ->with('horario.dataagendaconsulta')
            ->with('horario.protratamento')
            ->with('horario.protratamento.tratamento')
            ->with('horario.protratamento.profissional')
            ->first();
            $request->merge(['nome' =>$cliente->cli_name]);
            $request->merge(['email' =>$cliente->cli_email]);
            $request->merge(['horario' =>$clienteagendado->horario->dataagendaconsulta->dat_horainicial.'-'.$clienteagendado->horario->dataagendaconsulta->dat_horafinal]);
            $request->merge(['dia_extenso' =>$clienteagendado->horario->dataagendaconsulta->dat_diaextenso]);
            $request->merge(['profissional' =>$clienteagendado->horario->protratamento->profissional->pro_nome]);
            $request->merge(['servico' =>$clienteagendado->horario->protratamento->tratamento->servico_api->ser_titulo]);
            $request->merge(['tratamento' =>$clienteagendado->horario->protratamento->tratamento->tra_titulo]);
            $request->merge(['cadastro' =>$clienteagendado->horario->dataagendaconsulta->dat_data]);
            $request->merge(['empresa' =>"HAIR SALON"]);
            $request->merge(['recebido' =>"S"]);
        } else {

            //para pacotes//

            $clienteagendado = ClienteAgendado::where('cla_id_cla',$clagenda->cla_id_cla)
            ->with('pacote')
            ->with('cliente')
            ->first();

            $request->merge(['nome' => $cliente->cli_name]);
            $request->merge(['email' => $cliente->cli_email]);
            $request->merge(['cadastro' => $clienteagendado->cla_created_at]);
            $request->merge(['servico' => $clienteagendado->pacote->pac_nome]);
            $request->merge(['empresa' =>"HAIR SALON"]);
            $request->merge(['pacote' =>"S"]);
            $request->merge(['valor' =>$clienteagendado->pacote->pac_valor_final]);

        }



        //gera o qrcode com basenos dados informados//
        $pix = new Pix();
        $request->merge(['cap_id_cla' =>$clienteagendado->cla_id_cla]);
        $resp = $pix->geraQrcode($request);
        $request->merge(['qrcode' =>$resp["qrcode"]]);
        $request->merge(['qrcodecopia' =>$resp["qrcodecopia"]]);

        //manda pra o job queue e continua a transação//
        ProcessMail::dispatch($request)->onConnection('sync');



        $cli = new ClienteResource(Cliente::findOrFail($cliente->cli_id_cli));

        $arr_result = [
            "status" => true,
            "mensagem" => "Cliente Inserido com sucesso!!!",
            "data" => $cli,
            "agendamento"=>$clienteagendado->cla_id_cla
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$aco = Acolhido::find($id);

       $cli = new AcolhidoResource(Acolhido::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Cliente!!!",
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
       $acolhido = Acolhido::find($id);
       $acolhido->update($input);

       $aco = new AcolhidoResource($acolhido);
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
