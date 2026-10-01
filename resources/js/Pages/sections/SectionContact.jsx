import { React, useEffect, useState, Suspense, useRef } from 'react';
import {
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CCard,
    CCardBody,
    CCardHeader,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CPagination,
    CPaginationItem,
    CCardText,
    CButton,
    CSpinner,
    CFormSelect,
    CBadge,
    CRow,
    CCol,
    CPlaceholder,
    CFormCheck,
    CToaster,
    CToast,
    CToastBody,
    CToastClose,
    CForm,
    CAlert 
} from '@coreui/react'
import axios from 'axios';


// The Main component receives props passed from the Laravel controller
const SectionContact = (props) => {
  const { path }= props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [nome,setNome] = useState('')
  const [email,setEmail] = useState('')
  const [assunto,setAssunto] = useState('')
  const [conteudo,setConteudo] = useState('')
  const [loademail, setLoademail] = useState(false)
  const [validated, setValidated] = useState(false)
  const [showAlert,setShowAlert ] = useState(false)
  const [textAlert,settextAlert] = useState(false)
  


  const handleSubmit = (event) => {
       console.log('submit')
       const form = event.currentTarget
       let erro = false
       if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            erro = true
       }
       event.preventDefault()
       setValidated(true)
       if(erro == false){
          EnviaEmail()
          //EnviaInscricao(event,erro)
          // let valor = CriaJsonItens()
          // console.log(valor)
       }
  }

  const EnviaEmail = () =>{
    setLoademail(true)
    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('email', email)//atiladdsantos4@gmail.com
    formData.append('assunto', assunto)
    formData.append('conteudo', conteudo)
    formData.append('contato', 'S')
    axios
      .post(`${endpoint}/email`, formData, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
        },
    })
    .then((result) => {
        setLoademail(false)
        settextAlert('Email Enviado com Sucesso!!!')
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            setValidated(false)
        }, 2000)
    })

 }

  return (
      <section id="contact" className="contact section">

      {/*<!-- Section Title -->*/}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contato</h2>
        <p>Abaixo informações sobre como comunicar-se consoco</p>
      </div>{/*<!-- End Section Title -->*/}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-5">
          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="150">
            <div className="main-contact-wrapper">
              <div className="row gy-4">
                <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
                  <div className="info-box">
                    <div className="icon-wrap">
                      <i className="bi bi-envelope-heart"></i>
                    </div>
                    <h5>Mande-nos uma mensagem</h5>
                    <p>assefrak@hotmail.com</p>
                    <span className="availability">Resposta Rápida</span>
                  </div>
                </div>

                <div className="col-md-4" data-aos="zoom-in" data-aos-delay="250">
                  <div className="info-box">
                    <div className="icon-wrap">
                      <i className="bi bi-phone-vibrate"></i>
                    </div>
                    <h5>Fale Conosco</h5>
                    <p>+55 71 98750-7658</p>
                    <span className="availability">Seg-Sex 8:00 - 19:30</span>
                  </div>
                </div>

                <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
                  <div className="info-box">
                    <div className="icon-wrap">
                      <i className="bi bi-pin-map"></i>
                    </div>
                    <h5>Local</h5>
                    <p>Rua da Ambrósia, 183, 2 de Julho Próximo a Arena 2 de Julho</p>
                    <span className="availability">Atendimento sem Hora Marcada</span>
                  </div>
                </div>
              </div>

              <div className="form-section" data-aos="fade-up" data-aos-delay="350">
                <div className="form-intro">
                  <h3>Compartilhe conosco sua a sua visão sobre nós</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
                </div>
                <CAlert color="info" visible={showAlert} variant="solid">{textAlert}</CAlert>
                <CForm className="row g-3 needs-validation php-email-form" noValidate  id="form-contato" onSubmit={handleSubmit} validated={validated}>
                  <div className="row gy-3">
                    <div className="col-md-4">
                      <div className="input-group-custom">
                        <i className="bi bi-person"></i>
                        <input
                           type="text"
                           name="nome"
                           className="form-control"
                           placeholder="Nome Completo"
                           value={nome}
                           onChange={(e) => setNome(e.target.value)}
                           required/>
                           <div class="invalid-feedback" id="button-addon1">O Nome Precisa Preenchido</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-group-custom">
                        <i className="bi bi-envelope"></i>
                        <input 
                           type="email" 
                           name="email" 
                           className="form-control" 
                           placeholder="Endereço de Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)} 
                           required/>
                           <div class="invalid-feedback" id="button-addon1">O Email Precisa Preenchido</div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="input-group-custom">
                        <i className="bi bi-tag"></i>
                        <input type="text" 
                               name="subject" 
                               value={assunto} 
                               className="form-control" 
                               placeholder="Assunto" 
                               onChange={(e) => setAssunto(e.target.value)} 
                        required/>
                        <div class="invalid-feedback" id="button-addon1">O Assunto Precisa Preenchido</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-group-custom textarea-group">
                        <i className="bi bi-chat-text"></i>
                        <textarea 
                           name="message" 
                           className="form-control" 
                           rows="5" 
                           placeholder="Detalhes da sua descrição..."
                           onChange={(e) => setConteudo(e.target.value)}  
                           required>{conteudo}</textarea>
                        <div class="invalid-feedback" id="button-addon1">O Conteúdo da Mensagem Precisa Preenchido</div>
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <div className="form-messages">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <button type="buton" className="btn-submit">
                      <i className="bi bi-rocket-takeoff"></i>
                      <span>
                        Enviar Mensagem
                        &nbsp;
                        {loademail ? (<CSpinner size="sm" />) : (<></>)}
                       </span>
                    </button>
                  </div>
                </CForm>
              </div>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="200">
            <div className="sidebar-panel">
              <div className="panel-header">
                <div className="header-badge">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <h4>Quer ser nosso voluntário?</h4>
              </div>

              <div className="metrics-grid">
                <div className="metric-item" data-aos="fade-up" data-aos-delay="250">
                  <div className="metric-value">12h</div>
                  <div className="metric-desc">Tempo de Resposta</div>
                </div>
                <div className="metric-item" data-aos="fade-up" data-aos-delay="300">
                  <div className="metric-value">98%</div>
                  <div className="metric-desc">Acolhidos Satisfeitos</div>
                </div>
                <div className="metric-item" data-aos="fade-up" data-aos-delay="350">
                  <div className="metric-value">100+</div>
                  <div className="metric-desc">Projetos Finalizados</div>
                </div>
                <div className="metric-item" data-aos="fade-up" data-aos-delay="400">
                  <div className="metric-value">44+</div>
                  <div className="metric-desc">Anos de Experiência</div>
                </div>
              </div>

              <div className="testimonial-mini" data-aos="fade-up" data-aos-delay="450">
                <div className="quote-icon">
                  <i className="bi bi-quote"></i>
                </div>
                <p>Toda planta que meu pai não plantou será arrancada pela raíz<br/><i style={{fontSize:'11px'}}>Mateus 26:47 a 56</i></p>

                <div className="client-info">
                  <img src={path+'person/tida.png'} alt="Client" className="client-avatar"/>
                  <div className="client-details">
                    <span className="client-name">Endnelza Lima( Tida )</span>
                    <span className="client-role">Presidenta Assefrak</span>
                  </div>
                </div>
              </div>

              <div className="social-bar" data-aos="fade-up" data-aos-delay="500">
                <span className="social-label">Siga nossa jornada</span>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                  <a target="_blank" href="https://www.instagram.com/assefrak?igsh=MW94NDAzOXYyMGtvdA==" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                  <a href="#" aria-label="Dribbble"><i className="bi bi-dribbble"></i></a>
                  <a href="#" aria-label="Behance"><i className="bi bi-behance"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}
export default SectionContact
