<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Bancos;
use App\Http\Resources\BancoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Http\Controllers\Api\PHPMailerController;


class BancosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) || isset($all["filtro"])){ //para renderizar as interfaces convencionais
           $banco = Bancos::orderBy('ban_nome')->get();
           //orderBy('tes_created_at');
           $result_banco = BancoResource::collection($banco); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Lista de Bancos',
                'data'    => $result_banco
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
        $request->merge(['fer_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();
        $input['fer_data'].=' '.date("H:i:s");

        $validator = Validator::make($input, [
            'fer_descricao' => 'required',
            'fer_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $feriado = Feriados::create($input);
        $fer = new FeriadosResource(Feriados::findOrFail($feriado->fer_id_fer));


        $arr_result = [
            "status" => true,
            "mensagem" => "Serviço Inserido com sucesso!!!",
            "data" => $fer
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = services::find($id);
       $fer = new FeriadosResource(Feriados::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $fer
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
       $feriado = Feriados::find($id);
       //$feriado->tes_exibir = $input["tes_exibir"];
       $feriado->update($input);

       $fer = new FeriadosResource($feriado);
       $arr_result = [
            "status" => true,
            "mensagem" => "Serviçoe Atualizado com Sucesso!!!",
            "data" => $fer
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
