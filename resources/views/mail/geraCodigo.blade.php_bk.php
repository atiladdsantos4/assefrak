<!DOCTYPE html>
<html>
<head>
    <title>Laravel 11 Send Email with Attachment Example - Techsolutiontuff</title>
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
		    <p style="margin-left: 10px;margin-right:10px;">Prezado usuário, segue abaixo o código de confirmação gerado pelo sistema</p>
		  </td>
		</tr>
		<tr style="max-height:30px;">
          <td colspan="3">
            <p style="margin-left: 10px;">Informe o Código:</p>
          </td>
		       <td style="text-align:center;"><div style="border-radius:5px;padding:3px;font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 40px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n1'].$mailData['n2'].$mailData['n3'].$mailData['n4'].$mailData['n5'].$mailData['n6'] }}</div></td> 
           <td style="text-align:center;"><div style="font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 30px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n2'] }}</div></td> 
           <td style="text-align:center;"><div style="font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 30px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n3'] }}</div></td> 
           <td style="text-align:center;"><div style="font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 30px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n4'] }}</div></td> 
           <td style="text-align:center;"><div style="font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 30px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n5'] }}</div></td> 
           <td style="text-align:center;"><div style="font-size: 16px; font-weight:bold; display: table-cell; height:30px;width: 30px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n6'] }}</div></td> 
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
    <h1>{{ $mailData['title'] }}</h1>
  
    <p>Conteudo do html do envio de emil</p>
     
    <p>Thank you</p>
</body>
</html>
