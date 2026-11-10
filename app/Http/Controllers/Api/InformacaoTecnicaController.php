<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\InformacaoTecnica;
use App\Http\Resources\InformacaoTecnicaResource;

class InformacaoTecnicaController extends Controller
{
    public function index(Request $request)
    {
        $dados = InformacaoTecnica::query();

        if ($request->has('listagem')) {
            return InformacaoTecnicaResource::collection(
                $dados->orderBy('inf_id_inf')->get()
            );
        }

        return new InformacaoTecnicaResource(
            $dados->first()
        );
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'inf_autor' => 'required|string|max:200',
            'inf_url_dev' => 'nullable|string|max:300',
            'inf_url_prod' => 'nullable|string|max:300',
            'inf_env_dev' => 'nullable|string|max:1500',
            'inf_env_prod' => 'nullable|string|max:1500',
            'inf_db_dev' => 'nullable|string|max:1500',
            'inf_db_prod' => 'nullable|string|max:1500',
            'inf_url_git' => 'nullable|string|max:300',
            'inf_ftp_url' => 'nullable|string|max:300',
            'inf_ftp_senhas' => 'nullable|string|max:300',
            'inf_ssh_url' => 'nullable|string|max:100',
            'inf_ssh_senha' => 'nullable|string|max:100',
            'inf_versao_laravel' => 'nullable|string|max:150',
        ]);

        $registro = InformacaoTecnica::create($dados);

        return new InformacaoTecnicaResource($registro);
    }

    public function show($id)
    {
        return new InformacaoTecnicaResource(
            InformacaoTecnica::findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $registro = InformacaoTecnica::findOrFail($id);

        $dados = $request->validate([
            'inf_autor' => 'required|string|max:200',
            'inf_url_dev' => 'nullable|string|max:300',
            'inf_url_prod' => 'nullable|string|max:300',
            'inf_env_dev' => 'nullable|string|max:1500',
            'inf_env_prod' => 'nullable|string|max:1500',
            'inf_db_dev' => 'nullable|string|max:50',
            'inf_db_prod' => 'nullable|string|max:50',
            'inf_url_git' => 'nullable|string|max:300',
            'inf_ftp_url' => 'nullable|string|max:300',
            'inf_ftp_senhas' => 'nullable|string|max:300',
            'inf_ssh_url' => 'nullable|string|max:100',
            'inf_ssh_senha' => 'nullable|string|max:100',
            'inf_versao_laravel' => 'nullable|string|max:150',
        ]);

        $registro->update($dados);

        return new InformacaoTecnicaResource($registro);
    }

    public function destroy($id)
    {
        $registro = InformacaoTecnica::findOrFail($id);
        $registro->delete();

        return response()->json(['message' => 'Registro excluído com sucesso.']);
    }
}
