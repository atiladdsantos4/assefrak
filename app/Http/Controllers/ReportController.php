<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Cliente;
use App\Models\Service;
use App\Models\Tratamento;
use App\Models\Inscricao;
use App\Models\Curso;
use App\Http\Resources\EmpresaResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;


class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();
        if( $all["relatorio"] == 'ficha' ){
            //C:\Apache24\htdocs\projetos\inertia-assefrak\public\assets\vendor\bootstrap\css\bootstrap.min.css
           $bootstrapCss = file_get_contents(public_path('assets/vendor/bootstrap/css/bootstrap.min.css'));
           $pdf = Pdf::loadView('relatorios.ficha_cartao', [
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório de Atendimentos Realizados  -  Hair Sallon Copyright",
                "bootstrap" => $bootstrapCss,
                "agua"=> $all["qtdeagua"],
                "passes"=> $all["qtdpasses"],
                "horario"=> $all["horario"],
                "fechamento"=> $all["fechamento"],
                "fecha"=> $all["fechacentro"],
            ]);
           $pdf->setPaper('A4', 'portrait');
           return $pdf->stream('lista-agendas.pdf');
        }

        if( $all["relatorio"] == 'tratamento' ){
            //C:\Apache24\htdocs\projetos\inertia-assefrak\public\assets\vendor\bootstrap\css\bootstrap.min.css
           $bootstrapCss = file_get_contents(public_path('assets/vendor/bootstrap/css/bootstrap.min.css'));
           $tratamento = Tratamento::where('tra_id_tra',$all["id"])
           ->with('acolhido')
           ->with('colaborador')
           ->with('tipotratamento')
           ->with('status')
           ->with('ocorrencias.tipoocorrencia')
           ->first();
           $abapasse = json_decode($tratamento->tra_passe, true);
           $abafoco = json_decode($tratamento->tra_foco_energetico, true);
           $abaenergetica = json_decode($tratamento->tra_cond_energetica, true);
           $abafortalecimento = json_decode($tratamento->tra_fortalecimento, true);
           $abalimpeza = json_decode($tratamento->tra_limpeza, true);
           $abaalerta = json_decode($tratamento->tra_alerta, true);
           $response = [
                'status' => true,
                'message' => 'Dados Tratamento',
                'data'    => $tratamento
           ];

           //return response()->json($response, 200);
           $pdf = Pdf::loadView('relatorios.tratamento', [
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Ficha para Passistas - Assefrak",
                "bootstrap" => $bootstrapCss,
                "passe"=> $abapasse,
                "foco"=> $abafoco,
                "energetico"=> $abaenergetica,
                "fortalecimento"=> $abafortalecimento,
                "limpeza"=> $abalimpeza,
                "alerta"=> $abaalerta,
                "tratamento"=>$tratamento
            ]);
           $pdf->setPaper('A4', 'portrait');
           return $pdf->stream('ficha-tratamento.pdf');
        }

        if( $all["relatorio"] == 'listapresenca' ){
            //C:\Apache24\htdocs\projetos\inertia-assefrak\public\assets\vendor\bootstrap\css\bootstrap.min.css
           if($all["tipo"]=='curso'){
              $lista = Inscricao::where('ins_tipo','C')->where('ins_id_cur',$all["id"])->get();
              $curso = Curso::where('cur_id_cur',$all["id"])->first();
              $header = $curso->cur_titulo;

           }
           $bootstrapCss = file_get_contents(public_path('assets/vendor/bootstrap/css/bootstrap.min.css'));
           $pdf = Pdf::loadView('relatorios.listapresenca', [
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Lista de Presença - Assefrak",
                "bootstrap" => $bootstrapCss,
                "dados"=> $lista,
                "textoheader"=>$header,
                "tipo"=>$all["tipo"],
           ]);
           $pdf->setPaper('A4', 'portrait');
           return $pdf->stream('lista-presenca.pdf');
        }

        if( $all["relatorio"] == 'listaagendas' ){
            $valor = $request->input('valor');
            $cli = Cliente::where('cli_id_cli',$valor)
            ->with('agendamentos')
            ->with('agendamentos.horario.dataagenda')
            ->with('agendamentos.horario.protratamento.tratamento')
            ->with('agendamentos.horario.protratamento.profissional')
            ->get();
            $dados = $cli[0]["agendamentos"];
            $cliente = [
                "name" => $cli[0]["cli_name"],
                "cpf"  => $cli[0]["cli_cpf"],
                "email"  => $cli[0]["cli_email"]
            ];
            $pdf = Pdf::loadView('relatorios.listaagendacliente', [
                "valor"=> $valor,
                "dados"=>$dados,
                "cliente"=>$cliente,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório de Atendimentos Realizados  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            //$pdf->render();

            // 3. Add Page Numbers (x, y, text, font, size, color)
            // $canvas = $pdf->getCanvas();
            // $canvas->page_text(
            //     520,                // X position
            //     320,                // Y position
            //     "Page {PAGE_NUM} of {PAGE_COUNT}",
            //     $pdf->getFontMetrics()->get_font("helvetica", "bold"),
            //     10,                 // Font size
            //     array(0, 0, 0)      // RGB color
            // );

            return $pdf->stream('lista-agendas.pdf');
        }

        if( $all["relatorio"] == 'listaclientes' ){
           $dados = Cliente::orderBy('cli_name')->get();

           $pdf = Pdf::loadView('relatorios.listacliente', [
                "dados"=>$dados,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório Lista de Clientes  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            return $pdf->stream('lista-clientes.pdf');

        }
        //serviços
        if( $all["relatorio"] == 'listaservicos' ){
           $dados = Service::orderBy('ser_titulo')->get();

           $pdf = Pdf::loadView('relatorios.listaservicos', [
                "dados"=>$dados,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório Lista de Serviços  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            return $pdf->stream('lista-serviços.pdf');

        }

        //serviços
        if( $all["relatorio"] == 'listatratamentos' ){
           $dados = Tratamento::with('servico_api')
           ->with('valor_atual')
           ->orderBy('tra_id_tra')->get();

           $pdf = Pdf::loadView('relatorios.listatratamentos', [
                "dados"=>$dados,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório Lista de Tratamentos  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            return $pdf->stream('lista-tratamentos.pdf');

        }

        //$tratamento = Tratamento::orderBy('tra_id_tra')->get();

        try {
           $empresa = Empresa::orderBy('emp_nome')->get();
        } catch (\Exception $e) {
           $teste = $e;
        }

        $result =  EmpresaResource::collection($empresa); //only works for colection

        $response = [
            'success' => true,
            'message' => 'Lista de Empresas',
            'data'    => $result
        ];

        return response()->json($response, 200);
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
       $input = $request->all();

        $validator = Validator::make($input, [
            'emp_nome' => 'required',
            'emp_tipo_empresa' => 'required',
            'emp_cnpj_cpf' => 'required',
            'emp_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $empresa = Empresa::create($input);
        $emp = Empresa::find($empresa->emp_id_emp);
        $emp->emp_hash = md5($emp->emp_hash.$emp->emp_id_emp);
        $emp->update();
        $empresa = new EmpresaResource(Empresa::findOrFail($emp->emp_id_emp));


        if( $request->has('has_image') ) {
           $file = $request->file('file');
           $fileName  = $file->getClientOriginalName();
           $emp = Empresa::find($empresa->emp_id_emp);
           $emp->emp_logo = $emp->emp_id_emp.'/'.$fileName;
           $emp->update();
           $path = 'images/medical/empresa/'.$id.'/'.$fileName;
           //Adiciona a nova imagem e atualiza o conteudo
           Storage::disk('public')->put($path, file_get_contents($file));
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Empresa Inserida com sucesso!!!",
            "data" => $empresa
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function storeApi(Request $request)
    {
       $input = $request->all();

        $validator = Validator::make($input, [
            'emp_nome' => 'required',
            'emp_tipo_empresa' => 'required',
            'emp_cnpj_cpf' => 'required',
            'emp_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $empresa = Empresa::create($input);
        $emp = Empresa::find($empresa->emp_id_emp);
        $emp->emp_hash = md5($emp->emp_hash.$emp->emp_id_emp);
        $emp->update();
        $empresa = new EmpresaResource(Empresa::findOrFail($emp->emp_id_emp));


        if( $request->has('has_image') ) {
           $file = $request->file('file');
           $fileName  = $file->getClientOriginalName();
           $emp = Empresa::find($empresa->emp_id_emp);
           $emp->emp_logo = $emp->emp_id_emp.'/'.$fileName;
           $emp->update();
           $path = 'images/medical/empresa/'.$id.'/'.$fileName;
           //Adiciona a nova imagem e atualiza o conteudo
           Storage::disk('public')->put($path, file_get_contents($file));
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Empresa Inserida com sucesso!!!",
            "data" => $empresa
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
