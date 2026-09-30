<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class Acolhido extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //aco_id_aco,aco_name,aco_cpf,aco_email,aco_tipo_telefone,aco_telefone,aco_ativo,aco_created_at,aco_updated_at,aco_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'aco_acolhido';
    protected $primaryKey = 'aco_id_aco';
    protected $appends = ['acao','aco_idade'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'aco_name','aco_cpf','aco_sexo','aco_email','aco_tipo_telefone','aco_telefone','aco_ativo','aco_estado','aco_cidade','aco_faixa','aco_nascimento','aco_created_at', 'aco_updated_at', 'aco_deleted_at'
    ];
    protected $dates = ['aco_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'aco_created_at';
    const UPDATED_AT  = 'aco_updated_at';
    const DELETED_AT  = 'aco_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'aco_created_at' => 'datetime:Y-m-d H:i:s',
        'aco_updated_at' => 'datetime:Y-m-d H:i:s',
        'aco_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function estado(){ //--> especilidade
      return $this->hasOne(Estado::class, 'est_id_est', 'aco_estado');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function cidade(){ //--> especilidade
      return $this->hasOne(Cidade::class, 'cid_id_cid', 'aco_cidade');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function faixa(){ //--> especilidade
      return $this->hasOne(Faixa::class, 'fai_id_fai', 'aco_faixa');
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

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    protected function getacoidadeAttribute(){ //--> qtde_escopos
        return Carbon::parse($this->aco_nascimento)->age;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->aco_created_at = date("Y-m-d H:i:s.u");
            $model->aco_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->aco_updated_at = date("Y-m-d H:i:s.u");
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
