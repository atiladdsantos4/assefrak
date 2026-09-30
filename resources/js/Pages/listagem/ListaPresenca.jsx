import { React, useEffect, useState, Suspense, useRef } from 'react';
import {
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CCard,
    CCardBody,
    CCardHeader,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CPagination,
    CPaginationItem,
    CCardText,
    CButton,
    CSpinner,
    CFormSelect,
    CBadge,
    CRow,
    CCol,
    CPlaceholder,
    CFormCheck,
    CToaster,
    CToast,
    CToastBody,
    CToastClose
} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faCheck, faFile, faTrash, faEdit, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import ModalInscricao from '../componentes/ModalInscricao';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const ListaPresenca = (props) => {
  const { tela, altera }  = props
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const endpoint_report =import.meta.env.VITE_APP_ENDPOINT
  const [listageral,setListageral] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [est,setEst] = useState(false)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  const [pesquisar,setPesquisar] = useState(null)
  const [load,setLoad] = useState(false)
  const [loadpage,setLoadpage] = useState(false)
  const [evento,setEvento] = useState('')
  const [curso,setCurso] = useState('')
  const [listapesquisa,setListapesquisa] = useState(null)
  const [tipolista,setTipolista] = useState('')
  const [toast, addToast] = useState()//toast
  const toaster = useRef(null)
  //listapesquisa.charAt(0).toUpperCase()+listapesquisa.slice(1)+' :' primneira vogal upper
  const [textopesquisa,setTextopesquisa] = useState('')
  const [listacurso,setListacurso] = useState([])
  const [listaevento,setListaevento] = useState([])
  const [estado,setEstado] = useState(false)
  const [temdados,setTemdados] = useState(false)
  const [param,setParam] = useState(null)
  const style_placeholder = {paddingBottom:'15px'}
  //modal
  const [openmodal,setOpenmodal] = useState(null)
  const [dadosmodal,setDadosmodal] = useState(null)
  /*
  const [numnpagination,setNumpagination] = useState(null)
    const [paginaatual,setPaginaatual] = useState(null)
    const [ultimapagina,setUltimapagina] = useState(null)
    const [registroini,setRegistroini] = useState(0)
    const [registrofim,setRegistrofim] = useState(0)
    const [qtderegistros,setQtderegistros] = useState(0)
    const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  */
  useEffect(()=>{
    if(estado == false){

       setLoadpage(true)
       const fetchData = async () =>{
           try {
                //setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/curso?listagem=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    }),
                    axios.get(`${endpoint}/evento?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),

                ]
                const responses = await Promise.all(requests);
                let result_curso = responses[0]
                let result_evento = responses[1]
                let array_cur = result_curso.data.data
                array_cur.unshift({cur_id_cur:'',cur_titulo:'Selecione o Curso'})
                setListacurso(array_cur)
                let array_eve = result_evento.data.data
                array_eve.unshift({eve_id_eve:'',eve_titulo:'Selecione o Evento'})
                setListaevento(array_eve)
                // setListafiltro(result_curso.data.data)
                // let array_pub = result_foco.data.data
                // array_pub.unshift({puf_id_puf:'',puf_descricao:'Selecione o Tipo'})
                // setListafoco(array_pub)
                // let tam = result_curso.data.data.length
                // setQtderegistros(tam)
                // let res = tam / qtderegistrospagina
                //  if( tam <= qtderegistrospagina){
                //    res = 1
                //    setNumpagination(1)
                // } else {
                //     let resposta = res.toString().split('.');
                //     if( parseInt(resposta[1]) === 0 || resposta[1] === undefined){
                //             setNumpagination(res)
                //     } else {
                //             res = parseInt(resposta[0]) + 1
                //             let numpag = res.toFixed(0)
                //             setNumpagination(numpag)
                //     }
                // }
                // setUltimapagina(res)
                // setPaginaatual(1)
                // if( tam > 0){
                //     setRegistroini(1)
                //     setRegistrofim(qtderegistrospagina)
                // }
                // setListacursos(result_curso.data.data.slice(0,qtderegistrospagina))
                setLoadpage(false)
                setLoad(true)
                //setEstado(true)

            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[estado])//

  useEffect(()=>{
     console.log('tipolista:'+listapesquisa)
     if(listapesquisa == null){
        return
     }
     let filtro = listapesquisa
     let id = null
     if( listapesquisa == 'evento'){
        id = evento
     } else {
        id = curso
     }
     setParam(id)
     setLoad(false)
     axios
       .get(`${endpoint}/inscricao?listagem=S&filtro=${filtro}&id=${id}`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           altera(null)
           console.log(result)
           setListageral(result.data.data)
           setListafiltro(result.data.data)
           let tam = result.data.data.length
           setQtderegistros(tam)
           let res = tam / qtderegistrospagina
           let resposta = res.toString().split('.');
           if( parseInt(resposta[1]) === 0 || resposta[1] === undefined){
                setNumpagination(res)
           } else {
                res = parseInt(resposta[0]) + 1
                let numpag = res.toFixed(0)
                setNumpagination(numpag)
           }
           setUltimapagina(res)
           setPaginaatual(1)
           if( tam > 0){
               setRegistroini(1)
               setRegistrofim(qtderegistrospagina)
           }
           setLoad(true)
       })
  },[est,qtderegistrospagina])

  const alteraCurso = (event) =>{
     setTemdados(false)
     setCurso(event.target.value)
     setListapesquisa('curso')
     setTipolista('Curso: ')
     let idx = event.nativeEvent.target.selectedIndex;
    //  console.log(idx)
    //  console.log(event.nativeEvent.target[idx].text)
     setTextopesquisa(event.nativeEvent.target[idx].text)
     setEvento('')
     setEst(!est)
  }

  const alteraEvento = (event) =>{
     setTemdados(false)
     setEvento(event.target.value)
     setListapesquisa('evento')
     setTipolista('Evento: ')
     let idx = event.nativeEvent.target.selectedIndex;
    //  console.log(idx)
    //  console.log(event.nativeEvent.target[idx].text)
     setTextopesquisa(event.nativeEvent.target[idx].text)
     setCurso('')
     setEst(!est)
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

  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
      let classe = null
      let cont = 0
      let tam = props.lista.length
      if( tam == 0){
        setTemdados(false)
        return(
            <CTableRow color={classe}>
                <CTableDataCell colspan="9" style={{textAlign:'center'}}>Não há Registros para Listagem</CTableDataCell>
            </CTableRow>
        )
      } else {
        setTemdados(true)
      }
      return(
         props.lista.map((item,index)=>{
            cont++
            classe = index % 2 == 0 ? 'primary' : 'secondary'
            if(cont > qtderegistrospagina){
               return
            } else {
                //ins_id_ins,ins_id_cur,ins_id_eve,ins_id_puf,ins_nome,ins_email,ins_telefone,ins_tipo,ins_ativo
               return(
                <CTableRow color={classe}>
                    <CTableDataCell>#-{cont}</CTableDataCell>
                    <CTableDataCell>{item.ins_nome}</CTableDataCell>
                    <CTableDataCell>{item.ins_email}</CTableDataCell>
                    <CTableDataCell>{item.ins_telefone}</CTableDataCell>
                    <CTableDataCell>{item.ins_envio_email === 'S' ? <CBadge color="info">Enviado</CBadge> : <CBadge color="warning">Falha</CBadge>}</CTableDataCell>
                    <CTableDataCell><CompCheckbox id={item.ins_id_ins} ativo={item.ins_ativo}/>&nbsp;{item.ins_load ? (<CSpinner color="info" size="sm"/>):(<></>)}&nbsp;&nbsp;{item.ins_ativo == 1 ? <CBadge color="success">Ativo</CBadge> : <CBadge color="danger">Suspenso</CBadge>}</CTableDataCell>
                    <CTableDataCell>{item.ins_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao modal={item.ins_modal_load} id={item.ins_id_ins}/></CTableDataCell>
                    {/* <CTableDataCell style={{textAlign:'center'}}></CTableDataCell> */}
                    </CTableRow>
               )
            }
         })
      )
  }


  const pesquisarGrid = (event) => {
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.ins_nome.toLowerCase().includes(valor.toLowerCase()) ||
            item.ins_email.toLowerCase().includes(valor.toLowerCase()) ||
            item.ins_telefone.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListageral(lista.slice(0,qtderegistrospagina))
     } else {
        setListageral(listafiltro.slice(0,qtderegistrospagina))
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
    setListageral(lista)
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

  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    console.log(props.modal)
    return(
       <>
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       &nbsp;
       <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id,props.modal)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
        &nbsp;
       {
         props.modal ? (<CSpinner color="info" size="sm"/>) : (<></>)
       }
       </>
    )
  }

  const EditaRegistro = (event,id) =>{
     setListageral(prevItems =>
         prevItems.map(item =>
            item.ins_id_ins === id ? { ...item, ins_modal_load: true } : item
         )
     )
     axios.get(`${endpoint}/inscricao/${id}`,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
        },
     })
     .then((result) => {
       setListageral(prevItems =>
         prevItems.map(item =>
            item.ins_id_ins === id ? { ...item, ins_modal_load: false } : item
         )
       )
       setDadosmodal(result.data.data)
       setOpenmodal(true)
     })

    //   altera(valor)
    //   tela('Livro')
  }

  const QtdeRegistrosPagina = () =>{
          return(
              <CFormSelect
                  value={qtderegistrospagina}
                  onChange={(e)=>setQtderegistrospagina(e.target.value)}
                  >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
              </CFormSelect>
          )
  }

  const CompCursos = () =>{
    return(
        listacurso.map((item,index)=>{
        return(
            <option key={index} value={item.cur_id_cur}>{item.cur_titulo}</option>
            )
        })
    )
 }

 const CompEventos = () =>{
    return(
        listaevento.map((item,index)=>{
        return(
            <option key={index} value={item.eve_id_eve}>{item.eve_titulo}</option>
            )
        })
    )
 }

 const CompCheckbox = (props) => {
    let valor = props.ativo == 1 ? true : false
    const [check,setCheck] = useState(valor)
    function Mudar(event){
       setCheck(event.target.checked)
       let val = event.target.checked ? 1: 0
       setListageral(prevItems =>
            prevItems.map(item =>
            item.ins_id_ins === props.id ? { ...item, ins_ativo: val,ins_load: true } : item
            )
       )
       AlteraStatus(props.id,val)
    }
    return (
        <CFormCheck className="ckform" id="flexCheckDefault" onChange={(e)=>Mudar(e)} checked={check} label=""/>
    )
}

const AlteraStatus = (id,valor) =>{

        const formData = new FormData()
        formData.append('ins_ativo', valor)
        formData.append('_method', 'put')
        axios
        .post(`${endpoint}/inscricao/${id}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setListageral(prevItems =>
                 prevItems.map(item =>
                    item.ins_id_ins === id ? { ...item, ins_load: false } : item
                 )
            )
            addToast(CompToast('Status alterado com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                //tela(valor)
            }, 2000)
        })
}

  return(
    <>
    <ModalInscricao open={openmodal} close={setOpenmodal} dados={dadosmodal} atualiza={(e)=>setEst(!est)}/>
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'500px'}} data-aos="fade-up">
          <h2>Lista de  Presenca</h2>
          <p>Listagem</p>
        </div>
        <div class="container">
            <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
            <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Listagem de Lista de  Presenca</CCardHeader>
                <CCardBody className='mt-1 mb-5'>
                    <CRow>
                         <CCol md={4}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                            <CFormSelect
                                id="idEstado"
                                label="Eventos"
                                value={evento}
                                feedbackInvalid="O Estado deve ser informado"
                                onChange={(e)=>alteraEvento(e)}
                                required
                            >
                            <CompEventos/>
                            </CFormSelect>)}
                        </CCol>
                        <CCol md={4}>
                            { loadpage
                            ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                            : (
                            <CFormSelect
                                id="idCursos"
                                label="Cursos"
                                value={curso}
                                feedbackInvalid="O Estado deve ser informado"
                                onChange={(e)=>alteraCurso(e)}
                                required
                            >
                            <CompCursos/>
                            </CFormSelect>)}
                        </CCol>
                    </CRow>
                    {/* <div className="mb-4" style={{display:'flex',justifyContent:'flex-end'}}>
                        <CButton color="primary" onClick={(e)=>tela('Livro')}>Novo Livro&nbsp;<FontAwesomeIcon size="lg" icon={faFile} /></CButton>
                    </div> */}
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
                    <div className='mb-3'>
                       Listagem:&nbsp;<CBadge color='primary'>{listapesquisa}</CBadge>&nbsp;<CBadge color='secondary'>{textopesquisa}</CBadge>
                    </div>
                    <CTable className='tabela'>
                        <CTableHead style={{fontSize:'11px !important'}}>
                            <CTableRow>
                                 <CTableHeaderCell colSpan="8" className='clthinputtext'style={{fontSize:'14px !important',textAlign:'center',borderRadius:'5px 5px 0px 0px',fontSize:'11px !important'}} scope="col">
                                     <CBadge className="badge_header" color='primary'>{tipolista}</CBadge>&nbsp;<CBadge className="badge_header" color='secondary'>{textopesquisa}</CBadge>
                                 </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'0px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Nome</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">E-mail</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Telefone</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">E-mail Enviado</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Ativo</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 0px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {load
                            ? (<CorpoTabela lista={listageral} estado={est}/>)
                            : (<CTableRow><CTableDataCell colspan="9" style={{textAlign:'center'}}><CSpinner color="info"></CSpinner></CTableDataCell></CTableRow>)}
                        </CTableBody>
                    </CTable>
                    <div>
                        <div style={{display:'flex',justifyContent:'flex-start'}}>
                            <PaginationExibe pagina={paginaatual}/>
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end',top:'-5px'}}>
                            <Pagination pages={numnpagination}/>
                        </div>
                    </div>
                    {
                  temdados ? (
                        <div style={{display:'flex',justifyContent:'flex-start',top:'-5px'}}>
                        <CButton as="a" color="danger" role="button" target="_blank" href={endpoint_report+'/relatorio/listapresenca?tipo='+listapesquisa+'&id='+param+'&relatorio=listapresenca'}><FontAwesomeIcon size="lg" icon={faFilePdf} />&nbsp;Imprimir Listagem</CButton>
                        </div>
                        ) : (<></>)
                   }
                </CCardBody>

            </CCard>
        </div>
        </section>
    </div>
    </>
  )

}

export default ListaPresenca
/*
<CButton as="a" color="danger" role="button" target="_blank" href={endpoint_report+'/relatorio/fichatratamento?id='+param+'&relatorio=tratamento'}><FontAwesomeIcon size="lg" icon={faFilePdf} />&nbsp;Imprimir Ficha</CButton>
*/
