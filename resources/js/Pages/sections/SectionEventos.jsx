import { React, useEffect, useState, useRef, Suspense } from 'react';
import axios from 'axios';
import { CPlaceholder,CBadge, CSpinner,CPagination,CPaginationItem  } from '@coreui/react'
import ModalEventos from '../componentes/ModalEventos';


// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionEventos = (props) => {
  const { estado } = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [screen,setScreen] = useState(null)
  const [titulo,setTitulo] = useState(null)
  const [ideve,setIdeve] = useState(null)
  const [listaeventos,setListaeventos] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [listacalendario,setListacalendario] = useState([])
  const [listamodal,setListamodal] = useState([])
  const [listagrupo,setListagrupo] = useState([])
  const [semanas,setSemanas] = useState([])
  const [mesint,setMesint] = useState([])
  const [mes,setMes] = useState([])
  const [ano,setAno] = useState([])
  const [loadpage,setLoadpage] = useState([])
  const [loadcal,setLoadcal] = useState(false)
  const [open,setOpen] = useState(false)
  const [loadlista,setLoadlista] = useState(false)
  const style_calendar = {color:'white', backgroundColor:'rgb(104, 149, 193)',border:'1px solid white'}
  const style_calendar_r = {color:'white',backgroundColor:'rgb(104, 149, 193)',border:'1px solid white',borderRadius:'0px 8px 8px 0px'}
  const style_calendar_l = {color:'white',backgroundColor:'rgb(104, 149, 193)',border:'1px solid white',borderRadius:'8px 0px 0px 8px'}
  /* paginação */
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  /* end paginação */
  //   const targetRef = useRef(null);
//   const [hasReached, setHasReached] = useState(false);

  const closeModal = () =>{
     setOpen(false)
  }

  const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  const abreModal = (event,id,tit) =>{
    event.preventDefault()
    setListaeventos(prevItems =>
        prevItems.map(item =>
           item.eve_id_eve === id ? { ...item, eve_load: true } : item
        )
    )
    axios.get(`${endpoint}/eventoitem?listagem=S&evento=${id}`,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
        },
    })
    .then((result) => {
        setTitulo(tit)
        setIdeve(id)
        let filtro_itens = result.data.data.filter((item)=>item.evi_tipo_informacao === 'BA' || item.evi_tipo_informacao === 'IC')
        let objmeta = null
        let cont = 0
        let lista = []
        filtro_itens.map((item,index)=>{
             objmeta = JSON.parse(item.evi_dados_inf)
             console.log('sequencia:'+objmeta["meta"][0].id + 'path:' + objmeta["meta"][0].path)
             lista.push(objmeta["meta"][0])
             //console.log(listaitem)
        })
        setListamodal(lista)
        setListaeventos(prevItems =>
            prevItems.map(item =>
               item.eve_id_eve === id ? { ...item, eve_load: false } : item
            )
        )
        setOpen(true)
    })
  }

  useEffect(()=>{
    if(estado == false){
       console.log('evento')
       let date =  new Date()
       const d = String(date.getDate()).padStart(2, '0');
       const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
       const yyyy = date.getFullYear();
       const str = date.toLocaleString('pt-BR', { month: 'short' });
       const mes_ext  = str.charAt(0).toUpperCase() + str.slice(1);
       setAno(yyyy)
       setMes(mes_ext)
       setMesint(m)

       setLoadpage(false)
       const fetchData = async () =>{
           try {
                //setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/evento?listagem=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    }),
                    axios.get(`${endpoint}/evento?calendar=S&ano=${yyyy}&mes=${m}`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    }),
                    axios.get(`${endpoint}/evento?group=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    })

                ]
                const responses = await Promise.all(requests);
                let result_evento = responses[0]
                let result_calendar = responses[1]
                let result_grupo = responses[2]
                setListafiltro(result_evento.data.data)
                let array_cat = result_grupo.data.data
                let obj = {
                    "cae_id_cae": 0,
                    "cae_descricao": "Todos",
                    "total": 0,
                    "acao": 1
                }
                array_cat.push(obj)
                setListagrupo(array_cat)
                //calendario inicial//
                setListacalendario(result_calendar.data.data)
                const uniqueCategories = [...new Set(result_calendar.data.data.map(item => item.semana_ano))];
                console.log(uniqueCategories);
                setSemanas(uniqueCategories)
                /*
                Listapale(result.data.data.sort((a,b)=>b.pal_datasort - a.pal_datasort ))
                setListafiltro(result.data.data.sort((a,b)=>b.pal_datasort - a.pal_datasort ))
                */
                let tam = result_evento.data.data.length
                setQtderegistros(tam)
                let res = tam / qtderegistrospagina
                if( tam <= qtderegistrospagina){
                   res = 1
                   setNumpagination(1)
                } else {
                    let resposta = res.toString().split('.');
                    if( parseInt(resposta[1]) === 0 || resposta[1] === undefined){
                            setNumpagination(res)
                    } else {
                            res = parseInt(resposta[0]) + 1
                            let numpag = res.toFixed(0)
                            setNumpagination(numpag)
                    }
                }
                setUltimapagina(res)
                setPaginaatual(1)
                if( tam > 0){
                    setRegistroini(1)
                    setRegistrofim(qtderegistrospagina)
                }
                setListaeventos(result_evento.data.data.slice(0,qtderegistrospagina))
                setLoadpage(true)

            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[estado])//garante carrgera somente se clicar no link

  const pesquisarGrid = (event) => {
     console.log(listafiltro)
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.eve_titulo.toLowerCase().includes(valor.toLowerCase()) ||
                    item.eve_foco.toLowerCase().includes(valor.toLowerCase()) ||
                    item.eve_categoria.toLowerCase().includes(valor.toLowerCase()) ||
                    item.eve_publico.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        setListaeventos(lista.slice(0,5))
     } else {
        setListaeventos(listafiltro.slice(0,5))
     }
  }

  const pesquisarClick = (event,id) => {
     event.preventDefault()
     console.log(id)
     scrollToId('idlista')
     if( id == 0 ){
        let lista = listafiltro
        setListaeventos(lista.slice(0,5))
        return
     }
     let lista = listafiltro.filter(
            (item)=>item.eve_id_cae === id
     )
     console.log(lista)
     setListaeventos(lista.slice(0,5))

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
         <CPagination aria-label="Page navigation example" className='justify-content-center'>
              <CPaginationItem className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
                  <span aria-hidden="true"><i class="bi bi-arrow-left"></i></span>
              </CPaginationItem>
              { elemento }
              <CPaginationItem className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
                  <span aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
              </CPaginationItem>
         </CPagination>
      )
    }

  const clickPagination = (palnt,idx) =>{
      setLoadlista(true)
      setTimeout(() => {
         setLoadlista(false)
      }, 200)
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
      setListaeventos(lista)
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


  const defineData = (mes,ano) =>{
      let date =  new Date(ano+'/'+mes+'/1')
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const yyyy = date.getFullYear();
      const str = date.toLocaleString('pt-BR', { month: 'short' });
      const mes_ext  = str.charAt(0).toUpperCase() + str.slice(1);
      setAno(yyyy)
      setMes(mes_ext)
      setMesint(m)
  }

  const getCalendar = (event,dir) =>{
      setLoadcal(true)
      event.preventDefault()
      console.log(dir)
      let mesI = null
      let anoI = null
      if( dir == 'frente' ){
        mesI = 0
        anoI = ano
        if( mesint == 12 ){
           mesI = 1
           anoI = parseInt(anoI + 1)
        } else {
           mesI = parseInt(mesint) + 1
        }
        defineData(mesI,anoI)
        //return
      }
      if( dir == 'tras' ){
        mesI = 0
        anoI = ano
        if( mesint == 1 ){
           mesI = 12
           anoI = parseInt(anoI - 1)
        } else {
           mesI = parseInt(mesint) - 1
        }
        defineData(mesI,anoI)
        //return
      }
      axios.get(`${endpoint}/evento?calendar=S&ano=${anoI}&mes=${mesI}`,{
         headers: {
             Accept: 'application/json',
             'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
         },
      })
      .then((result) => {
         setListacalendario(result.data.data)
         const uniqueCategories = [...new Set(result.data.data.map(item => item.semana_ano))];
         console.log(uniqueCategories);
         setSemanas(uniqueCategories)
         setLoadcal(false)
         //ExibeCal(result.data.data,uniqueCategories)
      })

  }

  //const ExibeCal = (lista,semana)=>{
  const ExibeCal = (props)=>{
     let semana1 = props.lista.filter((item)=>item.semana_ano == props.semana)
     let obj = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
     obj[0]=''
     obj[1]=''
     obj[2]=''
     obj[3]=''
     obj[4]=''
     obj[5]=''
     obj[6]=''
     semana1.map((item,index)=>{
          switch(item.dia_semans_ext){
              case 'Dom':
                 obj[0] = item.dia
                break
              case 'Seg':
                 obj[1] = item.dia
                break
              case 'Ter':
                 obj[2] = item.dia
                break
              case 'Qua':
                 obj[3] = item.dia
                break
              case 'Qui':
                 obj[4] = item.dia
                break
              case 'Sex':
                 obj[5] = item.dia
                break
              case 'Sab':
                 obj[6] = item.dia
                break
          }
     })
     return(
        <tr>
        {
            obj.map((item,index)=>{
               return(<td>{item}</td>)
            })
        }
        </tr>
     )
    console.log(obj)
    console.log(semana1)
  }

  return (
    <>
    <ModalEventos open={open} close={closeModal} titulo={titulo} idevento={ideve} lista={listamodal}/>
    <section id="events-extended" class="events-extended section">

      <div class="container section-title" data-aos="fade-up">
        <h2>Eventos</h2>
        <p>Logo Abaixo Lista de Eventos</p>
        <div id="idlista"></div>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row">
          <div class="col-lg-8">
            {/*<!-- Events List -->*/}
            { loadpage ? (<></>): (<div style={{top:'20px',textAlign:'center'}}><CSpinner color="primary"/></div>)}
            <div class="events-list">
              {
                listaeventos.map((item,index)=>{
                   return(
                      <div key={index} class="event-item" data-aos="fade-up">
                        <div class="event-date">
                            <span class="day">{item.eve_data_ext_dia}</span>
                            <span class="month">{item.eve_data_ext_mes}</span>
                        </div>
                        <div class="event-content">
                            <h3 class="event-title">{item.eve_titulo}</h3>
                            <div class="event-meta">
                                <span><i class="bi bi-calendar2-event"></i> {item.eve_data_inicio+' à '+item.eve_data_fim}</span>
                                <span><i class="bi bi-clock"></i> {item.eve_hora_inicio+' - '+ item.eve_hora_fim}</span>
                                <span><i class="bi bi-geo-alt"></i>{item.eve_local}</span>
                            </div>
                            <p class="event-description">{item.eve_foco}</p>
                            <CBadge color="secondary">Público Alvo:&nbsp;{item.eve_publico}</CBadge>&nbsp;<CBadge className='badgeazul'>Categoria:&nbsp;{item.eve_categoria}</CBadge>
                            <div class="d-flex flex-column align-items-end justify-content-end" style={{height:'150px;'}}>
                                 <a href="#" onClick={(e)=>abreModal(e,item.eve_id_eve,item.eve_titulo)} class="btn-event-details">
                                    Saiba Mais{item.eve_load ? (<>&nbsp;<CSpinner size="sm" /></>) : (<></>)}<i class="bi bi-arrow-right"></i>
                                 </a>
                            </div>
                        </div>
                    </div>
                   )
                })
              }
              {/*<!-- Event Item 1 -->*/}
              {/* <div class="event-item" data-aos="fade-up">
                <div class="event-date">
                  <span class="day">15</span>
                  <span class="month">May</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Annual Science Exhibition</h3>
                  <div class="event-meta">
                    <span><i class="bi bi-clock"></i> 09:00 AM - 04:00 PM</span>
                    <span><i class="bi bi-geo-alt"></i> Main Campus Auditorium</span>
                  </div>
                  <p class="event-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                  <a href="#" class="btn-event-details">Learn More <i class="bi bi-arrow-right"></i></a>
                </div>
              </div> */}
              {/*<!-- End Event Item -->*/}

              {/*<!-- Event Item 2 -->*/}
              {/* <div class="event-item" data-aos="fade-up" data-aos-delay="100">
                <div class="event-date">
                  <span class="day">22</span>
                  <span class="month">May</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Parent-Teacher Conference</h3>
                  <div class="event-meta">
                    <span><i class="bi bi-clock"></i> 02:00 PM - 06:00 PM</span>
                    <span><i class="bi bi-geo-alt"></i> School Conference Center</span>
                  </div>
                  <p class="event-description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                  <a href="#" class="btn-event-details">Learn More <i class="bi bi-arrow-right"></i></a>
                </div>
              </div> */}
              {/*<!-- End Event Item -->*/}

              {/*<!-- Event Item 3 -->*/}
              {/* <div class="event-item" data-aos="fade-up" data-aos-delay="200">
                <div class="event-date">
                  <span class="day">05</span>
                  <span class="month">Jun</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Annual Sports Tournament</h3>
                  <div class="event-meta">
                    <span><i class="bi bi-clock"></i> 10:00 AM - 05:00 PM</span>
                    <span><i class="bi bi-geo-alt"></i> Campus Sports Ground</span>
                  </div>
                  <p class="event-description">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                  <a href="#" class="btn-event-details">Learn More <i class="bi bi-arrow-right"></i></a>
                </div>
              </div> */}
              {/*<!-- End Event Item -->*/}

              {/*<!-- Event Item 4 -->*/}
              {/* <div class="event-item" data-aos="fade-up" data-aos-delay="300">
                <div class="event-date">
                  <span class="day">12</span>
                  <span class="month">Jun</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Graduation Ceremony 2023</h3>
                  <div class="event-meta">
                    <span><i class="bi bi-clock"></i> 04:00 PM - 07:00 PM</span>
                    <span><i class="bi bi-geo-alt"></i> University Grand Hall</span>
                  </div>
                  <p class="event-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.</p>
                  <a href="#" class="btn-event-details">Learn More <i class="bi bi-arrow-right"></i></a>
                </div>
              </div> */}
              {/*<!-- End Event Item -->*/}

              {/*<!-- Event Item 5 -->*/}
              {/* <div class="event-item" data-aos="fade-up" data-aos-delay="400">
                <div class="event-date">
                  <span class="day">20</span>
                  <span class="month">Jun</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Summer Arts Festival</h3>
                  <div class="event-meta">
                    <span><i class="bi bi-clock"></i> 11:00 AM - 08:00 PM</span>
                    <span><i class="bi bi-geo-alt"></i> Arts Center</span>
                  </div>
                  <p class="event-description">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam.</p>
                  <a href="#" class="btn-event-details">Learn More <i class="bi bi-arrow-right"></i></a>
                </div>
              </div> */}
              {/*<!-- End Event Item -->*/}

              {/*<!-- Pagination -->*/}
              <div class="events-pagination" data-aos="fade-up" data-aos-delay="100">
                 <Pagination pages={numnpagination}/>
              </div>
            </div>{/*<!-- End Events List -->*/}
          </div>

          <div class="col-lg-4">
            {/*<!-- Sidebar -->*/}
            <div class="events-sidebar">
              {/*<!-- Search Form -->*/}
              <div class="sidebar-item search-form" data-aos="fade-up">
                <h4>Buscar Eventos</h4>
                <form action="">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search Events..." onChange={(e)=>pesquisarGrid(e)}/>
                    <button class="btn" type="button"><i class="bi bi-search"></i></button>
                  </div>
                </form>
              </div>{/*<!-- End Search Form -->*/}

              {/*<!-- Categories -->*/}
              <div class="sidebar-item categories" data-aos="fade-up" data-aos-delay="100">
                <h4>Categoria de Eventos</h4>
                <ul class="list-unstyled">
                  {
                    listagrupo.map((item,index)=>{
                        return(
                           <li><a href="#" onClick={(e)=>pesquisarClick(e,item.cae_id_cae)}>{item.cae_descricao}<span>({item.total})</span></a></li>
                        )
                    })
                  }
                  {/* <li><a href="#">Academic <span>(12)</span></a></li>
                  <li><a href="#">Sports <span>(7)</span></a></li>
                  <li><a href="#">Arts &amp; Culture <span>(9)</span></a></li>
                  <li><a href="#">Workshops <span>(5)</span></a></li>
                  <li><a href="#">Seminars <span>(8)</span></a></li>
                  <li><a href="#">Competitions <span>(6)</span></a></li> */}
                </ul>
              </div>{/*<!-- End Categories -->*/}

              {/*<!-- Upcoming Events -->*/}
              <div class="sidebar-item upcoming-events" data-aos="fade-up" data-aos-delay="200">
                <h4>Próximos Eventos</h4>
                <div class="featured-event">
                  <img src={imagem+'evento/bazar.jpeg'} alt="Event" class="img-fluid"/>
                  <div class="featured-event-details">
                    <h5>Summer Leadership Camp</h5>
                    <span class="event-date"><i class="bi bi-calendar"></i> July 10-15, 2023</span>
                    <a href="#" class="btn-sm btn-register">Register Now</a>
                  </div>
                </div>
              </div>{/*<!-- End Upcoming Events -->*/}

              {/*<!-- Event Calendar -->*/}
              <div class="sidebar-item event-calendar" data-aos="fade-up" data-aos-delay="300">
                <h4>Calendário de Eventos</h4>
                <div class="calendar-widget">
                  <div class="calendar-header">
                    <h5>{mes}&nbsp;{ano}</h5>
                    <div class="calendar-nav">
                      <a href="#" onClick={(e)=>getCalendar(e,'tras')} class="prev-month"><i class="bi bi-chevron-left"></i></a>
                      <a href="#" onClick={(e)=>getCalendar(e,'frente')} class="next-month"><i class="bi bi-chevron-right"></i></a>
                    </div>
                  </div>
                  <table class="calendar-table">
                    <thead>
                      <tr>
                        <th style={style_calendar_l}>Dom</th>
                        <th style={style_calendar}>Seg</th>
                        <th style={style_calendar}>Ter</th>
                        <th style={style_calendar}>Qua</th>
                        <th style={style_calendar}>Qui</th>
                        <th style={style_calendar}>Sex</th>
                        <th style={style_calendar_r}>Sab</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                      loadcal ? (<tr><td colspan="7"><CSpinner size="sm" color="secondary"/></td></tr>) :
                      (<><ExibeCal lista={listacalendario} semana={semanas[0]}/>
                      <ExibeCal lista={listacalendario} semana={semanas[1]}/>
                      <ExibeCal lista={listacalendario} semana={semanas[2]}/>
                      <ExibeCal lista={listacalendario} semana={semanas[3]}/>
                      { semanas[4] !== undefined ? (<ExibeCal lista={listacalendario} semana={semanas[4]}/>) : ''}</>)
                      }
                      {/* <tr>
                        <td></td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                      </tr>
                      <tr>
                        <td>14</td>
                        <td class="has-event">15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                      </tr>
                      <tr>
                        <td>21</td>
                        <td class="has-event">22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                      </tr>
                      <tr>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>{/*<!-- End Event Calendar -->*/}
            </div>{/*<!-- End Sidebar -->*/}
          </div>
        </div>

      </div>

    </section>
    </>
  )
}
export default SectionEventos
