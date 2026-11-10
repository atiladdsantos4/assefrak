<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class InformacaoTecnica extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;
    protected $table = 'inf_informacao_tecnica';
    protected $primaryKey = 'inf_id_inf';
    protected $appends = ['acao'];

    protected $fillable = [
        'inf_id_inf',
        'inf_autor',
        'inf_url_dev',
        'inf_url_prod',
        'inf_env_dev',
        'inf_env_prod',
        'inf_db_dev',
        'inf_db_prod',
        'inf_url_git',
        'inf_ftp_url',
        'inf_ftp_senhas',
        'inf_ssh_url',
        'inf_ssh_senha',
        'inf_versao_laravel',
        'inf_created_at',
        'inf_updated_at',
        'inf_deleted_at',
    ];

    protected $dates = ['inf_deleted_at'];

    const CREATED_AT = 'inf_created_at';
    const UPDATED_AT = 'inf_updated_at';
    const DELETED_AT = 'inf_deleted_at';

    protected $casts = [
        'inf_created_at' => 'datetime:Y-m-d H:i:s',
        'inf_updated_at' => 'datetime:Y-m-d H:i:s',
        'inf_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected function getacaoAttribute()
    {
        return 1;
    }

    public static function boot()
    {
        parent::boot();

        self::creating(function($model){
            $model->inf_created_at = date("Y-m-d H:i:s.u");
            $model->inf_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->inf_updated_at = date("Y-m-d H:i:s.u");
        });
    }
}
