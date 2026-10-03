import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const HeaderAdmin = (props) => {
  const { tela,mudatela,altera,alteraficha }  = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const link  = import.meta.env.VITE_APP_ENDPOINT
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
    * Toggle mobile nav dropdowns ListaCategoriaVideo
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

  const handleClick = (event,valor) =>{
     event.preventDefault();
     altera(null)
     alteraficha(null)
     mudatela()
     tela(valor)
  }

  return (
    <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container position-relative d-flex align-items-center justify-content-between">

            <a href={link} target="_blank" class="logo d-flex align-items-center me-auto me-xl-0">
                {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
                {/* <!-- <img src="assets/img/logo.webp" alt=""> --> */}
                <h1 class="sitename" style={{color:'#6895C1'}}>Assefrak</h1>
                &nbsp;
                <img src={imagem+'assefrak_img_round.jpeg'} style={{borderRadius:'50px'}} alt="Assefrak Image" class="img-fluid"></img>
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
                    <li class="dropdown"><a href="#"><span className="centralizado">Acolhidos</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                        <li><a href="#hero" class="active" onClick={(e)=>handleClick(e,'Acolhido')}>Novo Acolhido</a></li>
                        <li><a href="#" onClick={(e)=>handleClick(e,'ListaAcolhidos')}>Lista Acolhidos</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a href="#"><span className="centralizado">Colaboradores</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaOcupacao')}>Lista Ocupações</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Colaborador')}>Novo Colaborador</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaColaboradores')}>Lista Colaboradores</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a href="#"><span className="centralizado">Eventos/Palestras</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a href="#hero" class="active" onClick={(e)=>handleClick(e,'ListaPublicoFoco')}>Público Alvo</a></li>
                            <li><a href="#hero" class="active" onClick={(e)=>handleClick(e,'ListaCategoriaEvento')}>Categoria de Evento/Palestra</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Evento')}>Novo Evento</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaEventos')}>Listagem de Eventos</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Palestra')}>Nova Palestra</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaPalestras')}>Listagem de Palestras</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Curso')}>Novo Curso</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaCursos')}>Listagem de Cursos</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaPresenca')}>Listagem de Presença</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a href="#"><span className="centralizado">Controle Tratamentos</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                        <li><a href="#about" onClick={(e)=>handleClick(e,'ListaPasses')}>Passes</a></li>
                        <li><a href="#services" onClick={(e)=>handleClick(e,'ListaFocoEnergeticos')} className="centralizado">Focos Energéticos</a></li>
                        <li><a href="#services" onClick={(e)=>handleClick(e,'ListaCondicaoEnergeticas')} className="centralizado">Condição Energética</a></li>
                        <li><a href="#portfolio" onClick={(e)=>handleClick(e,'ListaFortalecimentos')}>Fortalecimento</a></li>
                        <li><a href="#team" className="centralizado" onClick={(e)=>handleClick(e,'ListaLimpezas')}>Limpeza Desobsessão</a></li>
                        <li><a href="#team" className="centralizado" onClick={(e)=>handleClick(e,'ListaAlertas')}>Alertas Segurança</a></li>
                        <li><a href="#" onClick={(e)=>handleClick(e,'ListaTipoTratamentos')}>Tipo Tratamento</a></li>
                        <li><a href="#" onClick={(e)=>handleClick(e,'ListaStatusTratamentos')}>Status do Tratamento</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a href="#"><span>Avaliações</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                        <li class="dropdown"><a href="#"><span>Tratamentos</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                            <ul>
                                <li><a href="#" onClick={(e)=>handleClick(e,'ListaOcorrencias')}>Ocorrências Passe</a></li>
                                <li><a href="#" onClick={(e)=>handleClick(e,'Tratamento')}>Novo Tratamento</a></li>
                                <li><a href="#" onClick={(e)=>handleClick(e,'ListaTratamentos')}>Listar Tratamentos</a></li>
                                <li><a href="#" onClick={(e)=>handleClick(e,'ControlePresenca')}>Controle de Presença</a></li>
                                <li><a href="#" onClick={(e)=>handleClick(e,'Ficha')}>Geração de Ficha</a></li>
                            </ul>
                        </li>
                        {/* <li><a href="#">Dropdown 1</a></li>
                        <li><a href="#">Dropdown 2</a></li>
                        <li><a href="#">Dropdown 3</a></li>
                        <li><a href="#">Dropdown 4</a></li> */}
                        </ul>
                    </li>
                    <li class="dropdown"><a href="#"><span className="centralizado">Livraria</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaAutores')}>Lista Autores</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Autor')}>Novo Autor</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaEditoras')}>Lista Editoras</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Editora')}>Nova Editora</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaLivros')}>Lista Livros</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Livro')}>Novo Livro</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Pix')}>Cadastrar Chave Pix</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'PrecoLivro')}>Precificação de Livros</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a href="#"><span className="centralizado">Outros</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaCategoriaVideo')}>Lista Categorias Vídeos</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'CategoriaVideo')}>Nova Categoria Vídeos</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaVideos')}>Lista de Vídeos</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Video')}>Novo Vídeo</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaDepartamento')}>Lista Departamentos</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Departamento')}>Novo Departamento</a></li>
                            <li class="dropdown"><a href="#"><span>Estoque</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#" onClick={(e)=>handleClick(e,'EntradaEstoque')}>Entradas</a></li>
                                    <li><a href="#" onClick={(e)=>handleClick(e,'ListaEntradasEstoque')}>Listagem Entradas</a></li>
                                    <li><a href="#" onClick={(e)=>handleClick(e,'SaidaEstoque')}>Saídas</a></li>
                                    <li><a href="#" onClick={(e)=>handleClick(e,'ListaSaidasEstoque')}>Listagem Saídas</a></li>
                                </ul>
                            </li>
                            {/* <li><a href="#" onClick={(e)=>handleClick(e,'ListaEditoras')}>Lista Editoras</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Editora')}>Nova Editora</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'ListaLivros')}>Lista Livros</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Livro')}>Novo Livro</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'Pix')}>Cadastrar Chave Pix</a></li>
                            <li><a href="#" onClick={(e)=>handleClick(e,'PrecoLivro')}>Precificação de Livros</a></li> */}
                        </ul>
                    </li>
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
export default HeaderAdmin
