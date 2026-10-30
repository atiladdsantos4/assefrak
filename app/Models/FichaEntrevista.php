<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Transliterator;

class FichaEntrevista extends Model
{
    //fie_id_fie,fie_descricao,fie_created_at,fie_updated_at,fie_deleted_at
    //fie_id_fie,fie_descricao,fie_created_at,fie_updated_at,fie_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'fie_ficha_entrevista';
    protected $primaryKey = 'fie_id_fie';
    protected $appends = ['acao'];
    protected $fillable = [
       'fie_id_fie','fie_id_aco','fie_id_col','fie_id_tra','fie_motivo','fie_humor','fie_desc_humor','fie_reativos','fie_desc_reativos','fie_passivos','fie_desc_passivos','fie_sono','fie_desc_sono','fie_gravidade',
       'fie_desc_gravidade','fie_percebidas','fie_desc_percebidas','fie_diapasse','fie_orientacoes_casa','fie_orientacoes_externa','fie_anotacao','fie_ativo','fie_created_at','fie_updated_at','fie_deleted_at'
    ];
    protected $dates = ['fie_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'fie_created_at';
    const UPDATED_AT  = 'fie_updated_at';
    const DELETED_AT  = 'fie_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'fie_created_at' => 'datetime:Y-m-d H:i:s',
        'fie_updated_at' => 'datetime:Y-m-d H:i:s',
        'fie_deleted_at' => 'datetime:Y-m-d H:i:s',
        'fie_humor'=>'array',
        'fie_reativos'=>'array',
        'fie_passivos'=>'array',
        'fie_sono'=>'array',
        'fie_gravidade'=>'array',
        'fie_percebidas'=>'array',
        'fie_diapasse'=>'array',
        'fie_orientacoes_casa'=>'array',
        'fie_orientacoes_externa'=>'array',
        'fie_acolhido'=>'array',
    ];

    public function acolhido(){ //--> especilidade
      return $this->hasOne(Acolhido::class, 'aco_id_aco', 'fie_id_aco');
      //->makeHidden(['dataini', 'datafim']);'fie_id_aco','fie_id_col','fie_id_tra'
    }

    public function colaborador(){ //--> especilidade
      return $this->hasOne(Colaborador::class, 'col_id_col', 'fie_id_col');
      //->makeHidden(['dataini', 'datafim']);'fie_id_aco','fie_id_col','fie_id_tra'
    }

    public function tratamento(){ //--> especilidade
      return $this->hasOne(Tratamento::class, 'tra_id_tra', 'fie_id_tra');
      //->makeHidden(['dataini', 'datafim']);'fie_id_aco','fie_id_col','fie_id_tra'
    }

    public function retorno(){ //--> especilidade
      return $this->hasMany(FichaRetorno::class, 'fir_id_fie', 'fie_id_fie')
      ->with('colaborador:col_id_col,col_name');
      //->makeHidden(['dataini', 'datafim']);'fie_id_aco','fie_id_col','fie_id_tra'
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

        self::saving(function ($model) {
         $camposJson = [
                'fie_humor',
                'fie_reativos',
                'fie_passivos',
                'fie_sono',
                'fie_gravidade',
                'fie_percebidas',
                'fie_diapasse',
                'fie_orientacoes_casa',
                'fie_orientacoes_externa',
        ];

        foreach ($camposJson as $campo) {
            $valor = $model->getAttribute($campo);

            if (is_string($valor)) {
                    $model->setAttribute(
                        $campo,
                        json_decode($valor, true, 512, JSON_THROW_ON_ERROR)
                    );
                }
            }
        });

        self::creating(function($model){//before create
            $model->fie_created_at = date("Y-m-d H:i:s.u");
            $model->fie_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->fie_updated_at = date("Y-m-d H:i:s.u");
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
