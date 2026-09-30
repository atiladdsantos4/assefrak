@inject('carbon', 'Carbon\Carbon')
@inject('session', 'Session')
@extends('relatorios.template',["textohead"=>$textohead,"textofooter" => $textofooter])
@section('title', 'Tables')
@section('content')
   <br>
   <table cellspacing="0">
   <tr>
     <th class="thclassini">Exibir</th>
     <th class="thclass">Serviço</th>
     <th class="thclass">Tratamento</th>
     <th class="thclass">Texto</th>
     <th class="thclass">Preço(R$)</th>
     <th class="thclass">Max Desconto(%)</th>
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
        <td>{{$item->tra_display == 1 ? 'Exibe' : 'Bloqueado'}}</td>
        <td>{{$item->servico->ser_titulo}}</td>
        <td>{{$item->tra_titulo}}</td>
        <td>{{$item->tra_texto}}</td>
        <td style="text-align: right;">{{$item->valor_atual ? $item->valor_atual->tva_valor : '000.00'}}</td>
        <td style="text-align: right;">{{$item->valor_atual ? $item->valor_atual->tva_max_desconto : '000.00'}}</td>
        <td style="text-align: center;">{{$carbon::parse($item->tra_created_at)->format('d/m/Y')}}</td>
      </tr>
   @endforeach
      <tr>
        <td colspan="6" class="thclass" style="border-radius: 0px 0px 0px 5px; text-align: right;">Total de Tratamentos</td>
        <td colspan="1" class="thclass" style="border-radius: 0px 0px 5px 0px; text-align: center;">{{$cont+1}}</td>
      </tr>
   <table>
@endsection
