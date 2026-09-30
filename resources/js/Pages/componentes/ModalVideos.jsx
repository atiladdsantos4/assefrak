import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge } from '@coreui/react'

const ModalVideos = (props) => {
  const pathlink="https://www.youtube.com/embed/"
  //RRDPRJd1SWI
  const { open, close, imagem, video } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CModal
        size="xl"
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>Vídeo Preces</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="container" data-aos="fade-up" data-aos-delay="100">
                 <img src={imagem+'cabecalho_programacao.png'} style={{borderRadius:'15px'}} class="img-fluid" alt="" loading="lazy"></img>
                <div id="programacao" class="about-wrapper mt-5">
                    <div class="info-panel" data-aos="fade-up" data-aos-delay="300">
                        <div class="panel-header">
                            <span class="tagline">Vídeo</span>
                        </div>
                        <CRow>
                           <CCol md={12} xs={12}>
                               <iframe style={{width:'100%',height:'500px'}} height="315" src={pathlink+video+'?autoplay=1'}>
                               </iframe>
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

export default ModalVideos
