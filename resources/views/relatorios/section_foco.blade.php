@php
    $cont=0;
    $total=0;
    echo '<div style="border-radius:5px;border:1px solid black;padding:2px;margin-top:105px;">';
    echo '<div class="fundo" style="border-radius:5px;padding:2px;margin: 0 auto;width:200px;font-weight:bold;">FOCO ENERGÉTICO</div>';
    echo '<table>';
    for($i = 0;$i < count($foco["meta"]); $i++){
        $cont++;
        $total++;
        if($cont == 1){
            echo '<tr>';
        }
        $checked = $foco["meta"][$i]["foc_ativo"] ==  true ? 'checked' : '';
        $input="<input style='margin-top:1px;font-weight:bold;' type='checkbox' $checked/>";
        $descricao=$foco["meta"][$i]["foc_descricao"];
        echo '<td>'.$input.'</td><td style="white-space:nowrap;">'.$descricao.'</td>';
        if($cont == 8){
            echo '</tr>';
            $cont = 0;
        }
        if($total == count($foco["meta"])){
            echo '</tr>';
        }
    }
    echo '</table></div>';
@endphp
