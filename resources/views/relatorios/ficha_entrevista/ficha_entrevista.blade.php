<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Ficha de Entrevista - Assefrak</title>
    <style>
        @page {
            margin: 125px 28px 65px 28px;
        }

        header {
            position: fixed;
            top: -105px;
            left: 0;
            right: 0;
            height: 95px;
        }
        body { font-family: DejaVu Sans, sans-serif; font-size: 9px; color: #222; }
        footer { position: fixed; bottom: -45px; left: 0; right: 0; height: 30px; font-size: 8px; border-top: 1px solid #777; padding-top: 5px; }
        .title { text-align: center; font-weight: bold; font-size: 14px; margin: 4px 0; }
        .subtitle { text-align: center; font-weight: bold; font-size: 10px; }
        .rule { border-top: 1px solid #555; margin-top: 5px; }
        .section { border: 1px solid #555; border-radius: 4px; padding: 6px; margin: 7px 0; page-break-inside: avoid; }
        .section-title { border-radius: 5px; text-align: center; font-weight: bold; background: #6895C1; color:white; padding: 4px; margin: -2px -2px 6px -2px; }
        .grid { width: 100%; border-collapse: collapse; }
        .grid td, .grid th { padding: 3px 4px; vertical-align: top; }
        .grid th { text-align: left; width: 22%; }
        .muted { color: #555; }
        .item-list { width: 100%; border-collapse: collapse; }
        .item-list td { padding: 2px 4px; vertical-align: top; }
        .mark { display: inline-block; width: 10px; }
        .checked { font-weight: bold; }
        .description { margin: 4px 0 0 0; white-space: pre-wrap; }
        .small { font-size: 8px; }
        .page-number:after { content: counter(page); }
        .description { border: 1px solid #ccc; border-radius: 5px; padding: 8px;}
        .description-label { display: block; margin-top: 4px;}
        /* .banner-entrevista { width: 100%; height: 75px; display: block; object-fit: contain;} */
        .banner-entrevista {
            height: 75px;
            width: auto;
        }
        /* tabelas */

        .movimentacao-box {
            border: 1px solid #777;
            border-radius: 5px;
            padding: 6px;
            margin-top: 8px;
            margin-bottom: 10px;
        }

        .movimentacao-title {
            background-color: #6998c3;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
            font-size: 10px;
            padding: 7px;
            border-radius: 4px;
            margin-bottom: 8px;
        }

        .movimentacao-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: 9px;
        }

        .movimentacao-table thead th {
            background-color: #e9f1f8;
            color: #234c70;
            font-weight: bold;
            padding: 7px 5px;
            border-bottom: 1px solid #9bb5cc;
            text-align: center;
        }

        .movimentacao-table tbody td {
            padding: 7px 5px;
            border-bottom: 1px solid #dddddd;
            vertical-align: middle;
        }

        .movimentacao-table tbody tr:last-child td {
            border-bottom: none;
        }

        .movimentacao-table .col-tipo {
            width: 27%;
        }

        .movimentacao-table .col-descricao {
            width: 53%;
        }

        .movimentacao-table .col-data {
            width: 20%;
        }

        .movimentacao-table .tipo {
            font-weight: bold;
            text-align: left;
        }

        .movimentacao-table .descricao {
            text-align: left;
            word-wrap: break-word;
        }

        .movimentacao-table .data {
            text-align: center;
            white-space: nowrap;
        }

        .movimentacao-table .sem-registros {
            text-align: center;
            color: #777777;
            font-style: italic;
            padding: 15px 5px;
        }
    </style>
</head>
<body>
    @include('relatorios.ficha_entrevista.partials.cabecalho', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.identificacao', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.humor_energia', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.reacoes_emocionais', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.sono', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.gravidade', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.percepcoes', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.orientacoes', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.anotacoes', ['ficha' => $ficha])
    @include('relatorios.ficha_entrevista.sections.retorno',["retorno"=>$ficha->retorno])
    @include('relatorios.ficha_entrevista.partials.rodape')
</body>
</html>
