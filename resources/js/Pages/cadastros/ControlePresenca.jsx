import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,CTableHead,CRow,
  CBadge,CTooltip } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faPersonWalkingArrowRight, faTrash, faEdit, faFileLines, faThumbsUp,faMagnifyingGlass   } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import Tratamento from './Tratamento';
registerLocale("ptBR", ptBR);





// The Main component receives props Fortalecimentod from the Laravel controller
const ControlePresenca = (props) => {
  console.log(props.acolhidoparam)
  console.log(props.tratamento)
  const { tela, altera, setacolhido, tratamento, acolhidoparam } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [est, setEstado] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [loadficha, setLoadficha] = useState(false)
  const [loadgeraficha, setLoadgeraficha] = useState(false)
  const [loadtable, setLoadtable] = useState(false)
  const [idtratamento, setIdtratamento] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [colaborador, setColaborador] = useState('')
  const [acolhido, setAcolhido] = useState('')
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const [listacolaborador, setListacolaborador] = useState([])
  const [listaacolhido, setListaacolhido] = useState([])
  const [listatratamento, setListatratamento] = useState([])
  const [listaficha, setListaficha] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [pesquisar,setPesquisar] = useState(null)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(5)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  const customTooltipStyle = {
     '--cui-tooltip-color': '#888',
     '--cui-tooltip-bg': '#f2f4f6',
  }
  //ocu_id_aco,ocu_name,ocu_cpf,ocu_email,ocu_tipo_telefone,ocu_telefone,ocu_ativo,ocu_created_at,ocu_updated_at,ocu_deleted_at

  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.acolhidoparam != null){
        console.log('com paramentro acolhido'+props.acolhidoparam)
        console.log('com paramentro tratamento'+props.tratamento)
        const fetchData = async () => {
            setLoadpage(true)
            try {
                    const requests = [
                            axios.get(`${endpoint}/colaborador?listagem=S`,{
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                        Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                                    },
                            }),
                            axios.get(`${endpoint}/acolhido?listagem=S&tratamento=S`,{
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                        Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                                    },
                            }),
                            axios.get(`${endpoint}/tratamento?listagem=S&acolhido=${acolhidoparam}&tratamento=${tratamento}`,{
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
                    let result_tratamento = responses[2]
                    let array_col = result_colaborador.data.data
                    array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                    setListacolaborador(array_col)

                    let array_aco = result_acolhido.data.data
                    array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                    let array_final = []
                    let existe = null
                    array_aco.map((it,index)=>{
                       existe = array_final.filter((item)=> item.aco_id_aco == it.aco_id_aco)
                       if( existe.length == 0){
                          array_final.push({aco_id_aco:it.aco_id_aco,aco_name:it.aco_name})
                        }
                    })
                    console.log(array_final)
                    setListaacolhido(array_final)
                    setAcolhido(props.acolhidoparam)

                    setListatratamento(result_tratamento.data.data)
                    setListafiltro(result_tratamento.data.data)

                    setLoadpage(false)

            }
                catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()

    } else {
        console.log('sem paramentro')
        const fetchData = async () => {
            setLoadpage(true)
            try {
                const requests = [
                        axios.get(`${endpoint}/colaborador?listagem=S`,{
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                                },
                        }),
                        axios.get(`${endpoint}/acolhido?listagem=S&tratamento=S`,{
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

                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(array_col)

                let array_aco = result_acolhido.data.data
                array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                let array_final = []
                let existe = null
                array_aco.map((it,index)=>{
                    existe = array_final.filter((item)=> item.aco_id_aco == it.aco_id_aco)
                    if( existe.length == 0){
                        array_final.push({aco_id_aco:it.aco_id_aco,aco_name:it.aco_name})
                    }
                })
                console.log(array_final)
                setListaacolhido(array_final)
                setLoadpage(false)
                //qtderegistrospagina(qtderegistros)
                //   setListacolaborador(result_colaborador.data.data)
                //   setListaacolhido(result_acolhido.data.data)
            }
            catch (error) {
               console.error("One of the requests failed", error);
            }
        }
        fetchData()
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

        //return `${d}/${m}/${yyyy} ${hh}:${mi}:${ss}`;
        return `${yyyy}-${m}-${d}`;
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

    const  handleSave = (erro) =>{

    if( erro == false && idocupacao == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ocu_descricao', descricao)
        axios
        .post(`${endpoint}/ocupacao`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaControlePresenca'
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
        formData.append('ocu_descricao', descricao)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/ocupacao/${idocupacao}`, formData, {
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
                tela('ListaControlePresenca')
            }, 2000)
        })
    }
 }

 const mudaAcolhido = (valor) =>{
    setAcolhido(valor)
    setLoadtable(true)
    setListaficha([])
    setQtderegistros(qtderegistros)
    axios.get(`${endpoint}/tratamento?listagem=S&acolhido=${valor}`,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
        },
    })
    .then((result) => {
            setLoadtable(false)
            setListatratamento(result.data.data)
            setListafiltro(result.data.data)
            // addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            // setTimeout(() => {
            //     document.getElementById('idtoast').classList.remove('show')
            //     document.getElementById('idtoast').remove()
            //     tela('ListaControlePresenca')
            // }, 2000)
     })
 }


 const CorpoTabela = (props) =>{
        console.log('rednerizei_qtde:'+qtderegistros)
        let classe = null
        let cont = 0
        let tam = props.lista.length
        if( tam == 0){
            return(
               <CTableRow color={classe}>
                    <CTableDataCell colspan="6" style={{textAlign:'center'}}>Não há Registros para Listagem</CTableDataCell>
               </CTableRow>
            )
        }
        return(
            props.lista.map((item,index)=>{
                cont++
                classe = index % 2 == 0 ? 'primary' : 'secondary'
                if(cont > qtderegistros){
                    return
                } else {
                    return(
                    <CTableRow color={classe} responsive>
                        <CTableDataCell className='sticky-col'>#</CTableDataCell>
                        <CTableDataCell className='sticky-col'>{item.tra_acolhido}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'left',whiteSpace:'nowrap'}}>{item.tra_colaborador}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'left',whiteSpace:'nowrap'}}>{item.tra_id_tra +' - '+item.tra_tipo}</CTableDataCell>
                        <CTableDataCell>{item.tra_controle ?
                                        (<CBadge color="success" style={{cursor:'pointer'}}>Ficha Gerada</CBadge>) :
                                        (<><div class="d-flex flex-row bd-highlight mb-3"><div style={{maxWidth:'120px'}}><CompDateFicha/></div>&nbsp;<CButton size="sm" color="danger" style={{cursor:'pointer'}} onClick={(e)=>gerarFicha(item.tra_id_tra,item.tra_qtde_tipo)}>Gerar Ficha&nbsp;{loadgeraficha ? <CSpinner size="sm"/> : ''}</CButton></div></>)}
                                        </CTableDataCell>
                        <CTableDataCell style={{textAlign:'center',whiteSpace:'nowrap'}}>{item.tra_created_at}</CTableDataCell>
                        <CTableDataCell style={{textAlign:'center',whiteSpace:'nowrap'}}><ItensAcao id={item.tra_id_tra} /></CTableDataCell>
                        </CTableRow>
                    )
                }
            })
        )
    }
    const EditaRegistro = (event,valor,acolhido) =>{
      altera(valor)
      setacolhido(acolhido)
      tela('Tratamento')
    }
    //--> Display dos Ícones no grid
    const ItensAcao = (props) => {
         return(
            <>
            <CTooltip content="Excluir Regitro"  placement="top">
                <FontAwesomeIcon size="2x" style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
            </CTooltip>
            &nbsp;
            <CTooltip  content="Exibir Ficha de Presença"  placement="top"  style={customTooltipStyle}>
               <FontAwesomeIcon size="2x" onClick={(e)=>ExibeFicha(e,props.id)} style={{color:'gray',cursor:'pointer'}} icon={faFileLines}/>
            </CTooltip>
            &nbsp;
            <CTooltip  content="Visualizar Ficha Tratamento"  placement="top"  style={customTooltipStyle}>
               <FontAwesomeIcon size="2x" onClick={(e)=>EditaRegistro(e,props.id,acolhido)} style={{color:'blue',cursor:'pointer'}} icon={faMagnifyingGlass}/>
            </CTooltip>
            </>
         )
   }

   const gerarFicha = (idtratamento,qtde) =>{
        //cop_id_tra,cop_id_col,cop_data_prevista,cop_concluido,cop_created_at,cop_updated_at
        console.log('id:'+idtratamento)
        console.log('qtde:'+qtde)
        if( startDate == null){
            addToast(CompToast('Data início do processamento deve ser informada', 'danger')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
            }, 2000)
            return
        }

        if( colaborador === ''){
            addToast(CompToast('Colaborador do processamento deve ser informado', 'danger')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
            }, 2000)
            return
        }
        setLoadgeraficha(true)
        const formData = new FormData()
        let data =  formatDate(startDate)
        formData.append('cop_id_tra', idtratamento)
        formData.append('cop_id_col', colaborador)
        formData.append('cop_data_prevista', data)
        formData.append('cop_qtde', qtde)
        axios
        .post(`${endpoint}/controlepasse`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadgeraficha(false)
            addToast(CompToast('Ficha gerada com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                mudaAcolhido(acolhido)
                ExibeFicha(event,idtratamento)
            }, 2000)
     })

   }

   const ExibeFicha = (event,id) =>{
        setListaficha([])
        setLoadficha(true)
        setIdtratamento(id)
        axios.get(`${endpoint}/controlepasse?listagem=S&tratamento=${id}`,{
               headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                    },
        })
        .then((result) => {
            setLoadficha(false)
            setListaficha(result.data.data)
            //setListatratamento(result.data.data)
            // addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            // setTimeout(() => {
            //     document.getElementById('idtoast').classList.remove('show')
            //     document.getElementById('idtoast').remove()
            //     tela('ListaControlePresenca')
            // }, 2000)
        })
   }

  const Ficha = () =>{
      return(
         listaficha.map((item,index)=>{
            return(
               <CCol key={index} md={3} className='mb-3'>
                    <CCard style={{padding:'3px'}}>
                    <CButton className="buttonficha mb-2 text-light">
                    Data Prevista <CBadge color="white text-primary">{item.cop_data_prevista}</CBadge>
                    <span className="visually-hidden">unread messages</span>
                    </CButton>
                    <CRow>
                       <CCol md={6} xs={6}>
                          <CompDate id={item.cop_id_cop} readonly={item.cop_concluido} exibe={item.cop_data_atendimento_form != null ? item.cop_data_atendimento_form : null }/>
                       </CCol>
                       <CCol md={6} xs={6}>

                           { item.cop_concluido === 'S'
                           ? (
                            <CButton color="danger" size="sm">
                                Registrado{' '}<FontAwesomeIcon size="sm" icon={faThumbsUp} />
                            </CButton>
                           )
                           :
                           (
                             <CButton color="success" size="sm" onClick={(e)=>registraPresenca(e,item.cop_id_cop,idtratamento)}>
                               Resgistrar{' '}
                               {item.cop_load ? <CSpinner size="sm"/> : ''}
                            </CButton>
                           )}
                       </CCol>
                    </CRow>

                    {/* <CButton className="buttonficha">
                        Atendimento <CBadge color="secondary">{item.cop_data_prevista}</CBadge>
                        <span className="visually-hidden">unread messages</span>
                    </CButton> */}
                   </CCard>
               </CCol>
            )
         })
      )
  }

  const CompDateFicha = (props) =>{
      return (<DatePicker
            id={'data'+props.id}
            showYearDropdown
            showMonthDropdown
            peekNextMonth
            dropdownMode="select"
            locale="ptBR"
            dateFormat="dd/MM/yyyy"
            showIcon
            selected={startDate}
            calendarClassName="form-control"
            onChange={(date) => setStartDate(date)}
     />)
  }

  const CompDate = (props) =>{
    let data = props.exibe != null ? new Date(props.exibe) : null
    const [selectedDate, setSelectedDate] = useState(data);

    if(props.readonly === 'N'){
    return(
        <DatePicker
            id={'data'+props.id}
            showYearDropdown
            showMonthDropdown
            peekNextMonth
            dropdownMode="select"
            locale="ptBR"
            dateFormat="dd/MM/yyyy"
            showIcon
            selected={selectedDate}
            calendarClassName="form-control"
            onChange={(date) => setDataAtendimento(date,props.id)}
        />
    )
    } else {
       return(
        <DatePicker
                id={'data'+props.id}
                showYearDropdown
                showMonthDropdown
                peekNextMonth
                dropdownMode="select"
                locale="ptBR"
                dateFormat="dd/MM/yyyy"
                showIcon
                selected={selectedDate}
                calendarClassName="form-control"
                onChange={(date) => setDataAtendimento(date,props.id)}
                readOnly
        />
       )
    }
  }

  const LoadSpinner = (value,id) =>{
       setListaficha(prevItems =>
           prevItems.map(item =>
              item.cop_id_cop === id ? { ...item, cop_load: value } : item
           )
       )
  }

  const setDataAtendimento = (value,id) =>{
    //    let valor = eval("document.getElementById('"+iden+"').value");
    //    console.log('valor:'+valor)
       setListaficha(prevItems =>
           prevItems.map(item =>
              item.cop_id_cop === id ? { ...item, cop_data_atendimento_form: value } : item
           )
       )
       let data = formatDate(value)
       setListaficha(prevItems =>
           prevItems.map(item =>
              item.cop_id_cop === id ? { ...item, cop_data_atendimento: data } : item
           )
       )
       console.log(listaficha)
  }

  const registraPresenca = (event,id,setIdtratamento) =>{
     let item = listaficha.filter((item)=>item.cop_id_cop == id)
     if( item[0].cop_data_atendimento == null){
        addToast(CompToast('Não foi informada nenhuma data', 'danger')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
        }, 2000)
        return
    }

    LoadSpinner(true,id)

     console.log(item[0])
     console.log('data:'+item[0].cop_data_atendimento)
     //cop_id_tra,cop_id_col,cop_data_prevista,null,cop_concluido,cop_created_at from cop_controle_passe_bk
     const formData = new FormData()
     formData.append('cop_data_atendimento',item[0].cop_data_atendimento)
     formData.append('cop_id_tra',item[0].cop_id_tra)
     formData.append('cop_concluido','S')
     formData.append('_method', 'put')
     axios.post(`${endpoint}/controlepasse/${id}`, formData, {
        headers: {
           Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
           Authorization: 'Bearer ' + token,//dentro do env//
       },
    })
    .then((result) => {
        LoadSpinner(false,id)
        addToast(CompToast(result.data.mensagem, 'success')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
            ExibeFicha(event,setIdtratamento)
        }, 2000)
    })

  }

//   const handleClick = useCallback(() => {
//     console.log("Clicked!");
//   }, []);

  const QtdeRegistrosPagina = (props) =>{
          return(
              <CFormSelect
                  value={qtderegistros}
                  onChange={(e)=>setQtderegistros(e.target.value)}
                  >
                  <option value="3">3</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
              </CFormSelect>
          )
  }

  const pesquisarGrid = (event) => {
       let valor =  event.target.value
       if( valor.trim() != ''){
          let lista = listafiltro.filter(
              (item)=>item.tra_colaborador.toLowerCase().includes(valor.toLowerCase()) ||
              item.tra_tipo.toLowerCase().includes(valor.toLowerCase())
          )
          console.log(lista)
          setListatratamento(lista.slice(0,qtderegistros))
       } else {
          setListatratamento(listafiltro.slice(0,qtderegistros))
       }
    }


    //--> Exibe o componente de paginação
    const PaginationExibe = (props) => {
       return(
          // <div style={{fontSize:'14px',paddingLeft:'3px',paddingRight:'3px',backgroundColor:'#722E56',color:'white',display:'flex',borderRadius:'5px 5px 5px 5px'}}>
          <div className='exibepagination'>
              <div>Pagina:&nbsp;{props.pagina}&nbsp;</div>
              <div>Regitros:&nbsp;{registroini+'...'+registrofim+' num Total de '+qtderegistros}</div>
         </div>
       )
    }

    const PreviousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual < ultimapagina){
         page = page + 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    const PriousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual > 1){
         page = page - 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    //--> Efetuar a pesquisa pelo click
    const clickPagination = (event,idx) =>{
      //  0,5,5,10
      setPaginaatual(idx)
      let ref = idx == 1 ? 0 : idx
      let inicio = ref == 0 ? ref : (ref * qtderegistrospagina) - qtderegistrospagina
      let fim = idx * qtderegistrospagina
      let lista = null
      lista = listafiltro.slice(inicio,fim)
      setRegistroini(inicio+1)
      if(fim > qtderegistros){
         setRegistrofim(qtderegistros)
      } else {
         setRegistrofim(fim)
      }
      setListatratamento(lista)
    }

    const AlteraQtdeResgistros = (valor) =>{
      console.log(qtderegistros)
      setQtderegistros(valor)
      mudaAcolhido(acolhido)
      console.log(qtderegistros)
    }

    const Pagination = (props) => {
      let elemento = []

      for(let i = 1; i <= props.pages; i++ ){
        if( i == paginaatual){
           elemento.push(<CPaginationItem active={true} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        } else {
           elemento.push(<CPaginationItem active={false} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        }
      }

      return (
          <CPagination aria-label="Page navigation example">
              <CPaginationItem className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
                  <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              { elemento }
              <CPaginationItem className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
                  <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
          </CPagination>
      )
   }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'700px'}} data-aos="fade-up">
          <h2> Controle Presença de Tratamento </h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPersonWalkingArrowRight} />&nbsp;Cadastro de Presença Tratamento</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CRow className='mt-3'>
                                <CCol md={4}>
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
                                <CCol md={4}>
                                    { loadpage
                                    ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                    : (
                                    <CFormSelect
                                        id="idColaborador"
                                        label="Atendente (Colaborador)"
                                        value={colaborador}
                                        feedbackInvalid="O Entrevistador deve  ser informado"
                                        onChange={(e)=>setColaborador(e.target.value)}
                                        required
                                    >
                                    <CompColaborador/>
                                    </CFormSelect>)}
                                </CCol>
                                <CCol md={4}>
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
                            </CRow>
                            <CRow className='mt-3'>
                            <CCol md={12}>
                                { loadpage
                                    ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                    :(<>
                                    <div style={{display:'flex'}}>
                                        <div style={{flex:'1'}}>
                                            <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                                <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                                <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                                            </CInputGroup>
                                        </div>
                                        <div style={{justifySelf:'end',alignSelf:'end'}}>
                                            <CInputGroup style={{maxWidth:'200px'}} className="mb-2 mt-2">
                                                <CInputGroupText style={props.estilo} className="clinputtext">Qtde Registros</CInputGroupText>
                                                <QtdeRegistrosPagina/>
                                            </CInputGroup>
                                        </div>
                                    </div>
                                    <CTable className='tabela' responsive>
                                        <CTableHead style={{fontSize:'11px !important'}}>
                                            <CTableRow>
                                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                                <CTableHeaderCell className='clthinterno' scope="col">Acolhido</CTableHeaderCell>
                                                <CTableHeaderCell className='clthinterno' scope="col">Entrevistador</CTableHeaderCell>
                                                <CTableHeaderCell className='clthinterno' scope="col">Tratamento</CTableHeaderCell>
                                                <CTableHeaderCell className='clthinterno' scope="col">Ficha de Controle</CTableHeaderCell>
                                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {loadtable == false
                                            ? (<CorpoTabela lista={listatratamento} estado={est} qtde={qtderegistros}/>)
                                            : (<CTableRow><CTableDataCell colspan="9" style={{textAlign:'center'}}><CSpinner color="info"></CSpinner></CTableDataCell></CTableRow>)}
                                        </CTableBody>
                                    </CTable></>)}
                            </CCol>
                            </CRow>
                            <CRow>
                            {loadficha ? <div><CSpinner size="sm" /></div> : <Ficha/>  }
                            </CRow>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default ControlePresenca
