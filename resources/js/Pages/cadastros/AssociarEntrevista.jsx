import { React, useEffect, useState, useRef, useInsertionEffect } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CBadge} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faList,faPerson,faSave,faCheck } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props Fortalecimentod from the Laravel controller
const AssociarEntrevista = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idassociar, setIdassociar] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [entrevista, setEntrevista] = useState('')
  const [tratamento, setTratamentoa] = useState('')
  const [pesqtrat, setPesqtrat] = useState('')
  const [pesqent, setPesqent] = useState('')
  const [listaentrevista, setListaentrevista] = useState([])
  const [listatratamento, setListatratamento] = useState([])
  const [listatrafiltro, setListatrafiltro] = useState([])
  const [listaentfiltro, setListaentfiltro] = useState([])
  const [idtrat, setIdtrat] = useState(null)
  const [textotrat, setTextotrat] = useState('')
  const [ident, setIdent] = useState(null)
  const [textoent, setTextoent] = useState('')
  const [saved,setSaved] = useState(false)
  const [showdrop,setShowdrop] = useState(false)
  const [showdropent,setShowdropent] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_drop = 'dropdown-menu show'
  const style_drop_ent = 'dropdown-menu show'
  const style_placeholder = {paddingBottom:'15px'}
  //ale_id_aco,ale_name,ale_cpf,ale_email,ale_tipo_telefone,ale_telefone,ale_ativo,ale_created_at,ale_updated_at,ale_deleted_at

useEffect(()=>{
   let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
           try {

           }
           catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    } else {
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/tratamento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/fichaentrevista?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

                const responses = await Promise.all(requests);
                let lista_trat = responses[0]
                console.log(lista_trat)
                let lista_entr = responses[1]
                let vet = lista_trat.data.data.filter((item)=>item.tra_ficha == null)
                setListatrafiltro(vet)
                //vet.unshift({tra_id_tra:'',tra_acolhido:'Selecione o Tratamento'})
                setListatratamento(vet)
                vet = lista_entr.data.data.filter((item)=>item.fie_id_tra == null)
                setListaentfiltro(vet)
                //vet.unshift({fie_id_fie:'',fie_acolhido:'Selecione o Entrevista'})
                setListaentrevista(vet)
                setLoadpage(false)
                setShowdrop(false)
                setShowdropent(false)
           }
           catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
},[])

//   useEffect(()=>{
//     let data = formatDate(new Date());
//     setCadastro(data)
//     if( props.param != null){
//        setLoadpage(true)
//        axios
//         .get(`${endpoint}/alerta/${param}`, {
//             headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//             Authorization: 'Bearer ' + token,//dentro do env//
//             },
//         })
//         .then((result) => {
//             setIdalerta(result.data.data.ale_id_ale)
//             setDescricao(result.data.data.ale_descricao)
//             setCadastro(result.data.data.ale_created_at)
//             console.log('teste')
//             setLoadpage(false)
//         })
//     } else {
//        setLoadpage(false)
//     }
//   },[])

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

 const CompTrat = () =>{
    return(
        listatratamento.map((item,index)=>{
            if(index == 0){
                return(
                  <option key={index} value={item.tra_id_tra}>{item.tra_acolhido}</option>
                )
            } else {
                return(
                   <option key={index} value={item.tra_id_tra}>{item.tra_acolhido +' - '+item.tra_tipo}</option>
                )
            }
        })
    )
 }

 const CompEntr = () =>{
    return(
        listaentrevista.map((item,index)=>{
            if(index == 0){
                return(
                    <option key={index} value={item.fie_id_fie}>{item.fie_acolhido}</option>
                    )
            } else {
                return(
                    <option key={index} value={item.fie_id_fie}>{item.fie_acolhido.aco_name +' - Entrevista Nº: '+item.fie_id_fie+' Data:'+item.fie_created_at}</option>
                )
            }
        })
    )
 }
 const  handleSave = (erro) =>{

    if( erro == false && idassociar == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('fie_id_tra', idtrat)
        formData.append('_method', 'put')
        axios
        .post(`${endpoint}/fichaentrevista/${ident}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaAssociarEntrevista'
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
        formData.append('ale_descricao', descricao)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/alerta/${idassociar}`, formData, {
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
                tela('ListaAssociarEntrevista')
            }, 2000)
        })
    }
 }

 const ImageHeader = () =>{
     return(
        <div style={{position:'relative',top:'4px'}}>
        <img class="img-fluid" style={{borderRadius:'5px'}} src={imagem+'telas/logoheadercadastro.png'}/>
        <div style={{fontSize:'17px',position:'relative',left:'-48px',top:'-40px',color:'white',fontWeight:'bold',lineHeight:'20px'}}>
            Associar Entrevistas<br/> a Tratamento
         </div>
        </div>
    )
 }

 const SelectTratamento = (props) =>{
    let classe = showdrop ? style_drop : 'dropdown-menu'
    return(
     <CDropdown>
        <CDropdownToggle  size="sm"  className="small associar" color="secondary" onClick={(e)=>setShowdrop(!showdrop)}>Selecionar Tratamento</CDropdownToggle>
        <CDropdownMenu className={classe}>
                {listatratamento.map((item,index)=>{
                    return(
                        <CDropdownItem href="#">
                            {item.tra_acolhido}&nbsp;
                            <CBadge color="success">{item.tra_tipo}</CBadge>&nbsp;
                            <CBadge color="info">{'Nº '+item.tra_id_tra}</CBadge>&nbsp;
                            <FontAwesomeIcon icon={faCheck} onClick={(e)=>selTrat(e,item.tra_id_tra,item.tra_acolhido+' - '+item.tra_tipo+' - Nº '+item.tra_id_tra)}/>
                       </CDropdownItem>
                    )
                })}
        </CDropdownMenu>
    </CDropdown>
    )
 }

 const selTrat = (event,id,texto) =>{
    setIdtrat(id)
    setTextotrat(texto)
    setShowdrop(false)
 }
 const pesquisarTrat = (valor) => {
     setShowdropent(false)
     setShowdrop(true)
     if( valor.trim() != ''){
        let lista = listatrafiltro.filter(
            (item)=>item.tra_acolhido.toLowerCase().includes(valor.toLowerCase())
            // (item)=>item.aco_name.toLowerCase().includes(valor.toLowerCase()) ||
            //         item.aco_email.toLowerCase().includes(valor.toLowerCase()) ||
            //         item.aco_cpf.toLowerCase().includes(valor.toLowerCase())
        )
        //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
        console.log(lista)
        setListatratamento(lista.slice(0,20))
     } else {
        setListatratamento(listatrafiltro.slice(0,20))
     }
}


useEffect(() => {
     console.log('teste:', pesqtrat)
     pesquisarTrat(pesqtrat)
}, [pesqtrat])

const SelectEntrevista = (props) =>{
    // console.log(props.valor)
    console.log(listaentfiltro)
    let classe = showdropent ? style_drop : 'dropdown-menu'
    return(
     <CDropdown>
        <CDropdownToggle size="sm" className="small associar"  color="secondary" onClick={(e)=>setShowdropent(!showdropent)}>Lista de Entrevistas</CDropdownToggle>
        <CDropdownMenu className={classe}>
                {listaentrevista.map((item,index)=>{
                    return(
                        <CDropdownItem href="#">
                            {item.fie_acolhido.aco_name}&nbsp;
                            <CBadge color="info">{'Nº '+item.fie_id_fie}</CBadge>&nbsp;
                            <FontAwesomeIcon icon={faCheck} onClick={(e)=>selEnt(e,item.fie_id_fie,item.fie_acolhido.aco_name+' - Nº '+item.fie_id_fie)}/>
                       </CDropdownItem>
                    )
                })}
        </CDropdownMenu>
    </CDropdown>
    )
 }

  const selEnt = (event,id,texto) =>{
    setIdent(id)
    setTextoent(texto)
    setShowdropent(false)
 }

 const pesquisarEnt = (valor) => {
     setShowdrop(false)
     setShowdropent(true)
     if( valor.trim() != ''){
        let lista = listaentfiltro.filter(
            (item)=>item.fie_acolhido.aco_name.toLowerCase().includes(valor.toLowerCase())
            // (item)=>item.aco_name.toLowerCase().includes(valor.toLowerCase()) ||
            //         item.aco_email.toLowerCase().includes(valor.toLowerCase()) ||
            //         item.aco_cpf.toLowerCase().includes(valor.toLowerCase())
        )
        //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
        console.log(lista)
        setListaentrevista(lista.slice(0,20))
     } else {
        setListaentrevista(listaentfiltro.slice(0,20))
     }
}


useEffect(() => {
     pesquisarEnt(pesqent)
}, [pesqent])




  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" data-aos="fade-up">
          <ImageHeader/>
          {/* <h2>AssociarEntrevistas</h2>
          <p>Cadastro</p> */}
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Associar Entrevistas a Tratamento</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                        id="idLista"
                                        label="Pesquisar Tratamento"
                                        value={pesqtrat}
                                        onChange={(e)=>setPesqtrat(e.target.value)}
                                   />)}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<SelectTratamento valor={pesqtrat}/>)}
                            </CCol>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                        id="idLista"
                                        label="Tratamento Selecionado"
                                        value={textotrat}
                                        feedbackInvalid="O Tratamento precisa ser preenchida"
                                        required
                                        //onChange={(e)=>setPesqtrat(e.target.value)}
                                   />)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                        id="idLista"
                                        label="Pesquisar Entrevsta"
                                        value={pesqent}
                                        onChange={(e)=>setPesqent(e.target.value)}
                                   />)}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<SelectEntrevista valor={pesqent}/>)}
                            </CCol>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                        id="idLista"
                                        label="Entrevista Selecionada"
                                        value={textoent}
                                        feedbackInvalid="A Entrevista precisa ser preenchida"
                                        required
                                        //onChange={(e)=>setPesqtrat(e.target.value)}
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
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaTratamentos')}>
                                    Listar Tratamentos&nbsp;<FontAwesomeIcon size="lg" icon={faList} />
                                </CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default AssociarEntrevista
