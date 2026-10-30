import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CRow, CCol, CBadge ,CFormSelect, CFormInput, CFormTextarea, CForm, CAlert,CSpinner,CFormLabel } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faComment,faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";


const ModalAvaliacao = (props) => {
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const { open, close, lista, data, idfie, acao, idcol, idedita, dados, funcload } = props
  const [visible, setVisible] = useState(true)
  const [exibealerta,setExibealerta]  = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [textoalert, setTextoalert] = useState(false)
  const [retorno, setRetorno] = useState(null)
  const [observacao, setObservacao] = useState('')
  const [dataret, setDataret] = useState(new Date())
  const [preenchidos,setPreenchidos] = useState(0)
  const [validated,setValidated ] = useState(false)
  const [idretornopasse,setIdretornopasse] = useState(idedita)
  const [listaretorno,setListaretorno] = useState(
    [
      {id:0, valor:'', texto:'Selecione o Retorno'},
      {id:1, valor:'1', texto:'1º RETORNO'},
      {id:2, valor:'2', texto:'2º RETORNO'},
      {id:3, valor:'3', texto:'3º RETORNO'},
      {id:4, valor:'4', texto:'4º RETORNO'},
      {id:5, valor:'5', texto:'5º RETORNO'},
      {id:6, valor:'6', texto:'6º RETORNO'},
      {id:7, valor:'7', texto:'ALTA DO ACOLHIDO'}
    ]
  )

  useEffect(()=>{
    let datas = formatDate(new Date());
    console.log('acaomodal'+acao)
    console.log('dadosedita')
    console.log(dados)
    setDataret(data)
    if(acao === 'edit'){
       console.log('entrei edit')
       setRetorno(dados.fir_id_fir)
       setObservacao(dados.fir_observacao)
       setRetorno(dados.fir_sequencia)
       setDataret(new Date)
        //new Date(dados.fir_data_retorno_format))
       setIdretornopasse(idedita)
    } else {
       setRetorno(null)
       setObservacao(null)
       setDataret(new Date())
       setIdretornopasse(null)
    }

  },[data,acao,dados])

    console.log('Retorno:', retorno, typeof retorno);


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

        return `${yyyy}-${m}-${d}`;
 };

  const CompRetorno = () =>{
      return(
            listaretorno.map((item,index)=>{
            return(
                <option key={index} value={item.valor}>{item.texto}</option>
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
        //fir_id_fir,fir_id_fie,fir_id_col,fir_sequencia,fir_observacao,fir_data_retorno,fir_created_at,fir_updated_at,fir_deleted_at

        const formData = new FormData()
        formData.append('fir_id_fie', idfie)//idcol
        formData.append('fir_id_col', idcol)//idcol
        formData.append('fir_sequencia', retorno)
        formData.append('fir_data_retorno', formatDateBanco(dataret))
        formData.append('fir_observacao', observacao)
        if( acao == 'novo'){
            axios
            .post(`${endpoint}/ficharetorno`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setTextoalert('Retorno gravada com sucesso!!!')
                setExibealerta(true)
                setLoadsave(false)
                setTimeout(() => {
                  setExibealerta(false)
                  setRetorno(null)
                  setObservacao(null)
                  setIdretornopasse(null)
                  close()
                  funcload()
                }, 2000)
            })
        } else {
           formData.append('_method', 'put')
           axios
            .post(`${endpoint}/ficharetorno/${idretornopasse}`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
           })
           .then((result) => {
                setTextoalert('Occorência Alterada com sucesso!!!')
                setExibealerta(true)
                setLoadsave(false)
                setTimeout(() => {
                   setRetorno(null)
                   setObservacao(null)
                   setIdretornopasse(null)
                   setExibealerta(false)
                   close()
                   funcload()
                }, 2000)
            })
        }
  }

  useEffect(()=>{
     let valor = observacao || ''
     if(valor != ''){
        console.log(valor.length)
        setPreenchidos(valor.length)
     }
     //setPreenchidos(valor.length)

  },[observacao])

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
              <FontAwesomeIcon size="lg" icon={faPersonWalkingArrowLoopLeft} />&nbsp;Avaliações de Retorno
           </CModalTitle>
        </CModalHeader>
        <CForm className="row g-3 needs-validation" noValidate  id="form-ocor" onSubmit={handleSubmit} validated={validated}>
            <CModalBody>
                <div class="container" data-aos="fade-up" data-aos-delay="100">
                    <CAlert color="success" dismissible visible={exibealerta} onClose={() => setExibealerta(false)}>
                        Retorno gravada com sucesso!!!
                    </CAlert>
                        <CRow>
                            <CCol md={8} xs={8}>
                                <CFormSelect
                                        id="idAcolhido"
                                        label="Retorno"
                                        value={retorno ?? ''}
                                        feedbackInvalid="O Retorno deve ser informado"
                                        onChange={(e)=>setRetorno(e.target.value)}
                                        required>
                                    <CompRetorno/>
                                </CFormSelect>
                            </CCol>
                            <CCol md={4} xs={4} style={{alignItems:'center'}}>
                                {/* <CFormInput
                                    type="text"
                                    id="IdDataOcorrencia"
                                    label="Data do Retorno"
                                    defaultValue={dataoco}
                                    feedbackInvalid="Please provide a valid zip."
                                    readOnly
                                    required
                                /> */}
                                <CFormLabel htmlFor="exampleFormControlInput1">Data do Retorno</CFormLabel><br/>
                                    <DatePicker
                                        showYearDropdown
                                        showMonthDropdown
                                        peekNextMonth
                                        dropdownMode="select"
                                        locale="ptBR"
                                        dateFormat="dd/MM/yyyy"
                                        showIcon
                                        selected={dataret}
                                        calendarClassName="form-control"
                                        onChange={(date) => setDataret(date)}
                                        />
                                    { validated && dataret == null
                                        ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data de Início de Evento deve ser prenchida </div>)
                                        : (<></>)}
                            </CCol>
                            <CCol md={12} xs={12}>
                                <CFormTextarea
                                    className="textarea_line"
                                    id="exampleFormControlTextarea1"
                                    label={String(retorno) === '7'
                                     ? 'Justificativa / Orientações finais:'
                                    : 'Observações sobre o retorno'}
                                    rows={6}
                                    value={observacao ?? ''}
                                    feedbackInvalid="A Observação deve ser informada"
                                    onChange={(e) => setObservacao(e.target.value)}
                                    required
                                 />
                                 <div className="text-end mt-1">
                                    <small>
                                        Deve conter até 2000 caracteres |
                                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                                            Preenchidos: {preenchidos}
                                        </span>
                                    </small>
                                </div>
                            </CCol>
                        </CRow>
                </div>
            </CModalBody>
            <CModalFooter>
            <CButton color="primary" type="submit">
                Adicionar
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

export default ModalAvaliacao
