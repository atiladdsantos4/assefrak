<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ControlePasse extends Model
{
    //cop_id_cop,cop_descricao,cop_created_at,cop_updated_at,cop_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cop_controle_passe';
    protected $primaryKey = 'cop_id_cop';
    protected $appends = ['acao'];
    protected $fillable = [
       'cop_id_cop','cop_id_tra','cop_id_col','cop_data_prevista','cop_data_atendimento','cop_concluido','cop_created_at','cop_updated_at','cop_deleted_at'
    ];
    protected $dates = ['cop_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cop_created_at';
    const UPDATED_AT  = 'cop_updated_at';
    const DELETED_AT  = 'cop_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cop_created_at' => 'datetime:Y-m-d H:i:s',
        'cop_updated_at' => 'datetime:Y-m-d H:i:s',
        'cop_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function colaborador(){ //--> especilidade
      return $this->hasOne(Colaborador::class, 'col_id_col', 'cop_id_col');
      //->makeHidden(['dataini', 'datafim']);

    }

    public function tratamento(){ //--> especilidade
      return $this->hasOne(Tratamento::class, 'tra_id_tra', 'cop_id_tra');
      //->makeHidden(['dataini', 'datafim']);

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
            $model->cop_created_at = date("Y-m-d H:i:s.u");
            $model->cop_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cop_updated_at = date("Y-m-d H:i:s.u");
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



