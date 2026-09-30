@inject('carbon', 'Carbon\Carbon')
<html>
   <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <!-- Preconnect to improve loading speed -->
    <link rel="preconnect" href="https://fonts->googleapis->com">
    <link rel="preconnect" href="https://fonts->gstatic->com" crossorigin>

    <!-- Import Poppins (Regular 400 and Bold 700) -->
    <link href="https://googleapis->com" rel="stylesheet">
    <style>
       {{!! $bootstrap !!}}
    </style>
    <style>
        .flex-container {
           display: flex;
           gap: 16px; /* Adds space between the divs without complex margins */
        }

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
          font-size:10px;

        }

        .linhawhite{
           background-color:  white;
           font-size:10px;
        }

        .lf{
          text-align: left;
        }

        .ct{
          text-align: center;
        }

        td{
           padding: 5px;
        }

        footer {
                position: fixed;
                bottom: -30px;
                left: 0px;
                right: 0px;
                height: 35px;
                border-radius: 5px 5px 5px 5px;
                /** Extra personal styles **/
                background-color: #6895C1;
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

        .fundo{
            background-color: #6895C1;
            color: #fff;
            border: 1px solid #d3cdd2;
            text-align: center;
            td{
               font-size: 12px;
            }
        }

        .descricao{
            background-color: #a0a6ae;
            color: #fff;
            border: 1px solid #d3cdd2;
            text-align: left;
        }

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

          .container {
               width: 100%;
           }
          .box-left {
                display: inline-block;
                width: 40px;
                vertical-align: top;
           }
           .box-right {
                display: inline-block;
                width: 300px;
                vertical-align: top;
                margin-top: -10px;
           }

        @media print {
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

             @page {
               bottom: -30px; /* Ajuste o valor de acordo com a altura do seu rodapé */
            }
        }
    </style>
  </head>
  <body class="bd">
        @include('relatorios.template_cabecalho',["titulo"=>"Lista de Presença"])
        <br>
        <table width="100%">
            <tr>
              <td width="30%" class="fundo" style="border-radius:5px 0px 0px 0px">
                {{$tipo == 'curso' ? 'Curso:' : 'Evento'}}
              </td>
              <td width="70%" class="descricao" style="border-radius:0px 5px 0px 0px">
                {{$textoheader}}
              </td>
            </tr>
        </table>
        <table width="100%">
            <tr>
              <td class="fundo">Seq</td>
              <td class="fundo">Nome</td>
              <td class="fundo">Email</td>
              <td class="fundo">Telefone</td>
              <td class="fundo">Inscrição</td>
              <td class="fundo">Status</td>
              <td class="fundo">Verificado</td>
            </tr>
                @php
                   $cont = 0;
                   for($i=0; $i < count($dados);$i++){
                        $cont++;
                        $status = $dados[$i]["ins_ativo"] == 1 ? 'Ativo' : 'Suspenso';
                        $classe = $i % 2 == 0 ? 'linhagray' : 'linhawhite';
                        echo '<tr>';
                        echo '<td class="'.$classe.'">'.$cont.'</td>';
                        echo '<td class="'.$classe.'">'.$dados[$i]["ins_nome"].'</td>';
                        echo '<td class="'.$classe.'">'.$dados[$i]["ins_email"].'</td>';
                        echo '<td class="ct '.$classe.'">'.$dados[$i]["ins_telefone"].'</td>';
                        echo '<td class="ct '.$classe.'">'.$status.'</td>';
                        echo '<td class="ct '.$classe.'">'.$carbon::parse($dados[$i]["ins_created_at"])->format('d/m/Y H:i:s').'</td>';
                        echo '<td class="'.$classe.'">_____________</td>';
                        echo '</tr>';
                   }
                   echo '<tr><td colspan="6"  style="text-align:right;">Total de Particiantes:</td><td class="fundo" style="text-align:center;border-radius:0px 0px 5px 0px">'.$cont.'</td><tr>';
                @endphp
        </table>
        @include('relatorios.footer',["textofooter"=>$textofooter])
     </body>
</html>
