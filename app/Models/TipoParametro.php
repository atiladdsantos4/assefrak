<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class TipoParametro extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'tipo_parametro';
    protected $primaryKey = 'tip_id_tip';
    protected $appends = ['acao'];
    protected $fillable = [
        'tip_nome','tip_created_at', 'tip_updated_at', 'tip_deleted_at'
    ];
    protected $dates = ['tip_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'tip_created_at';
    const UPDATED_AT  = 'tip_updated_at';
    const DELETED_AT  = 'tip_deleted_at';
    
    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1; 
    }

    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->tip_created_at = date("Y-m-d H:i:s.u");
            $model->tip_updated_at = date("Y-m-d H:i:s.u");
        });
        
        self::updating(function($model){
            $model->tip_updated_at = date("Y-m-d H:i:s.u");
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
/*
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Empresa extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'tip_empresa';
    protected $primaryKey = 'tip_id_emp';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
        'tip_email', 'tip_nome', 'tip_tipo_empresa', 'tip_cnpj_cpf', 'tip_tipo_telefone', 'tip_telefone', 'tip_ativo', 'tip_logo', 'tip_hash', 'tip_created_at', 'tip_updated_at', 'tip_deleted_at'
    ];
    //tip_id_emp,tip_email,tip_tipo_empresa,tip_cnpj_cpf,tip_tipo_telefone,tip_telefone,tip_created_at,tip_updated_at,tip_deleted_at
    protected $dates = ['pac_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'tip_created_at';
    const UPDATED_AT  = 'tip_updated_at';
    const DELETED_AT  = 'tip_deleted_at';
    
    //protected $dateFormat = 'U';

    protected $casts = [//output
        'tip_created_at' => 'datetime:Y-m-d H:i:s',
        'tip_updated_at' => 'datetime:Y-m-d H:i:s',
        'tip_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];
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
    
   

    //boot events
    
}

*/