import { React,useEffect } from 'react';
// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const FooterAdmin = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  useEffect(() => {
     document.documentElement.setAttribute('data-coreui-theme', theme_light);
  })

  return (
     <footer id="footer" class="footer dark-background" style={{zIndex:'10'}}>
        <div class="footer-bottom">
            <div class="container">
                <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="copyright">
                    <p>© <span>Copyright</span> <strong class="px-1 sitename"><span style={{color:'#6895C1'}}>Assefrak</span></strong> <span>Todos Direitos Reservados</span></p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                    </div>
                    <div class="credits">
                    Designed by <a href="https://bootstrapmade.com/">Átila Santos</a> | <a href="https://bootstrapmade.com/tools/">DevTools</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
     </footer>
  )
}
export default FooterAdmin
