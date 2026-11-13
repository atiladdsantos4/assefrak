<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class InfAssefrak extends Model
{
    //ina_id_ina,ina_url_nome_centro,ina_url_instagran,ina_url_inst_credencial,
    //ina_url_facebook,ina_url_face_credencial,ina_url_site,ina_url_site_admin,
    //ina_telefone_admin,ina_telefone_contato,ina_telefone_fincanceiro,
    //ina_email,ina_created_at,ina_updated_at,ina_deleted_at

    use HasFactory,SoftDeletes;

    public $timestamps = true;

    protected $table = 'ina_inf_assefrak';

    protected $primaryKey = 'ina_id_ina';

    protected $appends = ['acao'];

    protected $fillable = [
        'ina_id_ina',
        'ina_url_nome_centro',
        'ina_url_instagran',
        'ina_url_inst_credencial',
        'ina_url_facebook',
        'ina_url_face_credencial',
        'ina_url_site',
        'ina_url_site_admin',
        'ina_telefone_admin',
        'ina_telefone_contato',
        'ina_telefone_fincanceiro',
        'ina_email',
        'ina_created_at',
        'ina_updated_at',
        'ina_deleted_at'
    ];

    protected $dates = ['ina_deleted_at'];

    const CREATED_AT = 'ina_created_at';
    const UPDATED_AT = 'ina_updated_at';
    const DELETED_AT = 'ina_deleted_at';

    protected $casts = [
        'ina_created_at' => 'datetime:Y-m-d H:i:s',
        'ina_updated_at' => 'datetime:Y-m-d H:i:s',
        'ina_deleted_at' => 'datetime:Y-m-d H:i:s',
        'ina_email' => 'array',
    ];

    protected function getacaoAttribute()
    {
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::saving(function ($model) {
         $camposJson = [
                'ina_email',
         ];

        foreach ($camposJson as $campo) {
            $valor = $model->getAttribute($campo);

            if (is_string($valor)) {
                    $model->setAttribute(
                        $campo,
                        json_decode($valor, true, 512, JSON_THROW_ON_ERROR)
                    );
                }
            }
        });

        self::creating(function($model){
            $model->ina_created_at = date("Y-m-d H:i:s.u");
            $model->ina_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ina_updated_at = date("Y-m-d H:i:s.u");
        });
    }
}
