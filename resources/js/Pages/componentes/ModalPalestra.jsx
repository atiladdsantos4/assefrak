import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge } from '@coreui/react'

const ModalPalestra = (props) => {
  const pathlink="https://www.youtube.com/embed/"
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  //RRDPRJd1SWI
  const { open, close, image, video } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CModal
        size="lg"
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>Folder Palestra</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="container" data-aos="fade-up" data-aos-delay="100">
                <div id="programacao" class="about-wrapper mt-5">
                    <div class="info-panel" data-aos="fade-up" data-aos-delay="300">
                        <div class="panel-header">
                            <span class="tagline">Imagem Palestra</span>
                        </div>
                        <CRow>
                           <CCol md={12} xs={12} style={{textAlign:'center'}}>
                               <img className="img-fluid" src={imagem + image}/>
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

export default ModalPalestra
