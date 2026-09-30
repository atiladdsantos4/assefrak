<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Piggly\Pix\StaticPayload;
use Piggly\Pix\Parser;
use Illuminate\Http\Request;



class PrecoLivro extends Model
{
     //prl_id_prl,prl_descricao,prl_created_at,prl_updated_at,prl_deleted_at
    //prl_id_prl,prl_descricao,prl_created_at,prl_updated_at,prl_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'prl_preco_livro';
    protected $primaryKey = 'prl_id_prl';
    protected $appends = ['acao'];
    protected $fillable = [
       'prl_id_prl','prl_id_liv','prl_data_vigor','prl_max_desconto','prl_valor_desconto','prl_valor','prl_valor_atual','prl_created_at','prl_updated_at','prl_deleted_at'
    ];
    protected $dates = ['prl_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'prl_created_at';
    const UPDATED_AT  = 'prl_updated_at';
    const DELETED_AT  = 'prl_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'prl_created_at' => 'datetime:Y-m-d H:i:s',
        'prl_updated_at' => 'datetime:Y-m-d H:i:s',
        'prl_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function livro(){ //--> livros
       return $this->hasOne(Livro::class, 'liv_id_liv','prl_id_liv')
       ->with('editora')
       ->with('autor');
      //->makeHidden(['dataini', 'datafim']);
    }


    public function qrcode(){ //--> livros
       return $this->hasOne(LivroPix::class, 'lip_id_prl','prl_id_prl')
       ->select('lip_id_lip');
      //->makeHidden(['dataini', 'datafim']);
    }


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

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'pac_id_pla');
    }
    */

    public static function geraQrcode( Request $request ){
        $all = $request->all();
        $dadosPix = Pix::where('pix_atual',1)->first();
        $idlivro = str_pad($all["id"], 8, "0", STR_PAD_LEFT);
        $pix = new StaticPayload();
        $pix->setPixKey($dadosPix->pix_tipo,$dadosPix->pix_chave) // YOUR PIX KEY (EVP, CPF, etc)
            ->setMerchantName($dadosPix->pix_nome_fantasia)
            ->setMerchantCity($dadosPix->pix_cidade)
            ->setAmount($all["valor"]) // Optional: Amount
            ->setDescription($all["livro"]) // Optional
            ->setTid($idlivro); // Optional: Transaction ID

        // 2. Generate Payload String
        $payload = $pix->getPixCode();

        // 3. Generate QR Code Image
        $qrcode = $pix->getQRCode();

        /*registra a transação*/
        $request->merge(['lip_id_pix' => $dadosPix->pix_id_pix]);
        $request->merge(['lip_id_prl' => $all["id"]]);
        $request->merge(['lip_qrcode' => $qrcode]);
        $request->merge(['lip_copy_qrcode' => $payload]);
        $request->merge(['lip_valor_qrcode' => $all["valor"]]);
        $request->merge(['lip_created_at' => date('Y-m-d H:i:s')]);
        $all = $request->all();
        $livro = LivroPix::where('lip_id_prl',$all["id"])->first();
        if( $livro == null){
          LivroPix::create($all);
        } else {
          $livro->update($all);
        }

        return true;

    }

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->prl_created_at = date("Y-m-d H:i:s.u");
            $model->prl_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->prl_updated_at = date("Y-m-d H:i:s.u");
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
