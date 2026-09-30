import { React,useEffect, useState } from 'react';
import axios from 'axios';
import { CPlaceholder,CBadge, CSpinner, CPagination, CPaginationItem } from '@coreui/react'
import ModalCursos from '../componentes/ModalCursos';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionCursos = (props) => {
  const { estado, abremodal, geradados, gerapublico } = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [screen,setScreen] = useState(null)
  const [loadpage,setLoadpage] = useState([])
  const [semanas,setSemanas] = useState([])
  const [mesint,setMesint] = useState([])
  const [mes,setMes] = useState([])
  const [ano,setAno] = useState([])
  const [listacursos,setListacursos] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [listafoco,setListafoco] = useState([])
  const [listacalendario,setListacalendario] = useState([])
  /* paginação */
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  /* end paginação */


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
                    axios.get(`${endpoint}/curso?listagem=S`,{
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                        },
                    }),
                    axios.get(`${endpoint}/publicofoco?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),

                ]
                const responses = await Promise.all(requests);
                let result_curso = responses[0]
                let result_foco = responses[1]
                let string = null
                let imgstr = null
                result_curso.data.data.map((item,index)=>{
                   string = JSON.parse(item.cur_colaborador_avatar)
                   item.avatar = string["meta"][0].path
                   imgstr = JSON.parse(item.cur_imagem[0].cui_dados_inf)
                   item.folder = imgstr["meta"][0].path
                   //item.cur_colaborador_avatar
                })
                setListafiltro(result_curso.data.data)
                let array_pub = result_foco.data.data
                array_pub.unshift({puf_id_puf:'',puf_descricao:'Selecione o Tipo'})
                setListafoco(array_pub)
                let tam = result_curso.data.data.length
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
                setListacursos(result_curso.data.data.slice(0,qtderegistrospagina))
                setLoadpage(true)

            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[estado])//garante carrgera somente se clicar no link

  const infCurso = (event,id) =>{
    event.preventDefault()
    setListacursos(prevItems =>
         prevItems.map(item =>
            item.cur_id_cur === id ? { ...item, cur_load: true } : item
         )
    )
    axios.get(`${endpoint}/curso/${id}`,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
        },
    })
    .then((result) => {
        console.log(result.data.data)
        geradados(result.data.data)
        gerapublico(listafoco)
        console.log('lista foco')
        console.log(listafoco)
        setTimeout(() => {
              setListacursos(prevItems =>
                    prevItems.map(item =>
                        item.cur_id_cur === id ? { ...item, cur_load: false } : item
                    )
              )
              abremodal(true)
        }, 2000)
    })


    /*
    axios.get(`${endpoint}/curso?listagem=S`,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
        },
    })
    */
    console.log('id:'+id);

    //abremodal(true)
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
      setListacursos(lista)
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


  return (
    <>
    <section id="cursos" class="news-posts section">

      <div class="container section-title" data-aos="fade-up">
        <h2>Cursos</h2>
        <p>Logo Abaixo Lista de Cursos Disponíveis</p>
        <div id="idlista"></div>
      </div>

      <div class="container">
        { loadpage ? (<></>): (<div style={{top:'20px',textAlign:'center'}}><CSpinner color="primary"/></div>)}
        <div class="row gy-4">

          {
             listacursos.map((item,index)=>{
                return(
                    <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                        <article>
                            <div class="post-img">
                                <img src={imagem+item.folder} alt="" class="img-fluid"/>
                            </div>
                            <p class="post-category">{item.cur_categoria}</p>
                            <h2 class="title">
                                <a href="blog-details.html">{item.cur_titulo}</a>
                            </h2>
                            <div class="d-flex align-items-center">
                                <img src={imagem+item.avatar} alt="" class="img-fluid post-author-img flex-shrink-0"/>
                                <div class="post-meta">
                                <p class="post-author">{item.cur_colaborador}</p>
                                <p class="post-date">
                                    <time datetime="2022-01-01">{item.cur_data_ext_mes}&nbsp;{item.cur_data_ext_dia},&nbsp;{item.cur_data_ext_ano}</time>
                                </p>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-end justify-content-end">
                                <a href="#" onClick={(e)=>infCurso(e,item.cur_id_cur)}lass="btn-event-details">
                                    Inscrever-se&nbsp;{item.cur_load ? (<CSpinner size="sm"/>) : (<></>)}<i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </article>
                    </div>
                )
             })
          }

          <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <article>

              <div class="post-img">
                <img src="assets/img/blog/blog-post-1.webp" alt="" class="img-fluid"/>
              </div>

              <p class="post-category">Politics</p>

              <h2 class="title">
                <a href="blog-details.html">Dolorum optio tempore voluptas dignissimos</a>
              </h2>

              <div class="d-flex align-items-center">
                <img src="assets/img/person/person-f-12.webp" alt="" class="img-fluid post-author-img flex-shrink-0"/>
                <div class="post-meta">
                  <p class="post-author">Maria Doe</p>
                  <p class="post-date">
                    <time datetime="2022-01-01">Jan 1, 2022</time>
                  </p>
                </div>
              </div>

            </article>
          </div>

          <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <article>

              <div class="post-img">
                <img src="assets/img/blog/blog-post-2.webp" alt="" class="img-fluid"/>
              </div>

              <p class="post-category">Sports</p>

              <h2 class="title">
                <a href="blog-details.html">Nisi magni odit consequatur autem nulla dolorem</a>
              </h2>

              <div class="d-flex align-items-center">
                <img src="assets/img/person/person-f-13.webp" alt="" class="img-fluid post-author-img flex-shrink-0"/>
                <div class="post-meta">
                  <p class="post-author">Allisa Mayer</p>
                  <p class="post-date">
                    <time datetime="2022-01-01">Jun 5, 2022</time>
                  </p>
                </div>
              </div>

            </article>
          </div>

          <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <article>

              <div class="post-img">
                <img src="assets/img/blog/blog-post-3.webp" alt="" class="img-fluid"/>
              </div>

              <p class="post-category">Entertainment</p>

              <h2 class="title">
                <a href="blog-details.html">Possimus soluta ut id suscipit ea ut in quo quia et soluta</a>
              </h2>

              <div class="d-flex align-items-center">
                <img src="assets/img/person/person-m-10.webp" alt="" class="img-fluid post-author-img flex-shrink-0"/>
                <div class="post-meta">
                  <p class="post-author">Mark Dower</p>
                  <p class="post-date">
                    <time datetime="2022-01-01">Jun 22, 2022</time>
                  </p>
                </div>
              </div>

            </article>
          </div>

        </div>

      </div>

    </section>
    <section id="pagination-2" class="pagination-2 section">

      <div class="container">
        <Pagination pages={numnpagination}/>
        {/* <nav class="d-flex justify-content-center" aria-label="Page navigation">
          <ul>
            <li>
              <a href="#" aria-label="Previous page">
                <i class="bi bi-arrow-left"></i>
                <span class="d-none d-sm-inline">Previous</span>
              </a>
            </li>

            <li><a href="#" class="active">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li class="ellipsis">...</li>
            <li><a href="#">8</a></li>
            <li><a href="#">9</a></li>
            <li><a href="#">10</a></li>

            <li>
              <a href="#" aria-label="Next page">
                <span class="d-none d-sm-inline">Next</span>
                <i class="bi bi-arrow-right"></i>
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </section>
    </>
  )
}
export default SectionCursos
