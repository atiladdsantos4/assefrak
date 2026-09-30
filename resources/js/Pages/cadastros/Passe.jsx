import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props passed from the Laravel controller
const Passe = (props) => {
  console.log(props.param)
  const { tela, altera } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idpasse, setIdPasse] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [local, setLocal] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //pas_id_aco,pas_name,pas_cpf,pas_email,pas_tipo_telefone,pas_telefone,pas_ativo,pas_created_at,pas_updated_at,pas_deleted_at

  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
       setLoadpage(true)
       axios
        .get(`${endpoint}/passe/${param}`, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setIdPasse(result.data.data.pas_id_pas)
            setDescricao(result.data.data.pas_descricao)
            setLocal(result.data.data.pas_local)
            setCadastro(result.data.data.pas_created_at)
            console.log('teste')
            setLoadpage(false)
            //setParam(null)
        })
    } else {
       setLoadpage(false)
    }
  },[])

  const handleClick = (event,valor) =>{
     event.preventDefault();
     console.log('teste:'+valor)
     tela(valor)
  }

 //--> Cria Data Atual
 const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${d}/${m}/${yyyy} ${hh}:${mi}:${ss}`;
  };

  const formatDateBanco = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}/${d} ${hh}:${mi}:${ss}`;
  };

  //--> Exibe o Toast
  const CompToast = (texto, color, autohide) => {
    return (
      <CToast
        style={{borderRadius:'5px',color:'white'}}
        id="idtoast"
        autohide={autohide}
        visible={false}
        color={color}
        delay="3000"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody style={{color:'white'}}>{texto}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    )
  }

  //--> Efetua a validação do form e envoia os dados
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
           handleSave(erro)
           // let valor = CriaJsonItens()
           // console.log(valor)
        }
  }

  const mudaTipoTelefone = (event,valor) =>{
    setTipotelefone(valor)
    let tel = ''
    setTelefone(tel)
  }

  const CPFInput = (props) => {
      const [value, setValue] = useState(props.cpf)
        return (
            <IMaskInput
                className="form-control"
                mask='000.000.000-00' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setCpf(value)}
                defaultValue={value}
                placeholder="000.000.000-00"
                required
            />
        );
  }

  const FixoInput = (props) => {
      const [value, setValue] = useState(props.telefone)
        return (
            <IMaskInput
                className="form-control"
                mask='(00)0000-0000' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setTelefone(value)}
                defaultValue={value}
                placeholder="(00)0000-0000"
                required
            />
        );
  }

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
                required
            />
        );
  }

  const  handleSave = (erro) =>{

    if( erro == false && idpasse == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('pas_descricao', descricao)
        formData.append('pas_local', local)
        axios
        .post(`${endpoint}/passe`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaPasses'
            setLoadsave(false)
            addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela(valor)
            }, 2000)
        })
    } else {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('pas_descricao', descricao)
        formData.append('pas_local', local)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/passe/${idpasse}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsave(true)
            addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela('ListaPasses')
            }, 2000)
        })
    }
 }



  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" data-aos="fade-up">
          <h2> Tipo de Passe </h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Passes</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idPasse"
                                    label="Descrição do Passe"
                                    placeholder="Digite o descricao do Passe"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={descricao}
                                    feedbackInvalid="O descricao precisa ser preenchido"
                                    required
                                    onChange={(e)=>setDescricao(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idLocal"
                                    label="Local"
                                    placeholder="Digite o Local do Passe"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={local}
                                    feedbackInvalid="O Local precisa ser preenchido"
                                    required
                                    onChange={(e)=>setLocal(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormInput
                                    type="text"
                                    id="IdCadastro"
                                    label="Cadastro"
                                    defaultValue={cadastro}
                                    feedbackInvalid="Please provide a valid zip."
                                    readOnly
                                    required
                                />)}
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaPasses')}>Listar</CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default Passe
