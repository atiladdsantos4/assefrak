@inject('carbon', 'Carbon\Carbon')
@php
    $cont=0;
    $total=0;
    echo '<div style="border-radius:5px;border:1px solid black;padding:2px;margin-top:10px;">';
    echo '<div class="fundo" style="border-radius:5px;padding:2px;margin: 0 auto;width:350px;font-weight:bold;">INFORMAÇÕES E OCORRÊNCIAS DURANTE OS PASSES:</div>';
    echo '<br><table>';
    echo '<tr style="border-bottom:1px solid black;">';
    echo '<th>Tipo Ocorrência</th>';
    echo '<th>Descrição do Evento</th>';
    echo '<th>Data</th>';
    echo '</tr>';
    if( count($ocorrencia) == 0 ){
       echo '<tr><td colspan="3" style="text-align:center;">Não ha Registros de Ocorrências</td></tr>';
    } else {
        for($i=0;$i < count($ocorrencia);$i++){
            echo '<tr>';
            echo '<td style="white-space:nowrap;">'.$ocorrencia[$i]->tipoocorrencia->top_descricao.'</td>';
            echo '<td style="text-align:left;">'.$ocorrencia[$i]->ocp_descricao.'</td>';
            echo '<td style="text-align:center;">'.$carbon::parse($ocorrencia[$i]->ocp_created_at)->format('Y/m/d').'</td>';
            echo '</tr>';
        }
    }
    echo '</table></div>';
@endphp
