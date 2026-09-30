import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge } from '@coreui/react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';
// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


const ModalEventos = (props) => {

  const {titulo,idevento,lista} = props
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const { open, close } = props
  const [load, setLoad] = useState(false)
  const [titulomodal, setTitulomodal] = useState(titulo)
  const [listaitem,setListaitem] = useState([])

  useEffect(()=>{
      setListaitem(lista)
      setTitulomodal(titulo)
      setLoad(false)
   },[titulo])

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const Carrosel = (props,lista) =>{
    return (
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {
          props.lista.map((item,index)=>{
            return(<SwiperSlide><img className="img_evento" src={imagem + item.path}/></SwiperSlide>)
          })
        }
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    );
  }

  return (
    <>
      <CModal
        size="lg"
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
             <FontAwesomeIcon icon={faTicket}/>&nbsp;Detalhes do Evento:&nbsp;{titulomodal}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="container" data-aos="fade-up" data-aos-delay="100">
                <div id="programacao" class="about-wrapper mt-5">
                    <div class="info-panel" data-aos="fade-up" data-aos-delay="300">
                        <div class="panel-header">
                            <span class="tagline">Imagens do Evento</span>
                        </div>
                        <CRow style={{height:'400px'}}>
                           <CCol md={12} xs={12}>
                               {props.lista.length > 0
                               ? (<Carrosel lista={lista}/>)
                               :(<></>)}
                           </CCol>
                        </CRow>
                    </div>
                </div>
            </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close()}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalEventos
