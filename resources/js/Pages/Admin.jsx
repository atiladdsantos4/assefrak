import { React, useEffect, useState, Suspense,lazy } from 'react';
import Footer from './componentes/Footer';
import HeaderAdmin from './componentes/HeaderAdmin';
import Acolhido from './cadastros/Acolhido';
import Passe from './cadastros/Passe';
import ListaAcolhidos from './listagem/ListaAcolhidos';
import ListaPasses from './listagem/ListaPasses';
import ListaFocoEnergetico from './listagem/ListaFocoEnergetico';
import FocoEnergetico from './cadastros/FocoEnergetico';
import CondicaoEnergetica from './cadastros/CondicaoEnergetica';
import ListaCondicaoEnergetica from './listagem/ListaCondicaoEnergetica';
import ListaFortalecimento from './listagem/ListaFortalecimento';
import Fortalecimento from './cadastros/Fortalecimento';
import ListaLimpeza from './listagem/ListaLimpeza';
import Limpeza from './cadastros/Limpeza';
import Alerta from './cadastros/Alerta';
import ListaAlerta from './listagem/ListaAlerta';
import TipoTratamento from './cadastros/TipoTratamento';
import ListaTipoTratamento from './listagem/ListaTipoTratamento';
import Ficha from './cadastros/Ficha';
import Colaborador from './cadastros/Colaborador';
import ListaColaboradores from './listagem/ListaColaboradores';
import Tratamento from './cadastros/Tratamento';
import ListaTratamentos from './listagem/ListaTratamentos';
import Ocupacao from './cadastros/Ocupacao';
import ListaOcupacao from './listagem/ListaOcupacao';
import ControlePresenca from './cadastros/ControlePresenca';
import ListaPublicoFoco from './listagem/ListaPublicoFoco';
import PubicoFoco from './cadastros/PublicoFoco';
import Evento from './cadastros/Evento';
import ListaEventos from './listagem/ListaEventos';
import ListaCategoriaEvento from './listagem/ListaCategoriaEvento';
import CategoriaEvento from './cadastros/CategoriaEvento';
import ListaPalestra from './listagem/ListaPalestra';
import Palestra from './cadastros/Palestra';
import ListaOcorrenciaPasse from './listagem/ListaOcorrenciaPasse';
import OcorrenciaPasse from './cadastros/OcorrenciaPasse';
import Cursos from './cadastros/Cursos';
import ListaCursos from './listagem/ListaCursos';
import ListaAutores from './listagem/ListaAutores';
import Autor from './cadastros/Autor';
import ListaEditoras from './listagem/ListaEditoras';
import Editora from './cadastros/Editora';
import ListaLivros from './listagem/ListaLivros';
import Livros from './cadastros/Livros';
import PrecoLivro from './cadastros/PrecoLivro';
import Pix from './cadastros/Pix';
import ListaStatusTratamento from './listagem/ListaStatusTratamento';
import Status from './cadastros/Status';
import ListaPresenca from './listagem/ListaPresenca';
import ListaCategoriaVideo from './listagem/ListaCategoriaVideo';
import CategoriaVideo from './cadastros/CategoriaVideo';
import Video from './cadastros/Video';
import ListaVideo from './listagem/ListaVideo';
// import SectionAbout from './sections/SectionAbout';
// import SectionServices from './sections/SectionServices';
// import SectionWhyUs from './sections/SectionWhyUs';
// import SectionPortifolio from './sections/SectionPortifolio';
// import SectionTestimonials from './sections/SectionTestimonials';
// import SectionTeam from './sections/SectionTeam';
// import SectionPricing from './sections/SectionPricing';
// import SectionFaq from './sections/SectionFaq';
// import SectionContact from './sections/SectionContact';

// import { NavbarComp } from '../layouts/NavbarComp';
// import { SidebarComp } from '../layouts/SidebarComp';



// The Main component receives props passed from the Laravel controller
const Main = ({ appName }) => {
  const theme_dark = import.meta.env.VITE_APP_THEME_DARK
  const theme_light = import.meta.env.VITE_APP_THEME_LIGHT
  const [view,setView] = useState(null)
  const [telaatual,setTelaatual] = useState('ListaAcolhidos');
  const [param,setParam] = useState(null);
  const [paramestado,setParamestado] = useState(null);
  const [paramacolhido,setParamacolhido] = useState(null);
  const [paramtratamento,setParamtratamento] = useState(null);
  const [novo,setNovo] = useState(false);

//   useEffect(() => {
//      document.documentElement.setAttribute('data-coreui-theme', theme_light);
//      //setTelaatual()
//   })

  const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  const AtualizaTela = () =>{
    setNovo(!novo)
  }

  const ExibeLayout = (props) => {
    console.log(props)
    let dados = null
    let id = null
    scrollToId('idmain')
    switch( props.tela) {

      case "Acolhido":
        return(<Acolhido tela={setTelaatual} param={param} estadovalor={paramestado} altera={setParam} setacolhido={setParamacolhido}/>)
       break
      case "ListaAcolhidos":
        return(<ListaAcolhidos tela={setTelaatual} altera={setParam} alteraestado={setParamestado}/>)
       break
      case "Passes":
        return(<Passe tela={setTelaatual} param={param} altera={setParam}/>)
       break
      case "ListaPasses":
        return(<ListaPasses tela={setTelaatual} altera={setParam}/>)
       break
      case "FocoEnergetico":
        return(<FocoEnergetico tela={setTelaatual} param={param}/>)
       break
      case "ListaFocoEnergeticos":
        return(<ListaFocoEnergetico tela={setTelaatual} altera={setParam}/>)
       break
      case "CondicaoEnergetica":
        return(<CondicaoEnergetica tela={setTelaatual} param={param}/>)
       break
      case "ListaCondicaoEnergeticas":
        return(<ListaCondicaoEnergetica tela={setTelaatual} altera={setParam}/>)
       break
      case "Fortalecimento":
        return(<Fortalecimento tela={setTelaatual} param={param}/>)
       break
      case "ListaFortalecimentos":
        return(<ListaFortalecimento tela={setTelaatual} altera={setParam}/>)
       break
      case "Limpeza":
        return(<Limpeza tela={setTelaatual} param={param}/>)
       break
      case "ListaLimpezas":
        return(<ListaLimpeza tela={setTelaatual} altera={setParam}/>)
       break
      case "Alerta":
        //const Alerta = lazy(() => import('./cadastros/Alerta'))
        return(<Alerta tela={setTelaatual} param={param}/>)
       break
      case "ListaAlertas":
        //const ListaAlerta = lazy(() => import('./listagem/ListaAlerta'))
        return(<ListaAlerta tela={setTelaatual} altera={setParam}/>)
       break
     case "TipoTratamento":
        //const Alerta = lazy(() => import('./cadastros/Alerta'))
        return(<TipoTratamento tela={setTelaatual} param={param}/>)
       break
     case "ListaTipoTratamentos":
        //const ListaAlerta = lazy(() => import('./listagem/ListaAlerta'))
        return(<ListaTipoTratamento tela={setTelaatual} altera={setParam}/>)
       break
     case "Colaborador":
        return(<Colaborador tela={setTelaatual} param={param} estadovalor={paramestado}/>)
     break
     case "ListaColaboradores":
        return(<ListaColaboradores tela={setTelaatual} altera={setParam} alteraestado={setParamestado}/>)
       break
     case "Ficha":
        return(<Ficha/>)
       break
     case "Tratamento":
        return(<Tratamento tela={setTelaatual} param={param} setacolhido={setParamacolhido} setratamento={setParamtratamento}/>)
       break
     case "ListaTratamentos":
        return(<ListaTratamentos tela={setTelaatual} altera={setParam} setacolhido={setParamacolhido}/>)
       break
     case "Ocupacao":
        return(<Ocupacao tela={setTelaatual} param={param}/>)
       break
     case "ListaOcupacao":
        return(<ListaOcupacao tela={setTelaatual} altera={setParam}/>)
       break
     case "ControlePresenca":
        return(<ControlePresenca tela={setTelaatual} altera={setParam} setacolhido={setParamacolhido} acolhidoparam={paramacolhido} tratamento={paramtratamento}/>)
       break
     case "ListaPublicoFoco":
        return(<ListaPublicoFoco tela={setTelaatual} altera={setParam}/>)
       break
     case "PublicoAlvo":
        return(<PubicoFoco tela={setTelaatual} param={param}/>)
       break
    case "Evento":
        return(<Evento tela={setTelaatual} param={param} estadovalor={paramestado}/>)
       break
    case "ListaEventos":
        return(<ListaEventos tela={setTelaatual} altera={setParam} alteraestado={setParamestado}/>)
       break
    case "ListaCategoriaEvento":
        return(<ListaCategoriaEvento tela={setTelaatual} altera={setParam}/>)
       break
    case "CategoriaEvento":
        return(<CategoriaEvento tela={setTelaatual} param={param}/>)
       break
    case "ListaPalestras":
        return(<ListaPalestra tela={setTelaatual} altera={setParam} alteraestado={setParamestado}/>)
       break
    case "Palestra":
        return(<Palestra tela={setTelaatual} param={param} estadovalor={paramestado}/>)
       break
    case "ListaOcorrencias":
        return(<ListaOcorrenciaPasse tela={setTelaatual} altera={setParam}/>)
       break
    case "Ocorrencia":
        return(<OcorrenciaPasse tela={setTelaatual} param={param}/>)
       break
    case "Curso":
        return(<Cursos tela={setTelaatual} param={param} estadovalor={paramestado}/>)
       break
    case "ListaCursos":
        return(<ListaCursos tela={setTelaatual} altera={setParam} alteraestado={setParamestado}/>)
       break
    case "Autor":
        return(<Autor tela={setTelaatual} param={param}/>)
       break
    case "ListaAutores":
        return(<ListaAutores tela={setTelaatual} altera={setParam}/>)
       break
    case "Editora":
        return(<Editora tela={setTelaatual} param={param}/>)
       break
    case "ListaEditoras":
        return(<ListaEditoras tela={setTelaatual} altera={setParam}/>)
       break
    case "ListaLivros":
        return(<ListaLivros tela={setTelaatual} altera={setParam}/>)
       break
    case "Livro":
        return(<Livros tela={setTelaatual} param={param}/>)
       break
    case "PrecoLivro":
        return(<PrecoLivro tela={setTelaatual} param={param}/>)
       break
    case "Pix":
        return(<Pix tela={setTelaatual} param={param}/>)
       break
    case "ListaStatusTratamentos":
        return(<ListaStatusTratamento tela={setTelaatual} altera={setParam}/>)
       break
    case "Status":
        return(<Status tela={setTelaatual} param={param}/>)
       break
    case "ListaPresenca":
        return(<ListaPresenca tela={setTelaatual} altera={setParam}/>)
       break
    case "ListaCategoriaVideo":
        return(<ListaCategoriaVideo tela={setTelaatual} altera={setParam}/>)
       break
    case "CategoriaVideo":
        return(<CategoriaVideo tela={setTelaatual} param={param}/>)
       break
    case "Video":
        return(<Video tela={setTelaatual} param={param}/>)
       break
    case "ListaVideos":
        return(<ListaVideo tela={setTelaatual} altera={setParam}/>)
       break

    }

  }

  return (
           <>
            <HeaderAdmin tela={setTelaatual} alteraficha={setParamacolhido} altera={setParam} mudatela={AtualizaTela}/>
            <main id="idmain" class="main">
                {/* <!-- Hero Section --> */}
                <Suspense fallback={<div>Loading dashboard view...</div>}>
                   <ExibeLayout muda={novo} tela={telaatual}/>
                </Suspense>
                {/* <Acolhido/> */}
            </main>
           <Footer/>
        </>
  )
}

export default Main
