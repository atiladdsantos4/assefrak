import { React,useEffect, useState } from 'react';
import {CAlert, CSpinner,CForm, CRow, CBadge, CCol, CButton, CModal, CModalHeader, CModalTitle, CModalFooter,CModalBody, CInputGroup, CInputGroupText, CFormInput, CFormSelect, CFormTextarea  } from '@coreui/react';

// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const SectionLocation = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const [showAlert,setShowAlert] = useState(false)
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  async function writeClipboardText(event) {
    event.preventDefault()
    var text = document.getElementById('idcopia').value;
    if (navigator.clipboard && window.isSecureContext) {
        //var copyText = document.getElementById('idvalor');
        // Standard modern Clipboard API
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        // Prevent scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          setShowAlert(true)
          document.execCommand('copy');
          setTimeout(() => {
             setShowAlert(false)
          }, 2000);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  }

  return (
    <section id="localizacao" class="campus-facilities section">
        <div class="container section-title" data-aos="fade-up">
            <h2>Nossa Localização</h2>
            <p>Como chegar até Nós</p>
        </div>

        <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="map-integration" data-aos="fade-up" data-aos-delay="100">
            <div class="row">
                <div class="col-lg-4" data-aos="fade-right" data-aos-delay="200">
                    <div class="map-sidebar">
                    <h3>Venha Até Nós</h3>
                    <div class="location-categories">
                    <div class="category-filter active" data-category="all">
                        <i class="bi bi-grid"></i>
                        <span>All Locations</span>
                    </div>
                    <CAlert color="info" visible={showAlert} variant="solid">
                       Link Copiado
                    </CAlert>
                    {/* <div class="category-filter" data-category="academic">
                        <i class="bi bi-book"></i>
                        <span>Academic</span>
                    </div>
                    <div class="category-filter" data-category="dining">
                        <i class="bi bi-cup-hot"></i>
                        <span>Dining</span>
                    </div>
                    <div class="category-filter" data-category="parking">
                        <i class="bi bi-car-front"></i>
                        <span>Parking</span>
                    </div>
                    <div class="category-filter" data-category="recreation">
                        <i class="bi bi-activity"></i>
                        <span>Recreation</span>
                    </div> */}
                    </div>

                    <div class="map-actions">
                    <a href="#" class="action-link" style={{fontSize:'13px'}} onClick={(e)=>writeClipboardText(e)}>
                        <i class="bi bi-geo-alt-fill" style={{color:'red'}}></i>
                        https://maps.app.goo.gl/YXySAA9NELYmuAPy9
                        <input type="hidden" id="idcopia" value="https://maps.app.goo.gl/YXySAA9NELYmuAPy9"/>
                    </a>
                    <a href="#" class="action-link">
                        <i class="bi bi-phone"></i>
                        Campus Shuttle Info
                    </a>
                    <a href="#" class="action-link">
                        <i class="bi bi-car-front"></i>
                        Parking Information
                    </a>
                    </div>
                </div>
                </div>
                <div class="col-lg-8" data-aos="fade-left" data-aos-delay="300">
                <div class="map-embed">
                    <div class="ratio ratio-4x3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.6528733741607!2d-38.32405979359638!3d-12.709158381122778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71669de631a4695%3A0x3292f43c775241a7!2sR.%20da%20Ambr%C3%B3sia%2C%20166%20-%20Dois%20de%20Julho%2C%20Cama%C3%A7ari%20-%20BA%2C%2042800-970!5e0!3m2!1spt-BR!2sbr!4v1788484211726!5m2!1spt-BR!2sbr" width="600" height="450" style={{border:'0px'}} allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>
                    <div class="map-overlay-info">
                    <div class="info-card">
                        <h5>Nossa Sede</h5>
                        <p>Rua da Ambrosia, Nº 183, Próximo a Arena 2 de Julho<br/> Camaçari, Bahia</p>
                        {/* <div class="quick-stats">
                        <span><i class="bi bi-geo-alt"></i> 32 Acres</span>
                        <span><i class="bi bi-building"></i> 17 Buildings</span>
                        </div> */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>


    </section>

  )
}
export default SectionLocation
