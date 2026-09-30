<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Colaborador extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //col_id_col,col_ocupacao,col_name,col_cpf,col_email,col_sexo,col_tipo_telefone,col_telefone,col_ativo,col_estado,col_cidade,col_nascimento,col_imagem,col_created_at,col_updated_at,col_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'col_colaborador';
    protected $primaryKey = 'col_id_col';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
       'col_name','col_cpf','col_sexo','col_email','col_titulo','col_tipo_telefone','col_telefone','col_ativo','col_estado','col_cidade','col_ocupacao','col_nascimento','col_imagem','col_created_at', 'col_updated_at', 'col_deleted_at'
    ];
    protected $dates = ['col_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'col_created_at';
    const UPDATED_AT  = 'col_updated_at';
    const DELETED_AT  = 'col_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'col_created_at' => 'datetime:Y-m-d H:i:s',
        'col_updated_at' => 'datetime:Y-m-d H:i:s',
        'col_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function estado(){ //--> especilidade
      return $this->hasOne(Estado::class, 'est_id_est', 'col_estado');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function cidade(){ //--> especilidade
      return $this->hasOne(Cidade::class, 'cid_id_cid', 'col_cidade');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function ocupacao(){ //--> especilidade
      return $this->hasOne(Ocupacao::class, 'ocu_id_ocu', 'col_ocupacao');
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
            $model->col_created_at = date("Y-m-d H:i:s.u");
            $model->col_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->col_updated_at = date("Y-m-d H:i:s.u");
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
