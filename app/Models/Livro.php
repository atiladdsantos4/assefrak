<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Livro extends Model
{
    //liv_id_liv,liv_descricao,liv_created_at,liv_updated_at,liv_deleted_at
    //liv_id_liv,liv_descricao,liv_created_at,liv_updated_at,liv_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update livomarically by laravel <--//
    protected $table = 'liv_livros';
    protected $primaryKey = 'liv_id_liv';
    protected $appends = ['estoque'];
    protected $fillable = [
      'liv_id_liv','liv_id_aut','liv_id_edi','liv_titulo','liv_traducao','liv_sinopse','liv_isbn','liv_paginas','liv_edicao','liv_imagem','liv_ativo','liv_created_at','liv_updated_at','liv_deleted_at'
    ];
    protected $dates = ['liv_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'liv_created_at';
    const UPDATED_AT  = 'liv_updated_at';
    const DELETED_AT  = 'liv_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'liv_created_at' => 'datetime:Y-m-d H:i:s',
        'liv_updated_at' => 'datetime:Y-m-d H:i:s',
        'liv_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function editora(){ //--> especilidade
       return $this->hasOne(Editora::class, 'edi_id_edi', 'liv_id_edi');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function autor(){ //--> especilidade
       return $this->hasOne(Autor::class, 'aut_id_aut', 'liv_id_aut');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function precoatual(){
       return $this->hasOne(PrecoLivro::class, 'prl_id_liv', 'liv_id_liv')
       ->select('prl_valor_desconto','prl_id_prl')
       ->where('prl_valor_atual','1');
    }

    public function qrcode(){
       return $this->hasOne(PrecoLivro::class, 'prl_id_liv', 'liv_id_liv')
       ->join('lip_livro_pix','lip_livro_pix.lip_id_prl','prl_preco_livro.prl_id_prl')
       ->where('prl_preco_livro.prl_valor_atual',1)
       ->select('lip_id_lip');
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

    protected function getestoqueAttribute(){ //--> qtde_escopos
       $estoque = EntradaEstoque::where('ene_id_liv',$this->liv_id_liv)
        ->selectRaw('sum(ene_qtde - coalesce(nullif(ene_saida,0),0)) as total')
        ->groupBy('ene_id_liv')->first();
       $valor = $estoque->total ?? 0;

       return $valor;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->liv_created_at = date("Y-m-d H:i:s.u");
            $model->liv_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->liv_updated_at = date("Y-m-d H:i:s.u");
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
