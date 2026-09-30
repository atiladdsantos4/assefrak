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
import {  faPerson, faSave, faCheck, faFile, faTrash, faEdit, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import ModalVideos from '../componentes/ModalVideos';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const ListaVideo = (props) => {
  const { tela, altera }  = props
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const [listavideo,setListavideo] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [listacategoriavideo,setListacategoriavideo] = useState([])
  const [est,setEst] = useState(false)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  const [categoria,setCategoria] = useState(0)
  const [pesquisar,setPesquisar] = useState(null)
  const [load,setLoad] = useState(false)
  const [openmodal,setOpenmodal] = useState(false)
  const [linkvideo,setLinkvideo] = useState(false)

  const closeModal = () =>{
     setOpenmodal(false)
  }

   useEffect(()=>{
        const fetchData = async () => {
                try {
                    //setLoadpage(true)
                    const requests = [
                        axios.get(`${endpoint}/categoriavideo?listagem=S`,{
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                                },
                        }),
                    ]
                    const responses = await Promise.all(requests);
                    let result_categoria= responses[0]
                    let array_cat = result_categoria.data.data
                    array_cat.unshift({cav_id_cav:'',cav_descricao:'Selecione a Categoria'})
                    array_cat.push({cav_id_cav:'0',cav_descricao:'Todas Categorias'})
                    setListacategoriavideo(array_cat)
                    // setLoadpage(false)
                    // setLoad(false)
                }
                catch (error) {
                    console.error("One of the requests failed", error);
          }
       }
       fetchData()
  },[])

  useEffect(()=>{
    setLoad(false)
    let str
     if(categoria == 0){
        str = `${endpoint}/video?listagem=S` 
     } else {
        str = `${endpoint}/video?listagem=S&categoria=${categoria}` 
     }
     axios
       .get(str,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           altera(null)
           console.log(result)
           setListavideo(result.data.data)
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
  },[qtderegistrospagina,categoria])

  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
      let classe = null
      let cont = 0
      let tam = props.lista.length
      if( tam == 0){
         return(
            <CTableRow color={classe}>
                <CTableDataCell colspan="4" style={{textAlign:'center'}}>Não há Registros para Listagem</CTableDataCell>
            </CTableRow>
        )
      }
      return(
         props.lista.map((item,index)=>{
            cont++
            classe = index % 2 == 0 ? 'primary' : 'secondary'
            if(cont > qtderegistrospagina){
               return
               ////vid_id_vid,vid_id_vid,vid_descricao,vid_hash_link,vid_ativo,vid_created_at,vid_updated_at,vid_deleted_at
            } else {
               return(
                <CTableRow color={classe}>
                    <CTableDataCell>#</CTableDataCell>
                    <CTableDataCell>{item.vid_descricao}</CTableDataCell>
                    <CTableDataCell>{item.vid_categoria}</CTableDataCell>
                    <CTableDataCell>{item.vid_hash_link}</CTableDataCell>
                    <CTableDataCell>{item.vid_ativo}</CTableDataCell>
                    <CTableDataCell>{item.vid_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center',whiteSpace:'nowrap'}}><ItensAcao id={item.vid_id_vid} hashvideo={item.vid_hash_link}/></CTableDataCell>
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
            (item)=>item.vid_descricao.toLowerCase().includes(valor.toLowerCase()) ||
                    item.vid_categoria.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListavideo(lista.slice(0,qtderegistrospagina))
     } else {
        setListavideo(listafiltro.slice(0,qtderegistrospagina))
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
    setListavideo(lista)
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
  
  const AbreVideo = (event,hash) =>{
    setLinkvideo(hash)
    setOpenmodal(true)
  }
  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    return(
       <>
       <FontAwesomeIcon size="xl" style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       &nbsp;
       <FontAwesomeIcon size="xl" onClick={(e)=>AbreVideo(e,props.hashvideo)} style={{color:'#1c9245',cursor:'pointer'}} icon={faCirclePlay}/>
       &nbsp;
       <FontAwesomeIcon size="xl" onClick={(e)=>EditaRegistro(e,props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  const EditaRegistro = (event,valor) =>{
      altera(valor)
      tela('Video')
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

  const SelectCategoria = () =>{
        //listacidade.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
      return(
        <CFormSelect
            id="idCategoria"
            value={categoria}
            feedbackInvalid="A Categoria do Vídeo deve ser informada"
            onChange={(e)=>setCategoria(e.target.value)}
            required
        >
        {
            listacategoriavideo.map((item,index)=>{
                return(
                    <option key={index} value={item.cav_id_cav}>{item.cav_descricao}</option>
                    )
            })
        }
        </CFormSelect>
      )  
      
  }


  return(
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'700px'}} data-aos="fade-up">
          <h2> Lista de Vídeos </h2>
          <p>Listagem</p>
        </div>
        <div class="container">
            <ModalVideos open={openmodal} video={linkvideo} close={closeModal}/>
            <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Listagem de Vídeos</CCardHeader>
                <CCardBody className='mt-1 mb-4'>
                    <div className="mb-4" style={{display:'flex',justifyContent:'flex-end'}}>
                        <CButton color="primary" onClick={(e)=>tela('Video')}>Novo Video&nbsp;<FontAwesomeIcon size="lg" icon={faFile} /></CButton>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{flex:'1'}}>
                            <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                            </CInputGroup>
                        </div>
                        <div className="mt-2" style={{justifySelf:'start',alignSelf:'normal',maxWidth:'300px',flex:'1'}}>
                            <SelectCategoria/>
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
                                <CTableHeaderCell className='clthinterno' scope="col">Descrição Vídeo</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Categoria</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Hash Vídeo</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Ativo</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {load
                            ? (<CorpoTabela lista={listavideo} estado={est}/>)
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
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )

}

export default ListaVideo
