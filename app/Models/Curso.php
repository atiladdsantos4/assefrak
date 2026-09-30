<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Curso extends Model
{
   //cur_id_cur,cur_descricao,cur_created_at,cur_updated_at,cur_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cur_cursos';
    protected $primaryKey = 'cur_id_cur';
    protected $appends = ['acao'];
    protected $fillable = [
       //cur_id_cur,cur_id_puf,cur_id_cae,cur_id_col,cur_id_est,cur_id_cid,cur_titulo,cur_descricao,cur_conteudo,cur_programacao,cur_galeria,cur_data_inicio,cur_data_fim,cur_hora_inicio,cur_hora_fim,cur_local,cur_concluido,cur_created_at,cur_updated_at,cur_deleted_at
       'cur_id_cur','cur_id_puf','cur_id_cae','cur_id_col','cur_id_est','cur_id_cid','cur_titulo','cur_descricao','cur_conteudo','cur_programacao','cur_galeria','cur_data_inicio','cur_estado','cur_cidade','cur_data_fim','cur_hora_inicio','cur_hora_fim','cur_local','cur_concluido','cur_created_at','cur_updated_at','cur_deleted_at'
    ];
    protected $dates = ['cur_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cur_created_at';
    const UPDATED_AT  = 'cur_updated_at';
    const DELETED_AT  = 'cur_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cur_created_at' => 'datetime:Y-m-d H:i:s',
        'cur_updated_at' => 'datetime:Y-m-d H:i:s',
        'cur_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function publico(){ //--> especilidade
      return $this->hasOne(PublicoFoco::class, 'puf_id_puf', 'cur_id_puf');
    }

    public function cidade(){ //--> especilidade
      return $this->hasOne(Cidade::class, 'cid_id_cid', 'cur_id_cid');
    }

    public function estado(){ //--> especilidade
      return $this->hasOne(Estado::class, 'est_id_est', 'cur_id_est');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function categoria(){ //--> especilidade
       return $this->hasOne(CategoriaEvento::class, 'cae_id_cae', 'cur_id_cae');
       //->makeHidden(['dataini', 'datafim']);
    }

    public function colaborador(){ //--> especilidade
       return $this->hasOne(Colaborador::class, 'col_id_col', 'cur_id_col');
       //->makeHidden(['dataini', 'datafim']);
    }

    public function inscritos(){ //--> especilidade
       return $this->hasMany(Inscricao::class, 'ins_id_cur', 'cur_id_cur');
       //->makeHidden(['dataini', 'datafim']);
    }

    public function qtdeinscritos(){ //--> especilidade
        return $this->hasMany(Inscricao::class, 'ins_id_cur', 'cur_id_cur')
        ->selectRaw('count(*) as total');
    }

    public function itens(){ //--> especilidade
       return $this->hasMany(CursoItem::class, 'cui_id_cur', 'cur_id_cur');
       //->makeHidden(['dataini', 'datafim']);
    }

    public function itens_main(){ //--> especilidade
       return $this->hasMany(CursoItem::class, 'cui_id_cur', 'cur_id_cur')
       ->where('cui_tipo_informacao','IC');
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

    protected function getacaoAttribute(){ //--> qtde_escuros
        return 1;
    }

    //boot curnts
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            // $model->cur_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->cur_hora_fim = date("Y-m-d H:i:s.u");
            $model->cur_created_at = date("Y-m-d H:i:s.u");
            $model->cur_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            // $model->cur_hora_inicio = date("Y-m-d H:i:s.u");
            // $model->cur_hora_fim = date("Y-m-d H:i:s.u");
            $model->cur_updated_at = date("Y-m-d H:i:s.u");
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
