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
  const [loadcat, setLoadcat] = useState(false)
  const [linkvideo, setLinkvideo] = useState('')
  const [listavideos,setListavideos]  = useState([])
  const [listagrupo,setListagrupo]  = useState([])
  const [listacatvideo,setListacatvideo]  = useState([])
  const [totalvideo,setTotalvideo]  = useState([])
  const [prece1, setPrece1] = useState(0)
  const [prece2, setPrece2] = useState(0)
  const [prece3, setPrece3] = useState(0)
  const [total, setTotal] = useState(0)
  


  useEffect(() => {
      //lista de videos//
      axios
       .get(`${endpoint}/categoriavideo?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
          let lista = result.data.data
          let listagrupo = result.data.data
          let total = listagrupo.reduce((accumulator, current) => accumulator + parseInt(current.cav_qtde_videos),0);
          setListagrupo(listagrupo)
          setTotalvideo(total)
       }) 
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

  const ativaEvento = (event,id) =>{
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

  const compVideo = (event,idcategoria) =>{
    setLoadcat(true)
    axios
       .get(`${endpoint}/video?listagem=S&categoria=${idcategoria}`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           console.log(result.data.data)
           setListacatvideo(result.data.data)
           setLoadcat(false)
       })
  }

  const Categoria = () =>{
    return( 
        <div className="tab-pane fade show active" id="#teste" role="tabpanel">
           <div className="faq-list">
            {
                listacatvideo.map((item,index)=>{
                    return(
                      <ItemFaq
                          id="faq-general01"
                          classe={'faq-item '+item.fid}
                          texto={item.vid_descricao}
                          hashvideo={item.vid_hash_link}
                      />    
                    )        
                })
            }
            </div>
        </div>    
     ) 
  }

  const ItemFaq = (props) =>{
    return(
      <div className={props.classe} data-aos="zoom-in" data-aos-delay="250">
         <h3 id={props.id} className="faq-question" onClick={(e)=>addEvento(e)}>
             <span className="question-icon"><i className="bi bi-flower1"></i></span>
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
              {
                listagrupo.map((item,index)=>{
                  return(
                    <li key={index} className="nav-item" role="presentation" onClick={(e)=>compVideo(e,item.cav_id_cav)}>
                        <button className="category-card" data-bs-toggle="tab" data-bs-target={'#'+item.id} type="button" role="tab" aria-selected="true">
                        <div className="category-icon">
                            <i className="bi bi-bullseye"></i>
                        </div>
                        <div className="category-info">
                            <h5>{item.cav_descricao}</h5>
                            <span>{item.cav_qtde_videos}&nbsp;Videos</span>
                        </div>
                        </button>
                    </li>
                  )  
                })
              }  
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
              <span className="questions-count">{totalvideo}&nbsp;Vídeos Publicados</span>
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search questions..."/>
              </div>
            </div>

            <div className="tab-content">
                {loadcat ? (<div style={{textAlign:'center'}}><CSpinner size="lg" color="info"/></div>) : (<Categoria/>)}
            </div>
          </div>
        </div>

      </div>

    </section>
    </>
  )
}
export default SectionVideos
