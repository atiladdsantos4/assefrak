   <div class="card" id="card_ficha" style="width: 350px; border: 2px solid black;">
        <div class="container mt-2 mb-2 ms-1">
            <div class="box-left">
                 <img class="card-img-top" style="width: 32px; height: 32px;" src="{{public_path('assets/img/favicon.png')}}"/>
            </div>
            <div class="box-right">
                <h5 class="card-title">
                   <p style="font-size:12px;">Associação Espírita Fraternidade Kardecista<br>End. Rua da Ambrósio, nº 183<br>2 de Julho / Camaçari-Ba</p>
                 </h5>
            </div>
        </div>
        <div class="row mt-2 mb-2 ms-0">
			<div style="margin-left:-5px;font-size: 12px; text-align: center;">CARTÃO DE TRATAMENTO FLUIDOTERAPIA Nº______</div>
		</div>
        <div class="row mt-2 mb-1 ms-1">
            <div  style="margin-left:-18px;font-size: 12px; text-align: center;">Nome:_____________________________________________
                <p style="font-weight: bold;">{{$horario}}<br>@if($fecha == 1){{$fechamento}}@endif</p></div>
         </div>
         <div class="container ms-1 mb-2">
             <div style="margin-left:-6px;display: inline-block;font-size: 12px; text-align:center;">INÍCIO: ____/____/_____</div>
             <div style="margin-left:20px;display: inline-block;font-size: 12px; text-align:right;">Passes ({{$passes}}) Semanas</div>
             <!-- <div class="col-md-12" style="font-size: 14px; text-align: left; margin-left: 24px;">Beber Água fluidificada:(8) Semanas (3) vezes ao dia</div> -->
         </div>
         <div class="container ms-1 mb-2">
             <div style="font-size: 12px; text-align: left; margin-left: -6px;">Beber Água fluidificada:({{$passes}}) Semanas ({{$agua}}) vezes ao dia</div>
         </div>
         <div style="margin-left: -6px;font-size: 11px; text-align: left;">
             <ul style="list-style: none;">
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Trazer 01 garrafa de água.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Não traga criança nas reuniões de tratamento.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Chegue no horário marcado e traga o cartão.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Se tiver vícios reduza-os ao máximo possível, se possível, suspenda-os, pelo menos durante o tratamento.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Evite grandes dispêndios de energias físicas mentais.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Fazer Leitura Edificante.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Estando em tratamento mécico, não suspender.</li>
                <li>
                    <img class="card-img-top" style="width: 18px; height: 18px;" src="{{public_path('assets/img/relatorio/check-blue.png')}}"/>
                    &nbsp;Após a interrupção por 2(duas) vezes seguidas, reiniciará os passes</li>
             </ul>
         </div>
         <div style="margin-left: -6px;font-size: 11px; text-align: left;">
             <p style="margin-left: -3px; text-align: center; font-size: 12px; font-weight: bold; line-height: 0.5;">CONTROLE PERÍODO DO TRATAMENTO</p>
         </div>
         <div style="padding:3px;margin-left:0px;font-size:10px;">
            <table width="100%">
                <tr>
                @for ($i = 1; $i <= $passes; $i++)
                    <td style="text-align:center;border:1px solid black;max-heigh:5px;white-space:nowrap;">
                       {{$i}}ª<div style="width:9px;height:9px;border:1px solid black;"></div>
                       <!-- <div style="min-width:30px;text-align:center;border:1px solid black;">{{$i}}ª</div>
                       <div style="min-width:30px;;text-align:center;border:1px solid black;">&nbsp;</div> -->
                    </td>
                @endfor
                </tr>
                <tr>
                @for ($i = 1; $i <= $passes; $i++)
                    <td style="text-align:center;border:1px solid black;max-heigh:5px;">
                       &nbsp;
                       <!-- <div style="min-width:30px;text-align:center;border:1px solid black;">{{$i}}ª</div>
                       <div style="min-width:30px;;text-align:center;border:1px solid black;">&nbsp;</div> -->
                    </td>
                @endfor
                </tr>
            </table>
        </div>
   </div>
