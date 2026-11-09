<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\FichaEntrevista;
use App\Http\Resources\FichaEntrevistaResource;

class FichaEntrevistaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["acolhido"]) ){
              $result_fie = FichaEntrevista::where('fie_id_aco',$all["acolhido"])->orderBy('fie_created_at')->get();
           } else {
              $result_fie = FichaEntrevista::orderBy('fie_created_at')->get();
           }
           $result = FichaEntrevistaResource::collection($result_fie); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados FichaEntrevistas',
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
        $request->merge(['fie_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();


        //$model = new FichaEntrevista();
        // $input['fie_humor'] = json_decode($input['fie_humor'], true);
        // $input['fie_humor'] = json_decode($input['fie_humor'], true);
        // $input['fie_humor'] = json_decode($input['fie_humor'], true);

        // dd([
        //     'atributo' => $model->fie_humor,
        //     'tipo' => gettype($model->fie_humor),
        // ]);

        // $model = new FichaEntrevista();
        //$model->fill($input);

        // dd([
        //     'cast_array' => $model->getCasts()['fie_humor'] ?? null,
        //     'json_decodificado' => json_decode($model->fie_humor, true),
        //     'erro_json' => json_last_error_msg(),
        // ]);
        // $model = new FichaEntrevista();
        // $model->fill($input);

        // dd([
        //     'valor_atributo' => $model->fie_humor,
        //     'tipo_atributo' => gettype($model->fie_humor),
        //     'valor_bruto' => $model->getAttributes()['fie_humor'] ?? null,
        // ]);
        // $model = new FichaEntrevista();
        // $model->fill($input);

        // dd(
        //     gettype($model->fie_humor),
        //     $model->getAttributes()['fie_humor'] ?? null
        // );

        $validator = Validator::make($input, [
             'fie_id_col' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        // dd(
        //     gettype($input['fie_humor'] ?? null),
        //     $input['fie_humor'] ?? null
        // );

        $FichaEntrevista = FichaEntrevista::create($input);

        $fie = new FichaEntrevistaResource(FichaEntrevista::findOrFail($FichaEntrevista->fie_id_fie));

        $arr_result = [
            "status" => true,
            "mensagem" => "Ficha Entrevista Inserido com sucesso!!!",
            "data" => $fie,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$fie = FichaEntrevista::find($id);

       $fie = new FichaEntrevistaResource(FichaEntrevista::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Ficha Entrevista!!!",
            "data" => $fie
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
       $FichaEntrevista = FichaEntrevista::find($id);
       $FichaEntrevista->update($input);

       $fie = new FichaEntrevistaResource($FichaEntrevista);
       $arr_result = [
            "status" => true,
            "mensagem" => "Ficha Entrevista Atualizado com Sucesso!!!",
            "data" => $fie
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $fie = FichaEntrevista::find($id);
        $fie->delete();
        $arr_result = [
            "status" => true,
            "mensagem" => "Registro excluido com Sucesso!!!",
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

}
