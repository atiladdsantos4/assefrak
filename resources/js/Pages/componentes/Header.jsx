import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Header = (props) => {
  const { clickevento,clickpalestra,opencursos } = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  const scrollToId = (event,id) => {
       event.preventDefault()
       const element = document.getElementById(id);

       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
       if(id === 'events-extended' ){
          console.log(element)
          clickevento(false)
       }

       if(id === 'palestra-extended' ){
          console.log(element)
          clickpalestra(false)
       }
  };


  useEffect(() => {
   /**
   * Mobile nav toggle
   */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
    }
    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

   /**
   * Hide mobile nav on same-page/hash links
   */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active') && !navmenu.classList.contains('toggle-dropdown')) {
            mobileNavToogle();
        }
        });

    });

    /**
    * Toggle mobile nav dropdowns
    */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
        });
    });



  },[])

  return (
    <header id="header" class="header d-flex align-items-center fixed-top" style={{zIndex:'1000'}}>
        <div class="container position-relative d-flex align-items-center justify-content-between">

            <a href="#" class="logo d-flex align-items-center me-auto me-xl-0">
                {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
                {/* <!-- <img src="assets/img/logo.webp" alt=""> --> */}
                <h1 class="sitename" style={{color:'#6895C1'}}>Assefrak</h1>
                &nbsp;
                <img style={{borderRadius:'50px'}} src={imagem+'assefrak_img_round.jpeg'} alt="Assefrak Image" class="img-fluid"></img>
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
                <li><a href="#hero" class="active">Principal</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#services">Serviços</a></li>
                <li><a href="#portfolio">Portfólio</a></li>
                <li><a href="#" onClick={(e)=>scrollToId(e,'why-us')}>Por Que Nós</a></li>
                <li><a href="#" onClick={(e)=>scrollToId(e,'events-extended')}>Eventos</a></li>
                <li><a href="#" onClick={(e)=>scrollToId(e,'palestra-extended')}>Palestras</a></li>
                <li><a href="#" onClick={(e)=>scrollToId(e,'cursos')}>Cursos</a></li>
                <li><a href="#team">Equipe</a></li>
                <li class="dropdown"><a href="#"><span>Outros</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                    <li><a href="#allan">Allan Kardec</a></li>
                    <li><a href="#mural">Mural</a></li>
                    <li><a href="#" onClick={(e)=>scrollToId(e,'livraria')}>Livraria</a></li>
                    <li><a href="#" onClick={(e)=>scrollToId(e,'video')}>Vídeos Preces</a></li>
                    <li><a href="#" onClick={(e)=>scrollToId(e,'localizacao')}>Localização</a></li>
                    <li style={{display:'none'}} class="dropdown"><a href="#"><span>Allan Kardec</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                        <li><a href="#">Deep Dropdown 1</a></li>
                        <li><a href="#">Deep Dropdown 2</a></li>
                        <li><a href="#">Deep Dropdown 3</a></li>
                        <li><a href="#">Deep Dropdown 4</a></li>
                        <li><a href="#">Deep Dropdown 5</a></li>
                        </ul>
                    </li>
                    <li style={{display:'none'}}><a href="#">Dropdown 2</a></li>
                    <li style={{display:'none'}}><a href="#">Dropdown 3</a></li>
                    <li style={{display:'none'}}><a href="#">Dropdown 4</a></li>
                    </ul>
                </li>
                <li><a href="#contact">Contato</a></li>
                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            <div class="header-social-links">
                <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a target="_blank" href="https://www.instagram.com/assefrak?igsh=MW94NDAzOXYyMGtvdA==" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>

        </div>
    </header>
  )
}
export default Header
