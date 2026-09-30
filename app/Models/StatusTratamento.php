<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class StatusTratamento extends Model
{
    //stt_id_stt,stt_descricao,stt_created_at,stt_updated_at,stt_deleted_at
    //stt_id_stt,stt_descricao,stt_created_at,stt_updated_at,stt_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'stt_status_tratamento';
    protected $primaryKey = 'stt_id_stt';
    protected $appends = ['acao'];
    protected $fillable = [
       'stt_id_stt','stt_descricao','stt_created_at','stt_updated_at','stt_deleted_at'
    ];
    protected $dates = ['stt_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'stt_created_at';
    const UPDATED_AT  = 'stt_updated_at';
    const DELETED_AT  = 'stt_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'stt_created_at' => 'datetime:Y-m-d H:i:s',
        'stt_updated_at' => 'datetime:Y-m-d H:i:s',
        'stt_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_stt', 'stt_id_stt');
    //   //->makeHidden(['dataini', 'datafim']);

    // }
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

    public static function getIdStatus($valor)
    {
        $desc = trim($valor);
        $id = StatusTratamento::where('stt_descricao',$desc)->first();
        return $id->stt_id_stt;
    }

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->stt_created_at = date("Y-m-d H:i:s.u");
            $model->stt_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->stt_updated_at = date("Y-m-d H:i:s.u");
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
