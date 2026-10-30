<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ComportamentoReativo extends Model
{
    //cpr_id_cpr,cpr_descricao,cpr_local,cpr_created_at,cpr_updated_at,cpr_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //cpr_id_cpr,cpr_name,cpr_cpf,cpr_email,cpr_tipo_telefone,cpr_telefone,cpr_ativo,cpr_created_at,cpr_updated_at,cpr_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cpr_comportamento_reativo';
    protected $primaryKey = 'cpr_id_cpr';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'cpr_id_cpr','cpr_descricao','cpr_local','cpr_created_at','cpr_updated_at','cpr_deleted_at'
    ];
    protected $dates = ['cpr_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cpr_created_at';
    const UPDATED_AT  = 'cpr_updated_at';
    const DELETED_AT  = 'cpr_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cpr_created_at' => 'datetime:Y-m-d H:i:s',
        'cpr_updated_at' => 'datetime:Y-m-d H:i:s',
        'cpr_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_cpr', 'cpr_id_cpr');
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
            $model->cpr_created_at = date("Y-m-d H:i:s.u");
            $model->cpr_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cpr_updated_at = date("Y-m-d H:i:s.u");
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
