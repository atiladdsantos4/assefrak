import { React,useEffect, useState, useRef,memo } from 'react';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import SectionHero from './sections/SectionHero';
import SectionAbout from './sections/SectionAbout';
import SectionServices from './sections/SectionServices';
import SectionWhyUs from './sections/SectionWhyUs';
import SectionPortifolio from './sections/SectionPortifolio';
import SectionTestimonials from './sections/SectionTestimonials';
import SectionTeam from './sections/SectionTeam';
import SectionPricing from './sections/SectionPricing';
import SectionFaq from './sections/SectionFaq';
import SectionContact from './sections/SectionContact';
import SectionKardec from './sections/SectionKardec';
import SectionCarrosel from './sections/SectionCarrosel';
import SectionVideos from './sections/SectionVideos';
import SectionEventos from './sections/SectionEventos';
import SectionPalestras from './sections/SectionPalestras';
import SectionOurStory from './sections/SectionOurStory';
import SectionLocation from './sections/SectionLocation';
import SectionCursos from './sections/SectionCursos';
import Carrosel from './componentes/Carrosel';
import ModalProgramacao from './componentes/ModalProgramacao';
import ModalCursos from './componentes/ModalCursos';
import SectionLivraria from './sections/SectionLivaria';
import { ModalQrCode } from './componentes/ModalQrCode';


// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Main = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  const [openmodal,setModal] = useState(false)
  const [openmodalcurso,setModalcurso] = useState(false)
  const [openmodallivro,setOpenmodallivro ] = useState(false)
  const [tela,setTela] = useState(0)
  const [estevento,setEstevento] = useState(true)
  const [estpalestra,setEstpalestra] = useState(true)
  const [estcurso,setEstcurso] = useState(true)
  const [estlivro,setEstlivro] = useState(true)
  const [dadoscurso,setDadoscurso]  = useState(null)
  const [dadospublico,setDadospublico]  = useState(null)
  const targetRef = useRef(null);
  const targetPalRef = useRef(null);
  const targetCurRef = useRef(null);
  const targetLivRef = useRef(null);
  const [hasReached, setHasReached] = useState(false);
  const [hasPalReached, setHasPalReached] = useState(false);
  const [hasCurReached, setHasCurReached] = useState(false);
  const [hasLivReached, setHasLivReached] = useState(false);
  //modal livro
  const [livro,setLivro] = useState('')
  const [autor,setAutor] = useState('')
  const [preco,setPreco] = useState(0)
  const [img,setImg] = useState('')
  const [copia,setCopia] = useState('')

  const AbreModalLivro = () =>{
      setEstlivro(true)
      setOpenmodallivro(true)
  }

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
     setModal(true)
     /*scroll */
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasReached(true);
                    console.log('Element reached!');
                    if(estevento == true){//so carrega se estiver true
                    console.log('carreguei o load evento')
                    setEstevento(false)//caso nao seja acessado pelo click dispara pelo evento onscroll
                    }
                    // Fire your custom logic here
                }
            },
            {
                root: null, // uses the viewport
                threshold: 0.5, // triggers when 50% of the element is visible
            }
        );

        const observerpal = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasPalReached(true);
                    console.log('Element reached!');
                    if(estpalestra == true){//so carrega se estiver true
                        console.log('carreguei o load palestra')
                        setEstpalestra(false)//caso nao seja acessado pelo click dispara pelo evento onscroll
                    }
                    // Fire your custom logic here
                }
            },
            {
                root: null, // uses the viewport
                threshold: 0.5, // triggers when 50% of the element is visible
            }
        );

        const observercur = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasCurReached(true);
                    console.log('Element reached!');
                    if(estcurso == true){//so carrega se estiver true
                        console.log('carreguei o load curso')
                        setEstcurso(false)//caso nao seja acessado pelo click dispara pelo evento onscroll
                    }
                    // Fire your custom logic here
                }
            },
            {
                root: null, // uses the viewport
                threshold: 0.5, // triggers when 50% of the element is visible
            }
        );

        const observerliv = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasLivReached(true);
                    console.log('Element reached!');
                    if(estlivro == true){//so carrega se estiver true
                        console.log('carreguei o load livro')
                        setEstlivro(false)//caso nao seja acessado pelo click dispara pelo evento onscroll
                    }
                    // Fire your custom logic here
                }
            },
            {
                root: null, // uses the viewport
                threshold: 0.5, // triggers when 50% of the element is visible
            }
        );

        if (targetRef.current) {
           observer.observe(targetRef.current);
        }

        if (targetPalRef.current) {
           observerpal.observe(targetPalRef.current);
        }

        if (targetCurRef.current) {
           observercur.observe(targetCurRef.current);
        }

        if (targetLivRef.current) {
           observerliv.observe(targetLivRef.current);
        }

        return () => {
            if (targetRef.current) {
               observer.unobserve(targetRef.current);
            }
            if (targetPalRef.current) {
               observerpal.unobserve(targetPalRef.current);
            }
            if (targetCurRef.current) {
               observercur.unobserve(targetCurRef.current);
            }
            if (targetLivRef.current) {
               observerliv.unobserve(targetLivRef.current);
            }
        };
    /* scrool event */
  },[])

  const closeModal = () =>{
    setModal(false)
  }

  const closeModalCurso = () =>{
    setModalcurso(false)
  }

//   const ScLivraria = memo(function Child() {
//       console.log('Child ScLivraria rendered'+estlivro);
//       return(
//         <SectionLivraria estado={estlivro} open={AbreModalLivro}/>
//       )
//   },[estlivro]);

  return (
         <>
         <ModalProgramacao open={openmodal} close={closeModal} imagem={imagem}/>
         <ModalCursos open={openmodalcurso} close={closeModalCurso} dados={dadoscurso} publico={dadospublico}/>
         {/* <ModalQrCode livro={livro} autor={autor} valor={preco}  copia={copia} imagem={img} isOpen={openmodallivro} close={setOpenmodallivro}/> */}
         <Header clickevento={setEstevento} clickpalestra={setEstpalestra} opencursos={setModalcurso}/>
            <main class="main">
                <SectionOurStory mudatela={setTela}/>
                {/* <!-- Hero Section --> */}
                <SectionHero mudatela={setTela}/>
                {/* <!-- /Hero Section --> */}
                {/* <!-- About Section --> */}
                <SectionAbout/>
                {/* <!-- /About Section --> */}
                {/* <!-- Kardec Section --> */}
                <SectionKardec/>
                {/* <!-- /Kardec Section --> */}
                {/* <!-- Services Section --> */}
                <SectionServices tela={tela}/>
                {/* <!-- /Services Section --> */}
                {/* <!-- Why Us Section --> */}
                <SectionCarrosel/>
                <div ref={targetPalRef} style={{ background: hasPalReached ? 'white' : 'lightcoral', height: '1px' }}></div>
                <SectionPalestras estado={estpalestra}/>
                <SectionWhyUs/>
                {/* <!-- /Why Us Section --> */}
                {/* <!-- Portfolio Section --> */}
                <div ref={targetRef} style={{ background: hasReached ? 'white' : 'lightcoral', height: '1px' }}></div>
                <SectionEventos estado={estevento}/>
                <SectionPortifolio/>
                {/* <!-- /Portfolio Section --> */}
                {/* <!-- Testimonials Section --> */}
                <div ref={targetCurRef} style={{ background: hasCurReached ? 'white' : 'lightcoral', height: '1px' }}></div>
                <SectionCursos estado={estcurso} abremodal={setModalcurso} geradados={setDadoscurso} gerapublico={setDadospublico}/>
                <SectionTestimonials/>
                {/* <!-- /Testimonials Section --> */}
                {/* <!-- Team Section --> */}
                <SectionTeam/>
                {/* <!-- /Team Section --> */}
                {/* <!-- Pricing Section --> */}
                {/* <SectionPricing exibe={true}/> */}
                <div ref={targetLivRef} style={{ background: hasLivReached ? 'white' : 'lightcoral', height: '1px' }}></div>
                <SectionLivraria estado={estlivro} open={AbreModalLivro}/>
                {/* <!-- /Pricing Section --> */}
                {/* <!-- Faq Section --> */}
                <SectionVideos exibe={true}/>
                {/* <!-- /Faq Section --> */}
                {/* <!-- Faq Section --> */}
                {/* <SectionFaq exibe={false}/> */}
                {/* <!-- /Faq Section --> */}
                {/* <!-- Contact Section --> */}
                <SectionLocation/>
                <SectionContact path={imagem}/>
                {/* <!-- /Contact Section --> */}
            </main>
            <Footer/>
      </>
  )
}

export default Main
