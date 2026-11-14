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
    setModal(true);

    const targets = [
        { ref: targetRef, set: setEstevento, reached: setHasReached, name: 'evento' },
        { ref: targetPalRef, set: setEstpalestra, reached: setHasPalReached, name: 'palestra' },
        { ref: targetCurRef, set: setEstcurso, reached: setHasCurReached, name: 'curso' },
        { ref: targetLivRef, set: setEstlivro, reached: setHasLivReached, name: 'livro' }
    ];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = targets.find(item => item.ref.current === entry.target);

                    if (target) {
                        target.reached(true);
                        target.set(false);
                        console.log('carreguei:', target.name);
                    }
                }
            });
        },
        {
            root: null,
            threshold: 0.5
        }
    );

    targets.forEach(({ ref }) => {
        if (ref.current) {
            observer.observe(ref.current);
        }
    });

    return () => observer.disconnect();

}, []);

  const closeModal = () =>{
    setModal(false)
  }

  const closeModalCurso = () =>{
    setModalcurso(false)
  }


  return (
         <>
         <ModalProgramacao open={openmodal} close={closeModal} imagem={imagem}/>
         <ModalCursos open={openmodalcurso} close={closeModalCurso} dados={dadoscurso} publico={dadospublico}/>
         {/* <ModalQrCode livro={livro} autor={autor} valor={preco}  copia={copia} imagem={img} isOpen={openmodallivro} close={setOpenmodallivro}/> */}
         <Header clickevento={setEstevento} clickpalestra={setEstpalestra} opencursos={setModalcurso}/>
            <main className="main">
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
