<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class CursoItem extends Model
{
   //cui_id_cui,cui_descricao,cui_created_at,cui_updated_at,cui_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cui_curso_item';
    protected $primaryKey = 'cui_id_cui';
    protected $appends = ['acao'];
    protected $fillable = [
       'cui_id_cui','cui_id_cur','cui_tipo_informacao','cui_dados_inf','cui_created_at','cui_updated_at','cui_deleted_at'
    ];
    protected $dates = ['cui_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cui_created_at';
    const UPDATED_AT  = 'cui_updated_at';
    const DELETED_AT  = 'cui_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cui_created_at' => 'datetime:Y-m-d H:i:s',
        'cui_updated_at' => 'datetime:Y-m-d H:i:s',
        'cui_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function publico(){ //--> especilidade
    //   return $this->hasOne(PublicoFoco::class, 'puf_id_puf', 'cui_id_puf');
    // }

    // public function cidade(){ //--> especilidade
    //   return $this->hasOne(Cidade::class, 'cid_id_cid', 'cui_cidade');
    // }

    // public function estado(){ //--> especilidade
    //   return $this->hasOne(Estado::class, 'est_id_est', 'cui_estado');
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

    protected function getacaoAttribute(){ //--> qtde_escuios
        return 1;
    }

    //boot cuints
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            // $model->cui_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->cui_hora_fim = date("Y-m-d H:i:s.u");
            $model->cui_created_at = date("Y-m-d H:i:s.u");
            $model->cui_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            // $model->cui_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->cui_hora_fim = date("Y-m-d H:i:s.u");
            $model->cui_updated_at = date("Y-m-d H:i:s.u");
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
