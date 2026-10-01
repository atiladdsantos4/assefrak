<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Models\CodigoEmail;
use App\Models\Curso;
use App\Models\Inscricao;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Jobs\ProcessMail;

class PHPMailerController extends Controller
{

    private $email;
    private $imageLogo;
    private $cid;

    public function __construct(){

        $this->email = new PHPMailer(true);
        $this->email->isSMTP();
        $this->email->Host = config('app.host_mail.mail_host');
        $this->email->SMTPAuth = true;
        $this->email->Username = config('app.host_mail.mail_username');   //  sender username
        $this->email->Password = config('app.host_mail.mail_password');  // sender password
        $this->email->SMTPSecure = 'ssl';                  // encryption - ssl/tls
        $this->email->Port = 465;                          // port - 587/465
        $from = mb_convert_encoding(config('app.host_mail.mail_from_name'), 'ISO-8859-1', 'UTF-8');
        $this->email->setFrom(config('app.host_mail.mail_from_address'), $from);
        $this->email->isHTML(true);                // Set email content format to HTML
        $this->imageLogo = Storage::disk('inertia_img')->path('img/logo_email.png');
        $this->cid = 'logo_image';
        $this->email->AddEmbeddedImage($this->imageLogo, 'logo_image', 'logo.png');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();
        if( isset($input["contato"]) ){
           ProcessMail::dispatch($request)->onConnection('sync');
           $resp =  true;
           if($resp){
               $response = [
                    'success' => true,
                    'message' => 'Contato enviado com sucesso',
                    'data'    => 'ok'
               ]; 
               return response()->json($response, 200); 
           } else {
              return;
           }
        }

        if( isset($input["inscricao"]) ){
          ProcessMail::dispatch($request)->onConnection('sync');
          $email = new PHPMailerController();
          $curso = Curso::find($input["ins_id_cur"]);
          $request->merge(['titulo' => $curso->cur_titulo]);
          $request->merge(['periodo' => $curso->cur_data_inicio.' à '.$curso->cur_data_fim]);
          $response = $email->envia_inscricao($request);
          if($response["success"]){
              $request->merge(['ins_id_cur' => $input["ins_id_cur"]]);
              $request->merge(['ins_id_puf' => $input["ins_id_puf"]]);
              $request->merge(['ins_tipo' => $input["ins_tipo"]]);
              $request->merge(['ins_ativo' => $input["ins_ativo"]]);
              $input = $request->all();
              $insc = Inscricao::create($input);
              $response +=["dados"=>$insc];
          }

          /*
          $table->unsignedBigInteger('ins_id_cur')->nullable();
            $table->unsignedBigInteger('ins_id_eve')->nullable();
            $table->unsignedBigInteger('ins_id_puf');
            $table->string('ins_nome',300);
            $table->string('ins_email',300);
            $table->string('ins_telefone',20);
            $table->char('ins_tipo',1);
            $table->char('ins_ativo',1);
          */
          return response()->json($response, 200);
        }
    }


    public function envia_contato(Request $request){
       $input = $request->all();
       $this->email->addAddress($input["email"]);
       $subject = 'Contato Acolhido';
       $this->email->Subject = mb_convert_encoding($subject, 'ISO-8859-1', 'UTF-8');
       $mailData = [
            'empresa'=> 'Assefrak',
            'title'=> 'Contato Usuário',
            'assunto'=> $input["assunto"],
            'nome'=> $input["nome"],
            'email'=> $input["email"],
            'conteudo'=> $input["conteudo"],
       ];
       $corpo_email = view('mail.geraContato', [ 'mailData' => $mailData])->render();
       $this->email->Body  = $corpo_email;
       $this->email->addCC('atiladdsantos4@gmail.com', 'Atila Santos');
       //$this->email->addReplyTo('atiladdsantos4@gmail.com', 'Atila Santos');
       try{
            if( !$this->email->send() ) {
                    $response = [
                        'success' => false,
                        'message' => 'Problemas no envio do email',
                        'data'    => $this->email->ErrorInfo
                    ];
                    return response()->json($response, 200);
                    //return back()->with("failed", "Email not sent.")->withErrors($mail->ErrorInfo);
            }
            else {
                $response = [
                    'success' => true,
                    'message' => 'Email enviado com Sucesso',
                ];
                return $response;
                //response()->json($response, 200);
            }
        } catch (Exception $e) {
            dd($e);
            return back()->with('error','Message could not be sent.');
        }
    }

    public function envia_inscricao(Request $request){
       $input = $request->all();
       $this->email->addAddress($input["ins_email"]);
       $subject = 'Inscriçao Recebida';
       $this->email->Subject = mb_convert_encoding($subject, 'ISO-8859-1', 'UTF-8');
       $number =  rand(100000,999999);
       $mailData = [
            'empresa'=> 'Assefrak',
            'title'=> 'Inscrição Confirmada',
            'titulo'=> $input["titulo"],
            'periodo'=> $input["periodo"],
            'nome'=> $input["ins_nome"],
            'email'=> $input["ins_email"],
            'telefone'=> $input["ins_telefone"],
            'n1' => substr($number,0,1),
            'n2' => substr($number,1,1),
            'n3' => substr($number,2,1),
            'n4' => substr($number,3,1),
            'n5' => substr($number,4,1),
            'n6' => substr($number,5,1),
       ];
       $corpo_email = view('mail.geraInscricao', [ 'mailData' => $mailData])->render();
    //    $imagePath = Storage::disk('inertia_img')->path('img/logo_email.png');
    //    $cid = 'my_embedded_image';
    //    $this->email->AddEmbeddedImage($imagePath, $cid, 'logo.png');
       $this->email->Body  = $corpo_email;
       $this->email->addReplyTo('atiladdsantos4@gmail.com', 'Atila Santos');
       try{
            if( !$this->email->send() ) {
                    $response = [
                        'success' => false,
                        'message' => 'Problemas no envio do email',
                        'data'    => $this->email->ErrorInfo
                    ];
                    return response()->json($response, 200);
                    //return back()->with("failed", "Email not sent.")->withErrors($mail->ErrorInfo);
            }
            else {
                $response = [
                    'success' => true,
                    'message' => 'Email enviado com Sucesso',
                ];
                return $response;
                //response()->json($response, 200);
            }
        } catch (Exception $e) {
            dd($e);
            return back()->with('error','Message could not be sent.');
        }

    }


    public function envia_email(Request $request){

        $input = $request->all();
        // alterando o config app rodar "php artisan config:cache"
        $mail = new PHPMailer(true);
        try {

            // Email server settings (app/config)
            //$mail->SMTPDebug = 1; break json_econde
            $mail->isSMTP();
            $mail->Host = config('app.host_mail.mail_host');
            $mail->SMTPAuth = true;
            $mail->Username = config('app.host_mail.mail_username');   //  sender username
            $mail->Password = config('app.host_mail.mail_password');  // sender password
            $mail->SMTPSecure = 'ssl';                  // encryption - ssl/tls
            $mail->Port = 465;                          // port - 587/465
            $mail->setFrom(config('app.host_mail.mail_from_address'), config('app.host_mail.mail_from_name'));
            $mail->addAddress($input["email"]);
            //$mail->addAddress('atiladdsantos4@gmail.com');

            // $mail->addAddress($request->emailRecipient);
            // $mail->addCC($request->emailCc);
            // $mail->addBCC($request->emailBcc);

            //$mail->addReplyTo('atiladdsantos4@gmail.com', 'Atila Santos');
            /*
            if(isset($_FILES['emailAttachments'])) {
                for ($i=0; $i < count($_FILES['emailAttachments']['tmp_name']); $i++) {
                    $mail->addAttachment($_FILES['emailAttachments']['tmp_name'][$i], $_FILES['emailAttachments']['name'][$i]);
                }
            }
            */


            $mail->isHTML(true);                // Set email content format to HTML

            //$mail->Subject = $request->emailSubject;


            if(isset($input["recebido"])){
                    $mail->Subject = 'Agendamento Recebido';
                    $img = $input["qrcode"];
                    $base64Data = substr($img, strpos($img, ",") + 1);
                    $mail->addStringAttachment(base64_decode($base64Data), 'qrcode.png', 'base64', 'image/png');
                    $mailData = [
                        'empresa'=> $input["empresa"],
                        'title'=> 'Este é o titulo',
                        'nome' => $input["nome"],
                        'dia' => date('d'),
                        'mes' => date('m'),
                        'ano' => date('Y'),
                        'horario' => $input["horario"],
                        'dia_extenso' => $input["dia_extenso"],
                        'profissional' => $input["profissional"],
                        'servico' => $input["servico"],
                        'tratamento' => $input["tratamento"],
                        'cadastro' => $input["cadastro"],
                        'qrcodecopia'=> $input["qrcodecopia"],
                        // 'empresa'=> $input["empresa"],
                        // 'title'=> 'Este é o titulo',
                        // 'nome' => 'Atila Santos',
                        // 'dia' => date('d'),
                        // 'mes' => date('m'),
                        // 'ano' => date('Y'),
                        // 'horario' => date('H:i'),
                        // 'dia_extenso' => 'Segunda',
                        // 'medico' => 'Juarez Emmanuel',
                        // 'especialidade' => 'Corte de Cabelo',
                        // 'tratamento' => 'Corte de Cabelo com Máquina',
                        // 'cadastro' => date('Y/m/d H:i:s'),
                    ];
                    //C:\Apache24\htdocs\projetos\inertia-react\resources\views\mail\geraAguardando.blade.php
                    $corpo_email = view('mail.geraAguardando', [ 'agenda' => $mailData ])->render();
                    $mail->Body    = $corpo_email;

            } else {
                //$mail->Body    = $request->emailBody;
                //     $corpo_email = view('email.recebido', [
                //     "nome_site" => $par->getParam('NOME_SITE'),
                //     "nome" => $request->get('nome'),
                //     "contato" => $request->get('email'),
                //     "assunto"=> $request->get('assunto') ,
                //     "mensagem" => $request->get('mensagem') ]
                //    )->render();
                    $mail->Subject = 'Código de Confirmção';
                    $number =  rand(100000,999999);
                    $mailData = [
                    'empresa'=> $input["empresa"],
                    'title'=> 'Este é o titulo',
                    'n1' => substr($number,0,1),
                    'n2' => substr($number,1,1),
                    'n3' => substr($number,2,1),
                    'n4' => substr($number,3,1),
                    'n5' => substr($number,4,1),
                    'n6' => substr($number,5,1),
                    ];
                    $corpo_email = view('mail.geraCodigo', [ 'mailData' => $mailData])->render();
                    $mail->Body    = $corpo_email;

                // $mail->AltBody = plain text version of email body;
            }
            if( !$mail->send() ) {
                    $response = [
                        'success' => false,
                        'message' => 'Problemas no envio do email',
                        'data'    => $mail->ErrorInfo
                    ];
                    //return back()->with("failed", "Email not sent.")->withErrors($mail->ErrorInfo);
            }
            else {
                    //coe_id_coe,coe_email,coe_codigo,coe_confirma,coe_created_at,coe_updated_at,coe_deleted_at
                    // $cod = new CodigoEmail();
                    // $cod->coe_email = $input["email"];
                    // $cod->coe_codigo = $number;
                    // $cod->coe_confirma = 'N';
                    // $cod->save();
                    $response = [
                        'success' => true,
                        'message' => 'Email enviado com Sucesso',
                    ];
            }
            return response()->json($response, 200);

        } catch (Exception $e) {
            dd($e);
            return back()->with('error','Message could not be sent.');
        }
    }

    public function envia_email_pacote(Request $request){

        $input = $request->all();
        // alterando o config app rodar "php artisan config:cache"
        $mail = new PHPMailer(true);
        try {

            // Email server settings (app/config)
            //$mail->SMTPDebug = 1; break json_econde
            $mail->isSMTP();
            $mail->Host = config('app.host_mail.mail_host');
            $mail->SMTPAuth = true;
            $mail->Username = config('app.host_mail.mail_username');   //  sender username
            $mail->Password = config('app.host_mail.mail_password');  // sender password
            $mail->SMTPSecure = 'ssl';                  // encryption - ssl/tls
            $mail->Port = 465;                          // port - 587/465
            $mail->setFrom(config('app.host_mail.mail_from_address'), config('app.host_mail.mail_from_name'));
            $mail->addAddress($input["email"]);
            //$mail->addAddress('atiladdsantos4@gmail.com');

            // $mail->addAddress($request->emailRecipient);
            // $mail->addCC($request->emailCc);
            // $mail->addBCC($request->emailBcc);

            //$mail->addReplyTo('atiladdsantos4@gmail.com', 'Atila Santos');
            /*
            if(isset($_FILES['emailAttachments'])) {
                for ($i=0; $i < count($_FILES['emailAttachments']['tmp_name']); $i++) {
                    $mail->addAttachment($_FILES['emailAttachments']['tmp_name'][$i], $_FILES['emailAttachments']['name'][$i]);
                }
            }
            */


            $mail->isHTML(true);                // Set email content format to HTML

            //$mail->Subject = $request->emailSubject;


            if(isset($input["pacote"])){
                    $mail->Subject = 'Agendamento Pacote Recebido';
                    $img = $input["qrcode"];
                    $base64Data = substr($img, strpos($img, ",") + 1);
                    $mail->addStringAttachment(base64_decode($base64Data), 'qrcode.png', 'base64', 'image/png');
                    $mailData = [
                        'empresa'=> $input["empresa"],
                        'title'=> 'Este é o titulo',
                        'nome' => $input["nome"],
                        'dia' => date('d'),
                        'mes' => date('m'),
                        'ano' => date('Y'),
                        'pacote' => $input["servico"],
                        'cadastro' => $input["cadastro"],
                        'qrcodecopia'=> $input["qrcodecopia"],
                    ];
                    $corpo_email = view('mail.geraAguardandoPacote', [ 'agenda' => $mailData ])->render();
                    $mail->Body    = $corpo_email;

            } else {
                    $mail->Subject = 'Código de Confirmção';
                    $number =  rand(100000,999999);
                    $mailData = [
                    'empresa'=> $input["empresa"],
                    'title'=> 'Este é o titulo',
                    'n1' => substr($number,0,1),
                    'n2' => substr($number,1,1),
                    'n3' => substr($number,2,1),
                    'n4' => substr($number,3,1),
                    'n5' => substr($number,4,1),
                    'n6' => substr($number,5,1),
                    ];
                    $corpo_email = view('mail.geraCodigo', [ 'mailData' => $mailData])->render();
                    $mail->Body    = $corpo_email;

                // $mail->AltBody = plain text version of email body;
            }
            if( !$mail->send() ) {
                    $response = [
                        'success' => false,
                        'message' => 'Problemas no envio do email',
                        'data'    => $mail->ErrorInfo
                    ];
                    //return back()->with("failed", "Email not sent.")->withErrors($mail->ErrorInfo);
            }
            else {
                    //coe_id_coe,coe_email,coe_codigo,coe_confirma,coe_created_at,coe_updated_at,coe_deleted_at
                    // $cod = new CodigoEmail();
                    // $cod->coe_email = $input["email"];
                    // $cod->coe_codigo = $number;
                    // $cod->coe_confirma = 'N';
                    // $cod->save();
                    $response = [
                        'success' => true,
                        'message' => 'Email enviado com Sucesso',
                    ];
            }
            return response()->json($response, 200);

        } catch (Exception $e) {
            dd($e);
            return back()->with('error','Message could not be sent.');
        }
    }

}
