
import { React, useEffect, useState, useRef } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CButton, CForm,
  CFormInput, CSpinner, CToaster, CToast, CToastBody,
  CToastClose, CFormSelect, CPlaceholder
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSave, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Cadastro de Menu
const Menu = (props) => {

  console.log(props.param);
  const { tela } = props;

  const imagem = import.meta.env.VITE_APP_ENDPOINT_IMG;
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;
  const token = import.meta.env.VITE_APP_TOKEN;

  const [validated, setValidated] = useState(false);
  const [loadpage, setLoadpage] = useState(false);
  const [loadsave, setLoadsave] = useState(false);

  const [idmenu,setIdmenu] = useState(null);
  const [idmenupai,setIdmenupai] = useState('');
  const [nome,setNome] = useState('');
  const [classe,setClasse] = useState('');
  const [mclick,setMclick] = useState('');
  const [nivel,setNivel] = useState('');
  const [posicao,setPosicao] = useState('');

  const [listamenu,setListamenu] = useState([]);
  const [cadastro,setCadastro] = useState('');
  const [toast, addToast] = useState();
  const toaster = useRef(null);

  const style_placeholder = { paddingBottom: '15px' };

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoadpage(true);

        if (props.param != null) {

          const requests = [
            axios.get(`${endpoint}/menu?listagem=S`, config),
            axios.get(`${endpoint}/menu/${props.param}`, config),
          ];

          const responses = await Promise.all(requests);

          let result_menu = responses[0];
          let result_men = responses[1];

          let obj = {
            men_id_men: '',
            men_name: 'Selecione o Menu Pai',
          };

          let vet = result_menu.data.data;
          vet.unshift(obj);
          setListamenu(vet);

          setIdmenu(result_men.data.data.men_id_men);
          setIdmenupai(result_men.data.data.men_id_pai ?? '');
          setNome(result_men.data.data.men_name);
          setClasse(result_men.data.data.men_classe);
          setMclick(result_men.data.data.men_click);
          setNivel(result_men.data.data.men_nivel);
          setPosicao(result_men.data.data.men_position);
          setCadastro(result_men.data.data.men_created_at);

        } else {

          const requests = [
            axios.get(`${endpoint}/menu?listagem=S`, config),
          ];

          const responses = await Promise.all(requests);

          let result_menu = responses[0];

          let obj = {
            men_id_men: '',
            men_name: 'Selecione o Menu Pai',
          };

          let vet = result_menu.data.data;
          vet.unshift(obj);
          setListamenu(vet);
        }

        setLoadpage(false);

      } catch (error) {
        console.error('One of the requests failed', error);
        setLoadpage(false);
      }
    };

    fetchData();

  }, []);

  const handleClick = (event, valor) => {
    event.preventDefault();
    tela(valor);
  };

  //--> Exibe o Toast
  const CompToast = (texto, color, autohide) => (
    <CToast
      style={{ borderRadius: '5px', color: 'white' }}
      id="idtoast"
      autohide={autohide}
      visible={false}
      color={color}
      delay="3000"
      className="text-white align-items-center"
    >
      <div className="d-flex">
        <CToastBody style={{ color: 'white' }}>{texto}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );

  //--> Efetua a validação do form e envia os dados
  const handleSubmit = (event) => {

    const form = event.currentTarget;
    let erro = false;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      erro = true;
    }

    event.preventDefault();
    setValidated(true);

    if (erro === false) {
      handleSave(erro);
    }
  };

  const handleSave = (erro) => {

    const formData = new FormData();

    formData.append('men_id_pai', idmenupai);
    formData.append('men_name', nome);
    formData.append('men_classe', classe);
    formData.append('men_click', mclick);
    formData.append('men_nivel', nivel);
    formData.append('men_position', posicao);

    if (erro === false && idmenu == null) {

      setLoadsave(true);

      axios.post(`${endpoint}/menu`, formData, config)
        .then((result) => {
          setLoadsave(false);
          addToast(CompToast('Dados Gravados com sucesso !!!', 'success'));

          setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
            tela('ListaMenu');
          }, 2000);
        });

    } else {

      setLoadsave(true);

      formData.append('_method', 'put');

      axios.post(`${endpoint}/menu/${idmenu}`, formData, config)
        .then((result) => {
          setLoadsave(false);
          addToast(CompToast('Dados Atualizados com sucesso !!!', 'success'));

          setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
            tela('ListaMenu');
          }, 2000);
        });
    }
  };

  const CompMenu = () => (
    listamenu.map((item, index) => (
      <option key={index} value={item.men_id_men}>
        {item.men_name}
      </option>
    ))
  );

  const ImageHeader = () => (
    <div style={{ position: 'relative', top: '4px' }}>
      <img className="img-fluid" style={{ borderRadius: '5px' }}
        src={imagem + 'telas/logoheadercadastro.png'} />
      <div style={{
        fontSize: '24px',
        position: 'relative',
        left: '-80px',
        top: '-35px',
        color: 'white',
        fontWeight: 'bold'
      }}>
        Menu
      </div>
    </div>
  );

  return (
    <div data-aos="zoom-in">
      <section id="hero" className="hero section light-background">
        <div className="container section-title box-title mb-2" data-aos="fade-up">
          <ImageHeader />
        </div>

        <div className="container">
          <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />

          <CCard className="card_bottom">
            <CCardHeader className="fundo_head">
              <FontAwesomeIcon size="lg" icon={faBars} />&nbsp;Cadastro de Menu
            </CCardHeader>

            <CCardBody>
              <CForm className="row g-3 needs-validation"
                noValidate id="form-menu"
                onSubmit={handleSubmit} validated={validated}>

                <CCol md={6}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormSelect
                        id="idMenuPai"
                        label="Menu Pai"
                        value={idmenupai}
                        onChange={(e)=>setIdmenupai(e.target.value)}
                      >
                        <CompMenu />
                      </CFormSelect>)}
                </CCol>

                <CCol md={6}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormInput
                        id="idNome"
                        label="Nome"
                        value={nome}
                        onChange={(e)=>setNome(e.target.value)}
                        feedbackInvalid="Informe o nome do Menu"
                        required
                      />)}
                </CCol>

                <CCol md={6}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormInput
                        id="idClasse"
                        label="Classe CSS"
                        value={classe}
                        onChange={(e)=>setClasse(e.target.value)}
                      />)}
                </CCol>

                <CCol md={6}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormInput
                        id="idClick"
                        label="Click / Tela"
                        value={mclick}
                        onChange={(e)=>setMclick(e.target.value)}
                      />)}
                </CCol>

                <CCol md={3}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormInput
                        type="number"
                        min="1"
                        max="10"
                        id="idNivel"
                        label="Nível"
                        value={nivel}
                        onChange={(e)=>setNivel(e.target.value)}
                        feedbackInvalid="Informe o nível"
                        required
                      />)}
                </CCol>

                <CCol md={3}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormInput
                        type="number"
                        min="1"
                        max="10"
                        id="idPositon"
                        label="Posição"
                        value={posicao}
                        onChange={(e)=>setPosicao(e.target.value)}
                        feedbackInvalid="Informe a Posição"
                        required
                      />)}
                </CCol>

                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar {' '}
                    {loadsave ? <CSpinner size="sm" /> : ''}
                  </CButton>
                  {' '}
                  <CButton color="warning" type="button"
                    onClick={(e) => handleClick(e, 'ListaMenu')}>
                    Listar&nbsp;<FontAwesomeIcon size="lg" icon={faList} />
                  </CButton>
                </CCol>

              </CForm>
            </CCardBody>
          </CCard>
        </div>
      </section>
    </div>
  );
};

export default Menu;
