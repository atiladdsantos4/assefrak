<!DOCTYPE html>
<html>
<head>
    <title>Autentição em 2 fatores Informação do Código de Acesso</title>
</head>
<body>
    <table style="width: 500px;font-family: Arial, Helvetica, sans-serif;" cellspacing="0">
	   <thead>
       <tr>
        <th style="border-bottom: 3px solid #E95E86;
                   padding:5px;
                   border-radius:5px 5px 0px 0px;
                   background: linear-gradient(90deg, #200D35 14.33%, #E95E86 214.54%);
                   color:white;"
        colspan="12">
            <span style="font-size: 16px; font-size: 18px;"> {{ $mailData['empresa'] }}</span>
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
          <p style="margin-left: 10px;"><b>Informe este Código:</b></p>
       </td>
       <td colspan="6">
          <div style="border-radius:5px;padding:3px;font-size: 18px; font-weight:bold; display: table-cell; height:30px;width: 80px;background-color:#3fbbc0;vertical-align: middle;">{{ $mailData['n1'].$mailData['n2'].$mailData['n3'].$mailData['n4'].$mailData['n5'].$mailData['n6'] }}</div></td>
       </td>
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
    <!-- <h1>{{ $mailData['title'] }}</h1>

    <p>Conteudo do html do envio de emil</p>

    <p>Thank you</p> -->
</body>
</html>
