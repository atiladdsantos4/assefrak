import { React, useEffect, useState, Suspense, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CFormTextarea,CBadge,CCollapse} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowUp, faArrowDown, faThumbsUp, faPerson, faSave, faCheck, faFile, faTrash, faEdit, faPlus, faCirclePlus,faFilePdf,faList } from '@fortawesome/free-solid-svg-icons';
import ListaFocoEnergetico from '../listagem/ListaFocoEnergetico';
import ModalAvaliacao from '../componentes/ModalAvaliacao';



// The Main component receives props passed from the Laravel controller
const FichaEntrevista = (props) => {
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
    const [idficha, setIdficha] = useState(null)
    const [idretorno, setIdRetorno] = useState(null)
    const [idacolhidoocorrencia, setIdacolhidoocorrencia] = useState(null)
    const [dadoseditamodal, setDadoseditamodal] = useState(null)
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [motivo, setMotivo] = useState('')
    const [obshumor, setObshumor] = useState('')
    const [obsreativa, setObsreativa] = useState('')
    const [obspassivo, setObspassivo] = useState('')
    const [obscognicao, setObscognicao] = useState('')
    const [obsgravidade, setObsgravidade] = useState('')
    const [obspercebida, setObspercebida] = useState('')
    const [anotacao, setAnotacao] = useState('')
    const [ativo, setAtivo] = useState(false)
    //campos json//
    ///Humor Reativo Passivo Sono Gravidade Relatada DiaPasse OrientacaoCasa OrientacaoExterna
    const [humor, setHumor] = useState('')
    const [reativo, setReativo] = useState('')
    const [passivo, setPassivo] = useState('')
    const [sono, setSono] = useState('')
    const [gravidade, setGravidade] = useState('')
    const [relatada, setRelatada] = useState('')
    const [diapasse, setDiaPasse] = useState('')
    const [orientacaocasa, setOrientacaoCasa] = useState('')
    const [orientacaoexterna, setOrientacaoExterna] = useState('')

    //const [listacollapse, setListacollapse] = useState([])
    /*
    let result_humor = responses[2]
                let result_relatada = responses[3]
                let result_passivo = responses[4]
                let result_reativo = responses[5]
                let result_sono = responses[6]
                let result_gravidade = responses[7]
                let result_percebida = responses[8]
                let result_diapasse = responses[9]
    */
    const [listacolaborador, setListacolaborador] = useState([])
    const [listaacolhido, setListaacolhido] = useState([])
    const [listahumor, setListahumor] = useState([])
    const [listarelatada, setListarelatada] = useState([])
    const [listapassivo, setListapassivo] = useState([])
    const [listareativo, setListareativo] = useState([])
    const [listasono, setListasono] = useState([])
    const [listagravidade, setListagravidade] = useState([])
    const [listapercebida, setListapercebida] = useState([])
    const [listadiapasse, setListadiapasse] = useState([])
    const [listaorientacaocasa, setListaorientacaocasa] = useState([])
    const [listaorientacaoexterna, setListaorientacaoexterna] = useState([])

    const [listastatus, setListastatus] = useState([])
    const [listaretorno, setListaretorno] = useState([])
    const [listaretornopasse, setListaretornopasse] = useState([])
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
    const style_color = {color:'#6895C1'}
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

    const arr_collapse = [
       {
         id:1,
         titulo:'relatada',
         exibe:false
       },
       {
         id:2,
         titulo:'reativo',
         exibe:false
       },
       {
         id:3,
         titulo:'passivo',
         exibe:false
       },
       {
         id:4,
         titulo:'sono',
         exibe:false
       },
       {
         id:5,
         titulo:'gravidade ',
         exibe:false
       },
       {
         id:6,
         titulo:'relatadas',
         exibe:false
       },
       {
         id:7,
         titulo:'totods',
         exibe:false
       },
    ]

    const [listacollapse, setListacollapse] = useState(arr_collapse);

    useEffect(()=>{
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
                    axios.get(`${endpoint}/humor?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicoesrelatada?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/comportamentopassivo?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/comportamentoreativo?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/cognicaosono?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/gravidadeclinica?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicaopercebida?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/diapasse?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/orientacaocasa?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/orientacaoexterna?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                     axios.get(`${endpoint}/fichaentrevista/${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),


                ]
                const responses = await Promise.all(requests);

                let result_colaborador = responses[0]
                let result_acolhido = responses[1]
                let result_humor = responses[2]
                let result_relatada = responses[3]
                let result_passivo = responses[4]
                let result_reativo = responses[5]
                let result_sono = responses[6]
                let result_gravidade = responses[7]
                let result_percebida = responses[8]
                let result_diapasse = responses[9]
                let result_oricasa = responses[10]
                let result_oriexterna = responses[11]
                let result_ficha = responses[12]
                setIdficha(result_ficha.data.data.fie_id_fie)
                setAcolhido(result_ficha.data.data.fie_id_aco)
                setColaborador(result_ficha.data.data.fie_id_col)
                setCadastro(result_ficha.data.data.fie_created_at)
                setIdade(result_ficha.data.data.fie_acolhido.aco_idade)
                setMotivo(result_ficha.data.data.fie_motivo)

                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(array_col)
                let array_aco = result_acolhido.data.data
                array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                setListaacolhido(array_aco)
                setListahumor(result_ficha.data.data.fie_humor.meta)
                setObshumor(result_ficha.data.data.fie_desc_humor)
                setListareativo(result_ficha.data.data.fie_reativos.meta)
                setObsreativa(result_ficha.data.data.fie_desc_reativos)
                setListapassivo(result_ficha.data.data.fie_passivos.meta)
                setObspassivo(result_ficha.data.data.fie_desc_passivos)
                setListasono(result_ficha.data.data.fie_sono.meta)
                setObscognicao(result_ficha.data.data.fie_desc_sono)
                setListagravidade(result_ficha.data.data.fie_gravidade.meta)
                setObsgravidade(result_ficha.data.data.fie_desc_gravidade)
                setListarelatada(result_ficha.data.data.fie_percebidas.meta)
                setObspercebida(result_ficha.data.data.fie_desc_percebidas)
                setListadiapasse(result_ficha.data.data.fie_diapasse.meta)
                setListaorientacaocasa(result_ficha.data.data.fie_orientacoes_casa.meta)
                setListaorientacaoexterna(result_ficha.data.data.fie_orientacoes_externa.meta)
                setAnotacao(result_ficha.data.data.fie_anotacao)
                let listaret  = result_ficha.data.data.fie_retorno.sort((a,b)=>b.fir_id_fir > a.fir_id_fir)
                setListaretornopasse(listaret)
                setLoadpage(false)
                setLoadtabela(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
      } else {
        let data = formatDate(new Date());
        console.log('parametro_col:'+props.param)
        setCadastro(data)
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
                    axios.get(`${endpoint}/humor?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicoesrelatada?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/comportamentopassivo?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/comportamentoreativo?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/cognicaosono?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/gravidadeclinica?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicaopercebida?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/diapasse?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/orientacaocasa?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/orientacaoexterna?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                                    ]
                const responses = await Promise.all(requests);
                let result_colaborador = responses[0]
                let result_acolhido = responses[1]
                let result_humor = responses[2]
                let result_relatada = responses[3]
                let result_passivo = responses[4]
                let result_reativo = responses[5]
                let result_sono = responses[6]
                let result_gravidade = responses[7]
                let result_percebida = responses[8]
                let result_diapasse = responses[9]
                let result_oricasa = responses[10]
                let result_oriexterna = responses[11]
                setListahumor(result_humor.data.data)
                setListarelatada(result_relatada.data.data)
                setListapassivo(result_passivo.data.data)
                setListareativo(result_reativo.data.data)
                setListasono(result_sono.data.data)
                setListagravidade(result_gravidade.data.data)
                setListapercebida(result_percebida.data.data)
                setListadiapasse(result_diapasse.data.data)
                setListaorientacaocasa(result_oricasa.data.data)
                setListaorientacaoexterna(result_oriexterna.data.data)

                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(array_col)
                let array_aco = result_acolhido.data.data
                array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                setListaacolhido(array_aco)
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
            handleSave()
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

    const setAtivoHumor = (id,value) =>{
       setListahumor(prevItems =>
          prevItems.map(item =>
             item.hue_id_hue === id ? { ...item, hue_ativo: value } : item
          )
       )
       //console.log(listahumor)
    }

    const setAtivoReativo = (id,value) =>{
       setListareativo(prevItems =>
          prevItems.map(item =>
             item.cpr_id_cpr === id ? { ...item, cpr_ativo: value } : item
          )
       )
      console.log(listareativo)
    }

    const setAtivoPassivo = (id,value) =>{
       setListapassivo(prevItems =>
          prevItems.map(item =>
             item.cpp_id_cpp === id ? { ...item, cpp_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoSono = (id,value) =>{
       setListasono(prevItems =>
          prevItems.map(item =>
             item.cos_id_cos === id ? { ...item, cos_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoGravidade = (id,value) =>{
       setListagravidade(prevItems =>
          prevItems.map(item =>
             item.gac_id_gac === id ? { ...item, gac_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoRelatada = (id,value) =>{
       setListarelatada(prevItems =>
          prevItems.map(item =>
             item.cor_id_cor === id ? { ...item, cor_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoDiaPasse = (id,value) =>{
       setListadiapasse(prevItems =>
          prevItems.map(item =>
             item.dip_id_dip === id ? { ...item, dip_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoOriCasa = (id,value) =>{
       setListaorientacaocasa(prevItems =>
          prevItems.map(item =>
             item.orc_id_orc === id ? { ...item, orc_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const setAtivoOriExterna = (id,value) =>{
       setListaorientacaoexterna(prevItems =>
          prevItems.map(item =>
             item.ori_id_ori === id ? { ...item, ori_ativo: value } : item
          )
       )
       //console.log(listapasse)
    }

    const mudaAcolhido =  (valor) =>{
        let idade = listaacolhido.filter((item)=>item.aco_id_aco == valor)
        setIdade(idade[0].aco_idade)
        setAcolhido(valor)
    }

    const CompHumor = () =>{
       return(
          listahumor.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.hue_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.hue_ativo}
                        onChange={(e)=>setAtivoHumor(item.hue_id_hue,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompReativo = () =>{
       return(
          listareativo.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.cpr_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.cpr_ativo}
                        onChange={(e)=>setAtivoReativo(item.cpr_id_cpr,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompPassivo = () =>{
       return(
          listapassivo.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.cpp_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.cpp_ativo}
                        onChange={(e)=>setAtivoPassivo(item.cpp_id_cpp,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompSono = () =>{
       return(
          listasono.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.cos_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.cos_ativo}
                        onChange={(e)=>setAtivoSono(item.cos_id_cos,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompGravidade = () =>{
       return(
          listagravidade.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.gac_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.gac_ativo}
                        onChange={(e)=>setAtivoGravidade(item.gac_id_gac,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompRelatada = () =>{
       return(
          listarelatada.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.cor_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.cor_ativo}
                        onChange={(e)=>setAtivoRelatada(item.cor_id_cor,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompDiaPasse = () =>{
       return(
          listadiapasse.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.dip_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.dip_ativo}
                        onChange={(e)=>setAtivoDiaPasse(item.dip_id_dip,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
        )
    }

    const CompOrientacaoCasa = () =>{
        return(
          listaorientacaocasa.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.orc_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.orc_ativo}
                        onChange={(e)=>setAtivoOriCasa(item.orc_id_orc,e.target.checked)}
                        // required
                    />
                </CCol>
             )
          })
       )
    }

    const CompOrientacaoExterna = () =>{
        return(
          listaorientacaoexterna.map((item,index)=>{
             return(
                <CCol md={4}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label={item.ori_descricao}
                        feedbackInvalid="Informe se Colaborador esta Ativo"
                        checked={item.ori_ativo}
                        onChange={(e)=>setAtivoOriExterna(item.ori_id_ori,e.target.checked)}
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

            case 'Humor':
                arrayitens = []
                listahumor.map((item,index)=>{
                    obj ={
                        hue_id_hue:item.hue_id_hue,
                        hue_ativo:item.hue_ativo,
                        hue_descricao:item.hue_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
             break
            case 'Reativo':
                arrayitens = []
                listareativo.map((item,index)=>{
                    obj ={
                        cpr_id_cpr:item.cpr_id_cpr,
                        cpr_ativo:item.cpr_ativo,
                        cpr_descricao:item.cpr_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
            case 'Passivo':
                arrayitens = []
                listapassivo.map((item,index)=>{
                    obj ={
                        cpp_id_cpp:item.cpp_id_cpp,
                        cpp_ativo:item.cpp_ativo,
                        cpp_descricao:item.cpp_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
            case 'Sono':
                arrayitens = []
                listasono.map((item,index)=>{
                    obj ={
                        cos_id_cos:item.cos_id_cos,
                        cos_ativo:item.cos_ativo,
                        cos_descricao:item.cos_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
                break
            case 'Gravidade':
                arrayitens = []
                listagravidade.map((item,index)=>{
                    obj ={
                        gac_id_gac:item.gac_id_gac,
                        gac_ativo:item.gac_ativo,
                        gac_descricao:item.gac_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
                break
            case 'Relatada':
                arrayitens = []
                listarelatada.map((item,index)=>{
                    obj ={
                        cor_id_cor:item.cor_id_cor,
                        cor_ativo:item.cor_ativo,
                        cor_descricao:item.cor_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
            case 'DiaPasse':
                arrayitens = []
                listadiapasse.map((item,index)=>{
                    obj ={
                        dip_id_dip:item.dip_id_dip,
                        dip_ativo:item.dip_ativo,
                        dip_descricao:item.dip_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
            case 'OrientacaoCasa':
                arrayitens = []
                listaorientacaocasa.map((item,index)=>{
                    obj ={
                        orc_id_orc:item.orc_id_orc,
                        orc_ativo:item.orc_ativo,
                        orc_descricao:item.orc_descricao
                    }
                    arrayitens.push(obj)
                })
                objfinal = {
                    "meta":arrayitens
                }
                return JSON.stringify(objfinal)
              break
           case 'OrientacaoExterna':
                arrayitens = []
                listaorientacaoexterna.map((item,index)=>{
                    obj ={
                        ori_id_ori:item.ori_id_ori,
                        ori_ativo:item.ori_ativo,
                        ori_descricao:item.ori_descricao
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
       //Humor Reativo Passivo Sono Gravidade Relatada DiaPasse OrientacaoCasa OrientacaoExterna
       setHumor(MontaJsonSecao('Humor'))
       setReativo(MontaJsonSecao('Reativo'))
       setPassivo(MontaJsonSecao('Passivo'))
       setSono(MontaJsonSecao('Sono'))
       setGravidade(MontaJsonSecao('Gravidade'))
       setRelatada(MontaJsonSecao('Relatada'))
       setDiaPasse(MontaJsonSecao('DiaPasse'))
       setOrientacaoCasa(MontaJsonSecao('OrientacaoCasa'))
       setOrientacaoExterna(MontaJsonSecao('OrientacaoExterna'))

    }

    const  handleSave = () =>{
        //CriaJson()
        if( idficha == null) {
            setLoadsave(true)
            let Humor  = MontaJsonSecao('Humor')
            let Reativo  = MontaJsonSecao('Reativo')
            let Passivo  = MontaJsonSecao('Passivo')
            let Sono = MontaJsonSecao('Sono')
            let Gravidade = MontaJsonSecao('Gravidade')
            let Relatada = MontaJsonSecao('Relatada')
            let DiaPasse = MontaJsonSecao('DiaPasse')
            let OrientacaoCasa = MontaJsonSecao('OrientacaoCasa')
            let OrientacaoExterna = MontaJsonSecao('OrientacaoExterna')

            const formData = new FormData()
            formData.append('fie_id_aco',acolhido)
            formData.append('fie_id_col',colaborador)
            //formData.append('fie_id_tra',)
            formData.append('fie_motivo',motivo)
            formData.append('fie_humor',Humor)
            formData.append('fie_desc_humor',obshumor)
            formData.append('fie_reativos',Reativo)
            formData.append('fie_desc_reativos',obsreativa)
            formData.append('fie_passivos',Passivo)
            formData.append('fie_desc_passivos',obspassivo)
            formData.append('fie_sono',Sono)
            formData.append('fie_desc_sono',obscognicao)
            formData.append('fie_gravidade',Gravidade)
            formData.append('fie_desc_gravidade',obsgravidade)
            formData.append('fie_percebidas',Relatada)
            formData.append('fie_desc_percebidas',obspercebida)
            formData.append('fie_diapasse',DiaPasse)
            formData.append('fie_orientacoes_casa',OrientacaoCasa)
            formData.append('fie_orientacoes_externa',OrientacaoExterna)
            formData.append('fie_anotacao',anotacao)
            formData.append('fie_ativo',1)
            axios
            .post(`${endpoint}/fichaentrevista`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                //setSaved(!saved)
                let valor = 'ListaFichaEntrevista'
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
            let Humor  = MontaJsonSecao('Humor')
            let Reativo  = MontaJsonSecao('Reativo')
            let Passivo  = MontaJsonSecao('Passivo')
            let Sono = MontaJsonSecao('Sono')
            let Gravidade = MontaJsonSecao('Gravidade')
            let Relatada = MontaJsonSecao('Relatada')
            let DiaPasse = MontaJsonSecao('DiaPasse')
            let OrientacaoCasa = MontaJsonSecao('OrientacaoCasa')
            let OrientacaoExterna = MontaJsonSecao('OrientacaoExterna')

            const formData = new FormData()
            formData.append('fie_id_aco',acolhido)
            formData.append('fie_id_col',colaborador)
            //formData.append('fie_id_tra',)
            formData.append('fie_motivo',motivo)
            formData.append('fie_humor',Humor)
            formData.append('fie_desc_humor',obshumor)
            formData.append('fie_reativos',Reativo)
            formData.append('fie_desc_reativos',obsreativa)
            formData.append('fie_passivos',Passivo)
            formData.append('fie_desc_passivos',obspassivo)
            formData.append('fie_sono',Sono)
            formData.append('fie_desc_sono',obscognicao)
            formData.append('fie_gravidade',Gravidade)
            formData.append('fie_desc_gravidade',obsgravidade)
            formData.append('fie_percebidas',Relatada)
            formData.append('fie_desc_percebidas',obspercebida)
            formData.append('fie_diapasse',DiaPasse)
            formData.append('fie_orientacoes_casa',OrientacaoCasa)
            formData.append('fie_orientacoes_externa',OrientacaoExterna)
            formData.append('fie_anotacao',anotacao)
            formData.append('fie_ativo',1)
            formData.append('_method', 'put')
            axios
            .post(`${endpoint}/fichaentrevista/${idficha}`, formData, {
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
                    tela('ListaFichaEntrevista')
                }, 2000)
            })
        }
    }

   const handleClick = (event,valor) =>{
      event.preventDefault();

      if(valor == 'ListaFichaEntrevista'){
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
                         <CTableDataCell>{item.fir_sequencia+'º Retorno'}</CTableDataCell>
                         <CTableDataCell>{item.colaborador?.col_name || item.fir_colaborador}</CTableDataCell>
                         <CTableDataCell>{item.fir_observacao}</CTableDataCell>
                         <CTableDataCell>{item.fir_data_retorno}</CTableDataCell>
                         <CTableDataCell>{item.fir_created_at}</CTableDataCell>
                         <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.fir_id_fir} /></CTableDataCell>
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
       let dadosedita = listaretornopasse.filter((item)=>item.fir_id_fir == id)
       setDadoseditamodal(dadosedita[0])
       console.log(dadosedita[0])
       setAcaomodal('edit')
       setIdRetorno(id)
       setOpenModal(true)
       console.log('id:'+id)
    }

    const AtualizaTabela = () =>{
        setLoadtabela(true)
        axios.get(`${endpoint}/ficharetorno?listagem=S&entrevista=${idficha}`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           let lista =  result.data.data.sort((a,b)=>b.fir_id_fir > a.fir_id_fir)
           setEst(!est)
           setLoadtabela(false)
           setListaretornopasse(lista)
        })
    }

 const ImageHeader = () =>{
     return(
        <div style={{position:'relative',top:'4px'}}>
        <img class="img-fluid" style={{borderRadius:'5px'}} src={imagem+'telas/logoheadercadastro.png'}/>
        <div style={{fontSize:'24px',position:'relative',left:'-65px',top:'-35px',color:'white',fontWeight:'bold'}}>
            Ficha Entrevistas
         </div>
        </div>
    )
 }

 const mudaCollapse = (id) =>{
    if(id == 7){
       mudaTodosCollapse()
       return
    }
    setListacollapse(prevItems =>
        prevItems.map(item =>
            item.id === id
                ? { ...item, exibe: !item.exibe }
                : item
        )
    )
    console.log(listacollapse)
 }

 const mudaTodosCollapse = () => {
    setListacollapse(prevItems => {
        const todosExibidos = prevItems.every(item => item.exibe);

        return prevItems.map(item => ({
            ...item,
            exibe: !todosExibidos
        }));
    });
};


    return(
        <div data-aos="zoom-in">
            <section id="tratamento-id" class="hero section light-background">
            <div class="container section-title box-title mb-2" data-aos="fade-up">
                <ImageHeader/>
                {/* <h2> FichaEntrevista </h2>
                <p>Cadastro</p> */}
            </div>
                <div class="container">
                        {/* <ModalProgramacao open={openmodal} close={closeModal} imagem={imagem}/> */}
                        <ModalAvaliacao
                            open={openmodal}
                            close={closeModal}
                            lista={listaretorno}
                            data={dataocorrencia}
                            idfie={idficha}
                            idcol={colaborador}
                            acao={acaomodal}
                            idedita={idretorno}
                            dados={dadoseditamodal}
                            funcload={AtualizaTabela}
                        />
                        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                        <CCard>
                            <CCardHeader className="fundo_head">
                                <FontAwesomeIcon size="lg" icon={faPerson} />{' '}

                                {idficha == null
                                    ? 'Realizar Nova Ficha de Entrevista'
                                    : (
                                        <>
                                            Alterar Ficha Entrevista Nº{' '}
                                            <span
                                                style={{
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    verticalAlign: 'middle'
                                                }}
                                                className="circle_ficha text-ficha"
                                            >
                                                {param}
                                            </span>
                                        </>
                                    )
                                }
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
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">Motivo da Busca:</CBadge></div> */}
                                                <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Informe a Motivo"
                                                    rows={4}
                                                    value={motivo}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="O Motivo deve ser informada"
                                                    onChange={(e)=>setMotivo(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                                </CCol>
                                            </>)}
                                        {/* <CCol md={6}>
                                            { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                            : (
                                            <CFormSelect
                                                id="idTipo"
                                                label="Tipo de FichaEntrevista"
                                                value={tipotratamento}
                                                feedbackInvalid="O tipo de FichaEntrevista deve ser informado"
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
                                                label="Status FichaEntrevista"
                                                value={status}
                                                feedbackInvalid="O Status FichaEntrevista deve ser informado"
                                                onChange={(e)=>setStatus(e.target.value)}
                                                required
                                            >
                                            <CompStatus/>
                                            </CFormSelect>)}
                                        </CCol> */}
                                    </CRow>
                                    {/* <CRow>
                                        <CCol className="d-flex justify-content-center">
                                            <CBadge className="badgeazul">Expandir Todos</CBadge>
                                        </CCol>
                                    </CRow> */}
                                    <CRow>
                                        <CCol className="d-flex justify-content-center align-items-center gap-2">
                                            <CBadge className="badgeazul">Expandir Todos</CBadge>
                                            <div
                                                onClick={() => mudaCollapse(7)}
                                                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                className="circle_gray text-assefrak"
                                            >
                                                {listacollapse?.[6]?.exibe
                                                    ? <FontAwesomeIcon size="sm" icon={faArrowUp} />
                                                    : <FontAwesomeIcon size="sm" icon={faArrowDown} />
                                                }
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                <div style={{width:'300px'}}>
                                                    <div style={{display:'flex',gap: '5px'}}>
                                                        <div style={{float:'left'}}><CBadge className="badgeazul">HUMOR E ENERGIA:</CBadge></div>
                                                        <div onClick={()=>mudaCollapse(1)}style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-assefrak">
                                                            { listacollapse?.[0]?.exibe ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </CCol>
                                            <CompHumor/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCollapse visible={listacollapse[0].exibe}>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">Motivo da Busca:</CBadge></div> */}
                                                  <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Observação do Entrevistador"
                                                    rows={4}
                                                    value={obshumor}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="Observação do Entrevistador deve ser informada"
                                                    onChange={(e)=>setObshumor(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                                </CCol>
                                            </CCollapse>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad80full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">COMPORTAMENTOS REATIVOS:</CBadge></div> */}
                                                <div style={{width:'300px'}}>
                                                    <div style={{display:'flex',gap: '5px'}}>
                                                        <div style={{float:'left'}}><CBadge className="badgeazul">COMPORTAMENTOS REATIVOS:</CBadge></div>
                                                        <div onClick={()=>mudaCollapse(2)}style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-assefrak">
                                                            { listacollapse?.[1]?.exibe ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </CCol>
                                            <CompReativo/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCollapse visible={listacollapse[1].exibe}>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">Motivo da Busca:</CBadge></div> */}
                                                <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Observação do Entrevistador"
                                                    rows={4}
                                                    value={obsreativa}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="Observação do Entrevistador deve ser informada"
                                                    onChange={(e)=>setObsreativa(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                                </CCol>
                                             </CCollapse>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">COMPORTAMENTOS PASSIVOS</CBadge></div> */}
                                                <div style={{width:'300px'}}>
                                                    <div style={{display:'flex',gap: '5px'}}>
                                                        <div style={{float:'left'}}><CBadge className="badgeazul">COMPORTAMENTOS PASSIVOS:</CBadge></div>
                                                        <div onClick={()=>mudaCollapse(3)}style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-assefrak">
                                                            { listacollapse?.[2]?.exibe ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </CCol>
                                            <CompPassivo/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCollapse visible={listacollapse[2].exibe}>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Observação do Entrevistador"
                                                    rows={4}
                                                    value={obspassivo}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="Observação do Entrevistador deve ser informada"
                                                    onChange={(e)=>setObspassivo(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                            </CCol>
                                            </CCollapse>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">COGNIÇÃO E SONO</CBadge></div> */}
                                                <div style={{width:'300px'}}>
                                                    <div style={{display:'flex',gap: '5px'}}>
                                                        <div style={{float:'left'}}><CBadge className="badgeazul">COGNIÇÃO E SONO:</CBadge></div>
                                                        <div onClick={()=>mudaCollapse(4)}style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-assefrak">
                                                            { listacollapse?.[3]?.exibe ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </CCol>
                                            <CompSono/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCollapse visible={listacollapse[3].exibe}>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">Motivo da Busca:</CBadge></div> */}
                                                <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Observação do Entrevistador"
                                                    rows={4}
                                                    value={obscognicao}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="Observação do Entrevistador deve ser informada"
                                                    onChange={(e)=>setObscognicao(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                                </CCol>
                                               </CCollapse>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">GRAVIDADE CLÍNICA</CBadge></div> */}
                                                 <div style={{width:'300px'}}>
                                                    <div style={{display:'flex',gap: '5px'}}>
                                                        <div style={{float:'left'}}><CBadge className="badgeazul">GRAVIDADE CLÍNICA:</CBadge></div>
                                                        <div onClick={()=>mudaCollapse(5)}style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-assefrak">
                                                            { listacollapse?.[4]?.exibe ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </CCol>
                                            <CompGravidade/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCollapse visible={listacollapse[4].exibe}>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">Motivo da Busca:</CBadge></div> */}
                                                <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Observação do Entrevistador"
                                                    rows={4}
                                                    value={obsgravidade}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="Observação do Entrevistador deve ser informada"
                                                    onChange={(e)=>setObsgravidade(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                            </CCol>
                                            </CCollapse>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">CONDIÇÕES PERCEBIDAS / RELATADAS</CBadge></div> */}
                                                <div style={{width:'300px'}}>
                                                    <div style={{display:'flex',gap: '5px'}}>
                                                        <div style={{float:'left'}}><CBadge className="badgeazul">CONDIÇÕES PERCEBIDAS / RELATADAS:</CBadge></div>
                                                        <div onClick={()=>mudaCollapse(6)}style={{marginTop:'0px',float:'left',cursor:'pointer',fontWeight:'bold'}} class="circle_gray text-assefrak">
                                                            { listacollapse?.[5]?.exibe ? <FontAwesomeIcon size="sm" icon={faArrowUp} /> : <FontAwesomeIcon size="sm" icon={faArrowDown} />}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </CCol>
                                            <CompRelatada/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCollapse visible={listacollapse[5].exibe}>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}>
                                                {/* <div style={{width:'200px'}}><CBadge className="badgeazul">Motivo da Busca:</CBadge></div> */}
                                                <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Observação do Entrevistador"
                                                    rows={4}
                                                    value={obspercebida}
                                                    text="Deve conter até 2000 caracteres"
                                                    feedbackInvalid="Observação do Entrevistador deve ser informada"
                                                    onChange={(e)=>setObspercebida(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                                </CCol>
                                                </CCollapse>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad80full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">DIA DO PASSE:</CBadge></div></CCol>
                                            <CompDiaPasse/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad80full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">ORIENTAÇÕES DADAS NA CASA:</CBadge></div></CCol>
                                            <CompOrientacaoCasa/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad80full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">ORIENTAÇÕES PARA ENCAMINHAMENTO EXTERNO:</CBadge></div></CCol>
                                            <CompOrientacaoExterna/>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={{marginLeft:'2px',border:'2px solid #6895C1',borderRadius:'5px'}}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">ANOTAÇÕES:</CBadge></div></CCol>
                                            <CFormTextarea
                                                    className="textarea_line"
                                                    id="exampleFormControlTextarea1"
                                                    label="Anotações Diversas"
                                                    rows={3}
                                                    value={anotacao}
                                                    text="Deve conter até 3500 caracteres"
                                                    feedbackInvalid="A Descrição deve ser informada"
                                                    onChange={(e)=>setAnotacao(e.target.value)}
                                                    required
                                                ></CFormTextarea>
                                            </>)}
                                    </CRow>
                                    <CRow className='mt-3 mb-3' style={estiloocorrencia}>
                                        { loadpage
                                            ? (<div style={style_placeholder}><CPlaceholder className='mt-2 grad68full' xs={12} size="lg"/></div>)
                                            : (<>
                                            <CCol className="mt-2 mb-3" md={12} xs={12}><div style={{width:'200px'}}><CBadge className="badgeazul">AVALIAÇÃO:</CBadge></div></CCol>
                                            <div>
                                                <CButton size="sm" color="primary" style={{background:'#6895C1'}} className="mt-2 mb-3" onClick={(e)=>AbreModal()}>
                                                    Nova Avaliação&nbsp;<FontAwesomeIcon size="lg" icon={faCirclePlus} />
                                                    </CButton>
                                            </div>
                                            <CTable className='tabela'>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Sequência</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Colaborador</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Descrição</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Retorno</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                                            <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        {/* <CorpoTabela lista={listaretornopasse} estado={est}/> */}
                                                        {loadpage == false || loadtabela == false
                                                        ? (<CorpoTabela lista={listaretornopasse} estado={est}/>)
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
                                        {idficha == null
                                        ? <></>
                                        : (<CButton as="a" color="danger" role="button" target="_blank" href={endpoint_report+'/relatorio/fichaentrevista?id='+param+'&relatorio=entrevista'}>
                                            Imprimir Ficha&nbsp;<FontAwesomeIcon size="lg" icon={faFilePdf} /></CButton>)}
                                        {' '}
                                        <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaFichaEntrevista')}>
                                            Listar Ficha de Entrevistas&nbsp;<FontAwesomeIcon size="lg" icon={faList} />
                                        </CButton>
                                        {' '}
                                        {loadtabela == false
                                          ?(<CButton color="info" type="button" onClick={(e)=>handleClick(e,'ControlePresenca')}>
                                            Gerar Presença&nbsp;<FontAwesomeIcon size="lg" icon={faThumbsUp} />
                                            </CButton>)
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


export default FichaEntrevista
