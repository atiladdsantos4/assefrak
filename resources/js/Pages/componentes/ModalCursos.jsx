import React, { useState,useEffect } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge } from '@coreui/react'
import SectionCursos from '../cadastros/SectionCursos'
import InscricaoCursos from '../cadastros/InscricaoCursos'

const ModalCursos = (props) => {
  const pathlink="https://www.youtube.com/embed/"
  //RRDPRJd1SWI
  const { open, close, imagem, video, dados, publico } = props
  const [visible, setVisible] = useState(false)
  const [titulo, setTitulo] = useState('')

  useEffect(()=>{
    if(dados != null || dados != undefined){
      setTitulo(dados.cur_titulo)
    }
  },[dados])

  return (
    <>
      <CModal
        size="xl"
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>Cursos Detalhes:&nbsp;{titulo}</CModalTitle>
        </CModalHeader>
        <CModalBody>
           <InscricaoCursos dados={dados} publico={publico}/>
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

export default ModalCursos
