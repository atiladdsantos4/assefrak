<!DOCTYPE html>
<html>
<head>
    <title>Autentição em 2 fatores Informação do Código de Acesso</title>
</head>
<body>
    <table style="width: 500px;font-family: Arial, Helvetica, sans-serif;" cellspacing="0">
	   <thead>
       <tr>
        <th style="border-bottom: 3px solid #27b1e3;
                   padding:5px;
                   border-radius:5px 5px 0px 0px;
                   background: linear-gradient(90deg, #87aace 14.33%, #6895C1 214.54%);
                   color:white;"
        colspan="12">
            <div>
                <img style="width:60px;border-radius:50px;" src='cid:logo_image' />
                <!-- <img src="https://drive.google.com/file/d/1MiK-seEqAK63s53R8gEtA1QRVCp7hdwI/view" alt="Logo" title="Logo" style="display:block;width:60px;"/> -->
                <!-- <img style="width:60px;" src="https://www.assefrak.com.br/public/assets/img/logo_report.png" /> -->
            <div>
            <span style="font-size: 16px; font-size: 18px;"> {{ $mailData['empresa'] }}</span>
        </th>
      </tr>
	  </thead>
      <tbody style="height:250px;background-color:#f0efee;">
        <tr style="height:30px;">
		  <td colspan="12">
		    <p style="margin-left: 10px;margin-right:10px;">Prezado usuário, Recebemos a sua inscrição, logo abaixo o código de confirmação gerado pelo sistema</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Curso</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['titulo'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Período</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['periodo'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Nome</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['nome'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Email</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['email'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Telefone</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['telefone'] }}</p>
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
       <td style="border-top: 3px solid  #27b1e3;
                  height:23px;padding:5px;
                  border-radius:0px 0px 5px 5px;
                  background: linear-gradient(90deg, #87aace 14.33%, #6895C1 214.54%);"
       colspan="12">
       </td>
      </tr>
    </table>
</body>
</html>
