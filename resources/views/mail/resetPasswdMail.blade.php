<html>
<head>
<style>
      .colored {
        color: blue;
      }
      #body {
        font-size: 14px;
      }
      #title{
        color:#F53003;
        background-color: black; 
        width: 500px;
        border-radius: 8px;
        text-align: center;
      }  
      #div_body{
        background-color: lightgray;
        width: 500px;
        border-radius: 8px;
        text-align: left;
        padding: 10px;
      }
    </style>
    <title>Laravel 11 Send Email with Attachment Example - Techsolutiontuff</title>
</head>
<body id="body">
    <h1 id="title">{{ $mailData['title'] }}</h1>
    <div id="div_body">
        <p>
            Prezado,&nbsp;{{ $mailData['usuario'] }}
            <br>
            Clique no link abaixo para redefinir sua senha.
            <a href="http://localhost/projetos/laravel11/public/index.php/reset-password?email={{ $mailData['email'] }}&token={{ $mailData['token'] }}">
               Redefinir 
            </a>


        </p>
        
        <p>Thank you</p>
    </div>
</body>
</html>
