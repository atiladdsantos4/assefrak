import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionKardec = ({ appName }) => {
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
      <section id="allan" class="about section">

      {/* <!-- Section Title --> */}
      <div class="container section-title" data-aos="fade-up">
        <h2>Allan Kardec</h2>
        {/* <p>Centro Espírita localizado em Camaçari</p> */}
      </div>
      {/* <!-- End Section Title --> */}

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div className='row'>
           <div className='col-md-4'>
                <img src={imagem+'allan_kardec.jpg'} style={{width:'105%',borderRadius:'15px'}} alt="Professional team collaboration" class="img-fluid" loading="lazy"></img>
           </div>
           <div className='col-md-8'>
              <div class="info-panel" style={{position:'relative',left:'-10px'}} data-aos="fade-up" data-aos-delay="300">
                <div class="panel-header">
                    <span class="tagline">Sua História</span>
                    <h2>Hippolyte Léon Denizard Rivail</h2>
                </div>
                <p class="description">
                    O pseudônimo "Allan Kardec", segundo biografias, foi adotado pelo Prof. Rivail a fim de diferenciar a Codificação Espírita dos seus trabalhos pedagógicos anteriores. Segundo algumas fontes, o pseudônimo foi escolhido pois um espírito revelou-lhe que haviam vivido juntos entre os druidas, na Gália, e que então o Codificador se chamava "Allan Kardec".
                    Conforme o seu próprio depoimento, publicado em Obras Póstumas, foi em 1854 que o Prof. Rivail ouviu falar pela primeira vez do fenômeno das "mesas girantes", bastante difundido à época, através do seu amigo Fortier, um magnetizador de longa data. Sem dar muita atenção ao relato naquele momento, atribuindo-o somente ao chamado magnetismo animal de que era estudioso, só em maio de 1855 sua curiosidade se voltou efetivamente para as mesas, quando começou a frequentar reuniões em que tais fenômenos se produziam.
                    Durante este período, também tomou conhecimento do fenômeno da escrita mediúnica - ou psicografia, e assim passou a se comunicar com os espíritos. Um desses espíritos, conhecido como um "espírito familiar", passa a orientar os seus trabalhos. Mais tarde, este espírito iria lhe informar que já o conhecia no tempo das Gálias, com o nome de Allan Kardec. Assim, Rivail passa a adotar este pseudônimo, sob o qual publicou as obras que sintetizam as leis da Doutrina Espírita.
                 </p>
              </div>
           </div>
        </div>
    </div>

    </section>
  )
}
export default SectionKardec
