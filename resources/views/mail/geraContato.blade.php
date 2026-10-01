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
		    <p style="margin-left: 10px;margin-right:10px;">Prezado usuário, Recebemos o seu email em breve retornaremos o seu contato </p>
		  </td>
		</tr>
        <tr style="height:30px;">
          <td colspan="3" style="border-radius:5px;background-color:#6895C1;color:white;">
              <p style="margin-left: 10px;font-weight:bold;">Assunto</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['assunto'] }}</p>
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
              <p style="margin-left: 10px;font-weight:bold;">Descrição</p>
          </td>
		  <td colspan="9" style="border-radius:5px;background-color:#b4b9bb;color:white;border-bottom: 1px solid #f1f3f4;">
		    <p style="margin-left: 10px;margin-right:10px;">{{ $mailData['conteudo'] }}</p>
		  </td>
		</tr>
      	<tr style="max-height:30px;">
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
