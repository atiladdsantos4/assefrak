<!DOCTYPE html>
<html>
<head>
    <title>Medício - Confirmação de Atendimento</title>
</head>
<body>
    <table style="width: 500px;font-family: Arial, Helvetica, sans-serif;" cellspacing="0">
	   <thead>
       <tr>
        <th style="border-bottom: 3px solid #0c817a;padding:5px;border-radius:5px 5px 0px 0px;background-color:#3fbbc0;color:white;" colspan="12">
            <span style="font-size: 16px; font-size: 18px;"> MEDICIO </span>
        </th>
      </tr>
	  </thead>
      <tbody style="height:250px;background-color:#f0efee;">
        <tr style="height:30px;">
		  <td colspan="12">
		    <p style="margin-left: 10px;margin-right:10px;">Prezado, {{ $agenda["nome"] }}<br>
          A data e hora do seu agendamento foram reservadas em nosso sistema. Para dar continuidade 
          ao seu tratamento é necessário confirmar a sua presença e prencher os dados que são necessários a esta etapa do 
          processo.<br>        
          Você pode fazer clicando no link "Confirma" logo abaixo das informações:
        </p>
		  </td>
		</tr>
		<tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Data Reserva:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["dia"].' de '.$agenda["mes"].' de '.$agenda["ano"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Horário:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["horario"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Dia da Semana:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["dia_extenso"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Médico:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["medico"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Especialidade:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["especialidade"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Tratamento:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["tratamento"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Realizado em:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style="color: #0c817a; border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;">{{ $agenda["cadastro"] }}</div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>
    <tr style="max-height:30px;">
        <td colspan="3">
            <p style="margin-left: 10px;font-weight:bold;">Link de Confirmação:</p>
       </td>
	     <td colspan="6" style="text-align:center;"><div style='border-radius: 5px; font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 350px;background-color:#3fbbc0;vertical-align: middle;'><a target='_blank' href='<?php echo $agenda["host"]; ?>'>Confirmar Consulta</a></div></td> 
  	   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
		   <td>&nbsp;</td> 
    </tr>


		<tr style="height:30px;">
		  <td colspan="12"></td>
		</tr>
      </tbody>
	  <tr>
       <td style="border-top: 3px solid #0c817a;height:23px;padding:5px;border-radius:0px 0px 5px 5px;background-color:#3fbbc0;" colspan="12">         
       </td>
      </tr>
    </table>
    <!-- <h1>{{ $mailData['title'] }}</h1>
  
    <p>Conteudo do html do envio de emil</p>
     
    <p>Thank you</p> -->
</body>
</html>
