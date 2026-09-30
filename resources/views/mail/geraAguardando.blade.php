<!DOCTYPE html>
<html>
<head>
    <title>Medício - Atendimento Confirmado </title>
</head>
<body>
    <table style="width: 500px;font-family: Arial, Helvetica, sans-serif;" cellspacing="0">
	   <thead>
       <tr>
        <th style="border-bottom: 3px solid #E95E86;
                   padding:5px;
                   border-radius:5px 5px 0px 0px;
                   background: linear-gradient(90deg, #200D35 14.33%, #E95E86 214.54%);"
        colspan="12">
            <span style="font-size: 16px; font-size: 18px; color:#f0efee;"> {{ $agenda["empresa"] }}</span>
        </th>
      </tr>
	  </thead>
      <tbody style="height:250px;background-color:#f0efee;">
        <tr style="height:30px;">
		  <td colspan="12">
		    <p style="margin-left: 10px;margin-right:10px;">Prezado(a), {{ $agenda["nome"] }}<br>
          Tudo pronto!!! Obrigado pelo seu Agendamento. Ficaremos no Aguardo da confirmação do Pagamento<br>
          Aguardamos a sua presença na data e hora definidos neste e-mail. Sugerimos chegar ao menos 30 minutos
          antes de seu atendimento.
        </p>
		  </td>
		</tr>
		<tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Data Agendamento:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["dia"].' de '.$agenda["mes"].' de '.$agenda["ano"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Horário:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["horario"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Dia da Semana:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["dia_extenso"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Profissional:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["profissional"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Serviço:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["servico"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Tratamento:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["tratamento"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Data Atendimento:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: white; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;">{{ $agenda["cadastro"] }}</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Status</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style='border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#200D35;vertical-align: middle;'>Agendamento Confirmado</div></td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Pix Copia/Cola</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style='border-radius: 5px; font-size: 12px; font-weight:bold; display: table-cell; height:40px;width:350px;background-color:white;vertical-align: middle;'>
            </div>{{$agenda["qrcodecopia"]}}</td>
  	   <td>&nbsp;</td>
		   <td>&nbsp;</td>
		   <td>&nbsp;</td>
    </tr>


		<tr style="height:30px;">
		  <td colspan="12"></td>
		</tr>
      </tbody>
	  <tr>
       <td style="border-top: 3px solid #E95E86;
                  height:23px;padding:5px;
                  border-radius:0px 0px 5px 5px;
                 background: linear-gradient(90deg, #200D35 14.33%, #E95E86 214.54%);"
       colspan="12">
       </td>
      </tr>
    </table>
  </body>
</html>
