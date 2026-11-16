<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class VFicha extends Model
{
    // seq_id, descricao, fie_id_fie, fie_id_aco, fie_id_col,
    // id, descricao_item, ativo

    use HasFactory;

    public $timestamps = false;

    protected $table = 'v_ficha';

    protected $primaryKey = 'seq_id';

    public $incrementing = false;

    protected $keyType = 'int';

    //protected $appends = ['acao'];

    protected $fillable = [
        'seq_id',
        'descricao',
        'option',
        'fie_id_fie',
        'fie_id_aco',
        'fie_id_col',
        'id',
        'descricao_item',
        'ativo',
        'ano',
        'mes'
    ];

    protected $casts = [
        'seq_id' => 'integer',
        'fie_id_fie' => 'integer',
        'fie_id_aco' => 'integer',
        'fie_id_col' => 'integer',
        'id' => 'integer',
        'ativo' => 'integer',
    ];

    public function ficha(){ //--> especilidade
      return $this->hasOne(FichaEntrevista::class, 'fie_id_fie', 'fie_id_fie')
      ->select('fie_created_at');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function acolhido(){ //--> especilidade
      return $this->hasOne(Acolhido::class, 'aco_id_aco', 'fie_id_aco')
      ->select('aco_id_aco','aco_name','aco_sexo','aco_faixa')
      ->with('faixa');
      //->makeHidden(['dataini', 'datafim']);
    }

    protected function getacaoAttribute()
    {
        return 1;
    }
}
