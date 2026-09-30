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
        <table width="100%">
            <tr>
              <td>
                @include('relatorios.template_cartao',["passes"=>$passes,"agua"=>$agua,"horario"=>$horario,"fechamento"=>$fechamento,"fecha"=>$fecha])
              </td>
              <td>
                @include('relatorios.template_cartao',["passes"=>$passes,"agua"=>$agua,"horario"=>$horario,"fechamento"=>$fechamento,"fecha"=>$fecha])
              </td>
            </tr>
            <tr>
              <td>
                 @include('relatorios.template_cartao',["passes"=>$passes,"agua"=>$agua,"horario"=>$horario,"fechamento"=>$fechamento,"fecha"=>$fecha])
              </td>
              <td>
                 @include('relatorios.template_cartao',["passes"=>$passes,"agua"=>$agua,"horario"=>$horario,"fechamento"=>$fechamento,"fecha"=>$fecha])
              </td>
            </tr>
        </table>
    </body>
</html>
