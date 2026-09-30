<!DOCTYPE html>
<html>
<head> <title></title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet">
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
<style type="text/css"> 
    @media screen {
        @font-face { 
            font-family: 'Lato'; 
            font-style: normal; 
            font-weight: 400; 
            src: local('Lato Regular'), 
            local('Lato-Regular'), 
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff'); 
        } 
        @font-face {
            font-family: 'Lato'; 
            font-style: normal; 
            font-weight: 700; 
            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff'); 
        } 
        @font-face { 
            font-family: 'Lato'; 
            font-style: italic; 
            font-weight: 400; 
            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: italic; font-weight: 700; src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff'); 
        } 
    } 
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { 
        -webkit-text-size-adjust: 100%; 
        -ms-text-size-adjust: 100%; 
    } 
    table, td { 
        mso-table-lspace: 0pt; 
        mso-table-rspace: 0pt; 
    } 
    img { 
        -ms-interpolation-mode: bicubic; 
    } /* RESET STYLES */ 
    img { 
        border: 0; 
        height: auto;
        line-height: 100%; 
        outline: none; 
        text-decoration: none; 
    } 
    table { 
        border-collapse: collapse !important; 
    } 
    body { 
        height: 100% !important; 
        margin: 0 !important; 
        padding: 0 !important; 
        width: 100% !important; 
    } 
    /* iOS BLUE LINKS */ 
    a[x-apple-data-detectors] { 
        color: inherit !important; 
        text-decoration: none !important; 
        font-size: inherit !important; 
        font-family: inherit !important; 
        font-weight: inherit !important; 
        line-height: inherit !important; 
    } /* MOBILE STYLES */ 
    @media screen and (max-width:600px) { 
        h1 { 
            font-size: 32px !important; 
            line-height: 32px !important; 
        } 
    } /* ANDROID CENTER FIX */ 
    div[style*="margin: 16px 0;"] { 
        margin: 0 !important; 
    } 
</style>
</head>
    <body style="background-color: #1977CC; margin: 0 !important; padding: 0 !important;"> <!-- HIDDEN PREHEADER TEXT --> 
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
        {{ $nome_site }}
        </div> 
        <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
        <!-- LOGO --> 
        <tr> 
            <td bgcolor="#1977CC" align="center"> 
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> 
                    <tr> 
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"></td> 
                        </tr> 
                    </table> 
                </td> 
            </tr> 
            <tr> 
                <td bgcolor="#1977CC" align="center" style="padding: 0px 10px 0px 10px;"> 
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> 
                        <tr> 
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;"> 
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">{{ $nome_site }}</h1> 
                                <!-- <img src="https://firebasestorage.googleapis.com/v0/b/mewzik-c3c20.appspot.com/o/staticHtml%2Fsound.png?alt=media&token=e4ffc196-72e0-46be-93bc-a08f45599978" width="125" height="120" style="display: block; border: 0px; margin : 30px 20px 20px 20px" />  -->
                                <!-- <img style="width:50%;" src="{{asset('main/assets/img/email/foto_email.jpg')}}"> -->
                                <img src="{{asset('main/assets/img/favicon.png')}}">
                            </td> 
                        </tr> 
                    </table> 
                </td> 
            </tr> 
            <tr> 
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> 
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> 
                        <tr> 
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
                                <p style="margin: 0;"><b>Contato:</b>&nbsp;{{ $nome }}</p> 
                                <p style="margin: 0;"><b>Email:</b>&nbsp;{{ $contato }}</p>
                                <p style="margin: 0;"><b>Assunto:</b>&nbsp;{{ $assunto }}</p>
                                <br> 
                                <p style="margin: 0;"><b><u>Mensagem:<u></b><br>{{ $mensagem }}</p> 
                            </td> 
                        </tr> 
                        <tr> 
                           <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> 
                            <tr> 
                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> 
                            <tr> 
                                <td align="center" style="border-radius: 20px;" bgcolor="#1977CC">
                                    <a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 20px; border: 1px solid #FFA73B; display: inline-block;">
                                       <!-- Confirm Account -->
                                       Recebemos a sua mensagem e logo entraremos em contato.
                                    </a>
                                </td> 
                            </tr> 
                    </table> 
                </td> 
             </tr> 
            </table> 
        </td> 
    </tr> 
    <tr> 
        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
            <p style="margin: 0;">Este E-mail é gerado de forma automatica. Por favor <b>Não</b> responda a este e-mail.</p> 
        </td> 
    </tr> 
    <tr> 
        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
           <p style="margin: 0;">Obrigado,<br>Adds Team</p> 
        </td> 
    </tr> 
</table>
 </td> 
</tr>
 <tr> 
    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> 
    <tr> 
        <td bgcolor="#6495ED" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Precisa de Mais ajuda?</h2> 
            <p style="margin: 0;">
                <a href="http://www.jemosistemas.com.br/captacao/public/index.php" target="_blank" style="color: #34495E;">
                     Estamos aqui para orientá-lo
                </a><br>
                <!-- <a class="whatsapp" href="" style="color: #34495E;">
                    Conversar por whatsapp   
                </a> -->
            </p> 
        </td> 
    </tr> 
</table> 
    </td>
        </tr> 
        <tr> 
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#f4f4f4" align="left" style="padding: 0px 0px 20px 0px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> 
                    <br> 
                    <!-- <p style="margin: 0;">If these emails get annoying, please feel free to 
                        <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.
                    </p>  -->
                </td> 
            </tr> 
        </table> 
    </td> 
</tr>
</table>
</body>
<script>
  $( document ).ready(function(){
    let w = $(window).width(); 
    if( w <= 450 ){
        $(".whatsapp").removeAttr("target"); 
        $(".whatsapp").attr("href","https://api.whatsapp.com/send/?phone=+5571999872426&text&type=phone_number&app_absent=0");
    } else {
        $(".whatsapp").attr("target","_blank");
        $(".whatsapp").attr("href","https://web.whatsapp.com/send?phone=+5571999872426&text=Olá");
    }
  });
</script>    
</html>