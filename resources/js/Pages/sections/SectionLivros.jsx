import { React, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CCollapse,CBadge,CConditionalPortal, CCardImage,CCardText,
  CFormTextarea,CContainer} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartPlus,faSave,faCircleXmark,faArrowAltCircleDown,faArrowAltCircleUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ModalQrCode } from '../componentes/ModalQrCode';
import $ from 'jquery';
import Isotope from 'isotope-layout';



// The Main component receives props passed from the Laravel controller
const SectionLivros = ( props ) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const token  = import.meta.env.VITE_APP_TOKEN
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const exibe = props.exibe ? '' : 'naoexibe'
  const { estado } = props
  const [lista,setLista] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [est,setEstado] = useState(false)
  const [openmodal,setOpenmodal] = useState(false)
  const [loadpage,setLoadPage] = useState(true)
  const [estdiv,setEstdiv] = useState(true)
  const [livro,setLivro] = useState('')
  const [autor,setAutor] = useState('')
  const [preco,setPreco] = useState(0)
  const [img,setImg] = useState('')
  const [copia,setCopia] = useState('')
  const gridRef = useRef(null);
  const isotopeRef = useRef(null);



  //const closeModAP
  const listalivros = [
    {
      filtro:'filter-kardec',
      img:imagem+'/livraria/ceuinferno.png',
      destaque:'Allan Kardec',
      rate:'4.8',
      titulo:'O céu e o inferno',
      texto:'Lançado em 1865, explica a justiça divina e a vida após a morte sob a ótica do espiritismo.'
    },
    {
      filtro:'filter-kardec',
      img:imagem+'/livraria/oqueeoespiritismo.png',
      destaque:'Allan Kardec',
      rate:'4.9',
      titulo:'O que é o espiritismo',
      texto:'Apresenta as noções elementares do mundo invisível através das manifestações dos espíritos, além do resumo dos princípios da Doutrina Espírita, que servem de resposta às mais notórias objeções que podem ser apresentadas contra o Espiritismo. Leituraobrigatória para o estudioso da filosofia espírita.'
    },
    {
      filtro:'filter-branding',
      img:imagem+'/livraria/livrodosmediuns.png',
      destaque:'Allan Kardec',
      rate:'5.0',
      titulo:'Livro dos médiuns',
      texto:'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id.'
    },
    {
      filtro:'filter-ui',
      img:imagem+'/livraria/livro01.png',
      destaque:'Chico Xavier',
      rate:'4.7',
      titulo:'Abrigo',
      texto:'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    },
    {
      filtro:'filter-kardec',
      img:imagem+'/livraria/livro02.png',
      destaque:'Chico Xavier1',
      rate:'4.6',
      titulo:'Atenção',
      texto:'Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed.'
    },
    {
      filtro:'filter-chico',
      img:imagem+'/livraria/livro03.png',
      destaque:'Chico Xavier',
      rate:'4.6',
      titulo:'Companheiro',
      texto:'Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Sed porttitor lectus nibh.'
    },
    {
      filtro:'filter-chico',
      img:imagem+'/livraria/livro04.png',
      destaque:'Chico Xavier',
      rate:'4.8',
      titulo:'Dinheiro',
      texto:'Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Sed porttitor lectus nibh.'
    },
    {
      filtro:'filter-kardec',
      img:imagem+'/livraria/evangelhosegundoespiritismo.png',
      destaque:'Allan Kardec',
      rate:'4.8',
      titulo:'O Evangelho Segundo o Espiritismo',
      texto:'Descubra o manual de vida que transformou milhões de pessoas há mais de 150 anos . Em tempos de incertezas e busca por propósito, O Evangelho Segundo o Espiritismo oferece respostas práticas e consoladoras para os desafios da vida moderna. Allan Kardec, com a precisão de um pesquisador e a sensibilidade de um educador, decodifica os ensinamentos morais de Jesus Cristo através de comunicações mediúnicas com Espíritos Superiores.'
    },
    {
      filtro:'filter-ui',
      img:imagem+'/livraria/obraspostumas.png',
      destaque:'Allan Kardec',
      rate:'4.8',
      titulo:'Obras Póstumas',
      texto:'Vasto material doutrinário de inestimavel deixado por Kardec ao regressar ao Mundo Espiritual. De inestimável valor. Dentre os temas abordados temos: manifestações dos Espíritos, estudo sobre a natureza do Cristo, fotografia e telegrafia do pensamento, música celeste, conhecimento do futuro. Na segunda parte, uma coletânea de mensagens mediúnicas e estudos do Autor que constituiriam o livro "Previsões concernentes ao Espiritismo". '
    },
  ]
  //obraspostumas

  useLayoutEffect(() => {
    //var $isotope = $('.isotope-container').isotope({});
    // const { height } = ref.current.getBoundingClientRect();
    // setTooltipHeight(height);
    console.log($)
    console.log($("#container").html())
    //$('.isotope-container').isotope()
  }, [estdiv]);

  useEffect(()=>{
    //if(estado == false){
        //  if (gridRef.current) {
        //     isotopeRef.current = new Isotope(gridRef.current, {
        //             itemSelector: '.grid-item',
        //             layoutMode: 'fitRows', // or 'masonry'
        //     });
        // }

        setLoadPage(false)
        console.log('ok')
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
                nome:item.liv_autor
            }
            existe = vet_filtro.filter((it)=>it.filtro == item.liv_filter)
            if(existe.length == 0){
                vet_filtro.push(obj)
            }

        })
        setListafiltro(vet_filtro)
        setLista(vet)
        setTimeout(() => {
            setEstdiv(!estdiv)
        }, 200)
        setLoadPage(true)
        return () => isotopeRef.current?.destroy();
        })
        //setLista(listalivros)
   // }
  },[])

//   useEffect(() => {
//     if (isotopeRef.current) {
//       isotopeRef.current.reloadItems(); // Notice the new/deleted elements
//       isotopeRef.current.layout();      // Re-align the positioning
//     }
//   }, [lista]); // Triggers every time listData updates

  const ButtonCompra = (props) =>{
    //const [load,setLoad()]
    return(
       <CButton  onClick={(e)=>AbreModal(e,props.livro,props.autor,props.preco,props.id,props.qrcode)} size="sm" color="primary" style={{backgroundColor:'#6895C1',border:'1px solid #6895C1'}} className="rounded-pill">
        Comprar&nbsp;<FontAwesomeIcon size="lg" icon={faCartPlus} />
        {
          props.load ? (<CSpinner size="sm"/>) : (<></>)
        }
       </CButton>
    )
  }

  const AbreModal = (event,livro,autor,preco,id,idqrcode) =>{
     console.log(livro,autor)
     setLivro(livro)
     setAutor(autor)
     setPreco(preco)
     setLista(prevItems =>
          prevItems.map(item =>
              item.liv_id_liv === id ? { ...item, load: true } : item
          )
     )
     //pgto?pagamento=S&seq=1&valor=80.34&livro=Abrigo
     //axios.get(`${endpoint}/pgto?id=${id}&valor=${preco}&livro=${livro}`,{
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

  const ButtonPreco = (props) =>{
    return(
       <CButton size="sm" color="info" style={{backgroundColor:'#106613',border:'1px solid #a7e6cb',color:'white'}} className="rounded-pill">
        Valor: R$&nbsp;{props.valor}
       </CButton>
    )
  }

  const mudaTexto = (event,id) =>{
    console.log('id:'+id)
    let idx = getIndex(lista,id)
    console.log('index:'+idx)
    lista[idx].colapse = true
    // setLista(prevItems =>
    //      prevItems.map(item =>
    //          item.liv_id_liv === id ? { ...item, colapse: true } : item
    //      )
    // )
    setEstado(!est)
    console.log(lista)
  }

  const getIndex = (listagem,id) =>{
    let valor = null
    listagem.map((item,index)=>{
        console.log(item.liv_id_liv)
        if(item.liv_id_liv == id){
           console.log('achou:'+item.liv_id_liv)
           valor = index
        }
    })
    return valor
  }

  const ComCSpinner = (props) =>{
    if(props.load){
       return(<CSpinner></CSpinner>)
    } else{
       return(<></>)
    }
  }

  const CompColapse=(props)=>{
    console.log(lista)
    const [visible,setVisible] = useState(false)
    return(
        <>
      <CButton size="sm" variant="outline" className="rounded-pill" color="link" onClick={() => setVisible(!visible)}>
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

  const ItemLivro = (props) =>{
    return(
    //    <div class={'col-xl-3 col-lg-6 portfolio-item isotope-item ' +props.dados.liv_filter} style={{position:'absolute', left: '0px', top: '0px'}}>
        <div class={'col-xl-3 col-lg-6 portfolio-item isotope-item ' +props.dados.liv_filter} style={props.dados.zindex}>
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
                        <span>{props.dados.rate}</span>
                    </div>
                    </div>
                    <h3>{props.dados.liv_titulo}</h3>
                    <p>{props.dados.liv_sinopse.substr(0,104)}&nbsp;
                        { props.dados.liv_sinopse.substr(104,2000) != ''
                          ? (<CompColapse texto={props.dados.liv_sinopse.substr(104,2000)}/>)
                          : (<></>)
                        }
                    </p>
                    <div class="portfolio-tech">
                    <ButtonPreco valor={props.dados.liv_preco}></ButtonPreco>
                    <ButtonCompra
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

  const ListaLivros = () =>{
    return(
        <div ref={gridRef} class="row gy-4 isotope-container aos-init aos-animate" data-aos="fade-up" data-aos-delay="300" style={{position:'relative',height:'1024px'}}>
        {lista.map((item,index)=>{
                return(
                <ItemLivro dados={item}/>
                )
        })}
        </div>
    )
  }

  const Cabecalho = () =>{
    return(
        <ul class="portfolio-filters isotope-filters aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            <li data-filter="*" class="filter-active">Todos Livros</li>
            {
                listafiltro.map((item,index)=>{
                  return(
                     <li data-filter={'.'+item.filtro} class="">{item.nome}</li>
                  )
                })
            }
       </ul>
    )
  }

  const Corpo = () =>{
     return(
        <div id="container" class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <Cabecalho/>
            <ListaLivros estado={est}/>
        </div>
     )
  }




//   useEffect(() => {
//      document.documentElement.setAttribute('data-coreui-theme', theme_light);
//   })

  return (
    <>
    <ModalQrCode livro={livro} autor={autor} valor={preco}  copia={copia} imagem={img} isOpen={openmodal} close={setOpenmodal}/>
    <section id="livraria" class="portfolio_extra section">


      <div class="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Livraria</h2>
        <p>Nosso acervo de livros espíritas</p>
      </div>
      { loadpage ? (
        <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

            <Corpo/>
            {/* <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                <Cabecalho/>
                <ListaLivros estado={est}/>
            </div> */}

            {/* <div class="portfolio-cta text-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
            <h4>Ready to start your next project?</h4>
            <p>Let's work together to bring your digital vision to life</p>
            <div class="cta-buttons">
                <a href="#contact" class="btn btn-primary">Start a Project</a>
                <a href="#portfolio" class="btn btn-outline">View All Work</a>
            </div>
            </div> */}

        </div>
      ):
      (<div style={{top:'20px',textAlign:'center'}}><CSpinner color="primary"/></div>)}
    </section>
    </>
  )
}
export default SectionLivros
