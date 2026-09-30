<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Evento extends Model
{
   //eve_id_eve,eve_descricao,eve_created_at,eve_updated_at,eve_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'eve_evento';
    protected $primaryKey = 'eve_id_eve';
    protected $appends = ['acao'];
    protected $fillable = [
       'eve_id_eve','eve_id_puf','eve_id_cae','eve_titulo','eve_foco','eve_data_inicio','eve_estado','eve_cidade','eve_data_fim','eve_hora_inicio','eve_hora_fim','eve_local','eve_concluido','eve_created_at','eve_updated_at','eve_deleted_at'
    ];
    protected $dates = ['eve_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'eve_created_at';
    const UPDATED_AT  = 'eve_updated_at';
    const DELETED_AT  = 'eve_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'eve_created_at' => 'datetime:Y-m-d H:i:s',
        'eve_updated_at' => 'datetime:Y-m-d H:i:s',
        'eve_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function publico(){ //--> especilidade
      return $this->hasOne(PublicoFoco::class, 'puf_id_puf', 'eve_id_puf');
    }

    public function cidade(){ //--> especilidade
      return $this->hasOne(Cidade::class, 'cid_id_cid', 'eve_cidade');
    }

    public function estado(){ //--> especilidade
      return $this->hasOne(Estado::class, 'est_id_est', 'eve_estado');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function categoria(){ //--> especilidade
       return $this->hasOne(CategoriaEvento::class, 'cae_id_cae', 'eve_id_cae');
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

    protected function getacaoAttribute(){ //--> qtde_eseveos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            // $model->eve_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->eve_hora_fim = date("Y-m-d H:i:s.u");
            $model->eve_created_at = date("Y-m-d H:i:s.u");
            $model->eve_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            // $model->eve_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->eve_hora_fim = date("Y-m-d H:i:s.u");
            $model->eve_updated_at = date("Y-m-d H:i:s.u");
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
