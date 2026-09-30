<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class LivroPix extends Model
{
    //lip_id_lip,lip_id_liv,lip_id_pix,lip_qrcode,lip_copy_qrcode,lip_valor_qrcode,lip_created_at,lip_updated_at,lip_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update livomarically by laravel <--//
    protected $table = 'lip_livro_pix';
    protected $primaryKey = 'lip_id_lip';
    protected $appends = ['acao'];
    protected $fillable = [
       'lip_id_lip','lip_id_prl','lip_id_pix','lip_qrcode','lip_copy_qrcode','lip_valor_qrcode','lip_created_at','lip_updated_at','lip_deleted_at'
    ];
    protected $dates = ['lip_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'lip_created_at';
    const UPDATED_AT  = 'lip_updated_at';
    const DELETED_AT  = 'lip_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'lip_created_at' => 'datetime:Y-m-d H:i:s',
        'lip_updated_at' => 'datetime:Y-m-d H:i:s',
        'lip_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function chavepix(){ //--> especilidade
       return $this->hasOne(Editora::class, 'edi_id_edi', 'lip_id_edi');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function autor(){ //--> especilidade
       return $this->hasOne(Autor::class, 'aut_id_aut', 'lip_id_aut');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function precoatual(){
       return $this->hasOne(PrecoLivro::class, 'prl_id_liv', 'lip_id_liv')
       ->select('prl_valor_desconto')
       ->where('prl_valor_atual','1');
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

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->lip_created_at = date("Y-m-d H:i:s.u");
            $model->lip_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->lip_updated_at = date("Y-m-d H:i:s.u");
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
