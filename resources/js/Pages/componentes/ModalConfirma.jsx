import React, { useState,useEffect } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleExclamation, faFilePowerpoint, faPerson, faSave, faCircleXmark, faArrowAltCircleDown, faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';


const ModalConfirma = (props) => {
  const {close, open, funcret, texto, tipo, id} = props
  const [visible, setVisible] = useState(false)
  const [textomodal, setTexto] = useState(null)
  const [idexclusao, setIdexclusao] = useState(null)
  const [tipoxclusao, setTipoxclusao] = useState(null)

  useEffect(()=>{
     setTexto(texto)
     setIdexclusao(id)
     setTipoxclusao(tipo)
  },[texto])

  const RetFunction = (event) =>{
     funcret()
  }

  return (
    <>
      <CModal
        backdrop="static"
        visible={open}
        onClose={() => close()}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
             <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
                 <FontAwesomeIcon style={{color:'red'}} size="lg" icon={faCircleExclamation} />Modal title
             </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {textomodal}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close()}>
            Close
          </CButton>
          <CButton color="primary" onClick={(e) => RetFunction(e)}>
            Sim
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalConfirma
