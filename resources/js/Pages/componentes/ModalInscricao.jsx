import React, { useState, useEffect } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,CRow,CCol,CBadge,CAlert,
    CFormInput,CFormLabel,CFormFeedback,CFormCheck,CInputGroup,CSpinner,CInputGroupText,CForm,CCard,CCardBody,CCardHeader
 } from '@coreui/react'
import { IMaskInput,IMaskMixin } from 'react-imask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ModalInscricao = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN

  //RRDPRJd1SWI
  const { open, close, dados, atualiza} = props
  const [visible, setVisible] = useState(false)
  const [formulario,setFormulario] = useState(null)
  const [nome,setNome] = useState(null)
  const [email,setEmail] = useState(null)
  const [telefone,setTelefone] = useState(null)
  const [tipo,setTipo] = useState(null)
  const [ativo,setAtivo] = useState(null)
  const [emailenviado,setEmailenviado] = useState(null)
  const [cadastro,setCadastro] = useState(null)
  const [descricao,setDescricao] = useState(null)
  const [titulo,setTitulo]  = useState(null)
  const [idcurso,setIdcurso]  = useState(null)
  const [idevento,setIdevento]  = useState(null)
  const [idinscricao,setIdinscricao]  = useState(null)
  const [validated, setValidated] = useState(false)
  const [loadsave,setLoadsave] = useState(false)
  const [loademail,setLoademail] = useState(false)
  const [showAlert,setShowAlert] = useState(false)
  const [textAlert,settextAlert] = useState(false)

  console.log('dados inscricao')
  console.log(dados)
  useEffect(()=>{
    if(dados != null){
        setFormulario(dados)
        setIdinscricao(dados.ins_id_ins)
        setNome(dados.ins_nome)
        setEmail(dados.ins_email)
        setTelefone(dados.ins_telefone)
        let ck = dados.ins_ativo == 1 ? true : false
        setAtivo(ck)
        setCadastro(dados.ins_created_at)
        setEmailenviado(dados.ins_envio_email)
        let desc = dados.ins_tipo == 'C' ? 'Curso' : 'Evento'
        setDescricao(desc)
        setTipo(dados.ins_tipo)
        if(dados.ins_tipo == 'C'){
           setIdcurso(dados.ins_id_cur)
        } else {
           setIdevento(dados.ins_id_eve)
        }
        setTitulo(dados.ins_descricao)
    }
  },[dados])

  const CelularInput = (props) => {
        const [value, setValue] = useState(props.telefone)
          return (
              <IMaskInput
                  className="form-control"
                  mask='(00)00000-0000' // Define o tipo da máscara como numérico
                  signed={false} // Se permite números negativos
                  // Captura o valor aceito (pode ser unmasked ou typed)
                  onAccept={(value, mask) => {
                     setValue(value);
                  }}
                  //onBlur = {(e)=>handleBlur(e,'desconto')}
                  onBlur = {()=>setTelefone(value)}
                  defaultValue={value}
                  placeholder="(00)00000-0000"
                  feedbackInvalid="O Tipo deve ser informado"
                  required
              />
          );
   }

  const CompTelefone = () =>{
      return(
        <>
        <CFormLabel htmlFor="exampleForm">Telefone</CFormLabel>
        <CelularInput telefone={telefone}/>
        <CFormFeedback invalid>{'Digite o Telefone'}</CFormFeedback>
        </>
      )
  }

   const RadioLista = (props) => {
    if( props.enviado == 'S'){
        return (
            <>
            <CFormCheck
                inline
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Sim"
                onClick={(e)=>ListaAtual(e,'acolhido')}
                defaultChecked
            />
            <CFormCheck
                inline
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Não"
                onClick={(e)=>ListaAtual(e,'colaborador')}
            />
            </>
        )
    } else {
       return (
         <>
            <CFormCheck
                inline
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Sim"
                onClick={(e)=>ListaAtual(e,'acolhido')}
            />
            <CFormCheck
                inline
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Não"
                onClick={(e)=>ListaAtual(e,'colaborador')}
                defaultChecked
            />
         </>
        )
    }

  }

  const handleSubmit = (event) => {
        console.log('submit')
        const form = event.currentTarget
        let erro = false
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            erro = true
        }
        event.preventDefault()
        setValidated(true)
        if(erro == false){
           EnviaInscricao(event,erro)
           // let valor = CriaJsonItens()
           // console.log(valor)
        }
  }

  const EnviaInscricao = (event,erro) =>{
    if(erro){
       return
    }
    setLoadsave(true)
    const formData = new FormData()
    formData.append('inscricao', 'S')
    if(tipo == 'C'){
       formData.append('ins_id_cur', idcurso)
    } else {
       formData.append('ins_id_eve', idevento)
    }
    formData.append('ins_nome', nome)
    formData.append('ins_email', email)//atiladdsantos4@gmail.com
    formData.append('ins_telefone', telefone)
    //formData.append('ins_envio_email', 'N')
    formData.append('ins_tipo', tipo)
    formData.append('ins_ativo', 1)
    formData.append('_method', 'put')
    //formData.append('ins_id_puf', tipo)
    axios
        .post(`${endpoint}/inscricao/${idinscricao}`, formData, {
        headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,//dentro do env//
        },
    })
    .then((result) => {
        settextAlert('Inscrição Alterada com Sucesso')
        setLoadsave(false)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            atualiza()
            setValidated(false)
            close(false)
        }, 2000)
    })
 }

 const ReenviaEmail = () =>{
    setLoademail(true)
    const formData = new FormData()
    if(tipo == 'C'){
       formData.append('ins_id_cur', idcurso)
    } else {
       formData.append('ins_id_eve', idevento)
    }
    formData.append('ins_nome', nome)
    formData.append('ins_email', email)//atiladdsantos4@gmail.com
    formData.append('ins_telefone', telefone)
    formData.append('ins_tipo', tipo)
    formData.append('ins_renvia_email', 'S')
    formData.append('_method', 'put')
    axios
      .post(`${endpoint}/inscricao/${idinscricao}`, formData, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
        },
    })
    .then((result) => {
        setLoademail(false)
        settextAlert('Email Reenviado com Sucesso!!!')
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            atualiza()
            setValidated(false)
            close(false)
        }, 2000)
    })

 }

  return (
    <>
      <CModal
        size="lg"
        visible={open}
        onClose={() => close(false)}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="modal-insc-id" style={{color:'white'}}>Alterar Inscrição</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CAlert color="info" visible={showAlert} variant="solid">Inscrição Alterada com Sucesso</CAlert>
            <div class="container" data-aos="fade-up" data-aos-delay="100">
                {/* <img src={imagem+'cabecalho_programacao.png'} style={{borderRadius:'15px'}} class="img-fluid" alt="" loading="lazy"></img> */}
                <div id="programacao" data-aos="fade-up" data-aos-delay="300">
                <CCard className='card_bottom mb-4'>
                    <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Dados da Inscrição</CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CRow>
                                <CCol md={12} xs={12}>
                                    <CInputGroup className="mb-2 mt-2">
                                    <CInputGroupText style={{width:'100px'}} className="clinputtext">{descricao}</CInputGroupText>
                                    <CFormInput value={titulo} readOnly/>
                                    {/* <QtdeRegistrosPagina/> */}
                                </CInputGroup>
                                </CCol>
                                <CCol md={6} xs={12}>
                                    <CFormInput
                                        id="idNome"
                                        label="Nome do Inscrito"
                                        placeholder="Digite o Nome do Inscrito"
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                        defaultValue={nome}
                                        feedbackInvalid="O Nome do Inscrito precisa ser preenchido"
                                        required
                                        onChange={(e)=>setNome(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={6} xs={12}>
                                    <CFormInput
                                        id="idEmail"
                                        label="Email"
                                        placeholder="Digite o Email do Inscrito"
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                        defaultValue={email}
                                        feedbackInvalid="O Email precisa ser preenchido"
                                        required
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={6} xs={12}>
                                    <CompTelefone/>
                                </CCol>
                                <CCol md={6} xs={12}>
                                    <CFormInput
                                        id="idCadastro"
                                        label="Data da Inscrição"
                                        placeholder="Digite o Nome do Inscrito"
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                        defaultValue={cadastro}
                                        feedbackInvalid="O Nome do Inscrito precisa ser preenchido"
                                        readOnly
                                    />
                                </CCol>
                                <CCol md={3} xs={12}>
                                    <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel>
                                    <CFormCheck
                                            type="checkbox"
                                            id="invalidCheck"
                                            label="Inscrição Ativa"
                                            feedbackInvalid="Informe se Acolhido esta Ativo"
                                            checked={ativo}
                                            onChange={(e)=>setAtivo(e.target.checked)}
                                    />
                                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </CCol>
                                <CCol md={5} className='mt-3'>
                                    <div className="mt-3" style={{flex:'1'}}>Email Enviado ?&nbsp;<RadioLista enviado={emailenviado}/></div>
                                </CCol>
                                <CCol md={4} className='mt-4'>
                                    { emailenviado == 'N' ? (
                                        <CButton color="info" onClick={()=>ReenviaEmail()}>
                                            Enviar Email&nbsp;{loademail ? (<CSpinner color="light" size="sm"/>) : (<></>)}
                                        </CButton>
                                     ):(<></>)}
                                </CCol>
                            </CRow>
                            <CRow className='mt-3'>
                                <CCol xs={12}>
                                    <CButton color="primary" type="submit">
                                    <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                    {' '}
                                    {loadsave? <CSpinner size="sm" /> : ''}
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                </CCard>
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

export default ModalInscricao
