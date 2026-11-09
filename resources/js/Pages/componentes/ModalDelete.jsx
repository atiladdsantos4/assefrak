import React, { useState,useEffect } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleExclamation, faFilePowerpoint, faPerson, faSave, faCircleXmark, faArrowAltCircleDown, faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';


const ModalDelete = (props) => {
  const {close, open, funcret, texto, id} = props
  const [visible, setVisible] = useState(false)
  const [textomodal, setTexto] = useState(null)
  const [idexclusao, setIdexclusao] = useState(null)

  useEffect(()=>{
     setTexto(texto)
     setIdexclusao(id)
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
        <CModalHeader style={{backgroundColor:'#d82a2a'}}>
             <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
                 <FontAwesomeIcon style={{color:'white'}} size="lg" icon={faCircleExclamation} />Exclusão de Registro
             </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {textomodal}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close()}>
            Fechar
          </CButton>
          <CButton color="primary" onClick={(e) => RetFunction(e)}>
            Sim
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalDelete
