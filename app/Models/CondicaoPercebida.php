<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class CondicaoPercebida extends Model
{
    //per_id_per,per_descricao,per_local,per_created_at,per_updated_at,per_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //per_id_per,per_name,per_cpf,per_email,per_tipo_telefone,per_telefone,per_ativo,per_created_at,per_updated_at,per_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'per_condicao_percebida';
    protected $primaryKey = 'per_id_per';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'per_id_per','per_descricao','per_local','per_created_at','per_updated_at','per_deleted_at'
    ];
    protected $dates = ['per_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'per_created_at';
    const UPDATED_AT  = 'per_updated_at';
    const DELETED_AT  = 'per_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'per_created_at' => 'datetime:Y-m-d H:i:s',
        'per_updated_at' => 'datetime:Y-m-d H:i:s',
        'per_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_per', 'per_id_per');
    //   //->makeHidden(['dataini', 'datafim']);

    // }
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
            $model->per_created_at = date("Y-m-d H:i:s.u");
            $model->per_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->per_updated_at = date("Y-m-d H:i:s.u");
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
