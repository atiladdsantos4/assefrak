<?php

namespace App\Models;

use Collator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Palestra extends Model
{
   //pal_id_pal,pal_descricao,pal_created_at,pal_updated_at,pal_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'pal_palestra';
    protected $primaryKey = 'pal_id_pal';
    protected $appends = ['acao'];
    protected $fillable = [
       'pal_id_pal','pal_id_col','pal_id_cae','pal_estado','pal_folder','pal_cidade','pal_tema','pal_texto','pal_data_inicio',
       'pal_data_fim','pal_hora_inicio','pal_hora_fim','pal_local','pal_concluido','pal_created_at','pal_updated_at','pal_deleted_at'
    ];
    protected $dates = ['pal_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'pal_created_at';
    const UPDATED_AT  = 'pal_updated_at';
    const DELETED_AT  = 'pal_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'pal_created_at' => 'datetime:Y-m-d H:i:s',
        'pal_updated_at' => 'datetime:Y-m-d H:i:s',
        'pal_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function colaborador(){ //--> especilidade
      return $this->hasOne(Colaborador::class, 'col_id_col', 'pal_id_col');
    }

    public function cidade(){ //--> especilidade
      return $this->hasOne(Cidade::class, 'cid_id_cid', 'pal_cidade');
    }

    public function estado(){ //--> especilidade
      return $this->hasOne(Estado::class, 'est_id_est', 'pal_estado');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function categoria(){ //--> especilidade
       return $this->hasOne(CategoriaEvento::class, 'cae_id_cae', 'pal_id_cae');
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

    protected function getacaoAttribute(){ //--> qtde_espalos
        return 1;
    }

    //boot palnts
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            // $model->pal_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->pal_hora_fim = date("Y-m-d H:i:s.u");
            $model->pal_created_at = date("Y-m-d H:i:s.u");
            $model->pal_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            // $model->pal_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->pal_hora_fim = date("Y-m-d H:i:s.u");
            $model->pal_updated_at = date("Y-m-d H:i:s.u");
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
