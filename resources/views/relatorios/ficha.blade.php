@inject('carbon', 'Carbon\Carbon')
@inject('session', 'Session')
@extends('relatorios.template',["textohead"=>$textohead,"textofooter" => $textofooter,"bootstrapCss" => $bootstrap])
@section('title', 'Tables')
@section('content')
<div>
   <div class="card" id="card_ficha" style="width: 26rem; border: 2px solid black;">
	<div class="row mt-2 mb-2 ms-1">
		<div class="col-md-2">
			teste
        </div>
		<div class="col-md-10">
			<h5 class="card-title cabecalho">
				<p>Associação Espírita Fraternidade Kardecista<br>End. Rua da Ambrósio, nº 183<br>2 de Julho / Camaçari-Ba</p>
            </h5>
		</div>
    </div>
		<div class="row mt-2 mb-2 ms-1">
			<div class="col-md-12" style="font-size: 14px; text-align: center;">CARTÃO DE TRATAMENTO FLUIDOTERAPIA Nº______</div>
		</div>
		<div class="row mt-2 mb-1 ms-1">
            <div class="col-md-12" style="font-size: 14px; text-align: center;">Nome:______________________________________________<p style="font-weight: bold;">TERÇA-FEIRA: 18:00 ÀS 18:50h<br>FECHAMENTO DO PORTÃO ÀS 19:30h</p></div>
         </div>
         <div class="row ms-1 mb-2">
                <div class="col-md-6" style="font-size: 14px; text-align: center;">INÍCIO: ____/____/_____</div>
                <div class="col-md-6" style="font-size: 14px; text-align: center;">Passes (8) Semanas</div>
                <div class="col-md-12" style="font-size: 14px; text-align: left; margin-left: 24px;">Beber Água fluidificada:(8) Semanas (3) vezes ao dia</div>
         </div>
            <div class="row ms-0">
                <div class="col-md-12" style="font-size: 12px; text-align: left;">
                    <ul style="list-style: none;">
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Trazer 01 garrafa de água.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Não traga criança nas reuniões de tratamento.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Chegue no horário marcado e traga o cartão.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Se tiver vícios reduza-os ao máximo possível, se possível, suspenda-os, pelo menos durante o tratamento.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Evite grandes dispêndios de energias físicas mentais.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Fazer Leitura Edificante.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Estando em tratamento mécico, não suspender.</li>
                        <li>
                            <svg data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check" role="img" viewBox="0 0 448 512" aria-hidden="true">
                                <path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                            </svg>&nbsp;Após a interrupção por 2(duas) vezes seguidas, reiniciará os passes</li>
                    </ul>
                </div>
            </div>
            <div class="row ms-1 mb-4 align-items-center">
                <p style="margin-left: -3px; text-align: center; font-size: 14px; font-weight: bold; line-height: 0.5;">CONTROLE PERÍODO DO TRATAMENTO</p>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">1ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">2ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">3ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">4ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">5ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">6ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">7ª</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">8ª</div>
                    </div>
                </div>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                        <div class="col" style="max-width: 50px; text-align: center; border: 1px solid black;">&nbsp;</div>
                    </div>
                </div>
            </div>
	</div>
</div>
@endsection
