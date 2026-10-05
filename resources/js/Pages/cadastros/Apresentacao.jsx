import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CCollapse,CBadge,CConditionalPortal, CCardImage,CCardText,
  CFormTextarea} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFilePowerpoint,faPerson,faSave,faCircleXmark,faArrowAltCircleDown,faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ModalApresentacao from '../componentes/ModalApresentacao';
registerLocale("ptBR", ptBR);




// The Main component receives props Fortaprcimentod from the Laravel controller
const Apresentacao = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  //const [openmodal,setOpenmodal] = useState(false)
  const [idapresentacao, setIdApresentacao] = useState(null)
  const [tema, setTema] = useState('')
  const [descricao, setDescricao] = useState('')
  const [colaborador, setColaborador] = useState('')
  const [palestra, setPalestra] = useState('')
  const [slide, setSlide] = useState('')
  const [video, setVideo] = useState('')
  const [audio, setAudio] = useState('')
  const [efeito, setEfeito] = useState('cube')
  const [ativo, setAtivo] = useState(false)
  const [datapalestra, setDatapalestra] = useState(null)
  const [cadastro, setCadastro ] = useState(false)
  const [pathexibicao, setPathexibicao ] = useState(false)
  const [listapalestra, setListapalestra] = useState([])
  const [listacolaborador, setListacolaborador] = useState([])
  const [listavideo, setListavideo] = useState([])
  const [listaslide, setListaslide] = useState([])
  const [listaaudio, setListaaudio] = useState([])
  const [saved,setSaved] = useState(false)
  const [estcard,setEstcard] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const [dadozoom,setDadozoom] = useState('zoom-in')
  const [listaimagens,setListaimagens] = useState([])
  const [estimg,setEstimg] = useState([])
  const [openmodal,setOpenmodal] = useState(false)
  const [imagematual,setImagematual] = useState(null)
  const [visible, setVisible] = useState(false)
  const [visiblevideo, setVisiblevideo] = useState(false)
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //'apr_id_apr','apr_id_pal','apr_id_col','apr_slide','apr_video','apr_audio','apr_data_exibe','apr_ativo','apr_created_at','apr_updated_at','apr_deleted_at'

  const formatDateBanco = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}-${d}`;
  }

  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
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
                    axios.get(`${endpoint}/palestra?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/apresentacao/${param}`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

                const responses = await Promise.all(requests);
                let result_colaborador = responses[0]
                let result_palestra = responses[1]
                let result_apresentacao = responses[2]
                let vet = result_palestra.data.data
                vet.unshift({pal_id_pal:'',pal_tema:'Selecione a Palestra'})
                setListapalestra(vet)
                vet = result_colaborador.data.data
                vet.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(vet)
                //dados retorno
                setIdApresentacao(result_apresentacao.data.data.apr_id_apr)
                setTema(result_apresentacao.data.data.apr_tema)
                setColaborador(result_apresentacao.data.data.apr_id_col)
                setPalestra(result_apresentacao.data.data.apr_id_pal)
                setDatapalestra(new Date(result_apresentacao.data.data.apr_data_exibe_format))
                let ck = result_apresentacao.data.data.apr_ativo == 1 ? true : false
                setAtivo(ck)
                setPathexibicao(result_apresentacao.data.data.apr_path_exibicao)
                let objmeta = null
                console.log(result_apresentacao.data.data.apr_itens)
                if( result_apresentacao.data.data.apr_itens.length > 0){
                    console.log(result_apresentacao.data.data.apr_itens)
                    result_apresentacao.data.data.apr_itens.filter((item)=>item.api_tipo == 'S').map((item,index)=>{
                        let objmeta = JSON.parse(item.api_conteudo)
                        setListaimagens(prevItems => [...prevItems, objmeta["meta"][0]]);
                    })
                    result_apresentacao.data.data.apr_itens.filter((item)=>item.api_tipo == 'V').map((item,index)=>{
                        let objmeta = JSON.parse(item.api_conteudo)
                        setListavideo(prevItems => [...prevItems, objmeta["meta"][0]]);
                    })
                    //setListaimagens(result_apresentacao.data.data.apr_itens)
                }
                //itens//
                /*
                if( result_eventoitem.data.data.length > 0){
                   let imagem = result_eventoitem.data.data.filter((item)=>item.evi_tipo_informacao === 'IC')
                   if( imagem.length > 0 ){
                     let string = JSON.parse(imagem[0].evi_dados_inf)
                     setFolder(string["meta"][0].imagem)
                     setIdeventoitem(imagem[0].evi_id_evi)
                   }
                }
                obj={
                    id: idx,
                    idslideitem:'',
                    imagem:'',
                    path:null,
                    file:[],
                    imageload:false,
                    imagesaved:false,
                    exclui:false,
                    exibe:true
                }
                */
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
                    axios.get(`${endpoint}/colaborador?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/palestra?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]
                const responses = await Promise.all(requests);
                let result_colaborador = responses[0]
                let result_palestra = responses[1]
                let vet = result_palestra.data.data
                vet.unshift({pal_id_pal:'',pal_tema:'Selecione a Palestra'})
                setListapalestra(vet)
                vet = result_colaborador.data.data
                vet.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(vet)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[])

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

  const formatDateBanco1 = (date) => {
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


  const  handleSave = (erro) =>{

    if( erro == false && idapresentacao == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        //'apr_id_apr','apr_id_pal','apr_id_col','apr_tema','apr_slide','apr_video','apr_audio','apr_data_exibe','apr_ativo','apr_created_at','apr_updated_at','apr_deleted_at'
        formData.append('apr_id_pal', palestra)
        formData.append('apr_id_col', colaborador)
        formData.append('apr_tema', tema)
        let ck = ativo ? 1 : 0
        formData.append('apr_ativo', ck)
        formData.append('apr_data_exibe', formatDateBanco(datapalestra))
        axios
        .post(`${endpoint}/apresentacao`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            //let valor = 'ListaApresentacaos'
            setLoadsave(false)
            addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela('ListaApresentacao')
            }, 2000)
        })
    } else {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('apr_id_pal', palestra)
        formData.append('apr_id_col', colaborador)
        formData.append('apr_tema', tema)
        let ck = ativo ? 1 : 0
        formData.append('apr_ativo', ck)
        formData.append('apr_data_exibe', formatDateBanco(datapalestra))
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/apresentacao/${idapresentacao}`, formData, {
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
                tela('ListaApresentacao')
            }, 2000)
        })
    }
 }

const CompPalestra = () =>{
    return(
        listapalestra.map((item,index)=>{
        return(
            <option key={index} value={item.pal_id_pal}>{item.pal_tema}</option>
            )
        })
    )
 }

 const CompColaborador = () =>{
    return(
        listacolaborador.map((item,index)=>{
        return(
            <option key={index} value={item.col_id_col}>{item.col_name}</option>
            )
        })
    )
 }

 const mudaColapse = (valor) =>{

    if(valor){
      setVisible(true)
      //setDadozoom('zoom-in')
    } else{
      //setDadozoom('zoom-out')
      setVisible(false)
    }

    console.log(listaimagens)

 }

 const mudaColapseVideo = (valor) =>{

    if(valor){
      setVisiblevideo(true)
      //setDadozoom('zoom-in')
    } else{
      //setDadozoom('zoom-out')
      setVisiblevideo(false)
    }

    console.log(listavideo)

 }

 const CarroselEvento = () =>{
        return (
           <CCard>
              <CCardHeader className="fundo_head mt-1">
                 <FontAwesomeIcon size="lg" icon={faPerson} />
                 &nbsp;Imagens do Slide
                 { visible
                    ?
                   (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowUp} onClick={(e)=>mudaColapse(false)}/></>)
                   :
                   (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowDown} onClick={(e)=>mudaColapse(true)}/></>)
                 }
              </CCardHeader>
              <ContainerSlide/>
              <div id="itemapresentacao"></div>
           </CCard>
        )
 }

 const ColapseVideo = () =>{
        return (
           <CCard>
              <CCardHeader className="fundo_head mt-1">
                 <FontAwesomeIcon size="lg" icon={faPerson} />
                 &nbsp;Videos da Apresentação
                 { visiblevideo
                    ?
                   (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowUp} onClick={(e)=>mudaColapseVideo(false)}/></>)
                   :
                   (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowDown} onClick={(e)=>mudaColapseVideo(true)}/></>)
                 }
              </CCardHeader>
              <ContainerVideo/>
              <div id="itemvideo"></div>
           </CCard>
        )
 }

 const NovaImagem = (event) =>{
    console.log(listaimagens)
    let tam =  listaimagens.length
    let obj = null
    if(tam == 0){
      obj={
         id:1,
         idslideitem:'',
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
         idslideitem:'',
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
    scrollToId('itemapresentacao')
    console.log(listaimagens)
 }


 const NovoVideo = (event) =>{
    console.log(listaimagens)
    let tam =  listavideo.length
    let obj = null
    if(tam == 0){
      obj={
         id:1,
         idvideoitem:'',
         titulo:'',
         hash:'',
         exclui:false,
         exibe:true,
         load:false
      }
    } else {
      let idx  = getLastIndex(listavideo)
      obj={
         id:idx,
         idvideoitem:'',
         titulo:'',
         hash:'',
         exclui:false,
         exibe:true,
         load:false
      }
    }
    setListavideo(prevItems => [...prevItems, obj]);
    //listaimagens.push(obj)
    //setEstcard(!estcard)
    //scrollToId('itemapresentacao')
    console.log(listavideo)
 }

 const ContainerSlide = () =>{
       return (
         <div>
          <CCollapse visible={visible}>
             <CRow className='mt-3 ms-1 mb-3'>
                <CCol md={3}>
                    <CButton size="sm" color='primary' onClick={(e)=>NovaImagem(e)}>
                        Adicionar Imagem&nbsp;<FontAwesomeIcon size="lg" icon={faArrowAltCircleDown}/>
                    </CButton>
                </CCol>
             </CRow>
             <CRow className='mt-3 ms-1 mb-3'>
                {/* <CCol md={12} className='mt-2'> */}
                    {/* <CardImagem estado={estcard}/> */}
                    {/* <CardImagem/> */}
                    <CardImagemNew/>
                {/* </CCol> */}
             </CRow>
         </CCollapse>
         </div>
       )
  }

  const ContainerVideo = () =>{
       return (
         <div>
          <CCollapse visible={visiblevideo}>
             <CRow className='mt-3 ms-1 mb-3'>
                <CCol md={3}>
                    <CButton size="sm" color='primary' onClick={(e)=>NovoVideo(e)}>
                        Adicionar Video&nbsp;<FontAwesomeIcon size="lg" icon={faArrowAltCircleDown}/>
                    </CButton>
                </CCol>
             </CRow>
             <CRow className='mt-3 ms-1 mb-3'>
                {/* <CCol md={12} className='mt-2'> */}
                    {/* <CardImagem estado={estcard}/> */}
                    {/* <CardImagem/> */}
                    <CardVideo/>
                {/* </CCol> */}
             </CRow>
         </CCollapse>
         </div>
       )
  }

  const RemoveItemLista = (event,id) => {
     setListaimagens(prevItems =>
          prevItems.map(item =>
             item.id === id ? { ...item, exclui: true } : item
          )
      )
  }

  const RemoveItemVideo = (event,id) => {
     setListavideo(prevItems =>
          prevItems.map(item =>
             item.id === id ? { ...item, exclui: true } : item
          )
      )
  }

  const MontaJsonImagemLista = (dados) =>{
    let arrayitens = []
    let obj = null
    let objfinal = null
    arrayitens = []
    obj ={
        idslideitem:null,
        posicao:null,
        imagem:dados.imagem,
        path:'slide/'+dados.imagem,
        exibe:true
    }
    arrayitens.push(dados)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

//   const SalvarVideo = (event,id) =>{
//       setListavideo(prevItems =>
//           prevItems.map(item =>
//              item.id === id ? { ...item, load: true } : item
//           )
//       )
//       setTimeout(() => {
//         setListavideo(prevItems =>
//             prevItems.map(item =>
//                 item.id === id ? { ...item, load: false } : item
//             )
//         )
//       }, 2000)
//   }

  const MontaJsonVideoLista = (dados) =>{
    let arrayitens = []
    let obj = null
    let objfinal = null
    arrayitens = []
    obj ={
        idvideoitem:null,
        titulo:dados.titulo,
        hash:dados.titulo,
        exibe:true
    }
    arrayitens.push(dados)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }

  const AlteraVideo = (event,id,valor,param) =>{
    let idx = getIndexVideo(listavideo,id)
    if(param == 'titulo'){
       listavideo[idx].titulo = valor
    }
    if(param == 'hash'){
       listavideo[idx].hash = valor
    }
    console.log(listavideo[idx].titulo)
  }

  const getIndexVideo = (lista,id) =>{
     let indice = 0
     lista.map((item,index)=>{
       if(item.id === id){
          indice = index
       }
     })
    return indice
  }

  const CardVideo = () =>{
     return(
        listavideo.filter((item)=>item.exclui == false).map((item,index)=>{
            return(
                <CCol md={12} className='mt-2'>
                    <CRow>
                        <CCol className="mb-3" md={1}>
                            <div className='mt-4'><FontAwesomeIcon style={{color:'red'}} size="sm"icon={faCircleXmark} onClick={(e)=>RemoveItemVideo(e,item.id)}/></div>
                         </CCol>
                        <CCol md={7} className='flex'>
                            <CFormInput defaultValue={item.titulo} onChange={(e)=>AlteraVideo(e,item.id,e.target.value,'titulo')} label="titulo"/>
                        </CCol>
                        <CCol md={2}>
                            <CFormInput defaultValue={item.hash} onChange={(e)=>AlteraVideo(e,item.id,e.target.value,'hash')} label="hash"/>
                        </CCol>
                        <CCol style={{marginTop:'32px'}} md={1}>
                            <CButton size ="sm" color="primary" onClick={(e)=>SalvarVideo(e,item.id)}>
                                Salvar {item.load ? <CSpinner size="sm"/> : <></>}
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
            )
        })
    )
  }

  const CardImagemNew = () =>{
     return(
        listaimagens.filter((item)=>item.exclui == false).map((item,index)=>{
           return(
              <CCol md={4} className='mt-2'>
                  <CCard style={{textAlign:'center'}}>
                      { item.path != null
                      ? (<CCardImage className="mt-2 mb-1" style={{width:'60%',margin:'auto'}} src={imagem + pathexibicao + item.path} onClick={(e)=>abreModal(e,imagem + item.path)}/>)
                      : (<></>)}
                      <CCardText className='mt-2'>
                         <CRow>
                            <CCol className="ms-2" md={1}><FontAwesomeIcon style={{color:'red'}} size="sm"icon={faCircleXmark} onClick={(e)=>RemoveItemLista(e,item.id)}/></CCol>
                            <CCol className="mb-2 d-flex flex-column" md={10}>
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
                                {item.file.length > 0  ? (<div><CBadge color="secondary">{item.imagem}&nbsp;<FontAwesomeIcon style={{color:'white',cursor:'pointer'}} size="sm"icon={faCircleXmark} onClick={(e)=>RemoveImagem(e,item.id)}/></CBadge></div>) : ''}
                            </CCol>
                        </CRow>
                      </CCardText>
                  </CCard>
              </CCol>
           )
        })
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
                                       ? (<img style={{width:'20%'}} src={imagem + pathexibicao + item.path} onClick={(e)=>abreModal(e,imagem + item.path)}/>)
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

  const SalvarImagemLista  = (event,id) =>{
    event.preventDefault()
    let pos = listaimagens.filter((item)=>item.id == id);
    setListaimagens(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, imageload: true } : item
        )
    )
    console.log(pos)
    let api_dados_inf = MontaJsonImagemLista(pos[0]);
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
            console.log(api_dados_inf)

        }, 2000)
        return
    }
    if( pos[0].idslideitem == null || pos[0].idslideitem == '' ){
        const formData = new FormData()
        formData.append('file', pos[0].file[0])
        formData.append('has_image_slide', true)
        formData.append('api_tipo', 'S')
        formData.append('api_posicao', 1)
        formData.append('api_conteudo', api_dados_inf)
        formData.append('api_exibe', 1)
        formData.append('api_id_apr', idapresentacao)
        axios.post(`${endpoint}/apresentacaoitem`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let iditem = result.data.data.api_id_api
            let arq = []
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item,imageload: false, imagesaved: true, idslideitem: iditem, file: arq } : item
                )
            )
            addToast(CompToast('Imagem Salva com sucesso !!!', 'success')) //--> usa toast
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
        formData.append('has_image_slide', true)
        formData.append('api_tipo', 'S')
        formData.append('api_posicao', 1)
        formData.append('api_conteudo', api_dados_inf)
        formData.append('api_exibe', 1)
        formData.append('api_id_apr', idapresentacao)
        formData.append('_method', 'put')
        axios.post(`${endpoint}/apresentacaoitem/${pos[0].idslideitem}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let iditem = result.data.data.apr_id_apr
            let arq = []
            addToast(CompToast('Imagem Atualizada com sucesso !!!', 'success')) //--> usa toast
            setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, imageload: false, imagesaved: true, file: arq } : item
                )
            )
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                setEstimg(!estimg)
            }, 2000)

        });
    }
    console.log(listaimagens)
  }

  const AlteraItemLista = (event,id,param,valor) => {
    if( param === 'imagem'){
       console.log(id)
       console.log(event.target.files[0].name)
       let val = event.target.files[0].name
       let valfile = []
       valfile.push(event.target.files[0])
       let path = 'slide/'+event.target.files[0].name
       setListaimagens(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, path: path, file: valfile, imagem: val} : item
                )
       )
    }
    console.log('ok')
  }

  const RemoveImagem = (event,id) =>{
        // setListaimagens(prevItems =>
        //     prevItems.map(item =>
        //     item.id === id ? { ...item, imagem: null } : item
        //     )
        // )
        let valor = []
        setListaimagens(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, file: valor, imagem: null, path: null  } : item
            )
        )
  }

  const AbreSlide = () => {
    let data = listaimagens.filter((item)=> item.exclui == false)
    console.log(data)
    if(data.length == 0){
       addToast(CompToast('Não há imagens pra exibição !!!', 'danger')) //--> usa toast
       setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
       }, 2000)
    } else {
       setOpenmodal(true)
    }
  }

const handleChange = (event) => {
    setEfeito(event.target.value);
};

const RadioEfeito = () =>{
   return (
        <>
            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1"
                onChange={handleChange}
                checked={efeito === 'cube'}
                value="cube"
                label="Cubo"
            />
            <CFormCheck inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2"
                onChange={handleChange}
                checked={efeito === 'coverflow'}
                value="coverflow"
                label="CoverfLow"
            />
            <CFormCheck  inline  type="radio" name="inlineRadioOptions" id="inlineCheckbox3"
                onChange={handleChange}
                checked={efeito === 'flip'}
                value="flip"
                label="Flip"
            />
            <CFormCheck  inline  type="radio" name="inlineRadioOptions" id="inlineCheckbox3"
                onChange={handleChange}
                checked={efeito === 'fade'}
                value="fade"
                label="Fade"
            />

        </>
    )
}
const SalvarVideo  = (event,id) =>{
    event.preventDefault()
    let pos = listavideo.filter((item)=>item.id == id);
    setListavideo(prevItems =>
          prevItems.map(item =>
             item.id === id ? { ...item, load: true } : item
          )
     )
    let api_dados_inf = MontaJsonVideoLista(pos[0]);
    // if( pos[0].file.length == 0){
    //     addToast(CompToast('Nenhuma Imagem foi Selecionada', 'danger')) //--> usa toast
    //     setTimeout(() => {
    //         document.getElementById('idtoast').classList.remove('show')
    //         document.getElementById('idtoast').remove()
    //         setListaimagens(prevItems =>
    //             prevItems.map(item =>
    //                 item.id === id ? { ...item, imageload: false } : item
    //             )
    //         )
    //         console.log(api_dados_inf)

    //     }, 2000)
    //     return
    // }
    if( pos[0].idvideoitem == null || pos[0].idvideoitem == '' ){
        const formData = new FormData()
        formData.append('api_tipo', 'V')
        formData.append('api_posicao', 0)
        formData.append('api_conteudo', api_dados_inf)
        formData.append('api_exibe', 1)
        formData.append('api_id_apr', idapresentacao)
        axios.post(`${endpoint}/apresentacaoitem`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let iditem = result.data.data.api_id_api
            setListavideo(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, load: false, idvideoitem: iditem  } : item
                )
            )
            addToast(CompToast('Video Salva com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                setEstimg(!estimg)
            }, 2000)
            //setListacidade(result.data.data)
        });
    } else {
        const formData = new FormData()
        formData.append('api_posicao', 0)
        formData.append('api_tipo', 'V')
        formData.append('api_conteudo', api_dados_inf)
        formData.append('api_exibe', 1)
        formData.append('api_id_apr', idapresentacao)
        formData.append('_method', 'put')
        axios.post(`${endpoint}/apresentacaoitem/${pos[0].idvideoitem}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            let iditem = result.data.data.apr_id_apr
            setListavideo(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, load: false } : item
                )
            )
            addToast(CompToast('Video Atualizada com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                setEstimg(!estimg)
            }, 2000)

        });
    }
    console.log(listaimagens)
  }

  return (
    <div>
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'400px'}} data-aos="fade-up">
          <h2>Apresentação</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <ModalApresentacao open={openmodal} close={()=>setOpenmodal(false)} lista={listaimagens} pathexibe={pathexibicao} efeito={efeito}/>
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Apresentaões</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-apresentacao" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    className='dropdown-class'
                                    id="idPalestra"
                                    label="Palestra"
                                    value={palestra}
                                    feedbackInvalid="A Palestra deve ser informado"
                                    onChange={(e)=>setPalestra(e.target.value)}
                                    required
                                >
                                <CompPalestra/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    className='dropdown-class'
                                    id="idColaborador"
                                    label="Colaborador"
                                    value={colaborador}
                                    feedbackInvalid="A Palestra deve ser informado"
                                    onChange={(e)=>setColaborador(e.target.value)}
                                    required
                                >
                                <CompColaborador/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormTextarea
                                    id="idEmail"
                                    label="Tema da Apresentação"
                                    placeholder="Digite o Tema da Apresentação"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    rows={2}
                                    value={tema}
                                    feedbackInvalid="O Tema precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTema(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Data da Apresentação</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    locale="ptBR"
                                    dateFormat="dd/MM/yyyy"
                                    showIcon
                                    selected={datapalestra}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setDatapalestra(date)}
                                    />
                                    {
                                    validated && datapalestra == null
                                    ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data da Apresentacao deve ser prenchida </div>)
                                    : (<></>)
                                    }
                                    </>
                                )}
                            </CCol>
                            <CCol md={8}>
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
                            <CCol xs={4} className='mt-3'>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Apresentação Ativa"
                                    feedbackInvalid="Informe se Palestra foi Ativo"
                                    checked={ativo}
                                    onChange={(e)=>setAtivo(e.target.checked)}

                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
                            </CCol>
                            {/* <CCol xs={12} className='me-2 mt-3' style={{borderRadius:'5px',border:'1px solid #6895C1'}}>
                                <span>teste</span>
                            </CCol> */}
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaApresentacao')}>Listar</CButton>
                                {' '}
                                <CButton color="info" type="button" onClick={()=>AbreSlide()}>
                                  Slide Apresentação&nbsp;<FontAwesomeIcon size="lg" icon={faFilePowerpoint}/>
                                </CButton>
                                {' '}
                                <CBadge color="primary">Efeito Apresentação:</CBadge>&nbsp;<RadioEfeito valor={efeito}/>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
            { idapresentacao != null ? <CarroselEvento/> : <></>}
            { idapresentacao != null ? <ColapseVideo/> : <></>}
        </div>
        </section>
    </div>

  )
}
export default Apresentacao
