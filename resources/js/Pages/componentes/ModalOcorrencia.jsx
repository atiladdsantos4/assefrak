import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CRow, CCol, CBadge ,CFormSelect, CFormInput, CFormTextarea, CForm, CAlert,CSpinner   } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ModalOcorrencia = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const { open, close, lista, data, idtra, acao, idedita, dados, funcload } = props
  const [visible, setVisible] = useState(true)
  const [exibealerta,setExibealerta]  = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [textoalert, setTextoalert] = useState(false)
  const [ocorrencia, setOcorrencia] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [dataoco, setDataoco] = useState()
  const [validated,setValidated ] = useState(false)
  const [idocorrenciapasse,setIdocorrenciapasse] = useState(idedita)

  useEffect(()=>{
    console.log('acaomodal'+acao)
    console.log('dadosedita')
    console.log(dados)
    setDataoco(data)  
    if(acao === 'edit'){
       console.log('entrei edit')
       setOcorrencia(dados.ocp_id_top)  
       setDescricao(dados.ocp_descricao)
       setIdocorrenciapasse(idedita)
    } else {
       setOcorrencia(null)  
       setDescricao(null)
       setIdocorrenciapasse(null)
    }

  },[data,acao,dados])

  const CompOcorrencia = () =>{
      return(
            lista.map((item,index)=>{
            return(
                <option key={index} value={item.top_id_top}>{item.top_descricao}</option>
                )
            })
      )
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
           event.preventDefault() 
           handleSave(erro)
        }

  }

  const handleSave = (erro) =>{
        setLoadsave(true)
        //ocp_id_ocp,ocp_id_tra,ocp_id_top,ocp_descricao,ocp_created_at,ocp_updated_at,ocp_deleted_at

        const formData = new FormData()
        formData.append('top_descricao', descricao)
        formData.append('ocp_id_tra', idtra)
        formData.append('ocp_id_top', ocorrencia)
        formData.append('ocp_descricao', descricao)
        if( acao == 'novo'){
            axios
            .post(`${endpoint}/ocorrenciapasse`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setTextoalert('Occorência gravada com sucesso!!!')
                setExibealerta(true)
                setLoadsave(false)
                setTimeout(() => {
                  setExibealerta(false)
                  setOcorrencia(null)  
                  setDescricao(null)
                  setIdocorrenciapasse(null)
                  close()
                  funcload()
                }, 2000)
            })
        } else {
           formData.append('_method', 'put')
           axios
            .post(`${endpoint}/ocorrenciapasse/${idocorrenciapasse}`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
           }) 
           .then((result) => {
                setTextoalert('Occorência alterada com sucesso!!!')
                setExibealerta(true)
                setLoadsave(false)
                setTimeout(() => {
                   setOcorrencia(null)  
                   setDescricao(null)
                   setIdocorrenciapasse(null)
                   setExibealerta(false)
                   close()
                   funcload()
                }, 2000)
            })
        }    
  }

  return (
    <>
      <CModal
        size="lg"
        backdrop="static"
        visible={open}
        onClose={() => close()}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
           <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
              <FontAwesomeIcon size="lg" icon={faComment} />&nbsp;Occorências Passe
           </CModalTitle>
        </CModalHeader>
        <CForm className="row g-3 needs-validation" noValidate  id="form-ocor" onSubmit={handleSubmit} validated={validated}>
            <CModalBody>
                <div class="container" data-aos="fade-up" data-aos-delay="100">
                    <CAlert color="success" dismissible visible={exibealerta} onClose={() => setExibealerta(false)}>
                        Occorência gravada com sucesso!!!
                    </CAlert>
                        <CRow>
                            <CCol md={8} xs={8}>
                                <CFormSelect
                                        id="idAcolhido"
                                        label="Tipo de Ocorrência"
                                        value={ocorrencia}
                                        feedbackInvalid="O Tipo de Ocorrência deve ser informado"
                                        onChange={(e)=>setOcorrencia(e.target.value)}
                                        required>

                                    <CompOcorrencia/>
                                </CFormSelect> 
                            </CCol>
                            <CCol md={4} xs={4} style={{alignItems:'center'}}>
                                <CFormInput
                                    type="text"
                                    id="IdDataOcorrencia"
                                    label="Data da Ocorrência"
                                    defaultValue={dataoco}
                                    feedbackInvalid="Please provide a valid zip."
                                    readOnly
                                    required
                                />
                            </CCol>
                            <CCol md={12} xs={12}>
                                <CFormTextarea
                                    className="textarea_line"
                                    id="exampleFormControlTextarea1"
                                    label="Informe a Ocorrência"
                                    rows={6}
                                    value={descricao}
                                    text="Deve conter até 2000 caracteres"
                                    feedbackInvalid="A Ocorrência deve ser informada"
                                    onChange={(e)=>setDescricao(e.target.value)}
                                    required
                                ></CFormTextarea>
                            </CCol>
                        </CRow>
                </div>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" type="submit">
                Adiconar
                {' '}
                {loadsave? <CSpinner size="sm" /> : ''}
                </CButton>
            <CButton color="secondary" onClick={() => close()}>
                Fechar
            </CButton>
            </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default ModalOcorrencia
