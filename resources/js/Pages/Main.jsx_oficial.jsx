import { React,useEffect } from 'react';
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

// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Main = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (

      <html lang="en">

        <head>

            <meta charset="utf-8"></meta>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"></meta>


            {/* <!-- Favicons --> */}
            <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon"></link>




        </head>
        <body class="index-page">
            <Header/>
            <main class="main">
                {/* <!-- Hero Section --> */}
                <SectionHero/>
                {/* <!-- /Hero Section --> */}
                {/* <!-- About Section --> */}
                <SectionAbout/>
                {/* <!-- /About Section --> */}
                {/* <!-- Services Section --> */}
                <SectionServices/>
                {/* <!-- /Services Section --> */}
                {/* <!-- Why Us Section --> */}
                <SectionWhyUs/>
                {/* <!-- /Why Us Section --> */}
                {/* <!-- Portfolio Section --> */}
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
                <SectionFaq exibe={true}/>
                {/* <!-- /Faq Section --> */}
                {/* <!-- Contact Section --> */}
                <SectionContact/>
                {/* <!-- /Contact Section --> */}
            </main>
            <Footer/>
        </body>
    </html>
  )
}

export default Main
