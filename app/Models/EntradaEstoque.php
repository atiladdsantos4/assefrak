<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

//ene_id_ene,ene_id_liv,ene_qtde,ene_valor_unit,ene_valor_total,ene_saida,ene_created_at,ene_updated_at,ene_deleted_at

class EntradaEstoque extends Model
{
    //ene_id_ene,ene_descricao,ene_created_at,ene_updated_at,ene_deleted_at
    //ene_id_ene,ene_descricao,ene_created_at,ene_updated_at,ene_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update eneomarically by laravel <--//
    protected $table = 'ene_entrada_estoque';
    protected $primaryKey = 'ene_id_ene';
    protected $appends = ['acao'];
    protected $fillable = [
       'ene_id_ene','ene_id_liv','ene_qtde','ene_valor_unit','ene_valor_total','ene_saida','ene_created_at','ene_updated_at','ene_deleted_at'
    ];
    protected $dates = ['ene_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'ene_created_at';
    const UPDATED_AT  = 'ene_updated_at';
    const DELETED_AT  = 'ene_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'ene_created_at' => 'datetime:Y-m-d H:i:s',
        'ene_updated_at' => 'datetime:Y-m-d H:i:s',
        'ene_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function livro(){ //--> especilidade
      return $this->hasOne(Livro::class, 'liv_id_liv', 'ene_id_liv');
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
            $model->ene_created_at = date("Y-m-d H:i:s.u");
            $model->ene_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ene_updated_at = date("Y-m-d H:i:s.u");
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
