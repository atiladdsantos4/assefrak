
import { React,useEffect,useState,Suspense,useRef } from 'react';
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
    CToaster,
    CToast,
    CToastBody,
    CToastClose
} from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faSave, faCheck, faFile, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalDelete from '../componentes/ModalDelete';
import DescricaoComp from '../componentes/DescricaoComp';

// The Main component receives props passed from the Laravel controller
const ListaFocoEnergetico = (props) => {
  const { tela, altera } = props
  const token = import.meta.env.VITE_APP_TOKEN
  const imagem = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API

  const [listafocoenergetico,setListafocoenergetico] = useState([])
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

  //modal exclui//
  const [openmodalconfirma,setOpenmodalconfirma] = useState(false)
  const [textomodal,setTextomodal] = useState('')
  const [iditemexclusao,setIditemexclusao] = useState(null)
  const toaster = useRef(null)
  const [toast, addToast] = useState()

  useEffect(()=>{
    setLoad(false)
    axios
      .get(`${endpoint}/foco?listagem=S`,{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((result) => {
        altera(null)
        console.log(result)
        setListafocoenergetico(result.data.data)
        setListafiltro(result.data.data)

        let tam = result.data.data.length
        setQtderegistros(tam)

        let res = tam / qtderegistrospagina
        let resposta = res.toString().split('.')

        if(parseInt(resposta[1]) === 0 || resposta[1] === undefined){
          setNumpagination(res)
        } else {
          res = parseInt(resposta[0]) + 1
          let numpag = res.toFixed(0)
          setNumpagination(numpag)
        }

        setUltimapagina(res)
        setPaginaatual(1)

        if(tam > 0){
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
    let tam = props.lista.length

    if(tam == 0){
      return(
        <CTableRow color={classe}>
          <CTableDataCell colspan="4" style={{textAlign:'center'}}>
            Não há Registros para Listagem
          </CTableDataCell>
        </CTableRow>
      )
    }

    return(
      props.lista.filter((item)=>item.foc_exclui == false).map((item,index)=>{
        cont++
        classe = index % 2 == 0 ? 'primary' : 'secondary'

        if(cont > qtderegistrospagina){
          return
        } else {
          return(
            <CTableRow color={classe}>
              <CTableDataCell>#</CTableDataCell>
              <CTableDataCell>{item.foc_descricao}</CTableDataCell>
              <CTableDataCell>{item.foc_created_at}</CTableDataCell>
              <CTableDataCell style={{textAlign:'center'}}>
                <ItensAcao id={item.foc_id_foc} load={item.foc_loadexclui}/>
              </CTableDataCell>
            </CTableRow>
          )
        }
      })
    )
  }

  const pesquisarGrid = (event) => {
    let valor = event.target.value

    if(valor.trim() != ''){
      let lista = listafiltro.filter(
        (item)=>item.foc_descricao.toLowerCase().includes(valor.toLowerCase())
      )
      console.log(lista)
      setListafocoenergetico(lista.slice(0,qtderegistrospagina))
    } else {
      setListafocoenergetico(listafiltro.slice(0,qtderegistrospagina))
    }
  }

  //--> Exibe o componente de paginação
  const PaginationExibe = (props) =>{
    return(
      <div className='exibepagination'>
        <div>Pagina:&nbsp;{props.pagina}&nbsp;</div>
        <div>Regitros:&nbsp;{registroini+'...'+registrofim+' num Total de '+qtderegistros}</div>
      </div>
    )
  }

  const PreviousPage = (event) =>{
    let page = paginaatual
    console.log('paginaatual:'+paginaatual)
    console.log('ultimapagina:'+ultimapagina)

    if(paginaatual < ultimapagina){
      page = page + 1
      console.log('ultimapagina-entrei')
      clickPagination(event,page)
    }
  }

  const PriousPage = (event) =>{
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

    setListafocoenergetico(lista)
  }

  const Pagination = (props) =>{
    let elemento = []

    for(let i = 1; i <= props.pages; i++){
      if(i == paginaatual){
        elemento.push(
          <CPaginationItem active={true} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>
            {i}
          </CPaginationItem>
        )
      } else {
        elemento.push(
          <CPaginationItem active={false} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>
            {i}
          </CPaginationItem>
        )
      }
    }

    return(
      <CPagination aria-label="Page navigation example">
        <CPaginationItem className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {elemento}
        <CPaginationItem className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    )
  }

  //--> Display dos Ícones no grid
  const ItensAcao = (props) =>{
    return(
      <>
        {props.load
          ? <CSpinner className="spinner_div" color="danger" size="sm"/>
          : <></>
        }

        <FontAwesomeIcon
          size="xl"
          style={{color:'red',cursor:'pointer'}}
          icon={faTrash}
          onClick={()=>Delete(props.id)}
        />

        &nbsp;

        <FontAwesomeIcon
          size="xl"
          onClick={(e)=>EditaRegistro(e,props.id)}
          style={{color:'blue',cursor:'pointer'}}
          icon={faEdit}
        />
      </>
    )
  }

  const Delete = (id) =>{
    setIditemexclusao(id)
    setTextomodal('Deseja Realmente exlcluir o registro?')
    setOpenmodalconfirma(true)
  }

  //--> Exclusão lógica
  const excluirItemBanco = (idexclusao) =>{
    setOpenmodalconfirma(false)

    setListafocoenergetico(prevItems =>
      prevItems.map(item =>
        item.foc_id_foc === idexclusao
          ? {...item,foc_loadexclui:true}
          : item
      )
    )

    axios.delete(`${endpoint}/foco/${idexclusao}`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    })
    .then((result)=>{
      if(result.data.status === true){
        setListafocoenergetico(prevItems =>
          prevItems.map(item =>
            item.foc_id_foc === idexclusao
              ? {...item,foc_loadexclui:false,foc_exclui:true}
              : item
          )
        )

        setListafiltro(prevItems =>
          prevItems.map(item =>
            item.foc_id_foc === idexclusao
              ? {...item,foc_loadexclui:false,foc_exclui:true}
              : item
          )
        )

        addToast(CompToast('Registro excluido com Sucesso!!!','success'))

        setTimeout(()=>{
          document.getElementById('idtoast')?.classList.remove('show')
          document.getElementById('idtoast')?.remove()
        },2000)
      }
    })
  }

  const CompToast = (texto,color,autohide) =>{
    return(
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
          <CToastClose className="me-2 m-auto" white/>
        </div>
      </CToast>
    )
  }

  const EditaRegistro = (event,valor) =>{
    altera(valor)
    tela('FocoEnergetico')
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

  const ImageHeader = () =>{
    return(
      <div style={{position:'relative',top:'4px'}}>
        <img class="img-fluid" style={{borderRadius:'5px'}} src={imagem+'telas/logoheaderlistagem.png'}/>
        <div style={{fontSize:'20px',position:'relative',left:'-50px',top:'-33px',color:'white',fontWeight:'bold'}}>
          Focos Energéticos
        </div>
      </div>
    )
  }

  return(
    <>
      <ModalDelete
        id={iditemexclusao}
        funcret={()=>excluirItemBanco(iditemexclusao)}
        open={openmodalconfirma}
        close={(e)=>setOpenmodalconfirma(false)}
        texto={textomodal}
      />

      <CToaster ref={toaster} placement="top-end">{toast}</CToaster>

      <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
          <div class="container section-title box-title mb-2" data-aos="fade-up">
            <ImageHeader/>
          </div>

          <div class="container">
            <CCard>
              <CCardHeader className="fundo_head">
                <FontAwesomeIcon size="lg" icon={faPerson}/>&nbsp;Listagem de Focos Energéticos
              </CCardHeader>

              <CCardBody className='mt-1 mb-4'>
                <div className="mb-4 d-flex align-items-center gap-2">
                        <DescricaoComp title="Novo Tratamento" text={'Focos Energéticos'}/>
                        <CButton
                            color="primary"
                            className="ms-auto flex-shrink-0"
                            onClick={(e)=>tela('FocoEnergetico')}
                        >
                            Novo Foco&nbsp;
                            <FontAwesomeIcon size="lg" icon={faFile} />
                        </CButton>

                </div>

                <div style={{display:'flex'}}>
                  <div style={{flex:'1'}}>
                    <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                      <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                      <CFormInput
                        placeholder={'Digite um valor'}
                        value={pesquisar}
                        onChange={(e)=>pesquisarGrid(e)}
                      />
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
                      <CTableHeaderCell className='clthinputtext' style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell className='clthinterno' scope="col">Tipo de Foco</CTableHeaderCell>
                      <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                      <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {load
                      ? <CorpoTabela lista={listafocoenergetico} estado={est}/>
                      : <CTableRow><CTableDataCell colspan="9" style={{textAlign:'center'}}><CSpinner color="info"/></CTableDataCell></CTableRow>
                    }
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
    </>
  )
}

export default ListaFocoEnergetico
