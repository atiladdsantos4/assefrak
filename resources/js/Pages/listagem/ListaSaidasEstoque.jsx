import { React, useEffect, useState, Suspense, useRef  } from 'react';
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
    CFormCheck,
    CToaster,
    CToast,
    CToastBody,
    CToastClose
} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faCheck, faFile, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const ListaSaidasEstoque = (props) => {
  const { tela, altera }  = props
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const [listasaida,setListasaida] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [est,setEst] = useState(false)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(10)
  const [pesquisar,setPesquisar] = useState(null)
  const [load,setLoad] = useState(false)
  const [toast, addToast] = useState()//toast
  const toaster = useRef(null)
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
     setLoad(false)
     axios
       .get(`${endpoint}/saidaestoque?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           altera(null)
           console.log(result)
           setListasaida(result.data.data)
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
  },[qtderegistrospagina])

  const CompCheckbox = (props) => {
    let valor = props.cancelado == 'S' ? true : false
    const [check,setCheck] = useState(valor)
    function Mudar(event){
       setCheck(event.target.checked)
       let val = event.target.checked ? 'S': 'N'
       setListasaida(prevItems =>
            prevItems.map(item =>
               item.sae_id_sae === props.id ? { ...item, sae_load: true } : item
            )
       )
       AlteraStatus(props.id,val)
    }
    return (
        <CFormCheck className="ckform" id="flexCheckDefault" onChange={(e)=>Mudar(e)} checked={check} label=""/>
    )
  }

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

  const AlteraStatus = (id,valor) =>{

          const formData = new FormData()
          formData.append('sae_cancelado', valor)
          formData.append('_method', 'put')
          axios
          .post(`${endpoint}/saidaestoque/${id}`, formData, {
              headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token,//dentro do env//
              },
          })
          .then((result) => {
              setListasaida(prevItems =>
                   prevItems.map(item =>
                      item.sae_id_sae === id ? { ...item,sae_cancelado: valor, sae_load: false } : item
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

  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
      let classe = null
      let cont = 0
      let tam = props.lista.length
      if( tam == 0){
         return(
            <CTableRow color={classe}>
                <CTableDataCell colspan="12" style={{textAlign:'center'}}>Não há Registros para Listagem</CTableDataCell>
            </CTableRow>
        )
      }
      return(
         props.lista.map((item,index)=>{
            cont++
            classe = index % 2 == 0 ? 'primary' : 'secondary'
            if(cont > qtderegistrospagina){
               return
            } else {
               return(
                ////'sae_id_sae','sae_id_ene','sae_qtde','sae_valor_unit','sae_valor_total','qtde_saida','sae_confirmado','sae_created_at','sae_updated_at','sae_deleted_at'
                <CTableRow color={classe}>
                    <CTableDataCell>#</CTableDataCell>
                    <CTableDataCell>{item.sae_id_ene}</CTableDataCell>
                    <CTableDataCell className='ct'>{item.sae_hash}</CTableDataCell>
                    <CTableDataCell className='lf'>{item.sae_livro+' - '+item.sae_autor}</CTableDataCell>
                    <CTableDataCell className='lf'>{item.sae_email}</CTableDataCell>
                    <CTableDataCell className='ct'>{item.sae_qtde_saida}</CTableDataCell>
                    <CTableDataCell>{item.sae_valor_unit}</CTableDataCell>
                    <CTableDataCell>{item.sae_valor_total}</CTableDataCell>
                    <CTableDataCell>{item.sae_confirmado == 'S' ? <CBadge color="success">Confirmado</CBadge> : <CBadge color="warning" textColor="dark">Aguardando Confirmação</CBadge>}</CTableDataCell>
                    <CTableDataCell style={{whiteSpace:'nowrap'}}><CompCheckbox id={item.sae_id_sae} cancelado={item.sae_cancelado}/>&nbsp;{item.sae_load ? (<CSpinner color="info" size="sm"/>):(<></>)}&nbsp;&nbsp;{item.sae_cancelado == 'N' ? <CBadge color="success">Ativo</CBadge> : <CBadge color="danger">Suspenso</CBadge>}</CTableDataCell>
                    <CTableDataCell>{item.sae_created_at}</CTableDataCell>
                    <CTableDataCell>{item.sae_updated_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',whiteSpace:'nowrap'}}><ItensAcao id={item.sae_id_sae}/></CTableDataCell>
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
            (item)=>item.sae_livro.toLowerCase().includes(valor.toLowerCase()) ||
                    item.sae_hash.toLowerCase().includes(valor.toLowerCase()) ||
                    item.sae_autor.toLowerCase().includes(valor.toLowerCase()) ||
                    item.sae_email.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListasaida(lista.slice(0,qtderegistrospagina))
     } else {
        setListasaida(listafiltro.slice(0,qtderegistrospagina))
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
    setListasaida(lista)
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
    return(
       <>
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       &nbsp;
       <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  const EditaRegistro = (event,valor) =>{
      altera(valor)
      tela('SaidaEstoque')
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

  return(
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'500px'}} data-aos="fade-up">
          <h2>Saídas Estoque</h2>
          <p>Listagem</p>
        </div>
        <div class="container">
            <CCard>
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Listagem de Saídas do Estoque</CCardHeader>
                <CCardBody className='mt-1 mb-4'>
                    <div className="mb-4" style={{display:'flex',justifyContent:'flex-end'}}>
                        <CButton color="primary" onClick={(e)=>tela('SaidaEstoque')}>Nova Saida&nbsp;<FontAwesomeIcon size="lg" icon={faFile} /></CButton>
                    </div>
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
                    <CTable className='tabela'>
                        <CTableHead style={{fontSize:'11px !important'}}>
                            <CTableRow>
                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Nº Estoque</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno ct' scope="col">Hash</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno ct' scope="col">Livro</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno ct' scope="col">Email</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno ct' scope="col">Qtde Saída</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Valor Unitário</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Valor Total</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Confirmado</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Cancelado?</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Venda</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Atualização</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {load
                            ? (<CorpoTabela lista={listasaida} estado={est}/>)
                            : (<CTableRow><CTableDataCell colspan="12" style={{textAlign:'center'}}><CSpinner color="info"></CSpinner></CTableDataCell></CTableRow>)}
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
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )

}

export default ListaSaidasEstoque
