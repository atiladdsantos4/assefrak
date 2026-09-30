import { React,useEffect } from 'react';
import SwiperComp from '../componentes/SwiperComp';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionCarrosel = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  useEffect(() => {
    const handleResize = () => {
        const viewportWidth = window.innerWidth;
        console.log('largura'+viewportWidth)
        let obj = null
        if(viewportWidth < 700){
           obj = document.getElementById('btn-app')
           obj.href="https://api.whatsapp.com/send/?phone=+5571987507658&text=Quero mais infomações&type=phone_number&app_absent=0"
        } else {
           obj = document.getElementById('btn-app')
           obj.href="https://web.whatsapp.com/send?phone=+5571987507658&text=Olá"
           obj.target="_blank"
        }
        //setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])


  return (
    <section id="mural" class="hero section light-background">

      <div class="container section-title" data-aos="fade-up">
        <h2>Mural de Informações</h2>
        <p>Nosso Mural</p>
      </div>
      <div class="container">
           <SwiperComp path={imagem}/>
        </div>

    </section>
  )
}
export default SectionCarrosel
