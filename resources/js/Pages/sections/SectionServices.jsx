import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionServices = (props) => {
  const {tela} = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  useEffect(() => {
     console.log('largura_service'+tela)
     let obj = null
     if(tela < 700){
        obj = document.getElementById('btn-service-contact')
        obj.href="https://api.whatsapp.com/send/?phone=+5571987507658&text=Quero mais infomações&type=phone_number&app_absent=0"
     } else {
        obj = document.getElementById('btn-service-contact')
        obj.href="https://web.whatsapp.com/send?phone=+5571987507658&text=Olá"
         obj.target="_blank"
     }
  },[tela])

  return (
    <section id="services" class="services section">

      {/* <!-- Section Title --> */}
      <div class="container section-title" data-aos="fade-up">
        <h2>Serviços</h2>
        <p>Lista de serviços oferecidos a população</p>
      </div>
      {/* <!-- End Section Title --> */}

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row g-4">
          <div class="col-lg-8">
            <div class="row g-4">
              <div class="col-md-6" data-aos="fade-right" data-aos-delay="150">
                <div class="service-card highlighted">
                  <div class="card-badge" style={{backgroundColor:'#6895C1'}}>Popular</div>
                  <div class="card-header">
                    <div class="icon-circle">
                      <i class="bi bi-brush"></i>
                    </div>
                    <span class="service-num">01</span>
                  </div>
                  <div class="card-body">
                    <h4><a href="service-details.html">Passe Espiritual</a></h4>
                    <p>Ocorre a troca de fluidos benéficos que ajudam a substituir energias cansadas ou doentes. Conta com a ajuda de benfeitores espirituais que direcionam as vibrações de paz e saúde. É recebido em silêncio e com pensamentos elevados.</p>
                    <ul class="feature-list">
                      <li><i class="bi bi-check2"></i> Cura da Alma</li>
                      <li><i class="bi bi-check2"></i> Busca da Paz</li>
                    </ul>
                  </div>
                  <a href="service-details.html" class="card-link">
                    <span>Saiba mais</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
              {/* <!-- End Service Card --> */}

              <div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
                <div class="service-card">
                  <div class="card-header">
                    <div class="icon-circle">
                      <i class="bi bi-window-desktop"></i>
                    </div>
                    <span class="service-num">02</span>
                  </div>
                  <div class="card-body">
                    <h4><a href="service-details.html">Passe Magnético</a></h4>
                    <p>O passe magnético espírita é uma imposição de mãos que transmite energias vitais e espirituais para reequilibrar o corpo e a mente. O médium atua como um canal de doação de fluidos, contando com o auxílio de benfeitores do plano espiritual para promover bem-estar e paz interior</p>
                    <ul class="feature-list">
                      <li><i class="bi bi-check2"></i> Desmagnetização</li>
                      <li><i class="bi bi-check2"></i> Reequilíbrio</li>
                    </ul>
                  </div>
                  <a href="service-details.html" class="card-link">
                    <span>Saiba mais</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
              {/* <!-- End Service Card --> */}

              <div class="col-md-6" data-aos="fade-right" data-aos-delay="250">
                <div class="service-card">
                  <div class="card-header">
                    <div class="icon-circle">
                      <i class="bi bi-terminal"></i>
                    </div>
                    <span class="service-num">03</span>
                  </div>
                  <div class="card-body">
                    <h4><a href="service-details.html">Tratamento Espiritual</a></h4>
                    <p>O tratamento espiritual kardecista, ou assistência espiritual, é um conjunto de práticas gratuitas e sem rituais exteriores realizadas em centros espíritas. Ele utiliza o passe espiritual (imposição de mãos), a água fluidificada e o atendimento fraterno para reequilibrar as energias, sem nunca substituir o tratamento médico material.</p>
                    <ul class="feature-list">
                      <li><i class="bi bi-check2"></i> Assistência</li>
                      <li><i class="bi bi-check2"></i> Práticas</li>
                    </ul>
                  </div>
                  <a href="service-details.html" class="card-link">
                    <span>Saiba mais</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
              {/* <!-- End Service Card --> */}

              <div class="col-md-6" data-aos="fade-left" data-aos-delay="300">
                <div class="service-card">
                  <div class="card-header">
                    <div class="icon-circle">
                      <i class="bi bi-phone-flip"></i>
                    </div>
                    <span class="service-num">04</span>
                  </div>
                  <div class="card-body">
                    <h4><a href="service-details.html">Palestras Doutrinárias</a></h4>
                    <p>O objetivo principal das palestras doutrinárias em um centro espírita é esclarecer, consolar e orientar os participantes à luz da Doutrina Espírita e do Evangelho de Jesus, promovendo o autoconhecimento, a reforma íntima e a evolução moral.</p>
                    <ul class="feature-list">
                      <li><i class="bi bi-check2"></i> Conhecimento</li>
                      <li><i class="bi bi-check2"></i> Evolução</li>
                    </ul>
                  </div>
                  <a href="service-details.html" class="card-link">
                    <span>Saiba mais</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
              {/* <!-- End Service Card --> */}
            </div>
          </div>

          <div class="col-lg-4">
            <div class="services-sidebar" data-aos="fade-up" data-aos-delay="350">
              <div class="sidebar-service-item">
                <div class="sidebar-icon">
                  <i class="bi bi-graph-up-arrow"></i>
                </div>
                <div class="sidebar-content">
                  <span class="sidebar-num">05</span>
                  <h5><a href="service-details.html">Atendimento Fraterno</a></h5>
                  <p>Conversa inicial de acolhimento e orientação para entender as necessidades da pessoa.</p>
                </div>
              </div>
              {/* <!-- End Sidebar Service --> */}

              <div class="sidebar-service-item">
                <div class="sidebar-icon">
                  <i class="bi bi-bar-chart-line"></i>
                </div>
                <div class="sidebar-content">
                  <span class="sidebar-num">06</span>
                  <h5><a href="service-details.html">Estudos Sistematizados</a></h5>
                  <p>Grupos para leitura e aprendizado progressivo de O Livro dos Espíritos e O Evangelho segundo o Espiritismo</p>
                </div>
              </div>
              {/* <!-- End Sidebar Service --> */}

              <div class="sidebar-cta">
                <div class="cta-inner">
                  <i class="bi bi-chat-heart"></i>
                  <h4>Solicitação de Preces</h4>
                  <p>Compartilhe Conosco as suas necessidades da alma</p>
                  <a href="#" id="btn-service-contact" class="cta-button">
                    Solicitar
                    <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>


  )
}
export default SectionServices
