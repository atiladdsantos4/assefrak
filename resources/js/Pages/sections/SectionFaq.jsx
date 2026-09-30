import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionFaq = (props) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const exibe = props.exibe ? '' : 'naoexibe'

  useEffect(() => {
       document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
          faqItem.addEventListener('click', () => {
             faqItem.parentNode.classList.toggle('faq-active');
          });
      });
  },[])

  return (
        <section id="faq" className={`faq section ${exibe}`}>

      {/* <!-- Section Title -->*/}
      <div className="container section-title" data-aos="fade-up">
        <h2>Perguntas Frequentes</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>{/* <!-- End Section Title -->*/}

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="faq-wrapper">
          <div className="faq-categories" data-aos="fade-right" data-aos-delay="150">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="category-card active" data-bs-toggle="tab" data-bs-target="#faq-general" type="button" role="tab" aria-selected="true">
                  <div className="category-icon">
                    <i className="bi bi-info-circle"></i>
                  </div>
                  <div className="category-info">
                    <h5>General</h5>
                    <span>5 questions</span>
                  </div>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="category-card" data-bs-toggle="tab" data-bs-target="#faq-billing" type="button" role="tab" aria-selected="false">
                  <div className="category-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>
                  <div className="category-info">
                    <h5>Billing</h5>
                    <span>4 questions</span>
                  </div>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="category-card" data-bs-toggle="tab" data-bs-target="#faq-technical" type="button" role="tab" aria-selected="false">
                  <div className="category-icon">
                    <i className="bi bi-gear"></i>
                  </div>
                  <div className="category-info">
                    <h5>Technical</h5>
                    <span>6 questions</span>
                  </div>
                </button>
              </li>
            </ul>
            <div className="help-box">
              <div className="help-icon">
                <i className="bi bi-headset"></i>
              </div>
              <h4>Still need help?</h4>
              <p>Donec sollicitudin molestie malesuada pellentesque.</p>
              <a href="#contact" className="help-link">
                Get in Touch
                <i className="bi bi-arrow-right-circle"></i>
              </a>
            </div>
          </div>

          <div className="faq-content-area" data-aos="fade-left" data-aos-delay="200">
            <div className="faq-header-info">
              <span className="questions-count">15+ Questions Answered</span>
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search questions..."/>
              </div>
            </div>

            <div className="tab-content">
              {/* <!-- General Tab -->*/}
              <div className="tab-pane fade show active" id="faq-general" role="tabpanel">
                <div className="faq-list">
                  <div className="faq-item faq-active" data-aos="zoom-in" data-aos-delay="250">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Vivamus suscipit tortor eget felis porttitor volutpat?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Curabitur arcu erat accumsan id imperdiet et porttitor at sem. Donec rutrum congue leo eget malesuada vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Praesent sapien massa convallis a pellentesque nec egestas non nisi vivamus magna.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="300">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Nulla quis lorem ut libero malesuada feugiat proin?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Nulla porttitor accumsan tincidunt mauris blandit aliquet elit eget tincidunt nibh pulvinar a cras ultricies ligula sed magna dictum porta. Vivamus suscipit tortor eget felis porttitor volutpat sed porttitor lectus nibh.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="350">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Quisque velit nisi pretium ut lacinia elementum?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Quisque velit nisi pretium ut lacinia in elementum id enim vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada pellentesque in ipsum id orci porta dapibus.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="400">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Mauris blandit aliquet elit eget tincidunt nibh?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="450">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Cras ultricies ligula sed magna dictum porta?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}
                </div>
              </div>{/* <!-- End General Tab -->*/}

              {/* <!-- Billing Tab -->*/}
              <div className="tab-pane fade" id="faq-billing" role="tabpanel">
                <div className="faq-list">
                  <div className="faq-item faq-active" data-aos="zoom-in" data-aos-delay="250">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Pellentesque habitant morbi tristique senectus?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Proin ac nunc at felis tristique condimentum sit amet vel risus. Morbi vestibulum sapien nec magna ultrices lacinia sed vitae mauris convallis pretium.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="300">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Aenean commodo ligula eget dolor massa?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Donec quam felis ultricies nec pellentesque eu pretium quis sem. Nulla consequat massa quis enim vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae sed cursus mauris.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="350">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Etiam ultricies nisi vel augue curabitur?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero sit amet adipiscing sem neque sed ipsum. Nam quam nunc blandit vel luctus pulvinar hendrerit id lorem praesent.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="400">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Integer tincidunt cras dapibus vivamus elementum?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum aenean imperdiet etiam ultricies nisi vel augue curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}
                </div>
              </div>{/* <!-- End Billing Tab -->*/}

              {/* <!-- Technical Tab -->*/}
              <div className="tab-pane fade" id="faq-technical" role="tabpanel">
                <div className="faq-list">
                  <div className="faq-item faq-active" data-aos="zoom-in" data-aos-delay="250">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Fusce vulputate eleifend sapien vestibulum purus?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Aenean leo ligula porttitor eu consequat vitae eleifend ac enim. Aliquam lorem ante dapibus in viverra quis feugiat a tellus phasellus viverra nulla ut metus varius laoreet quisque rutrum.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="300">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Nam eget dui etiam rhoncus maecenas tempus?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Nullam dictum felis eu pede mollis pretium integer tincidunt cras dapibus. Vivamus elementum semper nisi aenean vulputate eleifend tellus aenean leo ligula porttitor eu consequat vitae eleifend.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="350">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Donec vitae sapien ut libero venenatis faucibus?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Nullam quis ante etiam sit amet orci eget eros faucibus tincidunt duis leo sed fringilla mauris sit amet nibh. Donec sodales sagittis magna sed consequat leo eget bibendum sodales.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="400">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Suspendisse potenti in eleifend quam adipiscing?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>In enim justo rhoncus ut imperdiet a venenatis vitae justo. Nullam dictum felis eu pede mollis pretium integer tincidunt cras dapibus vivamus elementum semper nisi aenean vulputate eleifend tellus.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="450">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Praesent porttitor metus sit amet congue interdum?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Sed consequat leo eget bibendum sodales augue velit cursus nunc quis gravida magna mi a libero. Fusce vulputate eleifend sapien vestibulum purus quam scelerisque ut mollis sed.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}

                  <div className="faq-item" data-aos="zoom-in" data-aos-delay="500">
                    <h3 className="faq-question">
                      <span className="question-icon"><i className="bi bi-question-circle"></i></span>
                      Morbi nec metus phasellus blandit leo ut odio?
                      <span className="toggle-icon"><i className="bi bi-chevron-down"></i></span>
                    </h3>
                    <div className="faq-answer">
                      <p>Maecenas nec odio et ante tincidunt tempus donec vitae sapien ut libero venenatis faucibus. Nullam quis ante etiam sit amet orci eget eros faucibus tincidunt duis leo sed fringilla mauris.</p>
                    </div>
                  </div>{/* <!-- End FAQ Item -->*/}
                </div>
              </div>{/* <!-- End Technical Tab -->*/}
            </div>
          </div>
        </div>

      </div>

    </section>


  )
}
export default SectionFaq
