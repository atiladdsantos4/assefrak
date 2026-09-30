@inject('carbon', 'Carbon\Carbon')
<html>
   <!-- Head -->
   @include('relatorios.head')
   <!-- End of Head -->
<body class="bd">
   @include('relatorios.header',["textohead"=>'HAIR SALON'])
   <br><br>
   <table cellspacing="0" width="100%">
     <tr>
       <td><span class="spanclass">Cliente</span><span class="spanclassgray">{{ $cliente["name"] }}</span>&nbsp;&nbsp;&nbsp;</td>
       <td style="text-align: center;"><span class="spanclass">CPF</span><span class="spanclassgray">{{ $cliente["cpf"] }}</span>&nbsp;&nbsp;&nbsp;</td>
       <td style="text-align: right;"><span class="spanclass">Email</span><span class="spanclassgray">{{ $cliente["email"] }}</span></td>
     </tr>
   </table>
   <br>
   <table cellspacing="0" width="100%">
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
     $status = ["A"=>"Agendado", "C"=>"Cancelado", "B"=>"Bloqueado","F"=>"Finalizado","N"=>"Confirmado"];
     $cont = -1;
   @endphp
   @foreach($dados as $item)
      @php
      $cont++;
      echo $cont;
      $classe = $cont % 2 == 0 ? 'linhagray' : 'linhawhite';
      @endphp
      <tr class="{{ $cont % 2 == 0 ? 'linhagray' : 'linhawhite' }}">
        <td>{{$carbon::parse($item->cla_created_at)->format('d/m/Y H:i:s')}}</td>
        <td style="text-align: center;">{{$carbon::parse($item->horario->dataagenda->dat_data)->format('d/m/Y')}}</td>
        <td>{{$diasemana[$item->horario->dataagenda->dat_diasemana]}}</td>
        <td>{{$item->horario->protratamento->profissional->pro_nome}}</td>
        <td>{{$item->horario->protratamento->tratamento->servico_api->ser_titulo}}</td>
        <td>{{$item->horario->protratamento->tratamento->tra_titulo}}</td>
        <td>{{$status[$item->horario->hoa_status_atual]}}</td>
        <td style="text-align: right;">{{$item->horario->dataagenda->dat_horainicial.'-'.$item->horario->dataagenda->dat_horafinal}}</td>
      </tr>
   @endforeach
      <tr>
        <td colspan="7" class="thclass" style="border-radius: 0px 0px 0px 5px; text-align: right;">Total de Atendimentos</td>
        <td colspan="1" class="thclass" style="border-radius: 0px 0px 5px 0px; text-align: center;">{{$cont+1}}</td>
      </tr>
   <table>
   @include('relatorios.footer',["texto" => 'Relatório de Atendimentos Realizados  -  Hair Sallon Copyright'])
</body>
</html>
<!--
{item->horario->dataagenda->dat_data}</CTableDataCell>
                        <CTableDataCell>{diasemana[item->horario->dataagenda->dat_diasemana]}</CTableDataCell>
                        <CTableDataCell>{item->horario->protratamento->profissional->pro_nome}</CTableDataCell>
                        <CTableDataCell>{item->horario->protratamento->tratamento->servico_api->ser_titulo}</CTableDataCell>
                        <CTableDataCell>{item->horario->protratamento->tratamento->tra_titulo}</CTableDataCell>
                        <th class="thclass">Data Agendamento</th>
     <th class="thclass">Data Atendimento</th>
     <th class="thclass">Dia Semana</th>
     <th class="thclass">Profissional</th>
     <th class="thclass">Serviço</th>
     <th class="thclass">Tratamento</th>
     <th class="thclass">Status</th>
     <th class="thclass">Horário</th>
-->
