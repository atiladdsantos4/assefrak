<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class CondicoesRelatada extends Model
{
    //cor_id_cor,cor_descricao,cor_local,cor_created_at,cor_updated_at,cor_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //cor_id_cor,cor_name,cor_cpf,cor_email,cor_tipo_telefone,cor_telefone,cor_ativo,cor_created_at,cor_updated_at,cor_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cor_condicoes_relatada';
    protected $primaryKey = 'cor_id_cor';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'cor_id_cor','cor_descricao','cor_local','cor_created_at','cor_updated_at','cor_deleted_at'
    ];
    protected $dates = ['cor_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cor_created_at';
    const UPDATED_AT  = 'cor_updated_at';
    const DELETED_AT  = 'cor_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cor_created_at' => 'datetime:Y-m-d H:i:s',
        'cor_updated_at' => 'datetime:Y-m-d H:i:s',
        'cor_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_cor', 'cor_id_cor');
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
            $model->cor_created_at = date("Y-m-d H:i:s.u");
            $model->cor_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cor_updated_at = date("Y-m-d H:i:s.u");
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
