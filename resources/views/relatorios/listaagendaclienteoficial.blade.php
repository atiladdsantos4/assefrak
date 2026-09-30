<html>
<head>
    <!-- Preconnect to improve loading speed -->
    <link rel="preconnect" href="https://fonts->googleapis->com">
    <link rel="preconnect" href="https://fonts->gstatic->com" crossorigin>

    <!-- Import Poppins (Regular 400 and Bold 700) -->
    <link href="https://googleapis->com" rel="stylesheet">
    <style>
        .titulo{
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-style: SemiBold;
        }
        .bd{
          font-size: 12px;
          font-family: 'Poppins', sans-serif;
        }

        .thclassini{
            background-color: #502149;
            padding: 5px;
            border-radius: 5px 0px 0px 0px;
            color:white;
        }

        .thclass{
            background-color: #502149;
            padding: 5px;
            border-radius: 0px 0px 0px 0px;
            color:white;
        }

        .spanclass{
            background-color: #502149;
            padding: 5px;
            font-size: 13px;
            border-radius: 5px 0px 0px 5px;
            color:white;
        }

        .spanclassgray{
            background-color:  #d3cdd2;
            padding: 5px;
            font-size: 13px;
            border-radius: 0px 5px 5px 0px;
            color:black;
        }

        .thclassfim{
            background-color: #502149;
            padding: 5px;
            border-radius: 0px 5px 0px 0px;
            color:white;
        }

        .linhagray{
          background-color:  #d3cdd2;

        }

        td{
           padding: 5px;
        }

        .inhawhite{
          background-color:  white;
        }

        footer {
                position: fixed;
                bottom: -30px;
                left: 0px;
                right: 0px;
                height: 35px;
                border-radius: 5px 5px 5px 5px;
                /** Extra personal styles **/
                background-color: #502149;
                color: white;
                text-align: center;
                line-height: 20px;
        }

        header {
                position: fixed;
                top: -30px;
                left: 0px;
                right: 0px;
                height: 35px;
                border-radius: 5px 5px 5px 5px;
                font-family: 'Poppins', sans-serif !important;
                /** Extra personal styles **/
                background-color: #502149;;
                color: #bdc1cc;
                text-align: center;
                line-height: 30px;
            }

        /* tr:nth-child(even) { background-color: #f9f9f9; } */

        .headereport{
            width: 400px;
            margin: auto;
            background-color:#502149 !important;
            font-family: 'Poppins', sans-serif;
            border-radius: 8px 8px 8px 8px;
            font-size: 16px;
            height: 30px;
            color: #bdc1cc;
            align-items: center;
            text-align: center;
        }

        .item_obs {
           display:'flex';
           gap:'20px';
           justify-content:'center'
        }

        .page-number:after {
          content: counter(page);
        }

    </style>
</head>
<body class="bd">
   <header>
        <div style="color:white;font-size: 14px !important;font-weight: 500 !important;font-family: 'Poppins', sans-serif !important;">HAIR SALON</div>
   </header>
   <br>
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
   <footer>
    Relatório de Atendimentos Realizados  -  Hair Sallon Copyright &copy; <?php echo date("Y");?>
    <div style="display:flex;justify-content: text-end;"><span class="page-number">Page </span></div>
   </footer>
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
