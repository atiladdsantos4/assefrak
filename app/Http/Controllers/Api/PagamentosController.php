<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Pix;
use App\Models\LivroPix;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Piggly\Pix\StaticPayload;
use Piggly\Pix\Parser;
//use App\Jobs\ProcessMail;
use App\Http\Controllers\Api\PHPMailerController;


class PagamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //$all = $request->all();
        //$dados = AgendamentoPix::where('cap_id_cla',$all["cap_id_cla"])->first();
        // return response()->json([
        //      'status' => 'success',
        //      'copiacola' => $dados->cap_copy_qrcode,
        //      'qrcode' => $dados->cap_qrcode
        // ]);

        $all = $request->all();
        $dadosPix = Pix::where('pix_atual',1)->first();
        $idtrans = str_pad($all["id"], 8, "0", STR_PAD_LEFT);
        $pix = new StaticPayload();
        $pix->setPixKey($dadosPix->pix_tipo,$dadosPix->pix_chave) // YOUR PIX KEY (EVP, CPF, etc)
            ->setMerchantName('Assefrak')
            ->setMerchantCity($dadosPix->pix_cidade)
            ->setAmount($all["valor"]) // Optional: Amount
            ->setDescription($all["livro"]) // Optional
            ->setTid($idtrans); // Optional: Transaction ID

        // $chavePix = 'suachavepix@email.com';
        // $nomeRecebedor = 'Nome';
        // $cidadeRecebedor = 'Cidade';
        // $idTransacao = '123'; // Identificador
        // $valor = '10.00';
        // $payload = "00020126330014br.gov.bcb.pix0111$chavePix$valor$nomeRecebedor$cidadeRecebedor$idTransacao";
        // $qrcode = QrCode::format('png')
        // ->size(300)
        // ->generate($payload);
        /*
        $pix->setPixKey('phone','71999872426') // YOUR PIX KEY (EVP, CPF, etc)
            ->setMerchantName('Hair salon')
            ->setMerchantCity('Camaçari')
            ->setAmount($all["valor"]) // Optional: Amount
            ->setDescription('Servico de cabelo') // Optional
            ->setTid('...id...'); // Optional: Transaction ID

        */
        //lip_id_lip,lip_id_liv,lip_id_pix,lip_qrcode,lip_copy_qrcode,lip_valor_qrcode,lip_created_at,lip_updated_at,lip_deleted_at

        // 2. Generate Payload String
        $payload = $pix->getPixCode();

        // 3. Generate QR Code Image
        $qrcode = $pix->getQRCode();

        /*registra a transação*/
        $request->merge(['lip_id_pix' => $dadosPix->pix_id_pix]);
        $request->merge(['lip_id_liv' => $all["id"]]);
        $request->merge(['lip_qrcode' => $qrcode]);
        $request->merge(['lip_copy_qrcode' => $payload]);
        $request->merge(['lip_valor_qrcode' => $all["valor"]]);
        $request->merge(['lip_created_at' => date('Y-m-dH:i:s')]);
        $all = $request->all();
        LivroPix::create($all);

        return response()->json([
             'status' => 'success',
             'copiacola' => $payload,
             'qrcode' => $qrcode
        ]);

        // $request->merge(['cap_id_pix' => $dadosPix->pix_id_pix]);
        // $request->merge(['cap_qrcode' => $qrcode]);
        // $request->merge(['cap_copy_qrcode' => $payload]);
        // $request->merge(['cap_valor_qrcode' => $all["valor"]]);
        // $request->merge(['cap_created_at' => date('Y-m-dH:i:s')]);
        // $all = $request->all();
        // LivroPix::create($all);

        if( isset($all["pagamento"]) ){ //para renderizar as interfaces convencionais

            //  $response = [
            //         'status' => true,
            //         'message' => 'Dados Pix',
            //         'data'    => $qrcode
            //  ];
            //     return json_encode($response);
            //return response()->json($response, 200);
            return response()->json([
             'status' => 'success',
             'copiacola' => $payload,
             'qrcode' => $qrcode
            ]);

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
        $request->merge(['fer_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();
        $input['fer_data'].=' '.date("H:i:s");

        $validator = Validator::make($input, [
            'fer_descricao' => 'required',
            'fer_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $feriado = Feriados::create($input);
        $fer = new FeriadosResource(Feriados::findOrFail($feriado->fer_id_fer));


        $arr_result = [
            "status" => true,
            "mensagem" => "Serviço Inserido com sucesso!!!",
            "data" => $fer
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = services::find($id);
       $fer = new FeriadosResource(Feriados::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $fer
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
       $feriado = Feriados::find($id);
       //$feriado->tes_exibir = $input["tes_exibir"];
       $feriado->update($input);

       $fer = new FeriadosResource($feriado);
       $arr_result = [
            "status" => true,
            "mensagem" => "Serviçoe Atualizado com Sucesso!!!",
            "data" => $fer
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
