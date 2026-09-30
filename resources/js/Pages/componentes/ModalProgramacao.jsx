import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

const ModalProgramacao = (props) => {

  const { open, close, imagem } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CModal
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}><FontAwesomeIcon size="lg" icon={faHandHoldingHeart} />&nbsp;Nosssa Programação</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div class="container" data-aos="fade-up" data-aos-delay="100">
                 <img src={imagem+'programacao.jpeg'} style={{borderRadius:'15px'}} class="img-fluid" alt="" loading="lazy"></img>
                <div id="programacao" class="about-wrapper mt-5">
                    {/* <div class="info-panel" data-aos="fade-up" data-aos-delay="300">
                        <div class="panel-header">
                            <span class="tagline">TERÇA - FEIRA</span>
                        </div>
                        <CRow>
                           <CCol md={9} xs={8}>
                               <h3>
                                  <CBadge className="badgeazul" color="primary">Passes</CBadge>
                               </h3>
                           </CCol>
                           <CCol md={3} xs={2} style={{alignItems:'center'}}>
                               <h3>
                                  <CBadge className="secondary" color="secondary">18 horas</CBadge>
                               </h3>
                           </CCol>
                        </CRow>
                        <CRow>
                           <CCol md={6} xs={5}>
                               <h3>
                                  <CBadge className="badgeazul" color="primary">Palestra</CBadge>
                               </h3>
                           </CCol>
                           <CCol md={6} xs={6} className='mb-3'>
                               <h3>
                                  <CBadge color="secondary">19:30 às 20:30 horas</CBadge>
                               </h3>
                           </CCol>
                        </CRow>
                        <div class="panel-header">
                            <span class="tagline">domingo</span>
                        </div>
                        <CRow>
                           <CCol md={9} xs={8}>
                               <h3>
                                  <CBadge className="badgeazul" color="primary">Atendimento Fraterno <br/>/ Passes</CBadge>
                               </h3>
                           </CCol>
                           <CCol md={3} xs={3} style={{alignItems:'center'}}>
                               <h3>
                                  <CBadge className="secondary" color="secondary">08 horas</CBadge>
                               </h3>
                           </CCol>
                        </CRow>
                        <CRow>
                           <CCol md={6} xs={5}>
                               <h3>
                                  <CBadge className="badgeazul" color="primary">Palestra</CBadge>
                               </h3>
                           </CCol>
                           <CCol md={6} xs={4}>
                               <h3>
                                  <CBadge color="secondary">09:15 às 10:15 horas</CBadge>
                               </h3>
                           </CCol>
                        </CRow>
                        <CRow className='mt-3'>
                           <CCol md={12} style={{textAlign:'center'}}>
                              <h4>
                                <CBadge className="badgeazul" color="primary" shape="rounded-pill">
                                    @assefrak
                                </CBadge>
                              </h4>
                            </CCol>
                        </CRow>
                    </div> */}
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

export default ModalProgramacao
