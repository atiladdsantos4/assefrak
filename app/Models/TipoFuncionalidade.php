<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class TipoFuncionalidade extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'tfu_tipo_funcionalidade';
    protected $primaryKey = 'tfu_id_tfu';
    protected $appends = ['acao'];
    protected $fillable = [
       'tfu_descricao','tfu_created_at', 'tfu_updated_at', 'tfu_deleted_at'
    ];
    protected $dates = ['tfu_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'tfu_created_at';
    const UPDATED_AT  = 'tfu_updated_at';
    const DELETED_AT  = 'tfu_deleted_at';

    protected $casts = [//output
        'tfu_created_at' => 'datetime:Y-m-d H:i:s',
        'tfu_updated_at' => 'datetime:Y-m-d H:i:s',
        'tfu_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->tfu_created_at = date("Y-m-d H:i:s.u");
            $model->tfu_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->tfu_updated_at = date("Y-m-d H:i:s.u");
        });
    }
}
