<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Http\Request;
//gerar code//
use Piggly\Pix\StaticPayload;
use Piggly\Pix\Parser;

class Pix extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //pix_id_pix,pix_tipo,pix_chave,pix_nome_fantasia,pix_cidade,pix_ativo,pix_atual,pix_created_at,pix_updated_at,pix_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'pix_dados_pix';
    protected $primaryKey = 'pix_id_pix';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
        'pix_tipo','pix_chave','pix_nome_fantasia','pix_id_ban','pix_cidade','pix_ativo','pix_atual','pix_created_at', 'pix_updated_at', 'pix_deleted_at'
    ];
    protected $dates = ['pix_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'pix_created_at';
    const UPDATED_AT  = 'pix_updated_at';
    const DELETED_AT  = 'pix_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'pix_created_at' => 'datetime:Y-m-d H:i:s',
        'pix_updated_at' => 'datetime:Y-m-d H:i:s',
        'pix_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];
    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pac_id_pla) ){
          $esp = PlanoSaude::find($this->pac_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pac_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }
    */
    public function banco()
    {
        return $this->hasOne(Bancos::class, 'ban_id_ban', 'pix_id_ban');
    }

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    public function geraQrcode( Request $request ){
        $all = $request->all();
        $dadosPix = Pix::where('pix_atual',1)->first();
        $idagenda = str_pad($all["cap_id_cla"], 8, "0", STR_PAD_LEFT);
        $pix = new StaticPayload();
        $pix->setPixKey($dadosPix->pix_tipo,$dadosPix->pix_chave) // YOUR PIX KEY (EVP, CPF, etc)
            ->setMerchantName('Hair salon')
            ->setMerchantCity($dadosPix->pix_cidade)
            ->setAmount($all["valor"]) // Optional: Amount
            ->setDescription($all["servico"]) // Optional
            ->setTid($idagenda); // Optional: Transaction ID

        // 2. Generate Payload String
        $payload = $pix->getPixCode();

        // 3. Generate QR Code Image
        $qrcode = $pix->getQRCode();

        $request->merge(['cap_id_pix' => $dadosPix->pix_id_pix]);
        $request->merge(['cap_qrcode' => $qrcode]);
        $request->merge(['cap_copy_qrcode' => $payload]);
        $request->merge(['cap_valor_qrcode' => $all["valor"]]);
        $request->merge(['cap_created_at' => date('Y-m-dH:i:s')]);
        $all = $request->all();
        AgendamentoPix::create($all);
        $resp = [
            "qrcode"=> $qrcode,
            "qrcodecopia"=> $payload,
        ];
        return $resp;

    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->pix_created_at = date("Y-m-d H:i:s.u");
            $model->pix_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->pix_updated_at = date("Y-m-d H:i:s.u");
        });
        /*
        self::created(function($model){
            // ... code here
        });


        self::updated(function($model){
            // ... code here
        });

        self::deleting(function($model){
            // ... code here
        });

        self::deleted(function($model){
            // ... code here
        });
        */
    }
}
