@inject('carbon', 'Carbon\Carbon')
<html>
   <!-- Head -->
   @include('relatorios.head',["bootstrap" => $bootstrapCss])
   <!-- End of Head -->
<body class="bd">
   @include('relatorios.header',["textohead"=>$textohead])
   @include('relatorios.footer',["textofooter" => $textofooter])
   <br>
   @yield('content')

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
