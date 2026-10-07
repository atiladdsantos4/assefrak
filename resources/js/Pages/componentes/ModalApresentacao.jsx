import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge } from '@coreui/react'
import CarroselApresentacao from './CarroselApresentacao'

const ModalApresentacao = (props) => {
  const pathlink="https://www.youtube.com/embed/"
  //RRDPRJd1SWI
  const { open, close, lista, pathexibe, efeito } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CModal
        fullscreen
        size="xl"
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>Slide de Apresentação</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CarroselApresentacao pathexibe={pathexibe} lista={lista} efeito={efeito}/>
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

export default ModalApresentacao
