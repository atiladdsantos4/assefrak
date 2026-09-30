<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Tratamento extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'tra_tratamento';
    protected $primaryKey = 'tra_id_tra';
    protected $appends = ['acao','controle'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'tra_id_aco','tra_id_col','tra_id_tit','tra_id_stt','tra_passe','tra_foco_energetico','tra_cond_energetica','tra_fortalecimento','tra_limpeza','tra_alerta','tra_pri_impressao','tra_created_at','tra_updated_at','tra_deleted_at'
    ];
    protected $dates = ['tra_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'tra_created_at';
    const UPDATED_AT  = 'tra_updated_at';
    const DELETED_AT  = 'tra_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'tra_created_at' => 'datetime:Y-m-d H:i:s',
        'tra_updated_at' => 'datetime:Y-m-d H:i:s',
        'tra_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function acolhido(){ //--> especilidade
      return $this->hasOne(Acolhido::class, 'aco_id_aco', 'tra_id_aco');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function colaborador(){ //--> especilidade
      return $this->hasOne(Colaborador::class, 'col_id_col', 'tra_id_col');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function tipotratamento(){ //--> especilidade
      return $this->hasOne(TipoTratamento::class, 'tit_id_tit', 'tra_id_tit');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function status(){ //--> especilidade
      return $this->hasOne(StatusTratamento::class, 'stt_id_stt', 'tra_id_stt');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function ocorrencias(){ //--> especilidade
      return $this->hasMany(OcorrenciaPasse::class, 'ocp_id_tra', 'tra_id_tra');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function getcontroleAttribute(){ //--> especilidade
      $exist = ControlePasse::where('cop_id_tra',$this->tra_id_tra)->exists();
      return $exist;
    }
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
            $model->tra_created_at = date("Y-m-d H:i:s.u");
            $model->tra_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->tra_updated_at = date("Y-m-d H:i:s.u");
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
