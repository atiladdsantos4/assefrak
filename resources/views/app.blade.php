<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="favicon.png">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>Assefrak</title>
    <meta name="description" content=""></meta>
    <meta name="keywords" content=""></meta>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect"></link>
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin></link>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <!-- <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js')}}"></script> -->
    <!-- Vendor CSS Files -->
    <!-- https://www.jemosistemas.com.br/inertia-assefrak/public/assets/vendor/bootstrap/js/bootstrap.bundle.min.js -->
    <link href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/vendor/aos/aos.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/vendor/glightbox/css/glightbox.min.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/vendor/swiper/swiper-bundle.min.css')}}" rel="stylesheet"></link>
    <!-- Main CSS File -->
    <link href="{{asset('assets/css/main.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/css/cad.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/css/footer_admin.css')}}" rel="stylesheet"></link>
    <link href="{{asset('assets/css/swiper.css')}}" rel="stylesheet"></link>


    <!-- =======================================================
    * Template Name: Creativo
    * Template URL: https://bootstrapmade.com/creativo-bootstrap-creative-agency-template/
    * Updated: Mar 23 2026 with Bootstrap v5.3.8
    * Author: BootstrapMade.com
    * License: https://bootstrapmade.com/license/
    ======================================================== -->
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    @inertia
    <!-- Scroll Top -->
    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <!-- Preloader -->
    <div id="preloader"></div>

    <!-- Vendor JS Files -->
    <script src="{{asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('assets/vendor/php-email-form/validate.js')}}"></script>
    <script src="{{asset('assets/vendor/aos/aos.js')}}"></script>
    <script src="{{asset('assets/vendor/purecounter/purecounter_vanilla.js')}}"></script>
    <script src="{{asset('assets/vendor/imagesloaded/imagesloaded.pkgd.min.js')}}"></script>
    <script src="{{asset('assets/vendor/isotope-layout/isotope.pkgd.min.js')}}"></script>
    <script src="{{asset('assets/vendor/glightbox/js/glightbox.min.js')}}"></script>
    <script src="{{asset('assets/vendor/swiper/swiper-bundle.min.js')}}"></script>

    <!-- Main JS File -->
    <script src="{{asset('assets/js/main.js')}}"></script>
  </body>
</html>
