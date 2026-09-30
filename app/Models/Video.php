<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Video extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'vid_videos';
    protected $primaryKey = 'vid_id_vid';
    protected $appends = ['acao'];
    protected $fillable = [
       'vid_id_vid','vid_id_cav','vid_descricao','vid_hash_link','vid_ativo','vid_created_at','vid_updated_at','vid_deleted_at'
    ];
    protected $dates = ['vid_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'vid_created_at';
    const UPDATED_AT  = 'vid_updated_at';
    const DELETED_AT  = 'vid_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'vid_created_at' => 'datetime:Y-m-d H:i:s',
        'vid_updated_at' => 'datetime:Y-m-d H:i:s',
        'vid_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function categoria(){ //--> especilidade
      return $this->hasOne(CategoriaVideo::class, 'cav_id_cav', 'vid_id_cav');
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
            $model->vid_created_at = date("Y-m-d H:i:s.u");
            $model->vid_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->vid_updated_at = date("Y-m-d H:i:s.u");
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
