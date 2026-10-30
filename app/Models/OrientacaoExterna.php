<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class OrientacaoExterna extends Model
{
    //ori_id_ori,ori_descricao,ori_local,ori_created_at,ori_updated_at,ori_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //ori_id_ori,ori_name,ori_cpf,ori_email,ori_tipo_telefone,ori_telefone,ori_ativo,ori_created_at,ori_updated_at,ori_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'ori_orientacao_externa';
    protected $primaryKey = 'ori_id_ori';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'ori_id_ori','ori_descricao','ori_local','ori_created_at','ori_updated_at','ori_deleted_at'
    ];
    protected $dates = ['ori_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'ori_created_at';
    const UPDATED_AT  = 'ori_updated_at';
    const DELETED_AT  = 'ori_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'ori_created_at' => 'datetime:Y-m-d H:i:s',
        'ori_updated_at' => 'datetime:Y-m-d H:i:s',
        'ori_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_ori', 'ori_id_ori');
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
            $model->ori_created_at = date("Y-m-d H:i:s.u");
            $model->ori_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ori_updated_at = date("Y-m-d H:i:s.u");
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
