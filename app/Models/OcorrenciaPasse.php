<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class OcorrenciaPasse extends Model
{
    //ocp_id_ocp,ocp_id_tra,ocp_id_ocp,ocp_descricao,ocp_created_at,ocp_updated_at,ocp_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'ocp_ocorrencia_passe';
    protected $primaryKey = 'ocp_id_ocp';
    protected $appends = ['acao'];
    protected $fillable = [
       'ocp_id_ocp','ocp_id_tra','ocp_id_top','ocp_descricao','ocp_created_at','ocp_updated_at','ocp_deleted_at'
    ];
    protected $dates = ['ocp_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'ocp_created_at';
    const UPDATED_AT  = 'ocp_updated_at';
    const DELETED_AT  = 'ocp_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'ocp_created_at' => 'datetime:Y-m-d H:i:s',
        'ocp_updated_at' => 'datetime:Y-m-d H:i:s',
        'ocp_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function tipoocorrencia(){ //--> especilidade
      return $this->hasOne(TipoOcorrencia::class, 'top_id_top', 'ocp_id_top');
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
            $model->ocp_created_at = date("Y-m-d H:i:s.u");
            $model->ocp_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ocp_updated_at = date("Y-m-d H:i:s.u");
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
