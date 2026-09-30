<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Pix;
use App\Http\Resources\PixResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Piggly\Pix\StaticPayload;
use Piggly\Pix\Parser;


class PixController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $pix = Pix::orderBy('pix_chave')->get();
           $result_pix = PixResource::collection($pix); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Listagem de Pix',
                'data'    => $result_pix
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
        $request->merge(['pix_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'pix_chave' => 'required',
            'pix_id_ban' => 'required',
            'pix_tipo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $pix = Pix::create($input);
        $pixres = new PixResource(Pix::findOrFail($pix->pix_id_pix));


        $arr_result = [
            "status" => true,
            "mensagem" => "Chave Pix Inserida com sucesso!!!",
            "data" => $pixres
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = services::find($id);
       $fer = new PixResource(pixs::find($id));
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
       $pix = Pix::find($id);

       if(isset($input["pix_id_ban"])){
           $pix->pix_id_ban = $input["pix_id_ban"];
       }

       if(isset($input["pix_atual"]) && $input["pix_atual"] == 1){
          Pix::whereNot('pix_id_pix',$id)->update(['pix_atual' => 0]);
          //$pix->pix_id_ban = $input["pix_id_ban"];
       }

       $pix->update($input);

       $pixres = new PixResource($pix);
       $arr_result = [
            "status" => true,
            "mensagem" => "Chave Atualizada com Sucesso!!!",
            "data" => $pixres
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
