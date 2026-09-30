import { React, useEffect, useState, Suspense, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CFormTextarea,CBadge} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faCheck, faFile, faTrash, faEdit, faPlus, faCirclePlus,faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ListaFocoEnergetico from '../listagem/ListaFocoEnergetico';
import ModalOcorrencia from '../componentes/ModalOcorrencia';



// The Main component receives props passed from the Laravel controller
const Tratamento = (props) => {
    const { tela, setratamento, setacolhido } = props
    const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
    const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
    const token  = import.meta.env.VITE_APP_TOKEN
    const endpoint_report =import.meta.env.VITE_APP_ENDPOINT
    const [validated, setValidated] = useState(false)
    const [loadpage, setLoadpage] = useState(false)
    const [loadtabela, setLoadtabela] = useState(false)
    const [loadsave, setLoadsave] = useState(false)
    const [acaomodal, setAcaomodal] = useState('novo')
    const [est, setEst] = useState(false)
    const [idtratamento, setIdtratamento] = useState(null)
    const [idocorrencia, setIdocorrencia] = useState(null)
    const [idacolhidoocorrencia, setIdacolhidoocorrencia] = useState(null)
    const [dadoseditamodal, setDadoseditamodal] = useState(null)
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [ocupacao, setOcupacao] = useState('')
    const [ativo, setAtivo] = useState(false)
    const [listacolaborador, setListacolaborador] = useState([])
    const [listaacolhido, setListaacolhido] = useState([])
    const [listapasse, setListapasse] = useState([])
    const [listafoco, setListafoco] = useState([])
    const [listacondicao, setListacondicao] = useState([])
    const [listafortalecimento, setListafortalecimento] = useState([])
    const [listalimpeza, setListalimpeza] = useState([])
    const [listaalerta, setListaalerta] = useState([])
    const [listatratamento, setListatratamento] = useState([])
    const [listastatus, setListastatus] = useState([])
    const [listaocorrencia, setListaocorrencia] = useState([])
    const [listaocorrenciapasse, setListaocorrenciapasse] = useState([])
    const [colaborador, setColaborador] = useState('')
    const [acolhido, setAcolhido] = useState('')
    const [tipotratamento, setTipotratamento] = useState('')
    const [passe, setPasse] = useState('')
    const [energetico, setEnergetico] = useState('')
    const [condicao, setCondicao] = useState('')
    const [fortalecimento, setFortalecimento] = useState('')
    const [limpeza, setLimpeza] = useState('')
    const [alerta, setAlerta] = useState('')
    const [primeiro, setPrimeiro] = useState('')
    const [cadastro, setCadastro] = useState('')
    const [dataocorrencia, setDataocorrencia] = useState('')
    const [status, setStatus] = useState(6)
    const [startDate, setStartDate] = useState(new Date());
    const [saved,setSaved] = useState(false)
    const [openmodal,setOpenModal] = useState(false)
    const [toast, addToast] = useState()//toast
    const [param, setParam] = useState(props.param)
    const [paramestado, setParamestado] = useState(props.estadovalor)
    const [estiloocorrencia, setEstiloocorrencia] = useState({marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'})
    const toaster = useRef(null)
    const style_placeholder = {paddingBottom:'15px'}
    //const style_ocorrencia = {marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}

    const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
    };


    const closeModal = () =>{
       setOpenModal(false)
    }

    useEffect(()=>{
      let data = formatDate(new Date());
      console.log('parametro_col:'+props.param)
      setCadastro(data)
      if (param != null ){
        const fetchData = async () => {
            console.log('parametro_existe')
            try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/colaborador?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/acolhido?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/passe?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/foco?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicao?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/fortalecimento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/limpeza?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/alerta?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tipotratamento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/status?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tratamento/${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tipoocorrencia?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/ocorrenciapasse?listagem=S&tratamento=${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })

                ]
                const responses = await Promise.all(requests);

                let result_colaborador = responses[0]
                let result_acolhido = responses[1]
                let result_passe = responses[2]
                let result_foco = responses[3]
                let result_condicao = responses[4]
                let result_fortalecimento = responses[5]
                let result_limpeza = responses[6]
                let result_alerta = responses[7]
                let result_tratamento = responses[8]
                let result_status = responses[9]
                let result_showtratamento = responses[10].data.data
                let result_ocorrencia = responses[11]
                let result_ocorrenciapasse = responses[12]

                //setListapasse(result_passe.data.data)
                setListafoco(result_foco.data.data)
                setListacondicao(result_condicao.data.data)
                setListafortalecimento(result_fortalecimento.data.data)
                setListalimpeza(result_limpeza.data.data)
                setListaalerta(result_alerta.data.data)
                setListastatus(result_status.data.data)
                let lista = result_ocorrenciapasse.data.data.sort((a,b)=>b.ocp_id_ocp > a.ocp_id_ocp)
                setListaocorrenciapasse(lista)
                // setListatratamento(result_tratamento.data.data)

                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(array_col)
                let array_aco = result_acolhido.data.data
                array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                setListaacolhido(array_aco)
                let array_tra = result_tratamento.data.data
                array_tra.unshift({tit_id_tit:'',tit_descricao:'Selecione o Tipo de Tratamento'})
                setListatratamento(array_tra)
                let array_top = result_ocorrencia.data.data
                array_top.unshift({top_id_top:'',top_descricao:'Selecione o Tipo de Ocorrência'})
                setListaocorrencia(array_top)

                // setListacolaborador(result_estado.data.data)
                // let array_city = result_cidade.data.data
                // array_city.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
                // setListacidade(array_city)
                /** tratando a ediçao*/
                console.log('acolhido:'+result_showtratamento.tra_id_aco)
                setAcolhido(result_showtratamento.tra_id_aco)
                setColaborador(result_showtratamento.tra_id_col)
                let idade = result_acolhido.data.data.filter((item)=>item.aco_id_aco == result_showtratamento.tra_id_aco)
                setIdade(idade[0].aco_idade)
                setCadastro(result_showtratamento.tra_created_at)
                setTipotratamento(result_showtratamento.tra_id_tit)
                setStatus(result_showtratamento.tra_id_stt)
                setPrimeiro(result_showtratamento.tra_pri_impressao)
                let string  = null

                string = JSON.parse(result_showtratamento.tra_passe)
                //console.log(string)
                setListapasse(string.meta)

                string = JSON.parse(result_showtratamento.tra_foco_energetico)
                console.log(string)
                setListafoco(string.meta)

                string = JSON.parse(result_showtratamento.tra_cond_energetica)
                console.log(string)
                setListacondicao(string.meta)
                //link = string.meta[0].path

                string = JSON.parse(result_showtratamento.tra_fortalecimento)
                console.log(string)
                setListafortalecimento(string.meta)

                string = JSON.parse(result_showtratamento.tra_limpeza)
                console.log(string)
                setListalimpeza(string.meta)

                string = JSON.parse(result_showtratamento.tra_alerta)
                console.log(string)
                setListaalerta(string.meta)

                setIdtratamento(result_showtratamento.tra_id_tra)

                /** tratando a ediçao*/

                setLoadpage(false)
                setLoadtabela(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
      } else {
        setEstiloocorrencia({display:'none'})
        const fetchData = async () => {

            try {
                setLoadpage(true)
                setLoadtabela(true)
                const requests = [
                    axios.get(`${endpoint}/colaborador?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/acolhido?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/passe?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/foco?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicao?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/fortalecimento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/limpeza?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/alerta?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tipotratamento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/status?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tipoocorrencia?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })

                ]
                const responses = await Promise.all(requests);

                let result_colaborador = responses[0]
                let result_acolhido = responses[1]
                let result_passe = responses[2]
                let result_foco = responses[3]
                let result_condicao = responses[4]
                let result_fortalecimento = responses[5]
                let result_limpeza = responses[6]
                let result_alerta = responses[7]
                let result_tratamento = responses[8]
                let result_status = responses[9]
                let result_ocorrencia = responses[10]
                setListapasse(result_passe.data.data)
                setListafoco(result_foco.data.data)
                setListacondicao(result_condicao.data.data)
                setListafortalecimento(result_fortalecimento.data.data)
                setListalimpeza(result_limpeza.data.data)
                setListaalerta(result_alerta.data.data)
                setListastatus(result_status.data.data)

                // setListatratamento(result_tratamento.data.data)

                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(array_col)
                let array_aco = result_acolhido.data.data
                array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                setListaacolhido(array_aco)
                let array_tra = result_tratamento.data.data
                array_tra.unshift({tit_id_tit:'',tit_descricao:'Selecione o Tipo de Tratamento'})
                setListatratamento(array_tra)

                let array_top = result_ocorrencia.data.data
                array_top.unshift({top_id_top:'',top_descricao:'Selecione o Tipo de Ocorrência'})
                setListaocorrencia(array_top)

                // setListacolaborador(result_estado.data.data)
                // let array_city = result_cidade.data.data
                // array_city.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
                // setListacidade(array_city)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
      }
    },[])


    const handleSubmit = (event) => {
        const form = event.currentTarget
        let erro = false
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            erro = true
            scrollToId('tratamento-id')
        }
        event.preventDefault()
        setValidated(true)
        if(erro == false){
            console.log(MontaJsonSecao('Passe'))
            console.log(MontaJsonSecao('Energetico'))
            console.log(MontaJsonSecao('Condicao'))
            console.log(MontaJsonSecao('Fortalecimento'))
            console.log(MontaJsonSecao('Limpeza'))
            console.log(MontaJsonSecao('Alerta'))
            handleSave()
            // let valor = CriaJsonItens()
            // console.log(valor)
        }
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

    const CompAcolhido = () =>{
        //listacidade.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
        return(
            listaacolhido.map((item,index)=>{
            return(
                <option key={index} value={item.aco_id_aco}>{item.aco_name}</option>
                )
            })
        )
    }

    const CompColaborador = () =>{
        return(
            listacolaborador.map((item,index)=>{
                return(
                    <option key={index} value={item.col_id_col} selected>{item.col_name}</option>
                )
            })

        )
    }

    const CompTipoPasse = () =>{
        return(
            listatratamento.map((item,index)=>{
                return(
                    <option key={index} value={item.tit_id_tit} selected>{item.tit_descricao}</option>
                )
            })

        )
    }

    const CompStatus = () =>{
        return(
            listastatus.map((item,index)=>{
                return(
                    <option key={index} value={item.stt_id_stt} selected>{item.stt_descricao}</option>
                )
            })

        )
    }

    const setAtivoPasse = (id,value) =>{
       setListapasse(prevItems =>
          prevItems.map(item =>
             item.pas_id_pas === id ? { ...item, pas_ativo: value } : item
          )
       )
       console.log(listapasse)
    }

    const setAtivoFoco = (id,value) =>{
       setListafoco(prevItems =>
          prevItems.map(item =>
             item.foc_id_foc === id ? { ...item, foc_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoCondicao = (id,value) =>{
       setListacondicao(prevItems =>
          prevItems.map(item =>
             item.coe_id_coe === id ? { ...item, coe_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoFortalecimento = (id,value) =>{
       setListafortalecimento(prevItems =>
          prevItems.map(item =>
             item.for_id_for === id ? { ...item, for_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoLimpeza = (id,value) =>{
       setListalimpeza(prevItems =>
          prevItems.map(item =>
             item.lim_id_lim === id ? { ...item, lim_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoAlerta = (id,value) =>{
       setListaalerta(prevItems =>
          prevItems.map(item =>
             item.ale_id_ale === id ? { ...item, ale_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const mudaAcolhido =  (valor) =>{
        let idade = listaacolhido.filter((item)=>item.aco_id_aco == valor)
        setIdade(idade[0].aco_idade)
        setAcolhido(valor)
    }

    const CompPasse = () =>{
       return(
          listapasse.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.pas_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.pas_ativo}
                        onChange={(e)=>setAtivoPasse(item.pas_id_pas,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompFoco = () =>{
       return(
          listafoco.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.foc_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.foc_ativo}
                        onChange={(e)=>setAtivoFoco(item.foc_id_foc,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompCondicao = () =>{
       return(
          listacondicao.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.coe_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.coe_ativo}
                        onChange={(e)=>setAtivoCondicao(item.coe_id_coe,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompFortalecimento = () =>{
       return(
          listafortalecimento.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.for_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.for_ativo}
                        onChange={(e)=>setAtivoFortalecimento(item.for_id_for,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompLimpeza = () =>{
       return(
          listalimpeza.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.lim_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.lim_ativo}
                        onChange={(e)=>setAtivoLimpeza(item.lim_id_lim,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompAlerta = () =>{
       return(
          listaalerta.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.ale_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.ale_ativo}
                        onChange={(e)=>setAtivoAlerta(item.ale_id_ale,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const MontaJsonSecao = (secao) =>{

       let arrayitens = []
       let obj = null
       let objfinal = null
       switch(secao){

            case 'Passe':
                arrayitens = []
                listapasse.map((item,index)=>{
                    obj ={
                        pas_id_pas:item.pas_id_pas,
                        pas_ativo:item.pas_ativo,
                        pas_descricao:item.pas_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
             break
            case 'Energetico':
                arrayitens = []
                listafoco.map((item,index)=>{
                    obj ={
                        foc_id_foc:item.foc_id_foc,
                        foc_ativo:item.foc_ativo,
                        foc_descricao:item.foc_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
            case 'Condicao':
                arrayitens = []
                listacondicao.map((item,index)=>{
                    obj ={
                        coe_id_coe:item.coe_id_coe,
                        coe_ativo:item.coe_ativo,
                        coe_descricao:item.coe_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
            case 'Fortalecimento':
                arrayitens = []
                listafortalecimento.map((item,index)=>{
                    obj ={
                        for_id_for:item.for_id_for,
                        for_ativo:item.for_ativo,
                        for_descricao:item.for_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
                break
            case 'Limpeza':
                arrayitens = []
                listalimpeza.map((item,index)=>{
                    obj ={
                        lim_id_lim:item.lim_id_lim,
                        lim_ativo:item.lim_ativo,
                        lim_descricao:item.lim_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
                break
            case 'Alerta':
                arrayitens = []
                listaalerta.map((item,index)=>{
                    obj ={
                        ale_id_ale:item.ale_id_ale,
                        ale_ativo:item.ale_ativo,
                        ale_descricao:item.ale_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break

       }
    }

    const  CriaJson = () =>{
       setPasse(MontaJsonSecao('Passe'))
       setEnergetico(MontaJsonSecao('Energetico'))
       setCondicao(MontaJsonSecao('Condicao'))
       setFortalecimento(MontaJsonSecao('Fortalecimento'))
       setLimpeza(MontaJsonSecao('Limpeza'))
       setAlerta(MontaJsonSecao('Alerta'))
    }

    const  handleSave = () =>{
        CriaJson()
        if( idtratamento == null) {
            setLoadsave(true)
            let Passe = MontaJsonSecao('Passe')
            let Energetico = MontaJsonSecao('Energetico')
            let Condicao = MontaJsonSecao('Condicao')
            let Fortalecimento = MontaJsonSecao('Fortalecimento')
            let Limpeza = MontaJsonSecao('Limpeza')
            let Alerta = MontaJsonSecao('Alerta')
            const formData = new FormData()
            formData.append('tra_id_aco', acolhido)
            formData.append('tra_id_col', colaborador)
            formData.append('tra_id_tit', tipotratamento)
            formData.append('tra_id_stt', status)
            formData.append('tra_passe', Passe)
            formData.append('tra_foco_energetico', Energetico)
            formData.append('tra_cond_energetica', Condicao)
            formData.append('tra_fortalecimento', Fortalecimento)
            formData.append('tra_limpeza', Limpeza)
            formData.append('tra_alerta', Alerta)
            formData.append('tra_pri_impressao', primeiro)
            axios
            .post(`${endpoint}/tratamento`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                //setSaved(!saved)
                let valor = 'ListaTratamentos'
                setLoadsave(false)
                addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                    tela(valor)
                }, 2000)
            })
        } else {
            setLoadsave(true)
            let Passe = MontaJsonSecao('Passe')
            let Energetico = MontaJsonSecao('Energetico')
            let Condicao = MontaJsonSecao('Condicao')
            let Fortalecimento = MontaJsonSecao('Fortalecimento')
            let Limpeza = MontaJsonSecao('Limpeza')
            let Alerta = MontaJsonSecao('Alerta')
            const formData = new FormData()
            formData.append('tra_id_aco', acolhido)
            formData.append('tra_id_col', colaborador)
            formData.append('tra_id_tit', tipotratamento)
            formData.append('tra_id_stt', status)
            formData.append('tra_passe', Passe)
            formData.append('tra_foco_energetico', Energetico)
            formData.append('tra_cond_energetica', Condicao)
            formData.append('tra_fortalecimento', Fortalecimento)
            formData.append('tra_limpeza', Limpeza)
            formData.append('tra_alerta', Alerta)
            formData.append('tra_pri_impressao', primeiro)
            formData.append('_method', 'put')
            axios
            .post(`${endpoint}/tratamento/${idtratamento}`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setLoadsave(false)
                addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                    tela('ListaTratamentos')
                }, 2000)
            })
        }
    }

   const handleClick = (event,valor) =>{
      event.preventDefault();

      if(valor == 'ListaTratamentos'){
         scrollToId('tratamento-id')
         tela(valor)
      }

      if(valor == 'ControlePresenca'){
         console.log('acolhido'+acolhido)
         setratamento(param)
         setacolhido(acolhido)
         tela(valor)
      }

   }

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

     //const CompTabela

     const AbreModal = () =>{
       let data = formatDate(new Date());
       setDataocorrencia(data)
       setAcaomodal('novo')
       setOpenModal(true)
     }

     const CorpoTabela = (props) =>{
           let classe = null
           let cont = 0
           return(
              props.lista.map((item,index)=>{
                 cont++
                 classe = index % 2 == 0 ? 'primary' : 'secondary'
                 if(cont > 5){
                    return
                 } else {
                    return(
                     <CTableRow color={classe}>
                         <CTableDataCell>#</CTableDataCell>
                         {/* <CTableDataCell>{item.ocp_id_tra}</CTableDataCell> */}
                         <CTableDataCell>{item.ocp_tipoocorrencia}</CTableDataCell>
                         <CTableDataCell>{item.ocp_descricao}</CTableDataCell>
                         <CTableDataCell>{item.ocp_created_at}</CTableDataCell>
                         <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.ocp_id_ocp} /></CTableDataCell>
                         {/* <CTableDataCell style={{textAlign:'center'}}></CTableDataCell> */}
                         </CTableRow>
                    )
                 }
              })
           )
    }

    //--> Display dos Ícones no grid
      const ItensAcao = (props) => {
        return(
           <>
           <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
           &nbsp;
           <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
           </>
        )
      }


    const EditaRegistro = (event,id) =>{
       let dadosedita = listaocorrenciapasse.filter((item)=>item.ocp_id_ocp == id)
       setDadoseditamodal(dadosedita[0])
       console.log(dadosedita[0])
       setAcaomodal('edit')
       setIdocorrencia(id)
       setOpenModal(true)
       console.log('id:'+id)
    }

    const AtualizaTabela = () =>{
        setLoadtabela(true)
        axios.get(`${endpoint}/ocorrenciapasse?listagem=S&tratamento=${idtratamento}`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           let lista =  result.data.data.sort((a,b)=>b.ocp_id_ocp > a.ocp_id_ocp)
           setEst(!est)
           setLoadtabela(false)
           setListaocorrenciapasse(lista)
        })
    }


    return(
        <div data-aos="zoom-in">
            <section id="tratamento-id" class="hero section light-background">
            <div class="container section-title box-title mb-2" data-aos="fade-up">
                <h2> Tratamento </h2>
                <p>Cadastro</p>
            </div>
                <div class="container">
                        {/* <ModalProgramacao open={openmodal} close={closeModal} imagem={imagem}/> */}
                        <ModalOcorrencia
                            open={openmodal}
                            close={closeModal}
                            lista={listaocorrencia}
                            data={dataocorrencia}
                            idtra={idtratamento}
                            acao={acaomodal}
                            idedita={idocorrencia}
                            dados={dadoseditamodal}
                            funcload={AtualizaTabela}
                        />
                        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                        <CCard>
                            <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />
                            { idtratamento == null ? 'Efetuar Novo Tratamento' : 'Alterar Tratamento Nº '+param}
                            </CCardHeader>
                            <CCardBody>
                                <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                                    <CRow className='mt-3'>
                                        <CCol md={6}>
                                            { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                            : (
                                            <CFormSelect
                                                id="idAcolhido"
                                                label="Paciente Acolhido"
                                                value={acolhido}
                                                feedbackInvalid="O Acolhido deve ser informado"
                                                onChange={(e)=>mudaAcolhido(e.target.value)}
                                                required
                                            >
                                            <CompAcolhido/>
                                            </CFormSelect>)}
                                        </CCol>
                                        <CCol md={6}>
                                            { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                            : (
                                            <CFormSelect
                                                id="idColaborador"
                                                label="Entrevistador (Colaborador)"
                                                value={colaborador}
                                                feedbackInvalid="O Entrevistador deve  ser informado"
                                                onChange={(e)=>setColaborador(e.target.value)}
                                                required
                                            >
                                            <CompColaborador/>
                                            </CFormSelect>)}
                                        </CCol>
                                        <CCol md={6}>
                                                { loadpage
                                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                                : (
                                                <CFormInput
                                                    type="text"
                                                    id="IdIdade"
                                                    label="Idade"
                                                    defaultValue={idade}
                                                    feedbackInvalid="Please provide a valid zip."
                                                    readOnly
                                                    required
                                                />)}
                                        </CCol>
                                        <CCol md={6}>
                                                { loadpage
                                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                                : (
                                                <CFormInput
                                                    type="text"
                                                    id="IdCadastro"
                                                    label="Data da Entrevista"
                                                    defaultValue={cadastro}
                                                    feedbackInvalid="Please provide a valid zip."
                                                    readOnly
                                                    required
                                                />)}
                                        </CCol>
                                        <CCol md={6}>
                                            { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                            : (
                                            <CFormSelect
                                                id="idTipo"
                                                label="Tipo de Tratamento"
                                                value={tipotratamento}
                                                feedbackInvalid="O tipo de Tratamento deve ser informado"
                                                onChange={(e)=>setTipotratamento(e.target.value)}
                                                required
                                            >
                                            <CompTipoPasse/>
                                            </CFormSelect>)}
                                        </CCol>
                                        <CCol md={6}>
                                            { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                            : (
                                            <CFormSelect
                                                id="idStatus"
                                                label="Status Tratamento"
                                                value={status}
                                                feedbackInvalid="O Status Tratamento deve ser informado"
                                                onChange={(e)=>setStatus(e.target.value)}
                                                required
                                            >
                                            <CompStatus/>
                                            </CFormSelect>)}
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">OBJETIVO DO PASSE</CBadge></div></CCol>
                                            <CompPasse/>
                                            </>)}

                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad80full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">FOCO ENERGÉTICO</CBadge></div></CCol>
                                            <CompFoco/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">CONDIÇÃO ENERGÉTICA OBSERVADA</CBadge></div></CCol>
                                            <CompCondicao/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">FORTALECIMENTO/REFAZIMENTO</CBadge></div></CCol>
                                            <CompFortalecimento/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">LIMPEZA E DESOBSESSÃO</CBadge></div></CCol>
                                            <CompLimpeza/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">ALERTAS DE SEGURANÇA (Reações do corpo físico)</CBadge></div></CCol>
                                            <CompAlerta/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">PRIMEIRAS IMPRESSÕES DO ATENDIMENTO:</CBadge></div></CCol>
                                            <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Informe a Descrição"
                                                    rows={10}
                                                    value={primeiro}
                                                    text="Deve conter até 3500 caracteres"
                                                    feedbackInvalid="A Descrição deve ser informada"
                                                    onChange={(e)=>setPrimeiro(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={estiloocorrencia}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">INFORMAÇÕES E OCORRÊNCIAS DURANTE OS PASSES:</CBadge></div></CCol>
                                            <div>
                                                <CButton size="sm" color="primary" style={{background:'#6895C1'}} className="mt-2 mb-3" onClick={(e)=>AbreModal()}>
                                                    Nova Ocorrência&nbsp;<FontAwesomeIcon size="lg" icon={faCirclePlus} />
                                                    </CButton>
                                            </div>
                                            <CTable className='tabela'>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Tipo</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Descrição</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        {/* <CorpoTabela lista={listaocorrenciapasse} estado={est}/> */}
                                                        {loadpage == false || loadtabela == false
                                                        ? (<CorpoTabela lista={listaocorrenciapasse} estado={est}/>)
                                                        : (<CTableRow><CTableDataCell colspan="5" style={{textAlign:'center'}}><CSpinner color="info"></CSpinner></CTableDataCell></CTableRow>)}
                                                    </CTableBody>
                                                </CTable>
                                            </>)}
                                    </CRow>
                                    <CCol>
                                        <CButton color="primary" type="submit">
                                        <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                        {' '}
                                        {loadsave? <CSpinner size="sm" /> : ''}
                                        </CButton>
                                        {' '}
                                        {/* <CButton color="danger" type="button" ><FontAwesomeIcon size="lg" icon={faFilePdf} />&nbsp;Imprimir Ficha</CButton> */}
                                        <CButton as="a" color="danger" role="button" target="_blank" href={endpoint_report+'/relatorio/fichatratamento?id='+param+'&relatorio=tratamento'}><FontAwesomeIcon size="lg" icon={faFilePdf} />&nbsp;Imprimir Ficha</CButton>
                                        {' '}
                                        <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaTratamentos')}>Listar Tratamentos</CButton>
                                        {' '}
                                        {loadtabela == false
                                          ?(<CButton color="info" type="button" onClick={(e)=>handleClick(e,'ControlePresenca')}>Gerar Presença</CButton>)
                                          :(<></>)}
                                    </CCol>
                                </CForm>
                            </CCardBody>
                        </CCard>
                </div>
            </section>
        </div>
    )
}


export default Tratamento
