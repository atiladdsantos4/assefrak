@inject('carbon', 'Carbon\Carbon')
@inject('session', 'Session')
@extends('relatorios.template',["textohead"=>$textohead,"textofooter" => $textofooter])
@section('title', 'Tables')
@section('content')
   <br>
   <table cellspacing="0">
   <tr>
     <th class="thclassini">Ativo</th>
     <th class="thclass">Nome</th>
     <th class="thclass">CPF</th>
     <th class="thclass">Email</th>
     <th class="thclass">Tipo Telefone</th>
     <th class="thclass">Telefone</th>
     <th class="thclassfim">Cadastro</th>
   </tr>
   @php
     $cont = -1;
   @endphp
   @foreach($dados as $item)
      @php
      $cont++;
      echo $cont;
      $classe = $cont % 2 == 0 ? 'linhagray' : 'linhawhite';
      @endphp
      <tr class="{{ $cont % 2 == 0 ? 'linhagray' : 'linhawhite' }}">
        <td>{{$item->cli_ativo}}</td>
        <td>{{$item->cli_name}}</td>
        <td>{{$item->cli_cpf}}</td>
        <td>{{$item->cli_email}}</td>
        <td>{{$item->cli_tipo_telefone == 1 ? 'Celular' : 'Fixo'}}</td>
        <td>{{$item->cli_telefone}}</td>
        <td style="text-align: center;">{{$carbon::parse($item->cli_created_at)->format('d/m/Y')}}</td>
      </tr>
   @endforeach
      <tr>
        <td colspan="6" class="thclass" style="border-radius: 0px 0px 0px 5px; text-align: right;">Total de Clientes</td>
        <td colspan="1" class="thclass" style="border-radius: 0px 0px 5px 0px; text-align: center;">{{$cont+1}}</td>
      </tr>
   <table>
@endsection
