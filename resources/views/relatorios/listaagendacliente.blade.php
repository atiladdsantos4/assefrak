@inject('carbon', 'Carbon\Carbon')
@inject('session', 'Session')
@extends('relatorios.template',["textohead"=>$textohead,"textofooter" => $textofooter])
@section('title', 'Tables')
@section('content')
<table cellspacing="0">
     <tr>
       <td><span class="spanclass">Cliente</span><span class="spanclassgray">{{ $cliente["name"] }}</span>&nbsp;&nbsp;&nbsp;</td>
       <td><span class="spanclass">CPF</span><span class="spanclassgray">{{ $cliente["cpf"] }}</span>&nbsp;&nbsp;&nbsp;</td>
       <td><span class="spanclass">Email</span><span class="spanclassgray">{{ $cliente["email"] }}</span></td>
     </tr>
   </table>
   <br>
   <table cellspacing="0">
   <tr>
     <th class="thclassini">Data Agendamento</th>
     <th class="thclass">Data Atendimento</th>
     <th class="thclass">Dia Semana</th>
     <th class="thclass">Profissional</th>
     <th class="thclass">Serviço</th>
     <th class="thclass">Tratamento</th>
     <th class="thclass">Status</th>
     <th class="thclassfim">Horário</th>
   </tr>
   @php
     $diasemana = ['','segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
     $cont = -1;
   @endphp
   @foreach($dados as $item)
      @php
      $cont++;
      echo $cont;
      $classe = $cont % 2 == 0 ? 'linhagray' : 'linhawhite';
      @endphp
      <tr class="{{ $cont % 2 == 0 ? 'linhagray' : 'linhawhite' }}">
        <td>{{$item->cla_created_at}}</td>
        <td>{{$item->horario->dataagenda->dat_data}}</td>
        <td>{{$diasemana[$item->horario->dataagenda->dat_diasemana]}}</td>
        <td>{{$item->horario->protratamento->profissional->pro_nome}}</td>
        <td>{{$item->horario->protratamento->tratamento->servico_api->ser_titulo}}</td>
        <td>{{$item->horario->protratamento->tratamento->tra_titulo}}</td>
        <td></td>
        <td style="text-align: right;">{{$item->horario->dataagenda->dat_horainicial.'-'.$item->horario->dataagenda->dat_horafinal}}</td>
      </tr>
   @endforeach
      <tr>
        <td colspan="7" class="thclass" style="border-radius: 0px 0px 0px 5px; text-align: right;">Total de Atendimentos</td>
        <td colspan="1" class="thclass" style="border-radius: 0px 0px 5px 0px; text-align: center;">{{$cont+1}}</td>
      </tr>
   <table>
@endsection
