<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class CognicaoSono extends Model
{
    //cos_id_cos,cos_descricao,cos_local,cos_created_at,cos_updated_at,cos_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //cos_id_cos,cos_name,cos_cpf,cos_email,cos_tipo_telefone,cos_telefone,cos_ativo,cos_created_at,cos_updated_at,cos_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cos_cognicao_sono';
    protected $primaryKey = 'cos_id_cos';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'cos_id_cos','cos_descricao','cos_local','cos_created_at','cos_updated_at','cos_deleted_at'
    ];
    protected $dates = ['cos_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cos_created_at';
    const UPDATED_AT  = 'cos_updated_at';
    const DELETED_AT  = 'cos_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cos_created_at' => 'datetime:Y-m-d H:i:s',
        'cos_updated_at' => 'datetime:Y-m-d H:i:s',
        'cos_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_cos', 'cos_id_cos');
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
            $model->cos_created_at = date("Y-m-d H:i:s.u");
            $model->cos_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cos_updated_at = date("Y-m-d H:i:s.u");
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
