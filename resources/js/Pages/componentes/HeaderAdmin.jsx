import { React,useEffect } from 'react';
import ListaAcolhidos from '../listagem/ListaAcolhidos';



// The Main component receives props passed from the Laravel controller
const HeaderAdmin = (props) => {
  console.log(props.lista)
  const { tela,mudatela,altera,alteraficha,lista, pesquisa }  = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const link  = import.meta.env.VITE_APP_ENDPOINT
  useEffect(() => {
   /**
   * Mobile nav toggle
   */
    console.log(props.lista)
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


  const LastItemMenu = ({ item }) => {
        return (
            <li><a href="#" onClick={(e) => handleClick(e, item.men_click)}>{item.men_name}</a></li>
        )
  }

  const ItemMenu = ({ item, itemchildren }) => {
    if(item.secondlevel.length > 0){
        let lista = item.secondlevel
        return (
            <li class="dropdown"><a href="#"><span className={item.men_classe}>{item.men_name}</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul className="ul_cab">
                    {
                        lista.map((item,index)=>{
                            if(item.secondlevel.length == 0){
                               return(<LastItemMenu key={item.men_id_men} item={item}/>)
                            } else {
                               return(
                                   <li class="dropdown"><a href="#"><span>{item.men_name}</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                                       <ul className='ul_cab'>
                                           {
                                             item.secondlevel.map((item,index)=>{
                                               return(<LastItemMenu key={item.men_id_men} item={item}/>)
                                             })
                                           }
                                       </ul>
                                   </li>
                               )
                            }
                        })
                    }
                </ul>
            </li>
        )
    }
  }

  const ItemMenu1 = ({ item, itemchildren }) => {
    return (
        <li class="dropdown"><a href="#"><span className={item.men_classe}>{item.men_name}</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
           <ul className="ul_cab">
               {
                  itemchildren.map((item,index)=>{
                       return(<LastItemMenu key={item.men_id_men} item={item}/>)
                  })
               }
           </ul>
       </li>
    )
  }

  return (
    <header id="header" class="header d-flex align-items-center fixed-top fundo_header">
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
                {
                  lista.map((item,index)=>{
                    return(<ItemMenu item={item} itemchildren={item.secondlevel}/>)
                  })
                }
                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            <div class="header-social-links">

                <a
                    href="#"
                    class="search"
                    onClick={(e) => {
                        e.preventDefault()
                        pesquisa()
                    }}
                >
                    <i class="bi bi-search"></i>
                </a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a target="_blank" href="https://www.instagram.com/assefrak?igsh=MW94NDAzOXYyMGtvdA==" class="instagram"><i class="bi bi-instagram"></i></a>
            </div>

        </div>
    </header>
  )
}
export default HeaderAdmin
