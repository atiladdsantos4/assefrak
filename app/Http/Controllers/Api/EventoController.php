<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Evento;
use App\Models\EventoItem;
use App\Http\Resources\EventoResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["calendar"]) ){ //para renderizar as interfaces convencionais
           $data = $all["ano"].'-'.str_pad($all["mes"], 2, "0", STR_PAD_LEFT).'-01';
           $valor =  $this->geraData($data);
           $response = [
                'status' => true,
                'message' => 'Dados do Evento',
                'data'    => $valor
            ];

            return response()->json($response, 200);
        }

        if( isset($all["group"]) ){
           $result_eve = Evento::join('cae_categoria_evento','eve_id_cae','=','cae_id_cae')
           ->select('cae_categoria_evento.cae_id_cae','cae_categoria_evento.cae_descricao',DB::raw('count(*) as total'))
           ->groupBy('cae_categoria_evento.cae_id_cae','cae_categoria_evento.cae_descricao')
           ->orderBy('cae_categoria_evento.cae_descricao')
           ->get();

           $response = [
                'status' => true,
                'message' => 'Dados do Evento',
                'data'    => $result_eve
            ];

            return response()->json($response, 200);
        }

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_eve = Evento::orderBy('eve_titulo')->get();
           $result = EventoResource::collection($result_eve); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados do Evento',
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
        $request->merge(['eve_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

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

        $validator = Validator::make($input, [
            'eve_titulo' => 'required',
            'eve_foco' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Evento = Evento::create($input);

        $ale = new EventoResource(Evento::findOrFail($Evento->eve_id_eve));

        $arr_result = [
            "status" => true,
            "mensagem" => "Evento Inserido com sucesso!!!",
            "data" => $ale,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$ale = Evento::find($id);

       $cli = new EventoResource(Evento::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Evento!!!",
            "data" => $cli
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
       $Evento = Evento::find($id);
       $Evento->update($input);
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

       $ale = new EventoResource($Evento);
       $arr_result = [
            "status" => true,
            "mensagem" => "Evento Atualizado com Sucesso!!!",
            "data" => $ale
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

    /**
     * Remove the specified resource from storage.
     */
    public function geraData($data)
    {

        $lastDayDateOnly = Carbon::parse($data)->endOfMonth()->toDateString();
       //Carbon::parse('2026-09-01')->endOfMonth()->toDateString();
       $sql = "select * from (
            with data_mes as (
                SELECT generate_series('$data', '$lastDayDateOnly', '1 day'::interval) as data_dia
            )
            select
                EXTRACT(WEEK FROM data_dia + INTERVAL '1 day')  AS semana_ano,
                date_part('dow',data_dia) as dia_semana,
                date_part('day',data_dia) as dia,
                date_part('month',data_dia) as mes,
                date_part('year',data_dia) as ano,
                (case
                    when date_part('dow',data_dia) = 1 then 'Seg'
                    when date_part('dow',data_dia) = 2 then 'Ter'
                    when date_part('dow',data_dia) = 3 then 'Qua'
                    when date_part('dow',data_dia) = 4 then 'Qui'
                    when date_part('dow',data_dia) = 5 then 'Sex'
                    when date_part('dow',data_dia) = 6 then 'Sab'
                    else 'Dom'
                end) as dia_semans_ext,
                data_dia
            from (
            select data_dia from data_mes
            ) a
        ) b
        order by dia";
        $lista = DB::select($sql);
        $teste =  $lista;
        return $teste;
    }

}
