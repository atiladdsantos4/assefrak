import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionWhyUs = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
     <section id="why-us" class="why-us section">

      {/* <!-- Section Title --> */}
      <div class="container section-title" data-aos="fade-up">
        <h2>Por que Nós</h2>
        <p>Sempre buscamos atingir a nossa excelência na forma de atender e acolher pessoas com necessidades da alma lembrando que cada pessoa é única</p>
      </div>
      {/* <!-- End Section Title --> */}

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row align-items-center mb-5">
          <div class="col-lg-5" data-aos="fade-right" data-aos-delay="150">
            <div class="intro-content">
              <h3>Descubra o que nos diferencia</h3>
              <p class="intro-text">Possuímos uma equipe extremanente empenhada e preparada em lhe atender e oferecer todo acolhimento necessário a busca do seu reequilíbrio pessoal espiritual</p>
              <div class="stats-row">
                <div class="stat-item">
                  <span class="stat-value purecounter" data-purecounter-start="0" data-purecounter-end="98" data-purecounter-duration="2">98</span>
                  <span class="stat-unit">%</span>
                  <span class="stat-desc">Sucesso nos tratamentos</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value purecounter" data-purecounter-start="0" data-purecounter-end="50" data-purecounter-duration="2">150</span>
                  <span class="stat-unit">+</span>
                  <span class="stat-desc">Projetos</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-7" data-aos="fade-left" data-aos-delay="200">
            <div class="features-grid">
              <div class="grid-item">
                <div class="grid-icon">
                  <i class="bi bi-lightbulb-fill"></i>
                </div>
                <div class="grid-content">
                  <h5>Esclarecimento Racional</h5>
                  <p>
                    <ul>
                      <li>Explicar os princípios básicos da Doutrina Espírita.</li>
                      <li>Abordar os aspectos científicos, filosóficos e religiosos.</li>
                      <li>Basear os temas nas obras da codificação de Allan Kardec.</li>
                      <li>Unir a fé com a lógica e a razão</li>
                    </ul>
                  </p>
                </div>
              </div>
              {/* <!-- End Grid Item --> */}

              <div class="grid-item">
                <div class="grid-icon">
                  <i class="bi bi-person-hearts"></i>
                </div>
                <div class="grid-content">
                  <h5>Consolo e Paz</h5>
                  <p>
                    <ul>
                      <li>Oferecer alívio para as dores e aflições da vida diária.</li>
                      <li>Fortalecer a esperança e a resiliência por meio da visão da imortalidade da alma.</li>
                      <li>Fortalecer a esperança e a resiliência por meio da visão da imortalidade da alma.</li>
                    </ul>
                  </p>
                </div>
              </div>
              {/* <!-- End Grid Item --> */}

              <div class="grid-item">
                <div class="grid-icon">
                  <i class="bi bi-universal-access-circle"></i>
                </div>
                <div class="grid-content">
                  <h5>Transformação Moral</h5>
                  <p>
                    <ul>
                      <li>Estimular o estudo dos ensinamentos morais de Jesus.</li>
                      <li>Incentivar o autoconhecimento e a melhoria dos próprios pensamentos e ações.</li>
                      <li>Promover a prática da caridade e da fraternidade no dia a dia.</li>
                    </ul>
                  </p>
                </div>
              </div>
              {/* <!-- End Grid Item --> */}

              <div class="grid-item">
                <div class="grid-icon">
                  <i class="bi bi-magic"></i>
                </div>
                <div class="grid-content">
                  <h5>Estudo e razão</h5>
                  <p>
                    <ul>
                      <li>Entender o mundo espiritual e as leis divinas através da lógica, sem dogmas cegos.</li>
                      <li> Viver os ensinamentos morais de Jesus na sua forma mais simples de amor ao próximo</li>
                    </ul>
                  </p>
                </div>
              </div>
              {/* <!-- End Grid Item --> */}
            </div>
          </div>
        </div>

        {/* <div class="highlight-cards">
          <div class="row g-4">
            <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="100">
              <div class="highlight-card">
                <div class="card-header">
                  <i class="bi bi-palette2"></i>
                  <span class="card-badge">Design</span>
                </div>
                <h4>Creative Excellence</h4>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.</p>
                <a href="#" class="card-link">Explore More <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>

            <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
              <div class="highlight-card featured">
                <div class="card-header">
                  <i class="bi bi-bar-chart-line-fill"></i>
                  <span class="card-badge">Growth</span>
                </div>
                <h4>Measurable Results</h4>
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia.</p>
                <a href="#" class="card-link">Explore More <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>

            <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="300">
              <div class="highlight-card">
                <div class="card-header">
                  <i class="bi bi-people-fill"></i>
                  <span class="card-badge">Team</span>
                </div>
                <h4>Skilled Professionals</h4>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</p>
                <a href="#" class="card-link">Explore More <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>

          </div>
        </div> */}

        {/* <div class="row mt-5 pt-4">
          <div class="col-lg-8 offset-lg-2" data-aos="fade-up" data-aos-delay="100">
            <div class="cta-banner">
              <div class="cta-content">
                <h3>Ready to Transform Your Vision?</h3>
                <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
              </div>
              <div class="cta-actions">
                <a href="#" class="btn-cta-primary">Launch Your Project</a>
                <a href="#" class="btn-cta-secondary">Browse Work</a>
              </div>
            </div>
          </div>
        </div> */}

      </div>

    </section>

  )
}
export default SectionWhyUs
