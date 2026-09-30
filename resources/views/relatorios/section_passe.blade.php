@php
    $cont=0;
    $total=0;
    echo '<div style="border-radius:5px;border:1px solid black;float:left;padding:2px;margin-top:10px;margin-bottom:1px;">';
    echo '<div class="fundo" style="border-radius:5px;padding:2px;margin: 0 auto;width:200px;font-weight:bold;">OBJETIVO DO PASSE</div>';
    echo '<table>';
    for($i = 0;$i < count($passe["meta"]); $i++){
        $cont++;
        if($cont == 1){
            echo '<tr>';
        }
        $checked = $passe["meta"][$i]["pas_ativo"] ==  true ? 'checked' : '';
        $input="<input style='margin-top:1px;' type='checkbox' $checked/>";
        $descricao=$passe["meta"][$i]["pas_descricao"];
        echo '<td>'.$input.'</td><td style="white-space:nowrap;">'.$descricao.'</td>';
        if($cont == 3){
            echo '</tr>';
            $cont = 0;
        }
        if($total == count($passe["meta"])){
            echo '</tr>';
        }
    }
    echo '</table></div>';
@endphp
