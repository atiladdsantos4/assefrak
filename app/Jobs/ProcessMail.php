<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\PHPMailerController;
use App\Models\Inscricao;
use Illuminate\Support\Facades\Response;

class ProcessMail implements ShouldQueue
{
    use Queueable;

    private $email;
    private $inscricao;
    private $recebido;
    private $pacote;
    private $contato;


    /**
     * Create a new job instance.
     */
    public function __construct(Request $request)
    {
       $this->email = $request->input('email') ?? null;
       $this->inscricao = $request->input('inscricao') ?? null;
       $this->recebido = $request->input('recebido') ?? null;
       $this->pacote = $request->input('pacote') ?? null;
       $this->contato = $request->input('contato') ?? null;
    }

    /**
     * Execute the job.
     */
    public function handle(Request $request): void
    {
        $mail = new PHPMailerController();
        //inscricao evento/curso
        if( $this->inscricao != null){
           $resp = $mail->envia_inscricao($request);
           if($resp["success"]){
               $ins = Inscricao::find($request->input('ins_id_ins'));
               $ins->ins_envio_email = 'S';
               $ins->update();
           }

        }
        
        //contato
        if( $this->contato != null){
           $resp = $mail->envia_contato($request);
              
        //        $ins = Inscricao::find($request->input('ins_id_ins'));
        //        $ins->ins_envio_email = 'S';
        //        $ins->update();
        //    }

        }
        
        if( $this->recebido != null){
           $mail->envia_email($request);
        }
        
        if( $this->pacote != null){
           $mail->envia_email_pacote($request);
        }
        // Write your time-consuming logic here (e.g., API requests, processing files)
        logger()->info('Email esta sendo processado in background!');
    }
}
