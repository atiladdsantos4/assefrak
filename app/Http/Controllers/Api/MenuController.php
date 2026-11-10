<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Menu;
use App\Http\Resources\MenuResource;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){

          if( isset($all["menu"]) ){
            //$result_men = Menu::whereBetween('men_id_men', [1,8])
            $result_men = Menu::whereNull('men_id_pai')
               ->orderBy('men_position')
               ->get();
          } else if( isset($all["funcionalidade"]) ){
              $result_men = Menu::whereIn('men_id_pai', [16,19,29])
               ->orderBy('men_id_pai')
               ->orderBy('men_position')
               ->get();
           } else {
               $result_men = Menu::orderBy('men_id_pai')
               ->orderBy('men_position')
               ->get();
           }

           $result = MenuResource::collection($result_men);

           $response = [
                'status' => true,
                'message' => 'Dados Menus',
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
        $request->merge(['men_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'men_name' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Menu = Menu::create($input);

        $men = new MenuResource(Menu::findOrFail($Menu->men_id_men));

        $arr_result = [
            "status" => true,
            "mensagem" => "Menu Inserido com sucesso!!!",
            "data" => $men,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       $men = new MenuResource(Menu::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Menu!!!",
            "data" => $men
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
       $Menu = Menu::find($id);
       $Menu->update($input);

       $men = new MenuResource($Menu);
       $arr_result = [
            "status" => true,
            "mensagem" => "Menu Atualizado com Sucesso!!!",
            "data" => $men
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = Menu::find($id);

        if ($model) {
            $model->delete();
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Registro excluido com Sucesso!!!",
        ];

        return json_encode($arr_result, JSON_PRETTY_PRINT);
    }
}
