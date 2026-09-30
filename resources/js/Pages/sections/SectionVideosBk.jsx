import { React, useEffect, useState } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faVideo } from '@fortawesome/free-solid-svg-icons';
import ModalVideos from '../componentes/ModalVideos';
import axios from 'axios';

// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionVideos = (props) => {
 const { tela } = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const token  = import.meta.env.VITE_APP_TOKEN
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const exibe = props.exibe ? '' : 'naoexibe'
  const [openmodal, setOpenmodal] = useState(false)
  const [linkvideo, setLinkvideo] = useState('')
  const [listavideos,setListavideos]  = useState([])
  const [prece1, setPrece1] = useState(0)
  const [prece2, setPrece2] = useState(0)
  const [prece3, setPrece3] = useState(0)
  const [total, setTotal] = useState(0)
  


  useEffect(() => {
      //lista de videos//
      axios
       .get(`${endpoint}/video?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
          setListavideos(result.data.data)
       }) 
     //console.log('tela videos')
      setTimeout(() => {
        let tam1 = document.querySelectorAll('.faq-general').length
        let tam2 = document.querySelectorAll('.faq-billing').length
        let tam3 = document.querySelectorAll('.faq-technical').length
        setPrece1(tam1)
        setPrece2(tam2)
        setPrece3(tam3)
        let soma = tam1 + tam2 + tam3
        setTotal(soma)
        console.log('tam1:'+tam1)
        document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
            faqItem.addEventListener('click', () => {
               faqItem.parentNode.classList.toggle('faq-active');
            });
        });
      }, 2000)
  },[])

  const addEvento = (event) =>{
    console.log(event)
    console.log(event.target.parentNode)
    event.currentTarget.parentNode.classList.toggle('faq-active');
  }

  const closeModal = () =>{
     setOpenmodal(false)
  }

  const AbreVideo = (event,video) =>{
    setLinkvideo(video)
    setOpenmodal(true)
  }

  const ItemFaq = (props) =>{
    //const classe = props.active ? 'faq-item faq-active' : 'faq-item'
    return(
      <div className={props.classe} data-aos="zoom-in" data-aos-delay="250">
         <h3 id={props.id} className="faq-question" onClick={(e)=>addEvento(e)}>
             <span className="question-icon"><i className="bi bi-question-circle"></i></span>
             {props.texto}
             <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
         </h3>
         <div className="faq-answer">
             <p><CButton className="cl_button" size="sm" color='primary' onClick={(e)=>AbreVideo(e,props.hashvideo)}>Exibir&nbsp;<FontAwesomeIcon size="lg" icon={faVideo} /></CButton></p>
         </div>
      </div>
    )
  }

  return (
    <>
     <ModalVideos open={openmodal} video={linkvideo} close={closeModal}/>
     <section id="video" className={`faq section ${exibe}`}>

      {/* <!-- Section Title -->*/}
      <div className="container section-title" data-aos="fade-up">
        <h2>Vídeos Preces</h2>
        <p>Abaixo a lista de preces que possam atender aos seus propósitos</p>
      </div>{/* <!-- End Section Title -->*/}

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="faq-wrapper">
          <div className="faq-categories" data-aos="fade-right" data-aos-delay="150">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="category-card active" data-bs-toggle="tab" data-bs-target="#faq-general" type="button" role="tab" aria-selected="true">
                  <div className="category-icon">
                    <i className="bi bi-info-circle"></i>
                  </div>
                  <div className="category-info">
                    <h5>Preces Matinais</h5>
                    <span>{prece1}&nbsp;Videos</span>
                  </div>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="category-card" data-bs-toggle="tab" data-bs-target="#faq-billing" type="button" role="tab" aria-selected="false">
                  <div className="category-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>
                  <div className="category-info">
                    <h5>Acalmar a Mente</h5>
                    <span>{prece2}&nbsp;Videos</span>
                  </div>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="category-card" data-bs-toggle="tab" data-bs-target="#faq-technical" type="button" role="tab" aria-selected="false">
                  <div className="category-icon">
                    <i className="bi bi-gear"></i>
                  </div>
                  <div className="category-info">
                    <h5>Sustentação</h5>
                    <span>{prece3}&nbsp;Videos</span>
                  </div>
                </button>
              </li>
            </ul>
            <div className="help-box">
              <div className="help-icon">
                <i className="bi bi-headset"></i>
              </div>
              <h4>Ainda precisa de Ajuda?</h4>
              <p>Somos o Hospital de sua Alma</p>
              <a href="#contact" className="help-link">
                Fae Conosco
                <i className="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>

          <div className="faq-content-area" data-aos="fade-left" data-aos-delay="200">
            <div className="faq-header-info">
              <span className="questions-count">{total}&nbsp;Vídeos Publicados</span>
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search questions..."/>
              </div>
            </div>

            <div className="tab-content">
              {/* <!-- General Tab -->*/}
              <div className="tab-pane fade show active" id="faq-general" role="tabpanel">
                <div className="faq-list">
                  <ItemFaq
                     id="faq-general01"
                     classe="faq-item faq-general"
                     texto="Prece Espírita da Manhã. Comece seu dia com esta Poderosa Prece para iluminar seu dia."
                     hashvideo="RRDPRJd1SWI"
                  />
                  <ItemFaq
                     id="faq-general02"
                     classe="faq-item faq-general"
                     texto="A Prece Perfeita Para Começar o Dia com Energia Positiva! Prece Espírita Meditação Matinal."
                     hashvideo="BfJbXitOxjE"
                  />
                  <ItemFaq
                     id="faq-general03"
                     classe="faq-item faq-general"
                     texto="Prece Espírita da Manhã Allan Kardec. O Novo Dia Começa Com Luz: Prece da Manhã."
                     hashvideo="tb0dPn3P-4s"
                  />
                  {/* <div className="faq-item" data-aos="zoom-in" data-aos-delay="400">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Mauris blandit aliquet elit eget tincidunt nibh?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                    </div>
                  </div>

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="450">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Cras ultricies ligula sed magna dictum porta?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa.</p>
                    </div>
                  </div>*/}
                </div>
              </div>{/* <!-- End General Tab -->*/}

              {/* <!-- Billing Tab -->*/}
              <div className="tab-pane fade" id="faq-billing" role="tabpanel">
                <div className="faq-list">
                  <ItemFaq
                     id="faq-billing01"
                     classe="faq-item faq-billing"
                     texto="Prece Espírita Acalmar a Mente. Deixe a luz espiritual acalmar sua mente e restaurar sua paz."
                     hashvideo="kFckZLmiyIo"
                  />
                  <ItemFaq
                     id="faq-billing02"
                     classe="faq-item faq-billing"
                     texto="Prece Espirita - Allan Kardec - Anjos Guardioes e Espiritos Protetores."
                     hashvideo="E_ZPmjmRI2w"
                  />
                  <ItemFaq
                     id="faq-billing03"
                     classe="faq-item faq-billing"
                     texto="Oração Poderosa de Chico Xavier para Afastar Energias Negativas e Cultivar Paz e Equilíbrio."
                     hashvideo="bG3mpEkbkTk"
                  />
                  <ItemFaq
                     id="faq-billing04"
                     classe="faq-item faq-billing"
                     texto="Oração Chico Xavier.Confia Sempre."
                     hashvideo="Xhwy6kwPI9Y"
                  />
                  <ItemFaq
                     id="faq-billing05"
                     classe="faq-item faq-billing"
                     texto="Prece pelos Desencarnados."
                     hashvideo="zl8UVmjlOVE"
                  />
                </div>
              </div>{/* <!-- End Billing Tab -->*/}

              {/* <!-- Technical Tab -->*/}
              <div className="tab-pane fade" id="faq-technical" role="tabpanel">
                <div className="faq-list">
                  <ItemFaq
                     id="faq-technical01"
                     classe="faq-item faq-technical"
                     texto="Pelos espíritos endurecidos."
                     hashvideo="OD9JWckKvrc"
                  />
                  <ItemFaq
                     id="faq-technical02"
                     classe="faq-item faq-technical"
                     texto="Pelos nossos inimigos e pelos que nos querem mal."
                     hashvideo="uH0DqCqtDS4"
                  />
                  <ItemFaq
                     id="faq-technical03"
                     classe="faq-item faq-technical"
                     texto="Pelos obsidiados I."
                     hashvideo="FjxUHmCjMGE"
                  />
                  <ItemFaq
                     id="faq-technical04"
                     classe="faq-item faq-technical"
                     texto="Oração Poderosa para afastar espíritos obsessores | Chico Xavier."
                     hashvideo="j-UMEOtnPpk"
                  />
                </div>
              </div>{/* <!-- End Technical Tab -->*/}
            </div>
          </div>
        </div>

      </div>

    </section>
    </>
  )
}
export default SectionVideos
