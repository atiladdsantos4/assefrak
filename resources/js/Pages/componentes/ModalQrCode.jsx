import React, { useEffect, useState } from 'react'
// import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import {CAlert, CSpinner,CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect, CFormTextarea  } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass1, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { text } from '@fortawesome/fontawesome-svg-core';


export const ModalQrCode = (props) => {

  const { isOpen, close, imagem, copia, valor, livro, autor, idscroll,idlivro } = props
  const [visible, setVisible] = useState(false)
  const [horario, setHorario] = useState(0)
  const [segundot, setSegundot] = useState(10)
  const [minutot, setMinutot] = useState(2)
  const [showAlert,setShowAlert] = useState(false)
  const [expirado,setExpirado] = useState(false)
  const [colorAlert,setcolorAlert] = useState('info')
  const [textoAlert,settextoAlert] = useState('Link Copiado')
  const largura = {width:'120px',cursor:'pointer'}


  async function writeClipboardText() {
    var text = document.getElementById('idcopiaqrcode').value;
    if (navigator.clipboard && window.isSecureContext) {
        var copyText = document.getElementById('idvalor');
        // Standard modern Clipboard API
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        // Prevent scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          setShowAlert(true)
          document.execCommand('copy');
          setTimeout(() => {
             setShowAlert(false)
          }, 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  }

  useEffect(()=>{
      setSegundot(60)
      setMinutot(9)
      setExpirado(false)
      setShowAlert(false)
      settextoAlert('Link Copiado!!!')
      setcolorAlert('info')
  },[idlivro])

  const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  const fechar = () =>{
    close()
    setTimeout(() => {
       scrollToId(idscroll)
    }, 200)
  }


  const MudaSegundo = () =>{
     let segundo = segundot - 1
     let saida  = null
     if(segundo < 10){
         saida ='0'+segundo
     } else {
         saida = segundo
     }
     if(segundo == 0){
       let minuto = minutot - 1
       setMinutot(minuto)
       setSegundot(59)
     } else {
       setSegundot(saida)
     }
  }

  const DateTime = () => {
    //console.log('renderizei')
    var [date,setDate] = useState(new Date());

    useEffect(() => {

            //var timer = setInterval(()=>setDate(new Date()), 1000 )
            var segundo = setInterval(()=>{MudaSegundo()}, 1000 )
            if(minutot == -1 && segundot == 59){
                setExpirado(true)
                settextoAlert('Tempo Expirado!!!')
                setcolorAlert('danger')
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                    fechar()
                }, 3000)
            }
            return function cleanup() {
                //clearInterval(timer)
                clearInterval(segundo)
            }

    });

    return(
         <>
         <CButton color="primary" style={{backgroundColor:'rgb(104, 149, 193)'}}>
             Tempo de Espera <CBadge color="light" textColor="danger">{minutot+':'+segundot}</CBadge>
         </CButton>
         </>
        // <div>
        //      <p> Time : {date.toLocaleTimeString('pt-BR')}</p>
        //     <p> Date : {date.toLocaleDateString('pt-BR')}</p>
        //     <p> segundo : {date.getMinutes()+':'+exibeSegundos(date)}</p>
        //     <p> horario : {horario}</p>

        // </div>
    )
}

  return (
    <>
      <CModal
        visible={isOpen}
        onClose={() => fechar()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader className="cmodal_header" style={{backgroundColor:'#6895C1',color:'white'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
            <FontAwesomeIcon size="1x" icon={faQrcode}/>&nbsp;
            Efetuar Pgto Pix
           </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CAlert color={colorAlert} visible={showAlert} variant="solid">
                  {textoAlert}
            </CAlert>
            <CRow>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Livro</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idautor" className="input-text" disabled aria-label="Username" value={livro}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Autor</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idvalor" className="input-text" disabled aria-label="Username" value={autor}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Valor Transação</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idvalor" className="input-text" disabled aria-label="Username" value={'R$ '+valor}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
           </CRow>
           <CRow>
                <CCol md={12} xs={12}>
                    <div style={{width:'200px',margin:'auto'}}>
                       <img src={imagem}/>
                    </div>
                </CCol>
            </CRow>
            <CRow>
               <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-3 nowrap">
                      <CInputGroupText onClick={(e)=>writeClipboardText(e)} className="inputwidth" style={largura} id="basic-addon1">Copia e Cola</CInputGroupText>
                      <CFormTextarea id="idcopiaqrcode" style={{fontSize:'13px'}} className="input-text" rows={4} disabled aria-label="Username" value={copia}
                        aria-describedby="basic-addon1"/>
                   </CInputGroup>
               </CCol>
           </CRow>
           <CRow>
              <CCol md={12} xs={12}>
                  <p style={{color:'red',fontSize:'13px'}}>
                    <i class="bi bi-exclamation-circle"></i>
                    &nbsp;Como não possuímos muitos produtos no estoque você terá até 10 minutos pra concluir o seu pagamento. Clique em "Confirmar Compra" para finalizar a sua compra</p>
              </CCol>
           </CRow>
        </CModalBody>
        <CModalFooter style={{display:'flex !important'}}>
             { expirado == false
             ? (<DateTime/>)
             : ( <CButton color="primary" style={{backgroundColor:'rgb(104, 149, 193)'}}>Tempo de Espera <CBadge textColor="danger" color="light">{'00:00'}</CBadge></CButton>)}
             <CButton color="primary" onClick={() => close()}>
                Confirmar Compra&nbsp;<i class="bi bi-cart-check-fill"></i>
             </CButton>
             <CButton color="secondary" onClick={() => close()}>
               Close
             </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
