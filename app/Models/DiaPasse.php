<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DiaPasse extends Model
{
    //dip_id_dip,dip_descricao,dip_local,dip_created_at,dip_updated_at,dip_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //dip_id_dip,dip_name,dip_cpf,dip_email,dip_tipo_telefone,dip_telefone,dip_ativo,dip_created_at,dip_updated_at,dip_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'dip_dia_passe';
    protected $primaryKey = 'dip_id_dip';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'dip_id_dip','dip_descricao','dip_local','dip_created_at','dip_updated_at','dip_deleted_at'
    ];
    protected $dates = ['dip_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'dip_created_at';
    const UPDATED_AT  = 'dip_updated_at';
    const DELETED_AT  = 'dip_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'dip_created_at' => 'datetime:Y-m-d H:i:s',
        'dip_updated_at' => 'datetime:Y-m-d H:i:s',
        'dip_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_dip', 'dip_id_dip');
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
            $model->dip_created_at = date("Y-m-d H:i:s.u");
            $model->dip_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->dip_updated_at = date("Y-m-d H:i:s.u");
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
