@php
    $cont=0;
    $total=0;
    echo '<div style="border-radius:5px;border:1px solid black;padding:2px;margin-top:10px;">';
    echo '<div class="fundo" style="border-radius:5px;padding:2px;margin: 0 auto;width:400px;font-weight:bold;">ALERTAS DE SEGURANÇA (Reações do corpo físico)</div>';
    echo '<table>';
    for($i = 0;$i < count($alerta["meta"]); $i++){
        $cont++;
        $total++;
        if($cont == 1){
            echo '<tr>';
        }
        $checked = $alerta["meta"][$i]["ale_ativo"] ==  true ? 'checked' : '';
        $input="<input style='margin-top:1px;font-weight:bold;' type='checkbox' $checked/>";
        $descricao=$alerta["meta"][$i]["ale_descricao"];
        echo '<td>'.$input.'</td><td style="white-space:nowrap;">'.$descricao.'</td>';
        if($cont == 3){
            echo '</tr>';
            $cont = 0;
        }
        if($total == count($alerta["meta"])){
            echo '</tr>';
        }
    }
    echo '</table></div>';
@endphp
