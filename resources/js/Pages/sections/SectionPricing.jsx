import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionPricing = ( props ) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const exibe = props.exibe ? '' : 'naoexibe'

  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
    <section id="pricing" className={`pricing section ${exibe}`}>

      {/*<!-- Section Title --> */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Livraria</h2>
        <p>Logo abaixo o nosso acervo</p>
      </div>{/*<!-- End Section Title --> */}

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row g-4 justify-content-center">

          {/*<!-- Essential Plan --> */}
          <div className="col-lg-4 col-md-6" data-aos="fade-right" data-aos-delay="150">
            <div className="pricing-card">
              <div className="card-header">
                <span className="plan-icon"><i className="bi bi-star"></i></span>
                <h3 className="plan-title">Essential</h3>
                <p className="plan-subtitle">Perfect for individuals</p>
              </div>
              <div className="card-body">
                <div className="price-wrapper">
                  <span className="currency">$</span>
                  <span className="amount monthly-price">24</span>
                  <span className="amount annual-price">19</span>
                  <span className="period">/mo</span>
                </div>
                <p className="billing-info monthly-billing">Charged each month</p>
                <p className="billing-info annual-billing">$228 billed annually</p>
                <ul className="feature-list">
                  <li><i className="bi bi-check-circle-fill"></i> 3 active projects</li>
                  <li><i className="bi bi-check-circle-fill"></i> 5 GB secure storage</li>
                  <li><i className="bi bi-check-circle-fill"></i> Email assistance</li>
                  <li><i className="bi bi-check-circle-fill"></i> Standard reports</li>
                </ul>
                <a href="#" className="btn-pricing">Choose Essential</a>
              </div>
            </div>
          </div>{/*<!-- End Essential Plan --> */}

          {/*<!-- Growth Plan (Highlighted) --> */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="pricing-card highlighted">
              <div className="card-header">
                <span className="plan-icon"><i className="bi bi-gem"></i></span>
                <h3 className="plan-title">Growth</h3>
                <p className="plan-subtitle">Ideal for growing teams</p>
              </div>
              <div className="card-body">
                <div className="price-wrapper">
                  <span className="currency">$</span>
                  <span className="amount monthly-price">59</span>
                  <span className="amount annual-price">47</span>
                  <span className="period">/mo</span>
                </div>
                <p className="billing-info monthly-billing">Charged each month</p>
                <p className="billing-info annual-billing">$564 billed annually</p>
                <ul className="feature-list">
                  <li><i className="bi bi-check-circle-fill"></i> Unlimited projects</li>
                  <li><i className="bi bi-check-circle-fill"></i> 50 GB secure storage</li>
                  <li><i className="bi bi-check-circle-fill"></i> Live chat support</li>
                  <li><i className="bi bi-check-circle-fill"></i> Advanced analytics</li>
                  <li><i className="bi bi-check-circle-fill"></i> API access</li>
                  <li><i className="bi bi-check-circle-fill"></i> Team workspaces</li>
                </ul>
                <a href="#" className="btn-pricing">Begin Free Trial</a>
                <span className="trial-note">7 days free, no card required</span>
              </div>
            </div>
          </div>{/*<!-- End Growth Plan --> */}

          {/*<!-- Business Plan --> */}
          <div className="col-lg-4 col-md-6" data-aos="fade-left" data-aos-delay="250">
            <div className="pricing-card">
              <div className="card-header">
                <span className="plan-icon"><i className="bi bi-briefcase"></i></span>
                <h3 className="plan-title">Business</h3>
                <p className="plan-subtitle">For large organizations</p>
              </div>
              <div className="card-body">
                <div className="price-wrapper custom-pricing">
                  <span className="custom-text">Let's Talk</span>
                </div>
                <p className="billing-info">Customized for your needs</p>
                <ul className="feature-list">
                  <li><i className="bi bi-check-circle-fill"></i> All Growth features</li>
                  <li><i className="bi bi-check-circle-fill"></i> Unlimited storage</li>
                  <li><i className="bi bi-check-circle-fill"></i> Dedicated support rep</li>
                  <li><i className="bi bi-check-circle-fill"></i> Custom integrations</li>
                  <li><i className="bi bi-check-circle-fill"></i> Enterprise SLA</li>
                </ul>
                <a href="#" className="btn-pricing">Request Demo</a>
              </div>
            </div>
          </div>{/*<!-- End Business Plan --> */}

        </div>

        <div className="security-badges" data-aos="zoom-in" data-aos-delay="300">
          <div className="badge-item">
            <i className="bi bi-lock-fill"></i>
            <div className="badge-content">
              <strong>256-bit Encryption</strong>
              <span>Bank-level security</span>
            </div>
          </div>
          <div className="badge-item">
            <i className="bi bi-graph-up-arrow"></i>
            <div className="badge-content">
              <strong>99.99% Uptime</strong>
              <span>Reliable service</span>
            </div>
          </div>
          <div className="badge-item">
            <i className="bi bi-clock-history"></i>
            <div className="badge-content">
              <strong>Hourly Backups</strong>
              <span>Data protection</span>
            </div>
          </div>
          <div className="badge-item">
            <i className="bi bi-globe2"></i>
            <div className="badge-content">
              <strong>SOC 2 Certified</strong>
              <span>Industry compliant</span>
            </div>
          </div>
        </div>

        <div className="help-links" data-aos="fade-up" data-aos-delay="350">
          <a href="#"><i className="bi bi-list-columns-reverse"></i> View Comparison</a>
          <a href="#"><i className="bi bi-question-circle"></i> Questions &amp; Answers</a>
          <a href="#"><i className="bi bi-headset"></i> Contact Support</a>
        </div>

      </div>

    </section>

  )
}
export default SectionPricing
