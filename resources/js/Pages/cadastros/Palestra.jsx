import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CCollapse,CBadge,CConditionalPortal, CCardImage,CCardText,
  CFormTextarea} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faCircleXmark,faArrowAltCircleDown,faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp,faMagnifyingGlassPlus,faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ModalExibeFoto from '../componentes/ModalExibeFoto';
registerLocale("ptBR", ptBR);



// The Main component receives props passed from the Laravel controller
const Palestra = (props) => {
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
  const [idpalestra, setidPalestra] = useState(null)
  const [idpalestraitem, setIdeventoitem] = useState(null)
  const [titulo, setTitulo] = useState('')
  const [colaborador, setColaborador] = useState('')
  const [tema, setTema] = useState('')
  const [texto, setTexto] = useState('')
  const [categoriaevento, setCategoriaevento] = useState('')
  //const [texto, setTexto] = useState('')
  const [concluido, setConcluido] = useState(false)
  const [listacolaborador, setListacolaborador] = useState([])
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
  const [local, setLocal] = useState('Rua da Ambrosia, 183, Proximo ao arena 2 deJulho, Bairro 2 de Julho');
  const [finalizado, setFinalizado] = useState(false)
  const [exibir, setExibir] = useState(false)
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)
  const [paramestado, setParamestado] = useState(props.estadovalor)
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //itens evento//
  const [folder,setFolder] =  useState(null)//toast
  const [imagefolder,setImagefolder] =  useState(null)//toast
  const [estimg,setEstimg] = useState(false)
  const [estcard,setEstcard] = useState(false)
  const [openmodal,setOpenmodal] = useState(false)
  const [imagematual,setImagematual] = useState(null)
  //imagens do evento
  const [listaimagens,setListaimagens] = useState([])
  const [dadozoom,setDadozoom] = useState('zoom-in')
  const style_imagem_plus = {width:'110%',zIndex:'20'}
  const style_imagem_minus = {width:'30%',zIndex:'20'}
  const [tamimagem,setTamimagem] = useState(style_imagem_minus)
  const [iconimagem,setIconimagem] = useState(faMagnifyingGlassPlus)
  //pal_id_pal,pal_name,pal_cpf,pal_texto,pal_tipo_telefone,pal_telefone,pal_concluido,pal_created_at,pal_updated_at,pal_deleted_at

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
                    axios.get(`${endpoint}/colaborador?listagem=S&palestrante=S`, {
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
                    axios.get(`${endpoint}/palestra/${param}`,{
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
                let result_colaborador = responses[1]
                let result_cidade = responses[2]
                let result_palestra = responses[3]
                let result_categoriaevento = responses[4]

                let objmeta = null
                let cont = 0

                setListaestado(result_estado.data.data)
                setListacidade(result_cidade.data.data)
                let array_cat = result_categoriaevento.data.data
                array_cat.unshift({cae_id_cae:'',cae_descricao:'Selecione a Categoria da Palestra'})
                setListacategoriaevento(array_cat)
                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Palestrante'})
                setListacolaborador(array_col)


                //palestras

                setidPalestra(result_palestra.data.data.pal_id_pal)
                setTema(result_palestra.data.data.pal_tema)
                setTexto(result_palestra.data.data.pal_texto)
                setCadastro(result_palestra.data.data.pal_created_at)
                setLocal(result_palestra.data.data.pal_local)
                let concluidock = result_palestra.data.data.pal_concluido == 1 ? true : false
                setFinalizado(concluidock)
                let exibirck = result_palestra.data.data.pal_exibir == 'S' ? true : false
                setExibir(exibirck)
                setColaborador(result_palestra.data.data.pal_id_col)
                setDatainicio(new Date(result_palestra.data.data.pal_data_inicio_format))
                setDatafim(new Date(result_palestra.data.data.pal_data_fim_format))
                setHorainicio(new Date(result_palestra.data.data.pal_hora_inicio_format))
                setHorafim(new Date(result_palestra.data.data.pal_hora_fim_format))
                setCidade(result_palestra.data.data.pal_cidade)
                setCategoriaevento(result_palestra.data.data.pal_id_cae)
                if(result_palestra.data.data.pal_folder != null){
                    let string = JSON.parse(result_palestra.data.data.pal_folder)
                    setFolder(string["meta"][0].imagem)
                } else {
                    setFolder(null)
                }
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
                    axios.get(`${endpoint}/colaborador?listagem=S&palestrante=S`, {
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

                let result_colaborador = responses[0]
                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Palestrante'})
                let result_estado = responses[1]
                let result_cidade = responses[2]
                let result_categoriaevento = responses[3]
                setListacolaborador(array_col)
                setListaestado(result_estado.data.data)
                setListacidade(result_cidade.data.data)
                let array_cat = result_categoriaevento.data.data
                array_cat.unshift({cae_id_cae:'',cae_descricao:'Selecione a Categoria da Palestra'})
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

    if( erro == false && idpalestra == null) {
        //'pal_id_pal','pal_id_puf','pal_titulo','pal_texto','pal_data_inicio','pal_data_fim','pal_hora_inicio','pal_hora_fim','pal_local','pal_concluido','pal_created_at','pal_updated_at','pal_deleted_at'
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('pal_texto', texto)
        formData.append('pal_id_col', colaborador)
        formData.append('pal_id_cae', categoriaevento)
        formData.append('pal_tema', tema)
        formData.append('pal_data_inicio', formatDateBanco(new Date(datainicio)))
        formData.append('pal_data_fim', formatDateBanco(new Date(datafim)))
        formData.append('pal_hora_inicio', formatDateBanco(new Date(horainicio)))
        formData.append('pal_hora_fim', formatDateBanco(new Date(horafim)))
        formData.append('pal_local', local)
        formData.append('pal_estado', estado)
        formData.append('pal_cidade', cidade)
        if(folder != null){
           let pal_dados_inf =  MontaJsonImagem()
           formData.append('pal_folder', pal_dados_inf)
           formData.append('has_image', true)
           formData.append('file', imagefolder)

        }
        let status = finalizado ? 1 : 0
        formData.append('pal_concluido', status)
        let exibirck = exibir ? 'S' : 'N'
        formData.append('pal_exibir', exibirck)
        axios
        .post(`${endpoint}/palestra`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaPalestras'
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
        formData.append('pal_texto', texto)
        formData.append('pal_id_col', colaborador)
        formData.append('pal_id_cae', categoriaevento)
        formData.append('pal_tema', tema)
        formData.append('pal_data_inicio', formatDateBanco(new Date(datainicio)))
        formData.append('pal_data_fim', formatDateBanco(new Date(datafim)))
        formData.append('pal_hora_inicio', formatDateBanco(new Date(horainicio)))
        formData.append('pal_hora_fim', formatDateBanco(new Date(horafim)))
        formData.append('pal_local', local)
        formData.append('pal_estado', estado)
        formData.append('pal_cidade', cidade)
        if(folder != null && imagefolder != null){
           let pal_dados_inf =  MontaJsonImagem()
           formData.append('pal_folder', pal_dados_inf)
           formData.append('has_image', true)
           formData.append('file', imagefolder)
        }
        let status = finalizado ? 1 : 0
        formData.append('pal_concluido', status)
        let exibirck = exibir ? 'S' : 'N'
        formData.append('pal_exibir', exibirck)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/palestra/${idpalestra}`, formData, {
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
                tela('ListaPalestras')
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

 const CompColaborador = () =>{
    return(
        listacolaborador.map((item,index)=>{
        return(
            <option key={index} value={item.col_id_col}>{item.col_name}</option>
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

 const CompCategotiaPalestra = () =>{
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

  const ImagemPalestra = () =>{
     return (
       <CCard>
          <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Itens do Palestra</CCardHeader>
          <CRow className='mt-3 ms-1 me-1'>
            <CCol md={8}>
               <CFormLabel htmlFor="exampleFormControlInput1">Imagem de Pubicação do Palestra</CFormLabel><br/>
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
                   {folder && <p>Arquivo Selecionado: <CBadge color="primary">{folder}</CBadge></p>}
                </div>
            </CCol>
            { folder != null ?
            (<CCol md={4} className='mt-3 mb-3'>
               <div className="containerimg">
                   <img style={{width:'30%'}} src={imagem + 'palestra/'+folder}/>
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

  const CarroselPalestra = () =>{
       return (
          <CCard>
             <CCardHeader className="fundo_head mt-1">
                <FontAwesomeIcon size="lg" icon={faPerson} />
                &nbsp;Imagens do Palestra
                { visible
                   ?
                  (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowUp} onClick={(e)=>mudaColapse(false)}/></>)
                  :
                  (<>&nbsp;<FontAwesomeIcon size="lg" icon={faCircleArrowDown} onClick={(e)=>mudaColapse(true)}/></>)
                }
             </CCardHeader>
             <ContainerItemPalestra/>
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

  const ContainerItemPalestra = () =>{
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
         idpalestraitem:'',
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
        idpalestra:null,
        imagem:dados.imagem,
        path:'palestra/'+dados.imagem,
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
    let pal_dados_inf = MontaJsonImagemLista(pos[0]);
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
            console.log(pal_dados_inf)

        }, 2000)
        return
    }
    if( pos[0].idpalestraitem == null || pos[0].idpalestraitem == '' ){
        const formData = new FormData()
        formData.append('file', pos[0].file[0])
        formData.append('has_image', true)
        formData.append('has_image_itemevento', true)
        formData.append('evi_tipo_informacao', 'BA')
        formData.append('evi_id_eve', idpalestra)
        formData.append('pal_dados_inf', pal_dados_inf)
        axios.post(`${endpoint}/palestraitem`, formData, {
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
                    item.id === id ? { ...item, idpalestraitem: iditem } : item
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
        formData.append('evi_id_eve', idpalestra)
        formData.append('pal_dados_inf', pal_dados_inf)
        formData.append('_method', 'put')
        axios.post(`${endpoint}/palestraitem/${pos[0].idpalestraitem}`, formData, {
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
        let pal_dados_inf =  MontaJsonImagem()
        const formData = new FormData()
        formData.append('file', imagefolder)
        formData.append('has_only_image', true)
        formData.append('pal_id_pal', idpalestra)
        formData.append('pal_folder', pal_dados_inf)
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
        axios.post(`${endpoint}/palestra/${idpalestra}`, formData, {
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

  }

  const MontaJsonImagem = () =>{

    let arrayitens = []
    let obj = null
    let objfinal = null
    arrayitens = []
    obj ={
        imagem:folder,
        path:'palestra/'+folder,
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
         idpalestraitem:'',
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
         idpalestraitem:'',
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

  const expande = (event) =>{
    if(iconimagem === faMagnifyingGlassPlus){
       setTamimagem(style_imagem_plus)
       setIconimagem(faMagnifyingGlassMinus)
    } else {
      setTamimagem(style_imagem_minus)
      setIconimagem(faMagnifyingGlassPlus)
    }
  }

  const ImagemEvento = () =>{
       return (
            <CRow className='mt-3'>
              <CCol md={8}>
                 <CFormLabel htmlFor="exampleFormControlInput1">Imagem de Pubicação do Evento</CFormLabel><br/>
                 <CInputGroup className="mb-3">
                      <CFormInput
                          type="file"
                          id="inputGroupFile02"
                          onChange={(e)=>onImageChange(e)}
                      />
                      {
                        idpalestra != null ?
                        (<CInputGroupText as="label" style={{cursor:'pointer'}} htmlFor="inputGroupFile02" onClick={(e)=>SalvarImagem(e)}>
                            Upload&nbsp;{loadsaveimage? <CSpinner size="sm" /> : ''}
                        </CInputGroupText>)
                        :(<></>)
                      }
                  </CInputGroup>
                  <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'1px'}}>
                     <FontAwesomeIcon size="lg" style={{color:'red',cursor:'pointer'}} icon={faCircleXmark} onClick={(e)=>onRemoveAnexo(e)}/>
                     {folder && <p>Arquivo Selecionado: <CBadge color="primary">{folder}</CBadge></p>}
                  </div>
              </CCol>
              { folder != null ?
              (<CCol md={4} className='mt-3 mb-3'>
                 <div className="containerimg">
                     <img style={tamimagem} src={imagem + 'palestra/'+folder}/>
                 </div>
                 <div style={{position:'relative',top:'-125px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'21'}}>
                    <FontAwesomeIcon size="lg" style={{color:'blue',cursor:'pointer'}} icon={iconimagem} onClick={(e)=>expande(e)}/>
                 </div>
              </CCol>)
              :('')}
            </CRow>
       )
  }


  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" data-aos="fade-up">
          <h2> Palestras </h2>
          <p>Cadastro</p>
        </div>
        <div id="idcontainer" class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <ModalExibeFoto open={openmodal} close={closeModal} imagem={imagematual}/>
                <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Palestras</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idNome"
                                    label="Tema do Palestra"
                                    placeholder="Digite o Tema do Palestra"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={tema}
                                    feedbackInvalid="O Tema do Palestra precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTema(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idCategoriaPalestra"
                                    label="Categoria do Palestra"
                                    value={categoriaevento}
                                    feedbackInvalid="A Categoria do Palestra dever ser informada"
                                    onChange={(e)=>setCategoriaevento(e.target.value)}
                                    required
                                >
                                <CompCategotiaPalestra/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormTextarea
                                    id="idEmail"
                                    label="Texto de Apresentação da Palestra"
                                    placeholder="Digite o Texto de Apresentação da Palestra"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    rows={2}
                                    defaultValue={texto}
                                    feedbackInvalid="O Texto de Apresentação precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTexto(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idColaborador"
                                    label="Palestrante"
                                    value={colaborador}
                                    feedbackInvalid="O Palestrante dever ser informada"
                                    onChange={(e)=>setColaborador(e.target.value)}
                                    required
                                >
                                <CompColaborador/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Início de Palestra</CFormLabel><br/>
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
                                  {
                                   validated && datainicio == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data de Início da Palestra deve ser prenchida </div>)
                                   : (<></>)
                                  }
                                    </>
                                )}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Data Final do Palestra</CFormLabel><br/>
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
                                   {
                                   validated && datafim == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data Final da Palestra deve ser prenchida </div>)
                                   : (<></>)
                                   }
                                    </>
                                )}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Hora Início do Palestra</CFormLabel><br/>
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
                                    timeIntervals={15}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setHorainicio(date)}
                                    />
                                   {
                                    validated && horainicio == null
                                    ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Hora de Início da Palestra deve ser prenchida </div>)
                                    : (<></>)
                                   }

                                    </>
                                )}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Hora Fim do Palestra</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    showTimeSelect
                                    dropdownMode="select"
                                    locale="ptBR"
                                    timeIntervals={15}
                                    //dateFormat="dd/MM/yyyy"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showIcon
                                    selected={horafim}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setHorafim(date)}
                                    />
                                   {
                                   validated && horafim == null
                                   ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Hora Final da Palestra deve ser prenchida </div>)
                                   : (<></>)
                                   }
                                   </>
                                )}
                            </CCol>
                            <ImagemEvento/>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idNome"
                                    label="Local (Endereço do evento) do Palestra"
                                    placeholder="Digite o titulo do Palestra"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={local}
                                    feedbackInvalid="O Local do Palestra precisa ser preenchido"
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
                                <div style={{overflow:'auto'}}>
                                   <div style={{float:'left',paddingLeft:'3px'}}>
                                        <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                        <CFormCheck
                                            type="checkbox"
                                            id="invalidCheck"
                                            label="Palestra Finalizada"
                                            feedbackInvalid="Informe se Palestra foi Ativo"
                                            checked={finalizado}
                                            onChange={(e)=>setFinalizado(e.target.checked)}
                                        />
                                    </div>
                                    <div style={{float:'left'}}>
                                      <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                      &nbsp;&nbsp;{finalizado ? <CBadge color="success">Concluída</CBadge> : <></>}
                                    </div>
                                </div>
                                </>)}
                            </CCol>
                            {/* <CCol xs={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Palestra Finalizada"
                                    feedbackInvalid="Informe se Palestra foi Ativo"
                                    checked={finalizado}
                                    onChange={(e)=>setFinalizado(e.target.checked)}

                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
                            </CCol> */}
                            <CCol xs={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <div style={{overflow:'auto'}}>
                                   <div style={{float:'left',paddingLeft:'3px'}}>
                                        <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                        <CFormCheck
                                            type="checkbox"
                                            id="invalidCheck"
                                            label="Exibir Palestra"
                                            feedbackInvalid="Informe se Palestra foi Ativo"
                                            checked={exibir}
                                            onChange={(e)=>setExibir(e.target.checked)}
                                        />
                                    </div>
                                    <div style={{float:'left'}}>
                                      <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                      &nbsp;&nbsp;{exibir ? <></> : <CBadge color="danger">Bloqueada Exibição</CBadge>}
                                    </div>
                                </div>
                                </>)}
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaPalestras')}>Listar</CButton>
                                {' '}
                                <CButton color="info" type="button" onClick={(e)=>handleClick(e,'Colaborador')}>Novo Colaborador</CButton>
                            </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
            {/* { idpalestra !== null ? <ImagemPalestra/> : ''}
            { idpalestra !== null ? <CarroselPalestra/> : ''} */}
        </div>
        </section>
    </div>
  )
}
export default Palestra
