<!DOCTYPE html>
<html>
<head>
    <title>Autentição em 2 fatores Informação do Código de Acesso</title>
</head>
<body>
    <table style="width: 500px;font-family: Arial, Helvetica, sans-serif;" cellspacing="0">
	   <thead>
       <tr>
        <th style="border-bottom: 3px solid #1F8BDA;
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
		    <p style="margin-left: 10px;margin-right:10px;">Prezado usuário, Recebemos sua pretensão de Compra, logo abaixo os dados referentes a sua requisição, aguardamos a confimação de seu Pgto</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px 0px 0px 5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Livro</p>
          </td>
		  <td colspan="9" style="border-radius:0px 5px 5px 0px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #55595b;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['livro'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px 0px 0px 5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Autor</p>
          </td>
		  <td colspan="9" style="border-radius:0px 5px 5px 0px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #55595b;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['autor'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px 0px 0px 5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Valor</p>
          </td>
		  <td colspan="9" style="border-radius:0px 5px 5px 0px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #55595b;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ 'R$ '.$mailData['valor'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px 0px 0px 5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Enviado por</p>
          </td>
		  <td colspan="9" style="border-radius:0px 5px 5px 0px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #55595b;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['email'] }}</p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px 0px 0px 5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Pix Copia/Cola</p>
          </td>
		  <td colspan="9" style="border-radius:0px 5px 5px 0px;background-color:#b4b9bb;color:black;border-bottom: 1px solid #55595b;">
		    <p style="margin-left: 10px;margin-right:10px;font-size:11px;">{{ $mailData['copia'] }}</p>
		  </td>
		</tr>
       <tr style="max-height:30px;">
        <td colspan="3" style="border-radius:5px 0px 0px 5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Informe Este Código</p>
          </td>
        <td colspan="9" style="border-radius:0px 5px 5px 0px;background-color:#b4b9bb;color:black;border-bottom: 1px solid #55595b;">
              <p style="margin-left: 10px;margin-right:10px;font-size:22px;font-weight:bold;">{{ $mailData['hash'] }}</p>
        </td>
       </tr>
       <tr style="height:15px;">
		  <td colspan="12" style="color:red;">Obs: Segue o Qrcode Anexo a este Email</td>
		</tr>
		<tr style="height:30px;">
		  <td colspan="12"></td>
		</tr>
      </tbody>
	  <tr>
       <td style="border-top: 3px solid  #1F8BDA;
                  height:23px;padding:5px;
                  border-radius:0px 0px 5px 5px;
                  background: linear-gradient(90deg, #87aace 14.33%, #6895C1 214.54%);"
       colspan="12">
       </td>
      </tr>
    </table>
</body>
</html>
