import React, { useEffect, useState } from 'react'
// import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import {CAlert, CSpinner,CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect, CFormTextarea  } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass1, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { text } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';


export const ModalQrCode = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const { isOpen, close, imagem, copia, valor, livro, autor, idscroll,idlivro } = props
  const [visible, setVisible] = useState(false)
  const [loadconfirma, setLoadconfirma] = useState(false)
  const [horario, setHorario] = useState(0)
  const [segundot, setSegundot] = useState(10)
  const [minutot, setMinutot] = useState(2)
  const [email, setEmail] = useState(null)
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
      setEmail(null)
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
    setEmail(null)
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
         <CButton size="sm" color="primary" style={{backgroundColor:'rgb(104, 149, 193)'}}>
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

const Confirma = (id) =>{
  if( email == null){
     settextoAlert('É necessario informar o seu email')
     setcolorAlert('info')
     setShowAlert(true)
     setTimeout(() => {
        setShowAlert(false)
     }, 3000)
     return
  }
  console.log('confirmado: '+id)
  setLoadconfirma(true)
  const formData = new FormData()
  formData.append('sae_id_liv', id)
  formData.append('sae_qtde_saida', 1)
  formData.append('sae_confirmado', 'N')
  formData.append('sae_cancelado', 'N')
  formData.append('sae_valor_unit', valor)
  formData.append('sae_valor_total', valor)
  formData.append('sae_email', email)
  formData.append('sae_email_enviado', 'N')
  axios.post(`${endpoint}/saidaestoque`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
   })
   .then((result) => {
      setLoadconfirma(false)
      settextoAlert('Confirmação Enviada com sucesso. Verifique sua caixa de Email')
      setcolorAlert('success')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        fechar()
      }, 3500)
   })
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
                    &nbsp;Como não possuímos muitos produtos no estoque você terá até 10 minutos pra concluir o seu pagamento. Após Efetuar o Pgto, Informe o seu email e Clique em "Confirmar Compra" para finalizar a sua compra</p>
              </CCol>
           </CRow>
           <CCol md={12} xs={12}>
                   <CInputGroup size="sm" className="mb-1 nowrap">
                      <CInputGroupText className="inputwidth" style={largura} id="basic-addon1">Infome seu Email&nbsp;</CInputGroupText>
                      <CFormInput style={{fontSize:'13px'}} id="idemail" className="input-text" aria-label="Username" value={email}
                        aria-describedby="basic-addon1" onChange={(e)=>setEmail(e.target.value)}/>
                   </CInputGroup>
            </CCol>
        </CModalBody>
        <CModalFooter style={{display:'flex !important'}}>
             { expirado == false
             ? (<DateTime/>)
             : ( <CButton color="primary" style={{backgroundColor:'rgb(104, 149, 193)'}}>Tempo de Espera <CBadge textColor="danger" color="light">{'00:00'}</CBadge></CButton>)}
             <CButton size="sm" color="primary" onClick={() => Confirma(idlivro)}>
                Confirmar Compra&nbsp;<i class="bi bi-cart-check-fill"></i>
                &nbsp;{loadconfirma ? <CSpinner size="sm" color="light"/> :<></>}
             </CButton>
             <CButton size="sm" color="secondary" onClick={() => close()}>
               Close
             </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
