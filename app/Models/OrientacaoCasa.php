<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class OrientacaoCasa extends Model
{
    //orc_id_orc,orc_descricao,orc_local,orc_created_at,orc_updated_at,orc_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //orc_id_orc,orc_name,orc_cpf,orc_email,orc_tipo_telefone,orc_telefone,orc_ativo,orc_created_at,orc_updated_at,orc_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'orc_orientacao_casa';
    protected $primaryKey = 'orc_id_orc';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'orc_id_orc','orc_descricao','orc_local','orc_created_at','orc_updated_at','orc_deleted_at'
    ];
    protected $dates = ['orc_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'orc_created_at';
    const UPDATED_AT  = 'orc_updated_at';
    const DELETED_AT  = 'orc_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'orc_created_at' => 'datetime:Y-m-d H:i:s',
        'orc_updated_at' => 'datetime:Y-m-d H:i:s',
        'orc_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_orc', 'orc_id_orc');
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
            $model->orc_created_at = date("Y-m-d H:i:s.u");
            $model->orc_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->orc_updated_at = date("Y-m-d H:i:s.u");
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
