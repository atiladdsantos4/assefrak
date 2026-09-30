import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionPortifolio = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  useEffect(() => {
   /**
   * Init isotope layout and filters
   */
        document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
            let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
            let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
            let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

            let initIsotope;
            imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
            initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
                itemSelector: '.isotope-item',
                layoutMode: layout,
                filter: filter,
                sortBy: sort
            });
            });

            isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
            filters.addEventListener('click', function() {
                isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
                this.classList.add('filter-active');
                initIsotope.arrange({
                filter: this.getAttribute('data-filter')
                });
                if (typeof aosInit === 'function') {
                aosInit();
                }
            }, false);
            });

        });
  })

  return (
     <section id="portfolio" class="portfolio section">

      {/* <!-- Section Title --> */}
      <div class="container section-title" data-aos="fade-up">
        <h2>Portfólio</h2>
        <p>Banners Diversos</p>
      </div>{/* <!-- End Section Title --> */}

      <div class="container">

        <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

          <div class="filter-header" data-aos="fade-up" data-aos-delay="100">
            <ul class="portfolio-filters isotope-filters">
              <li data-filter="*" class="filter-active">Tudo</li>
              <li data-filter=".filter-certificado">Certificado</li>
              <li data-filter=".filter-campanha">Campanhas</li>
              <li data-filter=".filter-web">Web</li>
              <li data-filter=".filter-branding">Branding</li>
              <li data-filter=".filter-campaign">Campaign</li>
              <li data-filter=".filter-print">Print</li>
            </ul>
          </div>{/* <!-- End Filter Header --> */}

          <div class="row g-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-web">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/doacao.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/doacao.png'} target='_blank' title="Doações Platform" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Web</span>
                  <h4 class="portfolio-title">Doações</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}
            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-certificado">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/certificado.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/certificado.png'} target='_blank' title="Digital Platform" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Certificados</span>
                  <h4 class="portfolio-title">Certificado</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campanha">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/agosto_lilas.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/agosto_lilas.png'} target='_blank' title="Campanha Agosto Lilás" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campanha</span>
                  <h4 class="portfolio-title">Agosto Lilás</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campanha">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/bazar.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/bazar.png'} target='_blank' title="Campanha Agosto Lilás" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campanha</span>
                  <h4 class="portfolio-title">Bazar</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campanha">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/preces.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/preces.png'} target='_blank' title="Grupo de Irradiação" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campanha</span>
                  <h4 class="portfolio-title">Grupo de Irradiação</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campanha">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'carrosel/projeto_cesta.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'carrosel/projeto_cesta.png'} target='_blank' title="Digital Platform" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campanha</span>
                  <h4 class="portfolio-title">Cestas Básicas</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-web">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-3.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-3.webp'} target='_blank' title="Digital Platform" data-gallery="portfolio-gallery-web" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Web</span>
                  <h4 class="portfolio-title">Integração Social</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campanha">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'carrosel/projeto_sementes.png'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'carrosel/projeto_sementes.png'} target='_blank' title="Digital Platform" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campanha</span>
                  <h4 class="portfolio-title">Sementes do Amanhã</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}


            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campaign">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-11.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-11.webp'} target='_blank' title="Launch Strategy" data-gallery="portfolio-gallery-campaign" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campaign</span>
                  <h4 class="portfolio-title">Launch Strategy</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-print">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-5.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio/portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-5.webp'} target='_blank' title="Editorial Design" data-gallery="portfolio-gallery-print" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Print</span>
                  <h4 class="portfolio-title">Editorial Design</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-web">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-1.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-1.webp'} target='_blank' title="Interface System" data-gallery="portfolio-gallery-web" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Web Design</span>
                  <h4 class="portfolio-title">Interface System</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-branding">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-9.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-9.webp'} target='_blank' title="Brand Refresh" data-gallery="portfolio-gallery-branding" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Branding</span>
                  <h4 class="portfolio-title">Brand Refresh</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-campaign">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-2.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-2.webp'} target='_blank' title="Market Expansion" data-gallery="portfolio-gallery-campaign" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Campaign</span>
                  <h4 class="portfolio-title">Market Expansion</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

            <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-print">
              <div class="portfolio-card">
                <div class="portfolio-image">
                  <img src={imagem+'portfolio/portfolio-6.webp'} class="img-fluid" alt="" loading="lazy"></img>
                  <div class="portfolio-overlay">
                    <div class="overlay-actions">
                      <a href={imagem+'portfolio/portfolio-6.webp'} target='_blank' title="Publication Series" data-gallery="portfolio-gallery-print" class="glightbox action-btn"><i class="bi bi-arrows-fullscreen"></i></a>
                      <a href="portfolio-details.html" target='_blank' title="View Project" class="action-btn"><i class="bi bi-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-content">
                  <span class="portfolio-category">Print</span>
                  <h4 class="portfolio-title">Publication Series</h4>
                </div>
              </div>
            </div>{/* <!-- End Portfolio Item --> */}

          </div>{/* <!-- End Portfolio Container --> */}

          {/* <div class="portfolio-cta" data-aos="fade-up" data-aos-delay="300">
            <a href="portfolio.html" class="view-all-link">View All Projects <i class="bi bi-arrow-right"></i></a>
          </div> */}

        </div>

      </div>

    </section>

  )
}
export default SectionPortifolio
