<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class ApresentacaoItem extends Model
{
    //api_id_api,api_id_pal,api_id_col,api_slide,api_video,api_audio,api_data_exibe,api_ativo,api_created_at,api_updated_at,api_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'api_apresentacao_item';
    protected $primaryKey = 'api_id_api';
    protected $appends = ['acao'];
    protected $fillable = [
       'api_id_api','api_id_apr','api_tipo','api_posicao','api_conteudo','api_exibe','api_created_at','api_updated_at','api_deleted_at'
    ];
    protected $dates = ['api_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'api_created_at';
    const UPDATED_AT  = 'api_updated_at';
    const DELETED_AT  = 'api_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'api_created_at' => 'datetime:Y-m-d H:i:s',
        'api_updated_at' => 'datetime:Y-m-d H:i:s',
        'api_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function apresentacao(){ //--> especilidade
      return $this->belongsTo(Apresentacao::class, 'apr_id_apr', 'api_id_apr');
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
            $model->api_created_at = date("Y-m-d H:i:s.u");
            $model->api_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->api_updated_at = date("Y-m-d H:i:s.u");
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
