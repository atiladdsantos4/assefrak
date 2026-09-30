import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionHero = (props) => {
  const {mudatela} = props
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  useEffect(() => {
    const handleResize = () => {
        const viewportWidth = window.innerWidth;
        mudatela(viewportWidth)
        console.log('largura'+viewportWidth)
        let obj = null
        if(viewportWidth < 700){
           obj = document.getElementById('btn-app')
           obj.href="https://api.whatsapp.com/send/?phone=+5571987507658&text=Quero mais infomações&type=phone_number&app_absent=0"
        //    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
        //         faqItem.addEventListener('click', () => {
        //         faqItem.parentNode.classList.toggle('faq-active');
        //         });
        //    });

        } else {
           obj = document.getElementById('btn-app')
           //obj = document.getElementsByClassName('btn-contact')
           obj.href="https://web.whatsapp.com/send?phone=+5571987507658&text=Olá"
           obj.target="_blank"
        //    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
        //         faqItem.addEventListener('click', () => {
        //           faqItem.parentNode.classList.toggle('faq-active');
        //         });
        //    });

        }
        //setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])


  return (
    <section id="hero" class="hero section light-background">

        <div class="container">

            <div class="row">

            <div class="col-12" data-aos="fade-down">

                <div class="hero-header">
                <h1>Para o coração que está cansado a<span class="highlight">{' '}Assefrak</span> é o hospital de sua Alma</h1>
                </div>

            </div>{/*<!-- End Header Column --> */}

            </div>

            <div class="row g-4 mt-4">

            <div class="col-lg-7" data-aos="fade-up" data-aos-delay="100">

                <div class="media-block">
                    <img src={imagem+'preces.png'}  alt="Creative Digital Solutions" class="img-fluid"></img>
                    <div class="overlay-content">
                        <div class="stats-item">
                            <span class="number">6000+</span>
                            <span class="label">Pessoas Acolhidas</span>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- End Media Column --> */}

            <div class="col-lg-5" data-aos="fade-up" data-aos-delay="200">

                <div class="info-block">
                <p class="lead-text">Seu coração está cansado? O centro espírita é um hospital de almas. Oferecemos atendimento fraterno, passes e tratamento espiritual e escuta amiga para aliviar suas dores com muito amor e respeito. Venha receber um abraço espiritual.</p>

                <ul class="feature-list">
                    <li><i class="bi bi-check-circle-fill"></i> Atendimento Fraterno</li>
                    <li><i class="bi bi-check-circle-fill"></i> Passes Magnétticos</li>
                    <li><i class="bi bi-check-circle-fill"></i> Passes Espirituais</li>
                    <li><i class="bi bi-check-circle-fill"></i> Reuniões Doutrinárias</li>
                </ul>

                <div class="action-row">
                    <a href="#services" class="btn-get-started">Ver Serviços</a>
                    <a href="" id="btn-app" class="btn-contact">
                    <i class="bi bi-whatsapp" style={{color:'green'}}></i>
                    <span>Marque uma Vista</span>
                    </a>
                </div>
                </div>

            </div>
            {/* <!-- End Info Column --> */}

            </div>

        </div>

    </section>
  )
}
export default SectionHero
