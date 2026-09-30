import { React,useEffect,useState,Suspense } from 'react';
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
    CFormSelect
} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faCheck, faFile, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const ListaPalestra = (props) => {
  const { tela, altera, alteraestado }  = props
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const [listapale,Listapale] = useState([])
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

  useEffect(()=>{
    setLoad(false)
     axios
       .get(`${endpoint}/palestra?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           altera(null)
           alteraestado(null)
           console.log(result)
           Listapale(result.data.data.sort((a,b)=>b.pal_datasort - a.pal_datasort ))
           setListafiltro(result.data.data.sort((a,b)=>b.pal_datasort - a.pal_datasort ))
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



  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
      let classe = null
      let cont = 0
      if(props.lista.length == 0 ){
         return(
            <CTableRow color={classe}><CTableDataCell style={{textAlign:'center'}} colspan="14">Não Há Dados para serem Listados</CTableDataCell></CTableRow>
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
                //pal_id_pal,pal_id_puf,pal_estado,pal_cidade,pal_titulo,pal_foco,pal_data_inicio
                //pal_data_inicio,pal_data_fim,pal_hora_inicio,pal_hora_fim,pal_local,pal_concluido,pal_created_at,pal_updated_at,pal_deleted_at
                <CTableRow color={classe}>
                    <CTableDataCell>#</CTableDataCell>
                    <CTableDataCell>{item.pal_id_pal}</CTableDataCell>
                    <CTableDataCell>{item.pal_tema}</CTableDataCell>
                    <CTableDataCell>{item.pal_colaborador}</CTableDataCell>
                    <CTableDataCell>{item.pal_categoria}</CTableDataCell>
                    <CTableDataCell>{item.pal_data_inicio}</CTableDataCell>
                    <CTableDataCell>{item.pal_data_fim}</CTableDataCell>
                    <CTableDataCell>{item.pal_hora_inicio}</CTableDataCell>
                    <CTableDataCell>{item.pal_hora_fim}</CTableDataCell>
                    <CTableDataCell>{item.pal_local}</CTableDataCell>
                    <CTableDataCell>{item.pal_concluido}</CTableDataCell>
                    <CTableDataCell style={{whiteSpace:'nowrap'}}>{item.pal_desc_cidade+'-'+item.pal_uf}</CTableDataCell>
                    {/* <CTableDataCell style={{textAlign:'center'}}>{item.aco_ativo}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'left'}}>{item.aco_cidade+'/'+item.aco_uf_sigla}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'left'}}>{item.aco_desc_faixa}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'left'}}>{item.aco_nascimento}</CTableDataCell> */}
                    <CTableDataCell>{item.aco_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',whiteSpace:'nowrap'}}><ItensAcao id={item.pal_id_pal} estvalor={item.pal_estado}/></CTableDataCell>
                    {/* <CTableDataCell style={{textAlign:'center'}}></CTableDataCell> */}
                    </CTableRow>
               )
            }
         })
      )
  }


  const pesquisarGrid = (palnt) => {
     console.log(listafiltro)
     //console.log(palnt.target.value)
     let valor =  palnt.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.pal_titulo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.pal_foco.toLowerCase().includes(valor.toLowerCase()) ||
                    item.pal_publico.toLowerCase().includes(valor.toLowerCase())
        )
        //listafiltro.filter((item)=> item.tes_id_tes == palnt.target.value)
        console.log(lista)
        Listapale(lista.slice(0,qtderegistrospagina))
     } else {
        Listapale(listafiltro.slice(0,qtderegistrospagina))
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

  const PreviousPage =(palnt)=>{
    let page = paginaatual
    console.log('paginaatual:'+paginaatual)
    console.log('ultimapagina:'+ultimapagina)
    if(paginaatual < ultimapagina){
       page = page + 1
       console.log('ultimapagina-entrei')
       clickPagination(palnt,page)
    }
  }

  const PriousPage =(palnt)=>{
    let page = paginaatual
    console.log('paginaatual:'+paginaatual)
    console.log('ultimapagina:'+ultimapagina)
    if(paginaatual > 1){
       page = page - 1
       console.log('ultimapagina-entrei')
       clickPagination(palnt,page)
    }
  }

  //--> Efetuar a pesquisa pelo click
  const clickPagination = (palnt,idx) =>{
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
    Listapale(lista)
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
        <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id,props.estvalor)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  const EditaRegistro = (event,valor,estvalor) =>{
      console.log('valorestado:'+estvalor)
      altera(valor)
      alteraestado(estvalor)
      tela('Palestra')
  }


  return(
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title  box-title mb-2" data-aos="fade-up">
          <h2> Palestras </h2>
          <p>Listagem</p>
        </div>
        <div class="container">
            <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Listagem de Palestras</CCardHeader>
                <CCardBody className='mt-1 mb-4'>
                    <div className="mb-4" style={{display:'flex',justifyContent:'flex-end'}}>
                        <CButton color="primary" onClick={(e)=>tela('Palestra')}>Nova Palestra&nbsp;<FontAwesomeIcon size="lg" icon={faFile} /></CButton>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{flex:'1'}}>
                              <CInputGroup style={{maxWidth:'200px',right:'0px',top:'0px'}} className="mb-2 mt-2">
                                    <CInputGroupText style={props.estilo} className="clinputtext">Qtde Registros</CInputGroupText>
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
                            </CInputGroup>
                        </div>
                        <div style={{justifySelf:'end',alignSelf:'end'}}>
                            <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                            </CInputGroup>

                        </div>
                    </div>
                    <CTable className='tabela'>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Nº</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Tema</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Palestrante</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Categoria</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Inicio</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Fim</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Hora Ini</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Hora Fim</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Local</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Concluído</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Cidade/Uf</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {load
                            ? (<CorpoTabela lista={listapale} estado={est}/>)
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

export default ListaPalestra
