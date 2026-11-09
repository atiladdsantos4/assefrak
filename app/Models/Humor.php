<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Humor extends Model
{
    use HasFactory,SoftDeletes;

    public $timestamps = true;
    protected $table = 'hue_humor_energia';
    protected $primaryKey = 'hue_id_hue';
    protected $appends = ['acao'];
    protected $fillable = ['hue_id_hue','hue_descricao','hue_local','hue_created_at','hue_updated_at','hue_deleted_at'];
    protected $dates = ['hue_deleted_at'];

    const CREATED_AT = 'hue_created_at';
    const UPDATED_AT = 'hue_updated_at';
    const DELETED_AT = 'hue_deleted_at';

    protected $casts = [
        'hue_created_at' => 'datetime:Y-m-d H:i:s',
        'hue_updated_at' => 'datetime:Y-m-d H:i:s',
        'hue_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected function getacaoAttribute()
    {
        return 1;
    }

    public static function boot()
    {
        parent::boot();

        self::creating(function($model){
            $model->hue_created_at = date("Y-m-d H:i:s.u");
            $model->hue_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->hue_updated_at = date("Y-m-d H:i:s.u");
        });
    }
}
