@inject('carbon', 'Carbon\Carbon')
<div style="text-align:center;"><img class="banner-entrevista" src="{{public_path('assets/img/logo_passista.png')}}"/></div>
<div class="rule"></div>
<!-- <div style="border-top:1px solid black;"></div> -->
<div style="text-align:right;font-size:10px;">Emissão:&nbsp;{{$carbon::now()->format('d/m/Y H:i:s')}}</div>
