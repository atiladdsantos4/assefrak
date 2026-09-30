<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Bancos extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //ban_id_pix,ban_numero,ban_nome,ban_sigla,ban_complemento,ban_created_at,ban_updated_at,ban_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'ban_bancos';
    protected $primaryKey = 'ban_id_ban';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
        'ban_numero','ban_nome','ban_sigla','ban_complemento','ban_created_at', 'ban_updated_at', 'ban_deleted_at'
    ];
    protected $dates = ['ban_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'ban_created_at';
    const UPDATED_AT  = 'ban_updated_at';
    const DELETED_AT  = 'ban_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'ban_created_at' => 'datetime:Y-m-d H:i:s',
        'ban_updated_at' => 'datetime:Y-m-d H:i:s',
        'ban_deleted_at' => 'datetime:Y-m-d H:i:s',
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
    */

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->ban_created_at = date("Y-m-d H:i:s.u");
            $model->ban_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ban_updated_at = date("Y-m-d H:i:s.u");
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
