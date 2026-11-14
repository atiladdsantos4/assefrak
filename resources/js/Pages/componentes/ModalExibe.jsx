import React, { useState, useEffect, useRef } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CFormInput,CSpinner, CAlert } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import {  faCircleExclamation, faFilePowerpoint, faPerson, faSave, faCircleXmark, faArrowAltCircleDown, faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';


const ModalExibe = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;
  const token = import.meta.env.VITE_APP_TOKEN;

  const {close, open,classe} = props
  const [senha, setSenha] = useState('')
  const [load, setLoad] = useState('')
  const [show, setShow] = useState(false)
  const [texto, setTexto] = useState('')
  const [showclasse, setShowclasse] = useState('danger')
  const inputRef = useRef(null)

  useEffect(()=>{
      setSenha('')
       inputRef.current?.focus();
  },[open])

  const VerificaSenha = () =>{
    setLoad(true)
    const config = {
        headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
        },
    };
        const formData = new FormData();
        formData.append('senha', senha);
        axios
            .get(`${endpoint}/informacao-tecnica?exibedados=S&senha=${senha}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((result) => {
                setLoad(false)
                if(result.data.status){
                   setTexto('Autenticação Concluida!!!')
                   setShow(true)
                   setShowclasse('success')
                   classe('')
                   setTimeout(() => {
                     setShow(false)
                     close()
                  }, 1000);
                } else {
                  setShowclasse('danger')
                  setTexto('Senha Inválida!!!')
                  setShow(true)
                  setTimeout(() => {
                     setShow(false)
                  }, 2000);

                }
            });

  }

  const RetFunction = (event) =>{
     funcret()
  }

  return (
    <>
      <CModal
        backdrop="static"
        visible={open}
        onOpened={() => inputRef.current?.focus()}
        onClose={() => close()}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
             <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
                 <FontAwesomeIcon style={{color:'white'}} size="lg" icon={faCircleExclamation} />Exibir Dados
             </CModalTitle>
        </CModalHeader>
         <CAlert visible={show} color={showclasse} >{texto}</CAlert>
        <CModalBody>
          <CFormInput
            ref={inputRef}
            className='form-control'
            label="Informe a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => close()}>
            Fechar
          </CButton>
          <CButton color="primary" onClick={(e) => VerificaSenha()}>
            Ok
            {' '}{load ? <CSpinner size="sm"/> : <></> }
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalExibe
