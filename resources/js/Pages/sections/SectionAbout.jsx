import { React,useEffect, useState } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionAbout = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const [screen,setScreen] = useState(null)

  return (
    <section id="about" class="about section">

      {/* <!-- Section Title --> */}
      <div class="container section-title" data-aos="fade-up">
        <h2>Sobre Nós</h2>
        <p>Centro Espírita localizado em Camaçari</p>
      </div>
      {/* <!-- End Section Title --> */}

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="about-wrapper">

          <div class="image-gallery" data-aos="zoom-in" data-aos-delay="200">
            <div class="gallery-grid">
              <div class="gallery-item main-image">
                <img src={imagem+'about/posse01.png'} alt="Professional team collaboration" class="img-fluid" loading="lazy"></img>
              </div>
              <div class="gallery-item side-image">
                <img src={imagem+'about/posse.png'} alt="Creative workspace environment" class="img-fluid" loading="lazy"></img>
              </div>
            </div>
            <div class="experience-badge">
              <div class="badge-inner">
                <span class="number">44+</span>
                <span class="label">Anos de Atividade</span>
              </div>
            </div>
          </div>

          <div class="info-panel" data-aos="fade-up" data-aos-delay="300">

            <div class="panel-header">
              <span class="tagline">Quem Somos Nós</span>
              <h2>Associação Espírita Fraternidade Karcedista de Camaçari</h2>
            </div>

            <p class="description">
              <span class="tagline">Visão</span><br/>
              A Associação Espírita Fraternidade Kardecista existe para promover o despertar espiritual e a transformação moral, oferecendo à comunidade um espaço de fraternidade, estudo, oração, orientação e prática da caridade, tendo como fundamento os ensinamentos de Jesus e os princípios da Doutrina Espírita.<br/>
              <span class="tagline">Missão</span><br/>
              Ser reconhecida como espaço de acolhimento, fraternidade, serviço a comunidade, ética, aberta a todos, reconhecer que somos todos aprendizes  no processo conhecimento espiritual evolutivo.<br/>
              <span class="tagline">Valores</span><br/>
              Fundamenta sua atuação nos seguintes valores; - amor, caridade, fraternidade, humildade, responsabilidade respeito, serviço ao próximo. Em síntese nossos valores são o Amor que acolhe, a Caridade que serve, a Fraternidade que une e o Evangelho que transforma.
            </p>

            <div class="highlights-row">
              <div class="highlight-box" data-aos="fade-up" data-aos-delay="350">
                <div class="icon-wrap">
                  <i class="bi bi-lightbulb"></i>
                </div>
                <div class="highlight-content">
                  <h4>Estratégia Criativa</h4>
                  <p>Une a fidelidade à Doutrina de Allan Kardec com a inovação na comunicação, na Agenda Espírita Brasil e na empatia no acolhimento. O objetivo é renovar a forma de transmitir o Consolador Prometido, tornando o espaço mais atraente, claro e participativo para a comunidade e os frequentadores.</p>
                </div>
              </div>
              <div class="highlight-box" data-aos="fade-up" data-aos-delay="400">
               <div class="icon-wrap">
                  <i class="bi bi-graph-up-arrow"></i>
                </div>
                <div class="highlight-content">
                  <h4>Foco no Crescimento Espiritual</h4>
                  <p>Baseia-se na reforma íntima, no estudo da Doutrina e na prática do bem. O processo exige autoconhecimento, superação do egoísmo e caridade ao próximo, utilizando o centro como um hospital de almas e escola de aprendizado moral para a evolução do espírito.</p>
                </div>
              </div>
            </div>

            <div class="stats-row" data-aos="fade-up" data-aos-delay="450">
              <div class="stat-block">
                <h3>50+</h3>
                <span>Projetos</span>
              </div>
              <div class="stat-block">
                <h3>98%</h3>
                <span>Satisfação de Acolhidos</span>
              </div>
              <div class="stat-block">
                <h3>45+</h3>
                <span>Membros Participantes</span>
              </div>
            </div>

            <a href="#" class="cta-button">Leia mais sobre nós <i class="bi bi-arrow-right"></i></a>

          </div>

        </div>

      </div>

    </section>

  )
}
export default SectionAbout
