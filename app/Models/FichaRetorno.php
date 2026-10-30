<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;


class FichaRetorno extends Model
{
    //fir_id_fir,fir_descricao,fir_created_at,fir_updated_at,fir_deleted_at
    //fir_id_fir,fir_descricao,fir_created_at,fir_updated_at,fir_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'fir_ficha_retorno';
    protected $primaryKey = 'fir_id_fir';
    protected $appends = ['acao','fie_data_retorno_format'];
    protected $fillable = [
       'fir_id_fir','fir_id_fie','fir_id_col','fir_sequencia','fir_observacao','fir_data_retorno','fir_created_at','fir_updated_at','fir_deleted_at'
    ];
    protected $dates = ['fir_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'fir_created_at';
    const UPDATED_AT  = 'fir_updated_at';
    const DELETED_AT  = 'fir_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'fir_created_at' => 'datetime:Y-m-d H:i:s',
        'fir_updated_at' => 'datetime:Y-m-d H:i:s',
        'fir_deleted_at' => 'datetime:Y-m-d H:i:s',
        'fir_data_retorno'=> 'date:d/m/Y',
    ];

    public function colaborador(){ //--> especilidade
      return $this->hasOne(Colaborador::class, 'col_id_col', 'fir_id_col');
      //->makeHidden(['dataini', 'datafim']);
    }

    protected function fieDataRetornoFormat(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->fir_data_retorno
                ? Carbon::parse($this->fir_data_retorno)->format('Y/m/d')
                : null
        );
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
            $model->fir_created_at = date("Y-m-d H:i:s.u");
            $model->fir_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->fir_updated_at = date("Y-m-d H:i:s.u");
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
