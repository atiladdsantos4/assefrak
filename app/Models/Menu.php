<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class Menu extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <---//
    protected $table = 'men_menu';
    protected $primaryKey = 'men_id_men';
    protected $appends = ['acao'];
    protected $fillable = [
       'men_id_pai','men_name','men_classe','men_click','men_nivel','men_position','men_created_at', 'men_updated_at', 'men_deleted_at'
    ];
    protected $dates = ['men_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'men_created_at';
    const UPDATED_AT  = 'men_updated_at';
    const DELETED_AT  = 'men_deleted_at';

    protected $casts = [//output
        'men_created_at' => 'datetime:Y-m-d H:i:s',
        'men_updated_at' => 'datetime:Y-m-d H:i:s',
        'men_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function menupai(){ //--> especilidade
      return $this->hasOne(Menu::class, 'men_id_men', 'men_id_pai');
      //->makeHidden(['dataini', 'datafim']);
    }

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->men_created_at = date("Y-m-d H:i:s.u");
            $model->men_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->men_updated_at = date("Y-m-d H:i:s.u");
        });
    }
}
