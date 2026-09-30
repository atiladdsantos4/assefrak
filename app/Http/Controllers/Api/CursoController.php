<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Curso;
use App\Http\Resources\CursoResource;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_curso = Curso::orderBy('cur_titulo')->get();
        //    $cliente = cliente::orderBy('pro_nome')
        //    ->with('tratamentos.cliente')
        //    ->with('tratamentos.tratamento')
        //    ->with('tratamentos.tratamento.servico_api')
        //    ->get();
           $result = CursoResource::collection($result_curso); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Cursos',
                'data'    => $result
            ];

            return response()->json($response, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = null;
        //criar a data de criação
        $request->merge(['cur_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cur_titulo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $curso = Curso::create($input);

        $cur = new CursoResource(Curso::findOrFail($curso->cur_id_cur));

        $arr_result = [
            "status" => true,
            "mensagem" => "Alerta Inserido com sucesso!!!",
            "data" => $cur,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $cur = new CursoResource(Curso::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Evento!!!",
            "data" => $cur
       ];

       return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $input = $request->all();
       $curso = Curso::find($id);
       $curso->update($input);
       /*
       if( isset($input["has_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/evento/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
            $request->merge(['evi_created_at' => date("Y-m-d H:i:s")]);
            $input = $request->all();
            $eventoitem = EventoItem::create($input);
            //$request->merge(['evi_dados_inf' => 'IC']);
            //evi_id_evi,evi_id_eve,evi_tipo_informacao,evi_dados_inf,evi_created_at,evi_updated_at,evi_deleted_at

            $arr_result = [
               "status" => true,
               "mensagem" => "Imagem do Inserido com sucesso!!!",
               "enventoitemid" => $eventoitem->evi_id_evi,
            ];

            return json_encode($arr_result,JSON_PRETTY_PRINT);
        }
       */

       $cur = new CursoResource($curso);
       $arr_result = [
            "status" => true,
            "mensagem" => "Curso Atualizado com Sucesso!!!",
            "data" => $cur
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
