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
    CFormSelect,
    CFormCheck
} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson, faSave, faCheck, faFile, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const ListaTratamentos = (props) => {
  const { tela, altera, setacolhido}  = props
  const token  = import.meta.env.VITE_APP_TOKEN
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const [listatratamento,setListatratamento] = useState([])
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
  const [filtroradio,setFiltroradio] = useState(false)

  useEffect(()=>{
     setLoad(false)
     axios
       .get(`${endpoint}/tratamento?listagem=S`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
       })
       .then((result) => {
           altera(null)
           console.log(result)
           setListatratamento(result.data.data)
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

  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
      let classe = null
      let cont = 0
      return(
         props.lista.map((item,index)=>{
            cont++
            classe = index % 2 == 0 ? 'primary' : 'secondary'
            if(cont > qtderegistrospagina){
               return
            } else {
               return(
                <CTableRow color={classe}>
                    <CTableDataCell>#</CTableDataCell>
                    <CTableDataCell>{item.tra_acolhido}</CTableDataCell>
                    <CTableDataCell>{item.tra_tipo}</CTableDataCell>
                    <CTableDataCell>{item.tra_colaborador}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'left'}}>{item.tra_status}</CTableDataCell>
                    <CTableDataCell>{item.tra_created_at}</CTableDataCell>
                    <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.tra_id_tra} acolhido={item.tra_id_aco}/></CTableDataCell>
                </CTableRow>
               )
            }
         })
      )
  }


  const pesquisarGrid = (event) => {
     //console.log(listafiltro)
     //console.log(event.target.value)
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.tra_acolhido.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tra_status.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tra_tipo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.tra_colaborador.toLowerCase().includes(valor.toLowerCase())
        )
        //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
        console.log(lista)
        setListatratamento(lista.slice(0,qtderegistrospagina))
     } else {
        setListatratamento(listafiltro.slice(0,qtderegistrospagina))
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
       <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id,props.acolhido)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  const EditaRegistro = (event,valor,acolhido) =>{
      altera(valor)
      setacolhido(acolhido)
      tela('Tratamento')
  }

  const handleClick = (event,valor) =>{
     event.preventDefault();
     console.log('teste:'+valor)
     tela(valor)
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

  const ListaAtual = (event,param) =>{
    if(param == 'acolhido'){
       setFiltroradio(true)
       AtualizaListaLivro('acolhido')
    } else {
       setFiltroradio(false)
       AtualizaListaLivro('colaborador')
    }
  }

  const AtualizaListaLivro = (valor) =>{
    let dados = null
    setLoad(false)
    if(valor == 'acolhido'){
        setTimeout(() => {
            setLoad(true)
            dados = listafiltro.sort((a,b)=>b.tra_acolhido < a.tra_acolhido)
            setListatratamento(dados)
            setEst(!est)
        }, 300)
    } else {
        setTimeout(() => {
            setLoad(true)
            dados = listafiltro.sort((a,b)=>b.tra_colaborador < a.tra_colaborador)
            setListatratamento(dados)
            setEst(!est)
        }, 300)
    }
    return
    setLoad(true)
    setListaprecolivro(null)
    axios
      .get(`${endpoint}/tratamento?listagem=S`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
          },
      })
      .then((result) => {
          let dados =null

          if(valor == true){
             dados = result.data.data.filter((item)=>item.prl_valor_atual ==  1)
          } else {
             dados = result.data.data
          }
          setListafiltro(dados)
          setListaprecolivro(dados)
          Repaginar(5,dados)
          setQtderegistros(5)
          //setEst(!est)
          setLoad(false)
      })
  }

  const RadioLista = () => {
    if(filtroradio){
      return (
          <>
          <CFormCheck
              inline
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Acolhido"
              onClick={(e)=>ListaAtual(e,'acolhido')}
              defaultChecked
          />
          <CFormCheck
              inline
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Colaborador"
              onClick={(e)=>ListaAtual(e,'colaborador')}

          />
          </>
      )
    } else {
      return (
          <>
          <CFormCheck
              inline
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label="Acolhido"
              onClick={(e)=>ListaAtual(e,'acolhido')}
          />
          <CFormCheck
              inline
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Colaborador"
              onClick={(e)=>ListaAtual(e,'colaborador')}
              defaultChecked
          />
        </>
      )
    }
  }


  return(
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'500px'}} data-aos="fade-up">
          <h2> Tratamentos Acolhidos </h2>
          <p>Listagem</p>
        </div>
        <div class="container">
            <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Listagem de Tratamentos</CCardHeader>
                <CCardBody className='mt-1 mb-4'>
                    <div className="mb-4" style={{display:'flex',justifyContent:'flex-end'}}>
                        <CButton color="primary" onClick={(e)=>tela('Tratamento')}>Novo Tratamento&nbsp;<FontAwesomeIcon size="lg" icon={faFile} /></CButton>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{flex:'1'}}>
                            <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                            </CInputGroup>
                        </div>
                        <div className="mt-3" style={{flex:'1'}}>Ordenar:&nbsp;<RadioLista/></div>
                        <div style={{justifySelf:'end',alignSelf:'end'}}>
                            <CInputGroup style={{maxWidth:'200px'}} className="mb-2 mt-2">
                                <CInputGroupText style={props.estilo} className="clinputtext">Qtde Registros</CInputGroupText>
                                <QtdeRegistrosPagina/>
                            </CInputGroup>
                        </div>
                    </div>
                    <CTable className='tabela'>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Acolhido</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Tipo</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Colaborador</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Status</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {load
                            ? (<CorpoTabela lista={listatratamento} estado={est}/>)
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

export default ListaTratamentos
