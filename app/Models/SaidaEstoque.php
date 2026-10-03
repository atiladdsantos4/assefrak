<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

//sae_id_sae,sae_id_ene,sae_qtde,sae_valor_unit,sae_valor_total,qtde_saida,sae_confirmado,sae_created_at,sae_updated_at,sae_deleted_at
class SaidaEstoque extends Model
{
    //sae_id_sae,sae_descricao,sae_local,sae_created_at,sae_updated_at,sae_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //sae_id_sae,sae_name,sae_cpf,sae_email,sae_tipo_telefone,sae_telefone,sae_ativo,sae_created_at,sae_updated_at,sae_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'sae_saida_estoque';
    protected $primaryKey = 'sae_id_sae';
    protected $appends = ['acao'];

    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'sae_id_sae','sae_id_ene','sae_valor_unit','sae_valor_total','sae_qtde_saida','sae_confirmado','sae_cancelado','sae_hash','sae_created_at','sae_updated_at','sae_deleted_at'
    ];

    protected $dates = ['sae_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'sae_created_at';
    const UPDATED_AT  = 'sae_updated_at';
    const DELETED_AT  = 'sae_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'sae_created_at' => 'datetime:Y-m-d H:i:s',
        'sae_updated_at' => 'datetime:Y-m-d H:i:s',
        'sae_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function entrada(){ //--> especilidade
       return $this->hasOne(EntradaEstoque::class, 'ene_id_ene', 'sae_id_ene');
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
            $model->sae_created_at = date("Y-m-d H:i:s.u");
            $model->sae_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->sae_updated_at = date("Y-m-d H:i:s.u");
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
