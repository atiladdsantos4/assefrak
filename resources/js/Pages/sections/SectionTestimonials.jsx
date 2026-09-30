import { React,useEffect } from 'react';
import FunJson from '../componentes/FunJson';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionTestimonials = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
      <section id="testimonials" class="testimonials section dark-background">

      {/* <--  Section Title --> */}
      <div class="container section-title" data-aos="fade-up">
        <h2>Testemunhos</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>{/* <--  End Section Title --> */}

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="testimonials-slider swiper init-swiper">
          <FunJson/>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="testimonial-item" data-aos="fade-up" data-aos-delay="100">
                <div class="testimonial-quote">
                  <i class="bi bi-quote"></i>
                </div>
                <p class="testimonial-text">Adipiscing elit tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam nostrud exercitation ullamco laboris consequat.</p>
                <div class="stars-rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <div class="testimonial-author">
                  <div class="author-image">
                    <img src={imagem+'person/person-f-3.webp'} alt="Profile Image"></img>
                  </div>
                  <div class="author-details">
                    <h4>Sophia Anderson</h4>
                    <span>Creative Director</span>
                    <div class="company-info">
                      <i class="bi bi-briefcase-fill"></i>
                      <span>DesignHub</span>
                    </div>
                  </div>
                  <div class="verified-icon">
                    <i class="bi bi-patch-check-fill"></i>
                  </div>
                </div>
              </div>
            </div>{/* <--  End testimonial item --> */}

            <div class="swiper-slide">
              <div class="testimonial-item" data-aos="fade-up" data-aos-delay="200">
                <div class="testimonial-quote">
                  <i class="bi bi-quote"></i>
                </div>
                <p class="testimonial-text">Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat proident.</p>
                <div class="stars-rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <div class="testimonial-author">
                  <div class="author-image">
                    <img src={imagem+'person/person-m-7.webp'} alt="Profile Image"></img>
                  </div>
                  <div class="author-details">
                    <h4>Marcus Thompson</h4>
                    <span>Software Architect</span>
                    <div class="company-info">
                      <i class="bi bi-briefcase-fill"></i>
                      <span>CloudSystems</span>
                    </div>
                  </div>
                  <div class="verified-icon">
                    <i class="bi bi-patch-check-fill"></i>
                  </div>
                </div>
              </div>
            </div>{/* <--  End testimonial item --> */}

            <div class="swiper-slide">
              <div class="testimonial-item" data-aos="fade-up" data-aos-delay="300">
                <div class="testimonial-quote">
                  <i class="bi bi-quote"></i>
                </div>
                <p class="testimonial-text">Consectetur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliqua enim veniam quis nostrud exercitation ullamco laboris.</p>
                <div class="stars-rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <div class="testimonial-author">
                  <div class="author-image">
                    <img src={imagem+'person/person-f-9.webp'} alt="Profile Image"></img>
                  </div>
                  <div class="author-details">
                    <h4>Elena Kowalski</h4>
                    <span>Brand Strategist</span>
                    <div class="company-info">
                      <i class="bi bi-briefcase-fill"></i>
                      <span>MediaPulse</span>
                    </div>
                  </div>
                  <div class="verified-icon">
                    <i class="bi bi-patch-check-fill"></i>
                  </div>
                </div>
              </div>
            </div>{/* <--  End testimonial item --> */}

            <div class="swiper-slide">
              <div class="testimonial-item" data-aos="fade-up" data-aos-delay="100">
                <div class="testimonial-quote">
                  <i class="bi bi-quote"></i>
                </div>
                <p class="testimonial-text">Lorem ipsum dolor sit amet elit sed tempor incididunt labore dolore magna aliqua enim minim veniam nostrud exercitation commodo.</p>
                <div class="stars-rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <div class="testimonial-author">
                  <div class="author-image">
                    <img src={imagem+'person/person-m-4.webp'} alt="Profile Image"></img>
                  </div>
                  <div class="author-details">
                    <h4>Daniel Okonkwo</h4>
                    <span>Data Analyst</span>
                    <div class="company-info">
                      <i class="bi bi-briefcase-fill"></i>
                      <span>InsightFlow</span>
                    </div>
                  </div>
                  <div class="verified-icon">
                    <i class="bi bi-patch-check-fill"></i>
                  </div>
                </div>
              </div>
            </div>{/* <--  End testimonial item --> */}

            <div class="swiper-slide">
              <div class="testimonial-item" data-aos="fade-up" data-aos-delay="200">
                <div class="testimonial-quote">
                  <i class="bi bi-quote"></i>
                </div>
                <p class="testimonial-text">Ullamco laboris nisi aliquip commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum dolore fugiat nulla.</p>
                <div class="stars-rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <div class="testimonial-author">
                  <div class="author-image">
                    <img src={imagem+'person/person-f-14.webp'} alt="Profile Image"></img>
                  </div>
                  <div class="author-details">
                    <h4>Victoria Nguyen</h4>
                    <span>Operations Manager</span>
                    <div class="company-info">
                      <i class="bi bi-briefcase-fill"></i>
                      <span>ScalePro</span>
                    </div>
                  </div>
                  <div class="verified-icon">
                    <i class="bi bi-patch-check-fill"></i>
                  </div>
                </div>
              </div>
            </div>{/* <--  End testimonial item --> */}
          </div>
          <div class="swiper-navigation-wrapper">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>

      </div>

    </section>

  )
}
export default SectionTestimonials
