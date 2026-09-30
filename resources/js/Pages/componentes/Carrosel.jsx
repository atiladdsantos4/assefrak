import { React,useEffect } from 'react';
import FunJsonCarrosel from './FunJsonCarrosel';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';
// <img src={imagem+'person/person-f-3.webp'}'} alt="Profile Image"></img>



// The Main component receives props passed from the Laravel controller
const Carrosel = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const lista =[
     {
       img:'construcao/img01.jpeg',
       titulo:'Terreno Primitivo',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img02.jpeg',
       titulo:'Visão Construção Interna',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img03.jpeg',
       titulo:'Início do Salão de Palestras',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img04.jpeg',
       titulo:'Novo Piso Salão',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img05.jpeg',
       titulo:'Visão Lateral',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img06.jpeg',
       titulo:'Visão Frontal Semi-Acabada',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img07.jpeg',
       titulo:'Salão Quase Pronto',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img08.jpeg',
       titulo:'Vista Frontal',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/img09.jpeg',
       titulo:'Fundo da Construção',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },
     {
       img:'construcao/centrofinalizado.png',
       titulo:'Fachada Conclúida',
       subtitulo:'orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
     },

  ]
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
    <section id="students-life" class="students-life section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="athletics-programs mt-5 pt-3" data-aos="fade-up" data-aos-delay="200">
          <h3 class="text-center mb-4">O Início de Tudo</h3>

          <div class="athletics-slider swiper init-swiper" data-aos="fade-up" data-aos-delay="300">
            <FunJsonCarrosel/>
            <div class="swiper-wrapper">
               {
                lista.map((item,index)=>{
                   return(
                      <div key={index} class="swiper-slide">
                         <div class="athletics-card">
                         <img src={imagem+item.img} class="img-fluid" loading="lazy" alt="Swimming"/>
                         <div class="athletics-content">
                             <h5>{item.titulo}</h5>
                             <p>{''}</p>
                         </div>
                         </div>
                      </div>
                   )
                })
               }

              {/* <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img01.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Swimming</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img02.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Basketball</h5>
                    <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img03.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Soccer</h5>
                    <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img04.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Tennis</h5>
                    <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img05.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Tennis</h5>
                    <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img06.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Tennis</h5>
                    <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/img07.jpeg'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Tennis</h5>
                    <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque.</p>
                  </div>
                </div>
              </div>

              <div class="swiper-slide">
                <div class="athletics-card">
                  <img src={imagem+'construcao/centrofinalizado.png'} class="img-fluid" loading="lazy" alt="Swimming"/>
                  <div class="athletics-content">
                    <h5>Tennis</h5>
                    <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque.</p>
                  </div>
                </div>
              </div> */}


            </div>
            <div style={{backgroundColor:'white !important'}} class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>

  )
}
export default Carrosel
