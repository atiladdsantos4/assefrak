@inject('carbon', 'Carbon\Carbon')
<div style="text-align:center;"><img class="card-img-top" style="width:48px;height:48px;border-radius:3px;" src="{{public_path('assets/img/logo_report.png')}}"/></div>
<div style="text-align:center;font-weight:bold;">Associação Espírita Fraternidade Karcedista de Camaçari</div>
<div style="text-align:center;font-weight:bold;">{{$titulo}}</div>
<div style="border-top:1px solid black;"></div>
<div style="text-align:right;font-size:10px;">Emissão:&nbsp;{{$carbon::now()->format('d/m/Y H:i:s')}}</div>
