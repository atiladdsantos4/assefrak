<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AcolhidoController;
use App\Http\Controllers\Api\PasseController;
use App\Http\Controllers\Api\FocoEnergeticoController;
use App\Http\Controllers\Api\CondicaoEnergeticaController;
use App\Http\Controllers\Api\FortalecimentoController;
use App\Http\Controllers\Api\LimpezaController;
use App\Http\Controllers\Api\AlertaController;
use App\Http\Controllers\Api\TipoTratamentoController;
use App\Http\Controllers\Api\EstadoController;
use App\Http\Controllers\Api\CidadeController;
use App\Http\Controllers\Api\OcupacaoController;
use App\Http\Controllers\Api\ColaboradorController;
use App\Http\Controllers\Api\StatusTratamentoController;
use App\Http\Controllers\Api\TratamentoController;
use App\Http\Controllers\Api\OcorrenciaPasseController;
use App\Http\Controllers\Api\TipoOcorrenciaController;
use App\Http\Controllers\Api\ControlePasseController;
use App\Http\Controllers\Api\PublicoFocoController;
use App\Http\Controllers\Api\EventoController;
use App\Http\Controllers\Api\EventoItemController;
use App\Http\Controllers\Api\CategoriaEventoController;
use App\Http\Controllers\Api\PalestraController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\CursoItemController;
use App\Http\Controllers\Api\AutorController;
use App\Http\Controllers\Api\EditoraController;
use App\Http\Controllers\Api\LivroController;
use App\Http\Controllers\Api\PrecoLivroController;
use App\Http\Controllers\Api\PagamentosController;
use App\Http\Controllers\Api\PixController;
use App\Http\Controllers\Api\BancosController;
use App\Http\Controllers\Api\LivroPixController;
use App\Http\Controllers\Api\PHPMailerController;
use App\Http\Controllers\Api\InscricaoController;
use App\Http\Controllers\Api\CategoriaVideoController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\DepartamentoController;
use App\Http\Controllers\Api\EntradaEstoqueController;
use App\Http\Controllers\Api\SaidaEstoqueController;
use App\Http\Controllers\Api\ApresentacaoController;
use App\Http\Controllers\Api\ApresentacaoItemController;
use App\Http\Controllers\Api\CondicoesRelatadaController;
use App\Http\Controllers\Api\ComportamentoReativoController;
use App\Http\Controllers\Api\CognicaoSonoController;
use App\Http\Controllers\Api\GravidadeClinicaController;
use App\Http\Controllers\Api\CondicaoPercebidaController;
use App\Http\Controllers\Api\DiaPasseController;
use App\Http\Controllers\Api\OrientacaoCasaController;
use App\Http\Controllers\Api\OrientacaoExternaController;
use App\Http\Controllers\Api\HumorController;
use App\Http\Controllers\Api\ComportamentoPassivoController;
use App\Http\Controllers\Api\FichaEntrevistaController;
use App\Http\Controllers\Api\FichaRetornoController;
use App\Http\Controllers\Api\FaixaIdadeController;
use App\Http\Controllers\Api\TipoFuncionalidadeController;
use App\Http\Controllers\Api\FuncionalidadeController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\InformacaoTecnicaController;
use App\Http\Controllers\Api\InfAssefrakController;









/*
Schema::dropIfExists('cor_condicoes_relatada');
        Schema::dropIfExists('cpr_comportamento_reativo');
        Schema::dropIfExists('cos_cognicao_sono');
		Schema::dropIfExists('gac_gravidade_clinica');
        Schema::dropIfExists('per_condicao_percebida');
        Schema::dropIfExists('dip_dia_passe');
		Schema::dropIfExists('orc_orientacao_casa');
		Schema::dropIfExists('ori_orientacao_externa');
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('acolhido',AcolhidoController::class)->middleware('auth:sanctum');
Route::apiResource('passe',PasseController::class)->middleware('auth:sanctum');
Route::apiResource('foco',FocoEnergeticoController::class)->middleware('auth:sanctum');
Route::apiResource('condicao',CondicaoEnergeticaController::class)->middleware('auth:sanctum');
Route::apiResource('fortalecimento',FortalecimentoController::class)->middleware('auth:sanctum');
Route::apiResource('limpeza',LimpezaController::class)->middleware('auth:sanctum');
Route::apiResource('alerta',AlertaController::class)->middleware('auth:sanctum');
Route::apiResource('tipotratamento',TipoTratamentoController::class)->middleware('auth:sanctum');
Route::apiResource('estado',EstadoController::class)->middleware('auth:sanctum');
Route::apiResource('cidade',CidadeController::class)->middleware('auth:sanctum');
Route::apiResource('ocupacao',OcupacaoController::class)->middleware('auth:sanctum');
Route::apiResource('colaborador',ColaboradorController::class)->middleware('auth:sanctum');
Route::apiResource('status',StatusTratamentoController::class)->middleware('auth:sanctum');
Route::apiResource('tratamento',TratamentoController::class)->middleware('auth:sanctum');
Route::apiResource('tipoocorrencia',TipoOcorrenciaController::class)->middleware('auth:sanctum');
Route::apiResource('ocorrenciapasse',OcorrenciaPasseController::class)->middleware('auth:sanctum');
Route::apiResource('controlepasse',ControlePasseController::class)->middleware('auth:sanctum');
Route::apiResource('publicofoco',PublicoFocoController::class)->middleware('auth:sanctum');
Route::apiResource('evento',EventoController::class)->middleware('auth:sanctum');
Route::apiResource('eventoitem',EventoItemController::class)->middleware('auth:sanctum');
Route::apiResource('categoriaevento',CategoriaEventoController::class)->middleware('auth:sanctum');
Route::apiResource('palestra',PalestraController::class)->middleware('auth:sanctum');
Route::apiResource('curso',CursoController::class)->middleware('auth:sanctum');
Route::apiResource('cursoitem',CursoItemController::class)->middleware('auth:sanctum');
Route::apiResource('autor',AutorController::class)->middleware('auth:sanctum');
Route::apiResource('editora',EditoraController::class)->middleware('auth:sanctum');
Route::apiResource('livro',LivroController::class)->middleware('auth:sanctum');
Route::apiResource('precolivro',PrecoLivroController::class)->middleware('auth:sanctum');
Route::apiResource('pgto',PagamentosController::class)->middleware('auth:sanctum');
Route::apiResource('pix',PixController::class)->middleware('auth:sanctum');
Route::apiResource('bancos',BancosController::class)->middleware('auth:sanctum');
Route::apiResource('livropix',LivroPixController::class)->middleware('auth:sanctum');
Route::apiResource('email',PHPMailerController::class)->middleware('auth:sanctum');
Route::apiResource('inscricao',InscricaoController::class)->middleware('auth:sanctum');
Route::apiResource('categoriavideo',CategoriaVideoController::class)->middleware('auth:sanctum');
Route::apiResource('video',VideoController::class)->middleware('auth:sanctum');
Route::apiResource('departamento',DepartamentoController::class)->middleware('auth:sanctum');
Route::apiResource('faixaidade',FaixaIdadeController::class)->middleware('auth:sanctum');
Route::apiResource('tipofuncionalidade', TipoFuncionalidadeController::class)->middleware('auth:sanctum');
Route::apiResource('funcionalidade', FuncionalidadeController::class)->middleware('auth:sanctum');
Route::apiResource('menu',MenuController::class)->middleware('auth:sanctum');
Route::apiResource('informacao-tecnica',InformacaoTecnicaController::class)->middleware('auth:sanctum');
Route::apiResource('infassefrak', InfAssefrakController::class);




//livros
Route::apiResource('entradaestoque',EntradaEstoqueController::class)->middleware('auth:sanctum');
Route::apiResource('saidaestoque',SaidaEstoqueController::class)->middleware('auth:sanctum');
Route::apiResource('apresentacao',ApresentacaoController::class)->middleware('auth:sanctum');
Route::apiResource('apresentacaoitem',ApresentacaoItemController::class)->middleware('auth:sanctum');

//ficha entrevista
Route::apiResource('humor',HumorController::class)->middleware('auth:sanctum');
Route::apiResource('condicoesrelatada',CondicoesRelatadaController::class)->middleware('auth:sanctum');
Route::apiResource('comportamentopassivo',ComportamentoPassivoController::class)->middleware('auth:sanctum');
Route::apiResource('comportamentoreativo',ComportamentoReativoController::class)->middleware('auth:sanctum');
Route::apiResource('cognicaosono',CognicaoSonoController::class)->middleware('auth:sanctum');
Route::apiResource('gravidadeclinica',GravidadeClinicaController::class)->middleware('auth:sanctum');
Route::apiResource('condicaopercebida',CondicaoPercebidaController::class)->middleware('auth:sanctum');
Route::apiResource('diapasse',DiaPasseController::class)->middleware('auth:sanctum');
Route::apiResource('orientacaocasa',OrientacaoCasaController::class)->middleware('auth:sanctum');
Route::apiResource('orientacaoexterna',OrientacaoExternaController::class)->middleware('auth:sanctum');
Route::apiResource('fichaentrevista',FichaEntrevistaController::class)->middleware('auth:sanctum');
Route::apiResource('ficharetorno',FichaRetornoController::class)->middleware('auth:sanctum');




