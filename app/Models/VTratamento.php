<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VTratamento extends Model
{
    // seq_id, descricao, option, tra_id_tra, tra_id_aco,
    // tra_id_col, tra_id_tit, tra_id_stt, id, descricao_item

    use HasFactory;

    public $timestamps = false;

    protected $table = 'v_tratamento';

    protected $primaryKey = 'seq_id';

    public $incrementing = false;

    protected $keyType = 'int';

    protected $fillable = [
        'seq_id',
        'descricao',
        'option',
        'tra_id_tra',
        'tra_id_aco',
        'tra_id_col',
        'tra_id_tit',
        'tra_id_stt',
        'id',
        'descricao_item',
        'ano',
        'mes'
    ];

    protected $casts = [
        'seq_id' => 'integer',
        'tra_id_tra' => 'integer',
        'tra_id_aco' => 'integer',
        'tra_id_col' => 'integer',
        'tra_id_tit' => 'integer',
        'tra_id_stt' => 'integer',
        'id' => 'integer',
    ];

    public function ficha(){ //--> especilidade
      return $this->hasOne(Tratamento::class, 'tra_id_tra', 'tra_id_tra')
      ->select('tra_created_at');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function acolhido(){ //--> especilidade
      return $this->hasOne(Acolhido::class, 'aco_id_aco', 'tra_id_aco')
      ->select('aco_id_aco','aco_name','aco_sexo','aco_faixa')
      ->with('faixa');
      //->makeHidden(['dataini', 'datafim']);
    }

    protected function getacaoAttribute()
    {
        return 1;
    }
}
