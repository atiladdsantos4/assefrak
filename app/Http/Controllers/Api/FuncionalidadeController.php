<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Funcionalidade;
use App\Http\Resources\FuncionalidadeResource;
use Illuminate\Support\Facades\Storage;


class FuncionalidadeController extends Controller
{
    public function index(Request $request)
    {
        $all = $request->all();

        if(isset($all["filtro"])){//for images description
            $menu = $all["filtro"];
            $result_fun = Funcionalidade::whereHas('menu', function ($query) use ($menu) {
                $query->where('men_name', $menu);
            })
            ->with('menu')
            ->first();
            $resource = new FuncionalidadeResource($result_fun);

            return response()->json([
                'status' => true,
                'message' => 'Registro encontrado com sucesso',
                'data' => $resource
            ]);
        }

        if(isset($all["listagem"])){
            $data = FuncionalidadeResource::collection(Funcionalidade::orderBy('fun_descricao')->get());
        }else{
            $data = FuncionalidadeResource::collection(Funcionalidade::all());
        }

        return response()->json([
            'status' => true,
            'message' => 'Registros encontrados',
            'data' => $data
        ]);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $request->merge(['fun_created_at' => date("Y-m-d H:i:s.u")]);

        $data = $request->all();

        $validator = Validator::make($data, []);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Erro de validação',
                'data' => $validator->errors()
            ], 401);
        }

        // if( isset($data["has_image"]) ){
        //     $seq = str_pad($registro->fun_id_fun,2,'0',STR_PAD_LEFT);
        //     $file = $request->file('file');
        //     $fileName  = $file->getClientOriginalName();
        //     $path = 'funcionalidade/'.$seq.'/'.$fileName;
        //     $path_antiga = $registro->fun_link;
        //     //remove a imagem antiga//
        //     if( Storage::disk('inertia_img')->exists('img/'.$path_antiga) ){
        //         Storage::disk('inertia_img')->delete('img/'.$path_antiga);
        //     }
        //     //Adiciona a nova imagem e atualiza o conteudo
        //     $gravou = Storage::disk('inertia_img')->put('img/'.$path, file_get_contents($file));
        //     if($gravou){
        //        $data["fun_link"] = $path;
        //     }
        // }

        Funcionalidade::create($data);

        $registro = Funcionalidade::findOrFail($data['fun_id_fun'] ?? Funcionalidade::latest('fun_id_fun')->first()->fun_id_fun);

        if( isset($data["has_image"]) ){
            $seq = str_pad($registro->fun_id_fun,2,'0',STR_PAD_LEFT);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'funcionalidade/'.$seq.'/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            $gravou = Storage::disk('inertia_img')->put('img/'.$path, file_get_contents($file));
            if($gravou){
               $data["fun_link"] = $path;
               $registro->update($data);
            }

        }

        $resource = new FuncionalidadeResource($registro);

        return response()->json([
            'status' => true,
            'message' => 'Registro criado com sucesso',
            'data' => $resource
        ]);
    }

    public function show(Request $request, string $id)
    {
        $registro = Funcionalidade::findOrFail($id);

        $resource = new FuncionalidadeResource($registro);

        return response()->json([
            'status' => true,
            'message' => 'Registro encontrado',
            'data' => $resource
        ], 200, [], JSON_PRETTY_PRINT);
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
        $data = $request->all();

        $registro = Funcionalidade::find($id);
        if( isset($data["has_image"]) ){
            $seq = str_pad($registro->fun_id_fun,2,'0',STR_PAD_LEFT);
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'funcionalidade/'.$seq.'/'.$fileName;
            $path_antiga = $registro->fun_link;
            //remove a imagem antiga//
            if( Storage::disk('inertia_img')->exists('img/'.$path_antiga) ){
                Storage::disk('inertia_img')->delete('img/'.$path_antiga);
            }
            //Adiciona a nova imagem e atualiza o conteudo
            $gravou = Storage::disk('inertia_img')->put('img/'.$path, file_get_contents($file));
            if($gravou){
               $data["fun_link"] = $path;
            }
        }

        $registro->update($data);

        $resource = new FuncionalidadeResource($registro);

        return response()->json([
            'status' => true,
            'message' => 'Registro atualizado com sucesso',
            'data' => $resource
        ], 200, [], JSON_PRETTY_PRINT);
    }

    public function destroy($id)
    {
        $registro = Funcionalidade::find($id);

        if($registro){
            $registro->delete();
        }

        return response()->json([
            'status' => true,
            'message' => 'Registro excluído com sucesso'
        ], 200, [], JSON_PRETTY_PRINT);
    }
}
