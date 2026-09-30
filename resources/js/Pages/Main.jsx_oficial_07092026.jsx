import { React,useEffect, useState, useRef } from 'react';
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
import Carrosel from './componentes/Carrosel';
import ModalProgramacao from './componentes/ModalProgramacao';



// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Main = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  const [openmodal,setModal] = useState(false)
  const [tela,setTela] = useState(0)
  const [estevento,setEstevento] = useState(true)
  const [estpalestra,setEstpalestra] = useState(true)
  const targetRef = useRef(null);
  const targetPalRef = useRef(null);
  const [hasReached, setHasReached] = useState(false);


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

        if (targetRef.current) {
           observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
               observer.unobserve(targetRef.current);
            }
        };
    /* scrool event */
  },[])

  const closeModal = () =>{
    setModal(false)
  }

  return (
         <>
         <ModalProgramacao open={openmodal} close={closeModal} imagem={imagem}/>
         <Header clickevento={setEstevento} clickpalestra={setEstpalestra}/>
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
                <SectionWhyUs/>
                {/* <!-- /Why Us Section --> */}
                {/* <!-- Portfolio Section --> */}
                <div ref={targetRef} style={{ background: hasReached ? 'white' : 'lightcoral', height: '1px' }}></div>
                <SectionEventos estado={estevento}/>
                <SectionPalestras estado={estpalestra}/>
                <SectionPortifolio/>
                {/* <!-- /Portfolio Section --> */}
                {/* <!-- Testimonials Section --> */}
                <SectionTestimonials/>
                {/* <!-- /Testimonials Section --> */}
                {/* <!-- Team Section --> */}
                <SectionTeam/>
                {/* <!-- /Team Section --> */}
                {/* <!-- Pricing Section --> */}
                <SectionPricing exibe={true}/>
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
