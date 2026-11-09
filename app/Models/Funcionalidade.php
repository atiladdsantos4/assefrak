<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Funcionalidade extends Model
{
    use HasFactory,SoftDeletes;

    public $timestamps = true;
    protected $table = 'fun_funcionalidade';
    protected $primaryKey = 'fun_id_fun';
    protected $appends = ['acao'];

    protected $fillable = [
       'fun_id_tfu','fun_descricao','fun_link','fun_id_men','fun_created_at','fun_updated_at','fun_deleted_at'
    ];

    protected $dates = ['fun_deleted_at'];

    const CREATED_AT  = 'fun_created_at';
    const UPDATED_AT  = 'fun_updated_at';
    const DELETED_AT  = 'fun_deleted_at';

    protected $casts = [
        'fun_created_at' => 'datetime:Y-m-d H:i:s',
        'fun_updated_at' => 'datetime:Y-m-d H:i:s',
        'fun_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function tipo(){
       return $this->hasOne(TipoFuncionalidade::class, 'tfu_id_tfu', 'fun_id_tfu');
    }

    public function menu(){
       return $this->hasOne(Menu::class, 'men_id_men', 'fun_id_men');
    }

    protected function getacaoAttribute(){
       return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){
            $model->fun_created_at = date("Y-m-d H:i:s.u");
            $model->fun_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->fun_updated_at = date("Y-m-d H:i:s.u");
        });
    }
}
