<?php

namespace App\Models;

use CurlHandle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Inscricao extends Model
{
    //ins_id_ins,ins_descricao,ins_local,ins_created_at,ins_updated_at,ins_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //ins_id_ins,ins_id_cur,ins_id_eve,ins_id_puf,ins_nome,ins_email,ins_telefone,ins_tipo,ins_created_at,ins_updated_at,ins_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'ins_inscricao';
    protected $primaryKey = 'ins_id_ins';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'ins_id_ins','ins_id_cur','ins_id_eve','ins_id_puf','ins_nome','ins_email','ins_telefone','ins_tipo','ins_ativo','ins_envio_email','ins_created_at','ins_updated_at','ins_deleted_at'
    ];
    protected $dates = ['ins_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'ins_created_at';
    const UPDATED_AT  = 'ins_updated_at';
    const DELETED_AT  = 'ins_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'ins_created_at' => 'datetime:Y-m-d H:i:s',
        'ins_updated_at' => 'datetime:Y-m-d H:i:s',
        'ins_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function curso(){ //--> especilidade
      return $this->hasOne(Curso::class, 'cur_id_cur', 'ins_id_cur');
    }

    public function evento(){ //--> especilidade
      return $this->hasOne(Evento::class, 'eve_id_eve', 'ins_id_eve');
    }

    public function publico(){ //--> especilidade
      return $this->hasOne(PublicoFoco::class, 'puf_id_puf', 'ins_id_puf');
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
            $model->ins_created_at = date("Y-m-d H:i:s.u");
            $model->ins_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ins_updated_at = date("Y-m-d H:i:s.u");
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
