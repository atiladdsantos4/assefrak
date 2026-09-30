<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Video;
use App\Http\Resources\VideoResource;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["categoria"]) ){
              $result_vid = Video::where('vid_id_cav',$all["categoria"])->orderBy('vid_descricao')->get(); 
           } else {
              $result_vid = Video::orderBy('vid_descricao')->get();
           }
           $result = VideoResource::collection($result_vid); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Video',
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
        $request->merge(['vid_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();
        //$link = 'https://www.youtube.com/embed/'.$input["vid_hash_link"].'?autoplay=1';
        //$input["vid_hash_link"] = $link;

        $validator = Validator::make($input, [
            'vid_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $video = Video::create($input);

        $foc = new VideoResource(Video::findOrFail($video->vid_id_vid));

        $arr_result = [
            "status" => true,
            "mensagem" => "Video Inserido com sucesso!!!",
            "data" => $foc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$foc = Video::find($id);

       $cli = new VideoResource(Video::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Video!!!",
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
       $video = Video::find($id);
       $video->update($input);

       $foc = new VideoResource($video);
       $arr_result = [
            "status" => true,
            "mensagem" => "Video Atualizado com Sucesso!!!",
            "data" => $foc
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
