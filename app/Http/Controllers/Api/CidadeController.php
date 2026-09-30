<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Cidade;
use App\Http\Resources\CidadeResource;

class CidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["todos"]) ){
              $result_ale = Cidade::orderBy('cid_descricao')->get();
           } else {
              $result_ale = Cidade::where('cid_id_est',$all["estado"])->orderBy('cid_descricao')->get();
           }
           $result = CidadeResource::collection($result_ale); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Cidades',
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
