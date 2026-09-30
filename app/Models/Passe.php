<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Passe extends Model
{
    //pas_id_pas,pas_descricao,pas_local,pas_created_at,pas_updated_at,pas_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //pas_id_pas,pas_name,pas_cpf,pas_email,pas_tipo_telefone,pas_telefone,pas_ativo,pas_created_at,pas_updated_at,pas_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'pas_passe';
    protected $primaryKey = 'pas_id_pas';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'pas_id_pas','pas_descricao','pas_local','pas_created_at','pas_updated_at','pas_deleted_at'
    ];
    protected $dates = ['pas_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'pas_created_at';
    const UPDATED_AT  = 'pas_updated_at';
    const DELETED_AT  = 'pas_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'pas_created_at' => 'datetime:Y-m-d H:i:s',
        'pas_updated_at' => 'datetime:Y-m-d H:i:s',
        'pas_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_pas', 'pas_id_pas');
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
            $model->pas_created_at = date("Y-m-d H:i:s.u");
            $model->pas_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->pas_updated_at = date("Y-m-d H:i:s.u");
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
