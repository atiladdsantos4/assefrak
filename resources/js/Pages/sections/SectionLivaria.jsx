import { React,useEffect,useState,useRef,memo } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CCollapse,CBadge,CConditionalPortal, CCardImage,CCardText,
  CFormTextarea,CContainer,CPopover } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartPlus,faSave,faCircleXmark,faArrowAltCircleDown,faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ModalQrCode } from '../componentes/ModalQrCode';


// The Main component receives props passed from the Laravel controller
const SectionLivraria = (props) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const token  = import.meta.env.VITE_APP_TOKEN
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const exibe = props.exibe ? '' : 'naoexibe'
  const { estado,open } = props
  const [lista,setLista] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [listacopia,setListacopia] = useState([])
  const [est,setEstado] = useState(true)
  const [openmodal,setOpenmodal] = useState(false)
  const [loadpage,setLoadPage] = useState(true)
  const [estdiv,setEstdiv] = useState(true)
  const [livro,setLivro] = useState('')
  const [autor,setAutor] = useState('')
  const [preco,setPreco] = useState(0)
  const [img,setImg] = useState('')
  const [copia,setCopia] = useState('')
  const [idrolar,setIdrolar] = useState('')
  const [filterKey, setFilterKey] = useState('*')
  const [iso, setIso] = useState('*')

  const [screen,setScreen] = useState(null)


  const handleFilterKeyChange = (event,filtro,valor) =>{
      console.log(filtro)
      if( filtro === '*'){
         iso.arrange({filter: `*`})
      } else {
         iso.arrange({filter: `.${filtro}`})
      }
      setFilterKey(filtro)
      setListafiltro((prevItems) => {
        return prevItems.map((item) => {
            // Defina sua condição aqui para identificar quais itens atualizar
            if (item.filtro === filtro) {
                return {
                    ...item,
                    classe: 'filter-active'
                }; // Atualiza o item mantendo as outras propriedades intactas'
            } else {
               return {
                    ...item,
                    classe: null
                }; // Atualiza o item mantendo as outras propriedades intactas'
            }
            //return item; // Retorna o item sem alterações se não bater com a condição
        });
  });
  }

  useEffect(()=>{

      if(estado == false){
          setLoadPage(false)
          axios.get(`${endpoint}/livro?listagem=S`,{
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
              },
          })
          .then((result) => {
            let vet = result.data.data.filter((item)=>item.liv_ativo == 1)
            let vet_filtro = []
            let string = null
            let obj = null
            let existe = []
            let zidx = 1000
            vet.map((item,index)=>{
                zidx--
                string = JSON.parse(item.liv_imagem)
                item.img = string["meta"][0].path
                item.load = false
                item.zindex={zIndex:zidx}
                obj = {
                    filtro:item.liv_filter,
                    nome:item.liv_autor,
                    classe:null
                }
                existe = vet_filtro.filter((it)=>it.filtro == item.liv_filter)
                if(existe.length == 0){
                    vet_filtro.push(obj)
                }
          })
          vet_filtro.unshift({filtro:'*',nome:'Todos Livros',classe:'filter-active'})
          setListafiltro(vet_filtro)
          setLista(vet)
          setListacopia(vet)
          setLoadPage(true)
          setTimeout(() => {
            let gal = new Isotope('.grid', {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows',
                getSortData: {
                   symbol: '.symbol parseInt',
                   name: '.name',
                   autor:'.autor'
                }
          })
            setIso(gal)
          }, 200)

        })
      }
  },[estado])


  const ButtonCompra = (props) =>{
    return(
       <CButton  onClick={(e) => AbreModal(props.livro,props.autor,props.preco,props.id,props.qrcode)} size="sm" color="primary" style={{backgroundColor:'#6895C1',border:'1px solid #6895C1'}} className="rounded-pill">
        Comprar&nbsp;<FontAwesomeIcon size="lg" icon={faCartPlus} />
        {
          props.load ? (<CSpinner size="sm"/>) : (<></>)
        }
       </CButton>
    )
  }

  const AbreModal = (livro,autor,preco,id,idqrcode) =>{
     setLivro(livro)
     setAutor(autor)
     setPreco(preco)
     setLista(prevItems =>
          prevItems.map(item =>
              item.liv_id_liv === id ? { ...item, load: true } : item
          )
     )
    axios.get(`${endpoint}/livropix/${idqrcode}`,{
           headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
           },
    })
    .then((result) => {
      setImg(result.data.data.lip_qrcode)
      setCopia(result.data.data.lip_copy_qrcode)
      setLista(prevItems =>
          prevItems.map(item =>
              item.liv_id_liv === id ? { ...item, load: false } : item
          )
      )
      setOpenmodal(true)
    })

  }

  const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  const ButtonPreco = (props) =>{
    return(
       <CButton size="sm" color="info" style={{backgroundColor:'#106613',border:'1px solid #a7e6cb',color:'white'}} className="symbol rounded-pill">
        Valor: R$&nbsp;{props.valor}
       </CButton>
    )
  }

  const CompColapse=(props)=>{
      const [visible,setVisible] = useState(false)
      function teste(){
         setVisible(!visible)
      }

      return(
          <>
        <CButton size="sm" variant="outline" className="rounded-pill" color="link" onClick={() => teste()}>
          Ver Mais →
        </CButton>
        <CCollapse visible={visible}>
          <CCard className="mt-1" >
            <CCardBody style={{color:'#867b7b'}}>
              {props.texto}
            </CCardBody>
          </CCard>
        </CCollapse>
      </>
      )
  }

  const ComCSpinner = (props) =>{
      if(props.load){
         return(<CSpinner></CSpinner>)
      } else{
         return(<></>)
      }
  }

  const ItemLivro = (props) =>{
    return(
    //    <div class={'col-xl-3 col-lg-6 portfolio-item isotope-item ' +props.dados.liv_filter} style={{position:'absolute', left: '0px', top: '0px'}}>
        <div id={'id'+props.dados.liv_id_liv} class={'col-xl-3 col-lg-6 portfolio-item isotope-item ' +props.dados.liv_filter} style={props.dados.zindex}>
            <div class="portfolio-wrapper">
                <div class="portfolio-image">
                    <img src={imagem+props.dados.img} alt="Creative Web Project" class="img-fluid" loading="lazy"/>
                    <div class="portfolio-hover">
                    <div class="portfolio-actions">
                        <a href={imagem+props.dados.img} target="_blank" class="glightbox action-btn preview-btn" title="Preview Project">
                        <i class="bi bi-eye"></i>
                        </a>
                        <a href="#" class="action-btn details-btn" title="View Details">
                        <i class="bi bi-arrow-up-right"></i>
                        </a>
                    </div>
                    </div>
                </div>
                <div class="portfolio-content" style={{minHeight:'320px'}}>
                    <div class="portfolio-meta">
                    <span class="project-type">{props.dados.liv_autor}</span>
                    <div class="project-rating">
                        <i class="bi bi-star-fill"></i>
                        <span>{'Pag: '+props.dados.liv_paginas}</span>
                    </div>
                    </div>
                    <h3>{props.dados.liv_titulo}</h3>
                    <p>{props.dados.liv_sinopse.substr(0,104)}&nbsp;
                        { props.dados.liv_sinopse.substr(104,2000) != ''
                          ? (<CompColapse
                               texto={props.dados.liv_sinopse.substr(104,2000)}
                               livro={props.dados.liv_titulo}
                               id={props.dados.liv_id_liv}
                               autor={props.dados.liv_autor}
                               preco={props.dados.liv_preco}
                               qrcode={props.dados.liv_qrcode}
                             />)
                          : (<></>)
                        }
                    </p>
                    <div class="portfolio-tech">
                    <ButtonPreco valor={props.dados.liv_preco}></ButtonPreco>
                    <ButtonCompra
                         idcomp={'id'+props.dados.liv_id_liv}
                         livro={props.dados.liv_titulo}
                         id={props.dados.liv_id_liv}
                         autor={props.dados.liv_autor}
                         preco={props.dados.liv_preco}
                         qrcode={props.dados.liv_qrcode}
                         load={props.dados.load}
                    ></ButtonCompra>
                    {/* <span class="tech-badge">React</span>
                    <span class="tech-badge">Node.js</span>
                    <span class="tech-badge">AWS</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
  }

const IsotopeReact = () => {
  // init one ref to store the future isotope object
  const isotope = useRef()
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = useState('*')

  // initialize an Isotope object with configs
  useEffect(() => {
    isotope.current = new Isotope('.filter-container', {
      itemSelector: '.filter-item',
      layoutMode: 'fitRows',
    })
    // cleanup
    return () => isotope.current.destroy()
  }, [])

  // handling filter key change
  useEffect(() => {
    filterKey === '*'
      ? isotope.current.arrange({filter: `*`})
      : isotope.current.arrange({filter: `.${filterKey}`})
  }, [filterKey])

  const handleFilterKeyChange = key => () => setFilterKey(key)

  return (
    <>
      <ul>
        <li onClick={handleFilterKeyChange('*')}>Show Both</li>
        <li onClick={handleFilterKeyChange('vege')}>Show Veges</li>
        <li onClick={handleFilterKeyChange('fruit')}>Show Fruits</li>
      </ul>
      <hr />
      <ul className="filter-container">
        <div className="filter-item vege">
          <span>Cucumber</span>
        </div>
        <div className="filter-item fruit">
          <span>Apple</span>
        </div>
        <div className="filter-item fruit">
          <span>Orange</span>
        </div>
        <div className="filter-item fruit vege">
          <span>Tomato</span>
        </div>
      </ul>
    </>
  )
}


const IsotopeLista = () => {
  // init one ref to store the future isotope object
  const isotope = useRef()
  // store the filter keyword in a state

  // initialize an Isotope object with configs
  useEffect(() => {
    isotope.current = new Isotope('.grid', {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
    })
    // cleanup
    return () => isotope.current.destroy()
  }, [estdiv])

  // handling filter key change
  useEffect(() => {
    filterKey === '*'  ? isotope.current.arrange({filter: `*`}) : isotope.current.arrange({filter: `.${filterKey}`})
  }, [filterKey])

//   const handleFilterKeyChange = key => () =>{
//       setFilterKey(key)
//   }

  const handleFilterKeyChange = (event,filtro,valor) =>{
      setFilterKey(filtro)
      setListafiltro((prevItems) => {
        return prevItems.map((item) => {
            // Defina sua condição aqui para identificar quais itens atualizar
            if (item.filtro === filtro) {
                return {
                    ...item,
                    classe: 'filter-active'
                }; // Atualiza o item mantendo as outras propriedades intactas'
            } else {
               return {
                    ...item,
                    classe: null
                }; // Atualiza o item mantendo as outras propriedades intactas'
            }
            //return item; // Retorna o item sem alterações se não bater com a condição
        });
     });
  }

  return (
    <>
       <ul class="portfolio-filters isotope-filters aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            {
                listafiltro.map((item,index)=>{
                  //console.log(item)
                  return(
                     <li data-filter={item.filtro} class={item.classe} onClick={(e)=>handleFilterKeyChange(e,item.filtro,item)}>{item.nome}</li>
                  )
                })
            }
       </ul>
      <hr />
      <div class="grid aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
            {
               lista.map((item,index)=>{
                 return(
                   <div id={'id'+item.liv_id_liv} class={'col-xl-3 col-lg-6 portfolio-item isotope-item ' +item.liv_filter} style={item.zindex}>
                    <div class="portfolio-wrapper">
                        <div class="portfolio-image">
                            <img src={imagem+item.img} alt="Creative Web Project" class="img-fluid" loading="lazy"/>
                            <div class="portfolio-hover">
                            <div class="portfolio-actions">
                                <a href={imagem+item.img} target="_blank" class="glightbox action-btn preview-btn" title="Preview Project">
                                <i class="bi bi-eye"></i>
                                </a>
                                <a href="#" class="action-btn details-btn" title="View Details">
                                <i class="bi bi-arrow-up-right"></i>
                                </a>
                            </div>
                            </div>
                        </div>
                        <div class="portfolio-content" style={{minHeight:'320px'}}>
                            <div class="portfolio-meta">
                            <span class="project-type">{item.liv_autor}</span>
                            <div class="project-rating">
                                <i class="bi bi-star-fill"></i>
                                <span>{'Pag: '+item.liv_paginas}</span>
                            </div>
                            </div>
                            <h3>{item.liv_titulo}</h3>
                            <p>{item.liv_sinopse.substr(0,104)}&nbsp;
                                { item.liv_sinopse.substr(104,2000) != ''
                                ? (<CompColapse
                                    texto={item.liv_sinopse.substr(104,2000)}
                                    livro={item.liv_titulo}
                                    id={item.liv_id_liv}
                                    autor={item.liv_autor}
                                    preco={item.liv_preco}
                                    qrcode={item.liv_qrcode}
                                    />)
                                : (<></>)
                                }
                            </p>
                            <div class="portfolio-tech">
                            <ButtonPreco valor={item.liv_preco}></ButtonPreco>
                            <ButtonCompra
                                livro={item.liv_titulo}
                                id={item.liv_id_liv}
                                autor={item.liv_autor}
                                preco={item.liv_preco}
                                qrcode={item.liv_qrcode}
                                load={item.load}
                            ></ButtonCompra>
                            </div>
                        </div>
                    </div>
                   </div>
                 )
               })
            }
      </div>
      {/* <Child/> */}
    </>
  )
}

const ordena = (event,valor) =>{

  //let teste = new Isotope('.grid');
  //console.log(teste)
  //iso.sortBy({filter: `.${filtro}`})
  let filtro = null
  if (valor == 'numero'){
    filtro = 'symbol'
  }
  if (valor == 'nome'){
    filtro = 'name'
  }
  if (valor == 'autor'){
    filtro = 'autor'
  }
  let options = { sortBy: `${filtro}` };
  iso.arrange(options)
  console.log(iso)
}


 return (
    <>
        <section id="livraria" class="campus-facilities portfolio_extra section">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>Livraria</h2>
                <p>Nosso acervo de livros espíritas</p>
            </div>
            { loadpage ? (
            <div id="idcontainer" className="container" data-aos="fade-up" data-aos-delay="100">
                {/* <IsotopeLista/> */}
                <ul class="portfolio-filters isotope-filters aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                        {
                            listafiltro.map((item,index)=>{
                            return(
                                <li data-filter={item.filtro} class={item.classe} onClick={(e)=>handleFilterKeyChange(e,item.filtro,item)}>{item.nome}</li>
                            )
                            })
                        }
                </ul>
                <input type="radio" name="filtro" onClick={(e)=>{ordena(e,'numero')}}/>&nbsp;Ordenar por Valor
                &nbsp;&nbsp;
                <input type="radio" name="filtro" onClick={(e)=>{ordena(e,'nome')}}/>&nbsp;Ordenar por Titulo
                &nbsp;&nbsp;
                <input type="radio" name="filtro" onClick={(e)=>{ordena(e,'autor')}}/>&nbsp;Ordenar por Autor
                <hr />
                <div class="grid aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                    {
                        lista.map((item,index)=>{
                            return(
                            <div className={'col-xl-3 col-lg-6 portfolio-item isotope-item ' +item.liv_filter} style={item.zindex}>
                                {/* <h3 className="symbolaaaa">{item.liv_id_liv}</h3> */}
                                <div class="portfolio-wrapper">
                                    <div class="portfolio-image">
                                        <img src={imagem+item.img} alt="Creative Web Project" class="img-fluid" loading="lazy"/>
                                        <div class="portfolio-hover">
                                        <div class="portfolio-actions">
                                            <a href={imagem+item.img} target="_blank" class="glightbox action-btn preview-btn" title="Preview Project">
                                            <i class="bi bi-eye"></i>
                                            </a>
                                            <a href="#" class="action-btn details-btn" title="View Details">
                                            <i class="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="portfolio-content" style={{minHeight:'320px'}}>
                                        <div class="portfolio-meta">
                                        <span class="project-type autor">{item.liv_autor}</span>
                                        <div class="project-rating">
                                            <i class="bi bi-star-fill"></i>
                                            <span>{'Pag: '+item.liv_paginas}</span>
                                        </div>
                                        </div>
                                        <h3 className="name">{item.liv_titulo}</h3>
                                        <p>{item.liv_sinopse.substr(0,104)}&nbsp;
                                            { item.liv_sinopse.substr(104,2000) != ''
                                            ? (<CPopover content={item.liv_sinopse} placement="top" trigger={['hover','click']}><div style={{width:'80px'}}>Saiba mais</div></CPopover>)
                                            : (<></>)
                                            }
                                        </p>
                                        <div class="portfolio-tech">
                                        {/* <div className='symbol' style={{display:'flex',justifyContent:'center',alignItems:'center',width:'50px',borderRadius:'50px',backgroundColor:'blue',color:'white'}}>{item.liv_preco}</div> */}
                                        <CButton color="success" className='rounded-pill'>
                                            Valor <CBadge color="secondary">{item.liv_preco}</CBadge>
                                            <div className="symbol visually-hidden">{item.liv_preco}</div>
                                        </CButton>
                                        {/* <ButtonPreco valor={item.liv_preco}></ButtonPreco> */}
                                        <ButtonCompra
                                            livro={item.liv_titulo}
                                            id={item.liv_id_liv}
                                            autor={item.liv_autor}
                                            preco={item.liv_preco}
                                            qrcode={item.liv_qrcode}
                                            load={item.load}
                                        ></ButtonCompra>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                {/* <div class="grid">
                    <div class="element-item transition metal " data-category="transition">
                        <h5 class="name">Mercury</h5>
                        <p class="symbol">Hg</p>
                        <p class="number">80</p>
                        <p class="weight">200.59</p>
                    </div>
                    <div class="element-item metalloid " data-category="metalloid">
                        <h5 class="name">Tellurium</h5>
                        <p class="symbol">Te</p>
                        <p class="number">52</p>
                        <p class="weight">127.6</p>
                    </div>
                    <div class="element-item post-transition metal " data-category="post-transition">
                        <h5 class="name">Bismuth</h5>
                        <p class="symbol">Bi</p>
                        <p class="number">83</p>
                        <p class="weight">208.980</p>
                    </div>
                    <div class="element-item post-transition metal " data-category="post-transition">
                        <h5 class="name">Lead</h5>
                        <p class="symbol">Pb</p>
                        <p class="number">82</p>
                        <p class="weight">207.2</p>
                    </div>
                    <div class="element-item transition metal " data-category="transition">
                        <h5 class="name">Gold</h5>
                        <p class="symbol">Au</p>
                        <p class="number">79</p>
                        <p class="weight">196.967</p>
                    </div>
                    <div class="element-item alkali metal " data-category="alkali">
                        <h5 class="name">Potassium</h5>
                        <p class="symbol">K</p>
                        <p class="number">19</p>
                        <p class="weight">39.0983</p>
                    </div>
                    <div class="element-item alkali metal " data-category="alkali">
                        <h5 class="name">Sodium</h5>
                        <p class="symbol">Na</p>
                        <p class="number">11</p>
                        <p class="weight">22.99</p>
                    </div>
                    <div class="element-item transition metal " data-category="transition">
                        <h5 class="name">Cadmium</h5>
                        <p class="symbol">Cd</p>
                        <p class="number">48</p>
                        <p class="weight">112.411</p>
                    </div>
                    <div class="element-item alkaline-earth metal " data-category="alkaline-earth">
                        <h5 class="name">Calcium</h5>
                        <p class="symbol">Ca</p>
                        <p class="number">20</p>
                        <p class="weight">40.078</p>
                    </div>
                    <div class="element-item transition metal " data-category="transition">
                        <h5 class="name">Rhenium</h5>
                        <p class="symbol">Re</p>
                        <p class="number">75</p>
                        <p class="weight">186.207</p>
                    </div>
                    <div class="element-item post-transition metal " data-category="post-transition">
                        <h5 class="name">Thallium</h5>
                        <p class="symbol">Tl</p>
                        <p class="number">81</p>
                        <p class="weight">204.383</p>
                    </div>
                    <div class="element-item metalloid " data-category="metalloid">
                        <h5 class="name">Antimony</h5>
                        <p class="symbol">Sb</p>
                        <p class="number">51</p>
                        <p class="weight">121.76</p>
                    </div>
                    <div class="element-item transition metal " data-category="transition" >
                        <h5 class="name">Cobalt</h5>
                        <p class="symbol">Co</p>
                        <p class="number">27</p>
                        <p class="weight">58.933</p>
                    </div>
                    <div class="element-item lanthanoid metal inner-transition " data-category="lanthanoid">
                        <h5 class="name">Ytterbium</h5>
                        <p class="symbol">Yb</p>
                        <p class="number">70</p>
                        <p class="weight">173.054</p>
                    </div>
                    <div class="element-item noble-gas nonmetal " data-category="noble-gas">
                        <h5 class="name">Argon</h5>
                        <p class="symbol">Ar</p>
                        <p class="number">18</p>
                        <p class="weight">39.948</p>
                    </div>
                    <div class="element-item diatomic nonmetal " data-category="diatomic">
                        <h5 class="name">Nitrogen</h5>
                        <p class="symbol">N</p>
                        <p class="number">7</p>
                        <p class="weight">14.007</p>
                    </div>
                    <div class="element-item actinoid metal inner-transition " data-category="actinoid">
                        <h5 class="name">Uranium</h5>
                        <p class="symbol">U</p>
                        <p class="number">92</p>
                        <p class="weight">238.029</p>
                    </div>
                    <div class="element-item actinoid metal inner-transition " data-category="actinoid">
                        <h5 class="name">Plutonium</h5>
                        <p class="symbol">Pu</p>
                        <p class="number">94</p>
                        <p class="weight">(244)</p>
                    </div>
                </div> */}
            </div> ) : (<div style={{top:'20px',textAlign:'center'}}><CSpinner color="primary"/></div>)}

        </section>
        <ModalQrCode livro={livro} autor={autor} valor={preco}  copia={copia} imagem={img} isOpen={openmodal} close={setOpenmodal}/>

    </>
  )
}
export default SectionLivraria
