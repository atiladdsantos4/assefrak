import { React,useEffect, useState } from 'react';
import axios from 'axios';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionTeam = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [listaequipe,setListaequipe] = useState([])


  const lista =[//para teste de renderizacao
    {nome:'Diego Rafael', ocupacao:'Palestrante', image:imagem+'person/diego.png'},
    {nome:'Andra Tatiana', ocupacao:'Palestrante', image:imagem+'person/andra.png'},
    {nome:'Vitor Duarte', ocupacao:'Palestrante', image:imagem+'person/vitor.png'},
    {nome:'Tiana Magalhães', ocupacao:'Palestrante', image:imagem+'person/tiana.png'},
    {nome:'Renato Argolo', ocupacao:'Palestrante', image:imagem+'person/renato.png'},
    {nome:'Thomas Almeida', ocupacao:'Palestrante', image:imagem+'person/thomas.png'},
    {nome:'Sara Andrade', ocupacao:'Palestrante', image:imagem+'person/sara.png'},
    {nome:'João Vinícios', ocupacao:'Palestrante', image:imagem+'person/joao.png'},
    {nome:'Andreia Gontijo', ocupacao:'Palestrante', image:imagem+'person/andreia.png'},
    {nome:'Ednelza Lima(Tida)', ocupacao:'Palestrante', image:imagem+'person/tida.png'},
    {nome:'Lecilda Araújo', ocupacao:'Palestrante', image:imagem+'person/lecilda.png'}
  ]

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
     axios.get(`${endpoint}/colaborador?listagem=S`,{
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'multipart/form-data',
                 Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
             },
    })
    .then((result) => {
        let listax = result.data.data.sort((a,b)=>a.col_name > b.col_name)
        let objmeta =  null
        listax.map((item,index)=>{
           objmeta = JSON.parse(item.col_imagem)
           item.imagem= objmeta["meta"][0].path //--> cria em tempo de execução <--//
           //console.log('sequencia:'+objmeta["meta"][0].id + 'path:' + objmeta["meta"][0].path)
        })
        setListaequipe(listax)
    })
    let vetor = lista.sort((a,b)=>a.nome > b.nome)
  },[])


  return (
   <section id="team" class="team section">

      <div class="container section-title" data-aos="fade-up">
        <h2>Equipe Assefrak</h2>
        <p>Logo abaixo profissionais que contribuem para a qualidade de infomação e andamento de nossa instituição</p>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row g-4 justify-content-center">

          {
            listaequipe.map((item,index)=>{
               return(
                  <div key={index} class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="100">
                    <div class="team-card">
                    <div class="card-inner">
                        <div class="avatar-container">
                        <img src={imagem + item.imagem} alt="Team member" class="img-fluid"></img>
                        <div class="avatar-ring"></div>
                        </div>
                        <div class="member-info">
                        <h4>{item.col_name}</h4>
                        <span class="position">{item.col_desc_ocupacao}</span>
                        </div>
                        <p class="member-bio">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.</p>
                        <div class="social-links">
                        <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                        <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                        <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
               )
            })
          }
          {/* <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="100">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/diego.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Diego Rafael</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.</p>
                <div class="social-links">
                  <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                  <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="150">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/andra.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Andra Tatiana</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/vitor.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Vitor Duarte</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Duis aute irure dolor reprehenderit voluptate velit esse cillum dolore fugiat.</p>
                <div class="social-links">
                  <a href="#" aria-label="Dribbble"><i class="bi bi-dribbble"></i></a>
                  <a href="#" aria-label="Behance"><i class="bi bi-behance"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="250">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/tiana.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Tiana Magalhães</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt.</p>
                <div class="social-links">
                  <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                  <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="300">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/renato.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Renato Argolo</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
                <div class="social-links">
                  <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                  <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="350">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/thomas.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Thomas Almeida</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="Stack Overflow"><i class="bi bi-stack-overflow"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="350">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/sara.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Sara Andrade</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="Stack Overflow"><i class="bi bi-stack-overflow"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="350">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/joao.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>João Vinícios</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="Stack Overflow"><i class="bi bi-stack-overflow"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="350">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/andreia.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Andreia Gontijo</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="Stack Overflow"><i class="bi bi-stack-overflow"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="350">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/tida.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Ednelza Lima</h4>
                  <span class="position">Presidenta Asefrak</span>
                </div>
                <p class="member-bio">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="Stack Overflow"><i class="bi bi-stack-overflow"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="350">
            <div class="team-card">
              <div class="card-inner">
                <div class="avatar-container">
                  <img src={imagem+'person/lecilda.png'} alt="Team member" class="img-fluid"></img>
                  <div class="avatar-ring"></div>
                </div>
                <div class="member-info">
                  <h4>Lecilda Araújo</h4>
                  <span class="position">Palestrante</span>
                </div>
                <p class="member-bio">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit.</p>
                <div class="social-links">
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                  <a href="#" aria-label="Stack Overflow"><i class="bi bi-stack-overflow"></i></a>
                  <a href="#" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>
              </div>
            </div>
          </div> */}

        </div>

        <div class="stats-row" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-item">
            <div class="stat-icon">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-data">
              <span class="stat-value">85+</span>
              <span class="stat-label">Expert Team Members</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="bi bi-geo-alt"></i>
            </div>
            <div class="stat-data">
              <span class="stat-value">18</span>
              <span class="stat-label">Worldwide Offices</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="bi bi-award"></i>
            </div>
            <div class="stat-data">
              <span class="stat-value">40+</span>
              <span class="stat-label">Awards Received</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="bi bi-emoji-smile"></i>
            </div>
            <div class="stat-data">
              <span class="stat-value">96%</span>
              <span class="stat-label">Employee Happiness</span>
            </div>
          </div>
        </div>

        <div class="join-team-banner" data-aos="fade-up" data-aos-delay="250">
          <div class="banner-bg-pattern"></div>
          <div class="banner-content">
            <div class="banner-text">
              <span class="badge-label"><i class="bi bi-stars"></i> Join Our Team</span>
              <h3>Shape the Future With Us</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora.</p>
            </div>
            <div class="banner-actions">
              <a href="#" class="btn-primary-action">
                <span>View Open Positions</span>
                <i class="bi bi-arrow-right"></i>
              </a>
              <a href="#" class="btn-secondary-action">
                <i class="bi bi-camera-video"></i>
                <span>See Life at Company</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}
export default SectionTeam
