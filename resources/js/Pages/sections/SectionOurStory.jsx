import { React,useEffect, useState } from 'react';
import Carrosel from '../componentes/Carrosel';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionOurStory = (props) => {
  const {mudatela} = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const [screen,setScreen] = useState(null)

//   useEffect(() => {
//       const handleResize = () => {
//           const viewportWidth = window.innerWidth;
//           mudatela(viewportWidth)
//           console.log('largura'+viewportWidth)
//           let obj = null
//           if(viewportWidth < 700){
//              obj = document.getElementById('btn-app')
//              obj.href="https://api.whatsapp.com/send/?phone=+5571987507658&text=Quero mais infomações&type=phone_number&app_absent=0"
//           //    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
//           //         faqItem.addEventListener('click', () => {
//           //         faqItem.parentNode.classList.toggle('faq-active');
//           //         });
//           //    });

//           } else {
//              obj = document.getElementById('btn-app')
//              //obj = document.getElementsByClassName('btn-contact')
//              obj.href="https://web.whatsapp.com/send?phone=+5571987507658&text=Olá"
//              obj.target="_blank"
//           //    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
//           //         faqItem.addEventListener('click', () => {
//           //           faqItem.parentNode.classList.toggle('faq-active');
//           //         });
//           //    });

//           }
//           //setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//       };
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//   },[])

  return (
    <>
    <section id="ourstory" class="ourstory section mt-5">
      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="about-content" data-aos="fade-up" data-aos-delay="200">
              <h3>Nossa Historia</h3>
              <h2>Associação Espírita Fraternidade Karcedista de Camaçari</h2>
              <p>Fundamenta sua atuação nos seguintes valores; - Amor, Caridade, Fraternidade, Humildade, Responsabilidade Respeito, Serviço ao próximo. Em síntese nossos valores são o Amor que acolhe, a Caridade que serve, a Fraternidade que une e o Evangelho que transforma. Oferecemos atendimento fraterno, passes e tratamento espiritual e escuta amiga para aliviar suas dores com muito amor e respeito. Venha receber um abraço espiritual.</p>

              <div class="timeline">

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>1979</h4>
                    <p>Foi fundada Associação Espírita Fraternidade Karcedista de Camaçari - Assefrak  </p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>2008</h4>
                    <p>Foi Reformada e Construída a sede atual</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>2018</h4>
                    <p>Realizada Palestra Comemorativa na Câmara de Vereadores de Camaçari pelos 10 anos de existência e prestação de serviços a comunidade.</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>2026</h4>
                    <p>Atualmente seguimos atendendo a população sobre os ensinamentos cristãos à luz do Espiritismo para esclarecer e consolar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            {/* <div class="action-row">
                <a href="#services" class="btn-get-started">Ver Serviços</a>
                <a href="" id="btn-app" class="btn-contact">
                 <i class="bi bi-whatsapp" style={{color:'green'}}></i>
                   <span>Marque uma Vista</span>
                 </a>
            </div> */}
            <div class="about-image" data-aos="zoom-in" data-aos-delay="300">
              <img src={imagem+'estrutura/fachada.jpg'} alt="Campus" style={{borderRadius:'10px'}} class="img-fluid"/>

              <div class="mission-vision" data-aos="fade-up" data-aos-delay="400">
                <div class="mission">
                  <h3>Nossa Missão</h3>
                  <p>Ser reconhecida como espaço de acolhimento, fraternidade, serviço a comunidade, ética, aberta a todos, reconhecer que somos todos aprendizes no processo conhecimento espiritual evolutivo.</p>
                </div>

                <div class="vision">
                  <h3>Nossa Visão</h3>
                  <p>A Associação Espírita Fraternidade Kardecista existe para promover o despertar espiritual e a transformação moral, oferecendo à comunidade um espaço de fraternidade, estudo, oração, orientação e prática da caridade, tendo como fundamento os ensinamentos de Jesus e os princípios da Doutrina Espírita.</p>
                </div>

                {/* <div class="vision">
                  <h3>Nossos Valores</h3>
                  <p>Fundamenta sua atuação nos seguintes valores; - amor, caridade, fraternidade, humildade, responsabilidade respeito, serviço ao próximo. Em síntese nossos valores são o Amor que acolhe, a Caridade que serve, a Fraternidade que une e o Evangelho que transforma.</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-12">
            <div class="core-values" data-aos="fade-up" data-aos-delay="500">
              <h3 class="text-center mb-4">Princípios e Valores</h3>
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-bag-heart-fill"></i>
                    </div>
                    <h4> Amor, Caridade, Fraternidade</h4>
                    <p style={{textAlign:'left'}}><b>Amor:</b> O sentimento maior que resume os ensinamentos de Jesus;<br/> <b>Caridade</b>: A prática do bem ao próximo sem condições.<br/><b>Fraternidade</b>: A convivência harmoniosa e o respeito mútuo como irmãos. </p>
                  </div>
                </div>

                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-universal-access"></i>
                    </div>
                    <h4>Humildade</h4>
                    <p>É a virtude essencial que representa a consciência real do ser perante o Criador e o Universo, rompendo com as ilusões do orgulho e da vaidade.</p>
                  </div>
                </div>

                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-bluesky"></i>
                    </div>
                    <h4>Responsabilidade Respeito</h4>
                    <p> A convivência exige aceitação das diferenças, empatia e autorrespeito, pilares essenciais na prática da caridade e da mediunidade com ética</p>
                  </div>
                </div>

                <div class="col">
                  <div class="value-card">
                    <div class="value-icon">
                      <i class="bi bi-people"></i>
                    </div>
                    <h4>Serviço ao Próximo</h4>
                    <p>Cada participante ou trabalhador responde pelos conhecimentos adquiridos e pelos compromissos assumidos com o Evangelho e com o progresso coletivo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    <Carrosel/>
    </section>

    </>


  )
}
export default SectionOurStory
