<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ComportamentoPassivo extends Model
{
    //cpp_id_cpp,cpp_descricao,cpp_local,cpp_created_at,cpp_updated_at,cpp_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //cpp_id_cpp,cpp_name,cpp_cpf,cpp_email,cpp_tipo_telefone,cpp_telefone,cpp_ativo,cpp_created_at,cpp_updated_at,cpp_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cpp_comportamento_passivo';
    protected $primaryKey = 'cpp_id_cpp';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'cpp_id_cpp','cpp_descricao','cpp_local','cpp_created_at','cpp_updated_at','cpp_deleted_at'
    ];
    protected $dates = ['cpp_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cpp_created_at';
    const UPDATED_AT  = 'cpp_updated_at';
    const DELETED_AT  = 'cpp_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cpp_created_at' => 'datetime:Y-m-d H:i:s',
        'cpp_updated_at' => 'datetime:Y-m-d H:i:s',
        'cpp_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_cpp', 'cpp_id_cpp');
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
            $model->cpp_created_at = date("Y-m-d H:i:s.u");
            $model->cpp_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cpp_updated_at = date("Y-m-d H:i:s.u");
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
