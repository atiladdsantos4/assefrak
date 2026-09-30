import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CCollapse,CBadge,CConditionalPortal, CCardImage,CCardText,
  CFormTextarea} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faCircleXmark,faArrowAltCircleDown,faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ModalExibeFoto from '../componentes/ModalExibeFoto';
registerLocale("ptBR", ptBR);



// The Main component receives props passed from the Laravel controller
const Evento = (props) => {
  //const { setHours, setMinutes } = DateFNS;
  console.log('estado:'+props.estadovalor)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(true)
  const [visible, setVisible] = useState(true)
  const [loadpage, setLoadpage] = useState(false)
  const [loadcidade, setLoadcidade] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [imagesaved, setImagesaved] = useState(false)
  const [loadsaveimage, setLoadsaveimage] = useState(false)
  const [idevento, setidEvento] = useState(null)
  const [ideventoitem, setIdeventoitem] = useState(null)
  const [titulo, setTitulo] = useState('')
  const [publico, setPublico] = useState('')
  const [categoriaevento, setCategoriaevento] = useState('')
  const [foco, setFoco] = useState('')
  const [concluido, setConcluido] = useState(false)
  const [listafoco, setListafoco] = useState([])
  const [listaestado, setListaestado] = useState([])
  const [listacidade, setListacidade] = useState([])
  const [listacategoriaevento, setListacategoriaevento] = useState([])
  const [estado, setEstado] = useState(21)
  const [cidade, setCidade] = useState(null)
  const [datainicio, setDatainicio] = useState(null)
  const [datafim, setDatafim] = useState(null)
  const [horainicio, setHorainicio] = useState(null)
  const [horafim, setHorafim] = useState(null)
  const [nascimento, setNascimento] = useState(null)
  const [cadastro, setCadastro] = useState('')
  const [local, setLocal] = useState(null);
  const [finalizado, setFinalizado] = useState(false)
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)
  const [paramestado, setParamestado] = useState(props.estadovalor)
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //itens evento//
  const [folder,setFolder] =  useState(null)//toast
  const [imagefolder,setImagefolder] =  useState()//toast
  const [estimg,setEstimg] = useState(false)
  const [estcard,setEstcard] = useState(false)
  const [openmodal,setOpenmodal] = useState(false)
  const [imagematual,setImagematual] = useState(null)
  //imagens do evento
  const [listaimagens,setListaimagens] = useState([])
  const [dadozoom,setDadozoom] = useState('zoom-in')
  //eve_id_eve,eve_name,eve_cpf,eve_foco,eve_tipo_telefone,eve_telefone,eve_concluido,eve_created_at,eve_updated_at,eve_deleted_at

  const closeModal = () =>{
     setOpenmodal(false)
  }

  const abreModal = (event,img) =>{
    setImagematual(img)
    setOpenmodal(true)
  }

  const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    setValidated(false)
    if( props.param != null){
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/estado?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/publicofoco?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/cidade?listagem=S&estado=${paramestado}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/evento/${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/eventoitem?listagem=S&evento=${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/categoriaevento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })
                ]

                const responses = await Promise.all(requests);
                let result_estado = responses[0]
                let result_publico = responses[1]
                let result_cidade = responses[2]
                let result_evento = responses[3]
                let result_eventoitem = responses[4]
                let result_categoriaevento = responses[5]

                //filtra as imagens do banner
                let filtro_itens = result_eventoitem.data.data.filter((item)=>item.evi_tipo_informacao === 'BA')
                let objmeta = null
                let cont = 0
                if(listaimagens.length === 0 ){
                    cont++
                    filtro_itens.map((item,index)=>{
                        let objmeta = JSON.parse(item.evi_dados_inf)
                        //console.log('sequencia:'+objmeta["meta"][0].id)
                        setListaimagens(prevItems => [...prevItems, objmeta["meta"][0]]);
                    })
                }

                setListaestado(result_estado.data.data)
                let array_cid = result_cidade.data.data
                array_cid.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade do Evento'})
                setListacidade(array_cid)
                let array_cat = result_categoriaevento.data.data
                array_cat.unshift({cae_id_cae:'',cae_descricao:'Selecione a Categoria do Evento'})
                setListacategoriaevento(array_cat)
                let array_pub = result_publico.data.data
                array_pub.unshift({puf_id_puf:'',puf_descricao:'Selecione o Público Alvo'})
                setListafoco(array_pub)


                //eventos
                let concluidock = result_evento.data.data.eve_concluido == 1 ? true : false
                setidEvento(result_evento.data.data.eve_id_eve)
                setTitulo(result_evento.data.data.eve_titulo)
                setFoco(result_evento.data.data.eve_foco)
                setCadastro(result_evento.data.data.eve_created_at)
                setConcluido(concluidock)
                setLocal(result_evento.data.data.eve_local)
                setConcluido(concluidock)
                setPublico(result_evento.data.data.eve_id_puf)
                setDatainicio(new Date(result_evento.data.data.eve_data_inicio_format))
                setDatafim(new Date(result_evento.data.data.eve_data_fim_format))
                setHorainicio(new Date(result_evento.data.data.eve_hora_inicio_format))
                setHorafim(new Date(result_evento.data.data.eve_hora_fim_format))
                setCidade(result_evento.data.data.eve_cidade)
                setCategoriaevento(result_evento.data.data.eve_id_cae)
                //evento itens//
                if( result_eventoitem.data.data.length > 0){
                   let imagem = result_eventoitem.data.data.filter((item)=>item.evi_tipo_informacao === 'IC')
                   if( imagem.length > 0 ){
                     let string = JSON.parse(imagem[0].evi_dados_inf)
                     setFolder(string["meta"][0].imagem)
                     setIdeventoitem(imagem[0].evi_id_evi)
                   }
                }
                console.log('teste')
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    } else {
       const fetchData = async () => {

            try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/publicofoco?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/estado?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/cidade?listagem=S&estado=29`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/categoriaevento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })
                ]
                const responses = await Promise.all(requests);

                let result_publico = responses[0]
                let array_pub = result_publico.data.data
                array_pub.unshift({puf_id_puf:'',puf_descricao:'Selecione o Público Alvo'})
                let result_estado = responses[1]
                let result_cidade = responses[2]
                let result_categoriaevento = responses[3]
                setListafoco(array_pub)
                setListaestado(result_estado.data.data)
                let array_cid = result_cidade.data.data
                array_cid.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade do Evento'})
                setListacidade(array_cid)
                let array_cat = result_categoriaevento.data.data
                array_cat.unshift({cae_id_cae:'',cae_descricao:'Selecione a Categoria do Evento'})
                setListacategoriaevento(array_cat)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[])

  const mudaData = (data) =>{
     console.log(data)
     setStartDate(data)
     let formattedDate = data.toISOString().slice(0, 10);
     setNascimento(formattedDate)
     console.log('format data:'+formattedDate)
  }

  const handleClick = (event,valor) =>{
     scrollToId('idcontainer')
     event.preventDefault();
     console.log('teste:'+valor)
     tela(valor)
  }

  const getLastIndex = (lista) =>{
     let maxvalor = 0;
     lista.map((item,index)=>{
       if(item.id >= maxvalor){
          maxvalor = item.id
       }
     })
     let indice = maxvalor + 1
     return indice
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

        return `${yyyy}-${m}-${d} ${hh}:${mi}:${ss}`;
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
        console.log('hora:'+formatDateBanco(new Date(horainicio)))
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

  const CPFInput = (props) => {
      const [value, setValue] = useState(props.cpf)
        return (
            <IMaskInput
                className="form-control"
                mask='000.000.000-00' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negconcluidos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setCpf(value)}
                defaultValue={value}
                placeholder="000.000.000-00"
                // required
            />
        );
  }

  const  handleSave = (erro) =>{

    if( erro == false && idevento == null) {
        //'eve_id_eve','eve_id_puf','eve_titulo','eve_foco','eve_data_inicio','eve_data_fim','eve_hora_inicio','eve_hora_fim','eve_local','eve_concluido','eve_created_at','eve_updated_at','eve_deleted_at'
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('eve_titulo', titulo)
        formData.append('eve_id_puf', publico)
        formData.append('eve_foco', foco)
        formData.append('eve_id_cae', categoriaevento)
        formData.append('eve_data_inicio', formatDateBanco(new Date(datainicio)))
        formData.append('eve_data_fim', formatDateBanco(new Date(datafim)))
        formData.append('eve_hora_inicio', formatDateBanco(new Date(horainicio)))
        formData.append('eve_hora_fim', formatDateBanco(new Date(horafim)))
        formData.append('eve_local', local)
        formData.append('eve_estado', estado)
        formData.append('eve_cidade', cidade)
        let status = concluido ? 1 : 0
        formData.append('eve_concluido', status)
        axios
        .post(`${endpoint}/evento`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaEventos'
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
        formData.append('eve_titulo', titulo)
        formData.append('eve_id_puf', publico)
        formData.append('eve_id_cae', categoriaevento)
        formData.append('eve_foco', foco)
        formData.append('eve_data_inicio', formatDateBanco(new Date(datainicio)))
        formData.append('eve_data_fim', formatDateBanco(new Date(datafim)))
        formData.append('eve_hora_inicio', formatDateBanco(new Date(horainicio)))
        formData.append('eve_hora_fim', formatDateBanco(new Date(horafim)))
        formData.append('eve_local', local)
        formData.append('eve_estado', estado)
        formData.append('eve_cidade', cidade)
        let status = concluido ? 1 : 0
        formData.append('eve_concluido', status)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/evento/${idevento}`, formData, {
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
                tela('ListaEventos')
            }, 2000)
        })
    }
 }

 const CompEstados = () =>{
    return(
        listaestado.map((item,index)=>{
        return(
            <option key={index} value={item.est_id_est}>{item.est_sigla +' - '+item.est_nome}</option>
            )
        })
    )
 }

 const CompCidades = () =>{
    return(
        listacidade.map((item,index)=>{
        return(
            <option key={index} value={item.cid_id_cid}>{item.cid_descricao}</option>
            )
        })
    )
 }

 const CompFoco = () =>{
    return(
        listafoco.map((item,index)=>{
        return(
            <option key={index} value={item.puf_id_puf}>{item.puf_descricao}</option>
            )
        })
    )
 }

 const CompFaixas = () =>{
    return(
        listafaixas.map((item,index)=>{
        return(
            <option key={index} value={item.faixa}>{item.descricao}</option>
            )
        })
    )
 }

 const CompCategotiaEvento = () =>{
    return(
        listacategoriaevento.map((item,index)=>{
        return(
            <option key={index} value={item.cae_id_cae}>{item.cae_descricao}</option>
            )
        })
    )
 }

 const mudaEstado = (valor) =>{
       setEstado(valor)
       setLoadcidade(true)
       let uf_filtro = listaestado.filter((item)=>item.est_id_est == valor)
       console.log(uf_filtro)
       axios.get(`${endpoint}/cidade?listagem=S&estado=${uf_filtro[0].est_codigo}`,{
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
            },
       })
       .then((result) => {
           setLoadcidade(false)
           setListacidade(result.data.data)
       });

  }

  const ImagemEvento = () =>{
     return (
       <CCard>
          <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Itens do Evento</CCardHeader>
          <CRow className='mt-3 ms-1 me-1'>
            <CCol md={8}>
               <CFormLabel htmlFor="exampleFormControlInput1">Imagem de Pubicação do Evento</CFormLabel><br/>
               <CInputGroup className="mb-3">
                    <CFormInput
                        type="file"
                        id="inputGroupFile02"
                        onChange={(e)=>onImageChange(e)}
                    />
                    <CInputGroupText as="label" htmlFor="inputGroupFile02" onClick={(e)=>SalvarImagem(e)}>
                      Upload&nbsp;{loadsaveimage? <CSpinner size="sm" /> : ''}
                    </CInputGroupText>
                </CInputGroup>
                <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'1px'}}>
                   <FontAwesomeIcon size="lg" style={{color:'red',cursor:'pointer'}} icon={faCircleXmark} onClick={(e)=>onRemoveAnexo(e)}/>
                   {folder && <p>Arquivo Selecinado: <CBadge color="primary">{folder}</CBadge></p>}
                </div>
            </CCol>
            { folder != null ?
            (<CCol md={4} className='mt-3 mb-3'>
               <div className="containerimg">
                   <img style={{width:'30%'}} src={imagem + 'evento/'+folder}/>
               </div>
            </CCol>)
            :('')}
          </CRow>
       </CCard>
     )
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setFolder(event.target.files[0].name)
        setImagefolder(event.target.files[0])
    }
  }

  const onRemoveAnexo = (event,id) => {
     setFolder(null)
     setImagefolder(null)
  }

  const RemoveImagem = (event,id) =>{
        setListaimagens(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, imagem: null } : item
            )
        )
        let valor = []
        setListaimagens(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, file: valor } : item
            )
        )
  }

  const CarroselEvento = () =>{
       return (
          <CCard>
             <CCardHeader className="fundo_head mt-1">
                <FontAwesomeIcon size="lg" icon={faPerson} />
                &nbsp;Imagens do Evento
                { visible
                   ?
                  (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowUp} onClick={(e)=>mudaColapse(false)}/></>)
                  :
                  (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowDown} onClick={(e)=>mudaColapse(true)}/></>)
                }
             </CCardHeader>
             <ContainerItemEvento/>
             <div id="itemevento"></div>
          </CCard>
       )
  }

  const mudaColapse = (valor) =>{
    if(valor){
      setVisible(true)
      setDadozoom('zoom-in')
    } else{
      setDadozoom('zoom-out')
      setVisible(false)
    }
  }

  const ContainerItemEvento = () =>{
      return (
        <div data-aos={dadozoom}>
         <CCollapse visible={visible}>
            <CRow className='mt-3 ms-1 mb-3'>
            <CCol md={3}>
                <CButton size="sm" color='primary' onClick={(e)=>NovaImagem(e)}>
                    Adicionar Imagem&nbsp;<FontAwesomeIcon size="lg" icon={faArrowAltCircleDown}/>
                </CButton>
            </CCol>
            <CCol md={12} className='mt-2'>
                <CardImagem estado={estcard}/>
            </CCol>
            </CRow>
        </CCollapse>
        </div>
      )
  }

  const CardImagem = () =>{
    return(
        listaimagens.filter((item)=>item.exclui == false).map((item,index)=>{
            return(
                <CRow key={index}>
                  <CCol md={1}><FontAwesomeIcon style={{color:'red'}} size="sm"icon={faCircleXmark} onClick={(e)=>RemoveItemLista(e,item.id)}/></CCol>
                  <CCol md={6} className='mb-2'>
                        <CInputGroup size="sm">
                            <CFormInput
                                type="file"
                                id="inputGroupFile02"
                                onChange={(e)=>AlteraItemLista(e,item.id,'imagem',null)}
                            />
                            <CInputGroupText as="label" htmlFor="inputGroupFile02" onClick={(e)=>SalvarImagemLista(e,item.id)}>
                            Salvar&nbsp;{item.imageload ? <CSpinner size="sm" /> : ''}
                            </CInputGroupText>
                        </CInputGroup>
                        {item.file.length > 0  ? <CBadge color="secondary">{item.imagem}&nbsp;<FontAwesomeIcon style={{color:'white',cursor:'pointer'}} size="sm"icon={faCircleXmark} onClick={(e)=>RemoveImagem(e,item.id)}/></CBadge> : ''}
                  </CCol>
                  <CCol md={5}>
                      <CCard>
                            <CCardText>
                                <div className="containerimg">
                                    { item.path != null
                                      ? (<img style={{width:'20%'}} src={imagem + item.path} onClick={(e)=>abreModal(e,imagem + item.path)}/>)
                                      : (<></>)}
                                </div>
                            </CCardText>
                      </CCard>
                  </CCol>
                </CRow>
            )
        })
    )
  }

 const MontaJsonImagemLista = (dados) =>{
    /*
    id:1,
         ideventoitem:'',
         imagem:'',
         path:'',
         file:[],
         imagesaved:false,
         imageload:false,
         exclui:false
    */
    let arrayitens = []
    let obj = null
    let objfinal = null
    arrayitens = []
    obj ={
        ideventoitem:null,
        imagem:dados.imagem,
        path:'evento/lista/'+dados.imagem,
        exibe:true
    }
    arrayitens.push(dados)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

  const SalvarImagemLista  = (event,id) =>{
    event.preventDefault()
    let pos = listaimagens.filter((item)=>item.id == id);
    setListaimagens(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, imageload: true } : item
        )
    )
    console.log(pos)
    let evi_dados_inf = MontaJsonImagemLista(pos[0]);
    if( pos[0].file.length == 0){
        addToast(CompToast('Nenhuma Imagem foi Selecionada', 'danger')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, imageload: false } : item
                )
            )
            console.log(evi_dados_inf)

        }, 2000)
        return
    }
    if( pos[0].ideventoitem == null || pos[0].ideventoitem == '' ){
        const formData = new FormData()
        formData.append('file', pos[0].file[0])
        formData.append('has_image', true)
        formData.append('has_image_itemevento', true)
        formData.append('evi_tipo_informacao', 'BA')
        formData.append('evi_id_eve', idevento)
        formData.append('evi_dados_inf', evi_dados_inf)
        axios.post(`${endpoint}/eventoitem`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let iditem = result.data.data.evi_id_evi
            setListaimagens(prevItems =>
                prevItems.map(item =>
                item.id === id ? { ...item, imageload: false } : item
                )
            )
            setImagesaved(true)
            addToast(CompToast('Imagem Salva com sucesso !!!', 'success')) //--> usa toast
            setIdeventoitem(iditem)
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, imagesaved: true } : item
                )
            )
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, ideventoitem: iditem } : item
                )
            )
            let arq = []
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, file: arq } : item
                )
            )
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                setEstimg(!estimg)
            }, 2000)
            //setListacidade(result.data.data)
        });
    } else {
        const formData = new FormData()
        formData.append('file', pos[0].file[0])
        formData.append('has_image', true)
        formData.append('evi_tipo_informacao', 'BA')
        formData.append('evi_id_eve', idevento)
        formData.append('evi_dados_inf', evi_dados_inf)
        formData.append('_method', 'put')
        axios.post(`${endpoint}/eventoitem/${pos[0].ideventoitem}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let iditem = result.data.data.evi_id_evi
            setListaimagens(prevItems =>
                prevItems.map(item =>
                item.id === id ? { ...item, imageload: false } : item
                )
            )
            setImagesaved(true)
            addToast(CompToast('Imagem Atualizada com sucesso !!!', 'success')) //--> usa toast
            setIdeventoitem(iditem)
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, imagesaved: true } : item
                )
            )
            let arq = []
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, file: arq } : item
                )
            )
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                setEstimg(!estimg)
            }, 2000)
            //setListacidade(result.data.data)
        });
    }
    console.log(listaimagens)
  }

  const SalvarImagem = (event) =>{
        setLoadsaveimage(true)
        event.preventDefault()
        event.stopPropagation()
        let evi_dados_inf =  MontaJsonImagem()
        const formData = new FormData()
        formData.append('file', imagefolder)
        formData.append('has_image', true)
        formData.append('evi_tipo_informacao', 'IC')
        formData.append('evi_id_eve', idevento)
        formData.append('evi_dados_inf', evi_dados_inf)
        let action = null
        if( ideventoitem != null ){
            if(imagefolder == null){
                addToast(CompToast('Nenhuma Imagem foi Selecionada', 'danger')) //--> usa toast
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                    setLoadsaveimage(false)
                }, 2000)
                return
            }
            formData.append('_method', 'put')
            axios.post(`${endpoint}/eventoitem/${ideventoitem}`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setLoadsaveimage(false)
                setImagesaved(true)
                addToast(CompToast('Imagem Atualizada com sucesso !!!', 'success')) //--> usa toast
                setIdeventoitem(result.data.enventoitemid)
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                    setEstimg(!estimg)
                }, 2000)
                //setListacidade(result.data.data)
            });

        } else {
            axios.post(`${endpoint}/evento`, formData, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setLoadsaveimage(false)
                setImagesaved(true)
                addToast(CompToast('Imagem Salva com sucesso !!!', 'success')) //--> usa toast
                setIdeventoitem(result.data.enventoitemid)
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                    setEstimg(!estimg)
                }, 2000)
                //setListacidade(result.data.data)
            });
        }

  }

  const MontaJsonImagem = () =>{

    let arrayitens = []
    let obj = null
    let objfinal = null
    arrayitens = []
    obj ={
        imagem:folder,
        path:'evento/'+folder,
        exibe:true
    }
    arrayitens.push(obj)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

  const RemoveItemLista = (event,id) => {
     setListaimagens(prevItems =>
          prevItems.map(item =>
             item.id === id ? { ...item, exclui: true } : item
          )
      )
  }

  const AlteraItemLista = (event,id,param,valor) => {
    if( param === 'imagem'){
       console.log(id)
       console.log(event.target.files[0].name)
       let val = event.target.files[0].name
       setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, imagem: val } : item
                )
       )
       let valfile = []
       valfile.push(event.target.files[0])
       setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, file: valfile } : item
                )
       )
       let path = 'evento/lista/'+event.target.files[0].name
       setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, path: path } : item
                )
       )
    }
    console.log('ok')
  }

  const NovaImagem = (event) =>{
    console.log(listaimagens)
    let tam =  listaimagens.length
    let obj = null
    if(tam == 0){
      obj={
         id:1,
         ideventoitem:'',
         imagem:'',
         path:null,
         file:[],
         imagesaved:false,
         imageload:false,
         exclui:false,
         exibe:true
      }
    } else {
      let idx  = getLastIndex(listaimagens)
      obj={
         id: idx,
         ideventoitem:'',
         imagem:'',
         path:null,
         file:[],
         imageload:false,
         imagesaved:false,
         exclui:false,
         exibe:true
      }
    }
    setListaimagens(prevItems => [...prevItems, obj]);
    //listaimagens.push(obj)
    setEstcard(!estcard)
    scrollToId('itemevento')
    console.log(listaimagens)
  }


  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" data-aos="fade-up">
          <h2> Eventos </h2>
          <p>Cadastro</p>
        </div>
        <div id="idcontainer" class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <ModalExibeFoto open={openmodal} close={closeModal} imagem={imagematual}/>
                <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Eventos</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idNome"
                                    label="Nome do Evento"
                                    placeholder="Digite o titulo do Evento"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={titulo}
                                    feedbackInvalid="O titulo do Evento precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTitulo(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idCategoriaEvento"
                                    label="Categoria do Evento"
                                    value={categoriaevento}
                                    feedbackInvalid="A Categoria do Evento dever ser informada"
                                    onChange={(e)=>setCategoriaevento(e.target.value)}
                                    required
                                >
                                <CompCategotiaEvento/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormTextarea
                                    id="idEmail"
                                    label="Tema do Evento"
                                    placeholder="Digite o Tema do Evento"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    rows={2}
                                    defaultValue={foco}
                                    feedbackInvalid="O Foco precisa ser preenchido"
                                    required
                                    onChange={(e)=>setFoco(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idFoco"
                                    label="Público Alvo"
                                    value={publico}
                                    feedbackInvalid="O Público Alvo ser informado"
                                    onChange={(e)=>setPublico(e.target.value)}
                                    required
                                >
                                <CompFoco/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Início de Evento</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    locale="ptBR"
                                    dateFormat="dd/MM/yyyy"
                                    showIcon
                                    selected={datainicio}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setDatainicio(date)}
                                    />
                                    </>
                                )}
                                { validated && datainicio == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data de Início de Evento deve ser prenchida </div>)
                                   : (<></>)}

                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Data Final do Evento</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    locale="ptBR"
                                    dateFormat="dd/MM/yyyy"
                                    showIcon
                                    selected={datafim}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setDatafim(date)}
                                    />
                                { validated && datafim == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data de Final de Evento deve ser prenchida </div>)
                                   : (<></>)}
                                </>
                                )}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Hora Início do Evento</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    showTimeSelect
                                    dropdownMode="select"
                                    locale="ptBR"
                                    //dateFormat="dd/MM/yyyy"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showIcon
                                    selected={horainicio}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setHorainicio(date)}
                                    />
                                  { validated && horainicio == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Hora de Início do Evento deve ser prenchida </div>)
                                   : (<></>)}
                                    </>
                                )}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Hora Fim do Evento</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    showTimeSelect
                                    dropdownMode="select"
                                    locale="ptBR"
                                    //dateFormat="dd/MM/yyyy"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showIcon
                                    selected={horafim}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setHorafim(date)}
                                    />
                                    { validated && horafim == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Hora do Fim do Evento deve ser prenchida </div>)
                                   : (<></>)}
                                    </>
                                )}
                            </CCol>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idNome"
                                    label="Local (Endereço do evento) do Evento"
                                    placeholder="Digite o titulo do Evento"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={local}
                                    feedbackInvalid="O Local do Evento precisa ser preenchido"
                                    required
                                    onChange={(e)=>setLocal(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idEstado"
                                    label="Estado"
                                    value={estado}
                                    feedbackInvalid="O Estado deve ser informado"
                                    onChange={(e)=>mudaEstado(e.target.value)}
                                    required
                                >
                                <CompEstados/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage || loadcidade
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idCidade"
                                    label="Cidade"
                                    value={cidade}
                                    feedbackInvalid="A Cidade deve ser informado"
                                    onChange={(e)=>setCidade(e.target.value)}
                                    required
                                >
                                <CompCidades/>
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
                            <CCol xs={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Evento Finalizado"
                                    feedbackInvalid="Informe se Evento foi Ativo"
                                    checked={finalizado}
                                    onChange={(e)=>setFinalizado(e.target.checked)}

                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
                            </CCol>

                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaEventos')}>Listar</CButton>
                            </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
            { idevento !== null ? <ImagemEvento/> : ''}
            { idevento !== null ? <CarroselEvento/> : ''}
        </div>
        </section>
    </div>
  )
}
export default Evento
