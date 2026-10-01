<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Departamento extends Model
{
    //dep_id_dep,dep_descricao,dep_created_at,dep_updated_at,dep_deleted_at
    //dep_id_dep,dep_descricao,dep_created_at,dep_updated_at,dep_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update depomarically by laravel <--//
    protected $table = 'dep_departamento';
    protected $primaryKey = 'dep_id_dep';
    protected $appends = ['acao'];
    protected $fillable = [
       'dep_id_dep','dep_descricao','dep_email','dep_ativo','dep_created_at','dep_updated_at','dep_deleted_at'
    ];
    protected $dates = ['dep_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'dep_created_at';
    const UPDATED_AT  = 'dep_updated_at';
    const DELETED_AT  = 'dep_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'dep_created_at' => 'datetime:Y-m-d H:i:s',
        'dep_updated_at' => 'datetime:Y-m-d H:i:s',
        'dep_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public static function BuscaEmail($param){
       $resp = Departamento::where('dep_descricao',$param)->first();
       return $resp->dep_email;
    }
    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_dep', 'dep_id_dep');
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
            $model->dep_created_at = date("Y-m-d H:i:s.u");
            $model->dep_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->dep_updated_at = date("Y-m-d H:i:s.u");
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
