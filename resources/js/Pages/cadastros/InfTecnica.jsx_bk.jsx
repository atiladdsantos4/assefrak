import { React, useEffect, useState, useRef } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CButton, CForm,
  CFormInput, CFormTextarea, CSpinner, CToaster, CToast,
  CToastBody, CToastClose, CPlaceholder
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSave, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Cadastro de Informação Técnica
const InfTecnica = (props) => {
  const { tela } = props;
  const imagem = import.meta.env.VITE_APP_ENDPOINT_IMG;
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;
  const token = import.meta.env.VITE_APP_TOKEN;

  const [validated, setValidated] = useState(false);
  const [loadpage, setLoadpage] = useState(false);
  const [loadsave, setLoadsave] = useState(false);
  const [isedit, setIsedit] = useState(false);
  const [exibe, setExibe] = useState(false);
  const [idinf, setIdinf] = useState(null);
  const [autor, setAutor] = useState('');
  const [urldev, setUrldev] = useState('');
  const [urlprod, setUrlprod] = useState('');
  const [envdev, setEnvdev] = useState('');
  const [envprod, setEnvprod] = useState('');
  const [dbdev, setDbdev] = useState('');
  const [dbprod, setDbprod] = useState('');
  const [urlgit, setUrlgit] = useState('');
  const [ftpurl, setFtpurl] = useState('');
  const [ftpsenhas, setFtpsenhas] = useState('');
  const [sshurl, setSshurl] = useState('');
  const [sshsenha, setSshsenha] = useState('');
  const [versao, setVersao] = useState('');
  const [cadastro, setCadastro] = useState('');
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
            axios.get(`${endpoint}/informacao-tecnica/${props.param}`, config),
          ];
          const responses = await Promise.all(requests);
          const result = responses[0].data.data;

          setIdinf(result.inf_id_inf);
          setAutor(result.inf_autor ?? '');
          setUrldev(result.inf_url_dev ?? '');
          setUrlprod(result.inf_url_prod ?? '');
          setEnvdev(result.inf_env_dev ?? '');
          setEnvprod(result.inf_env_prod ?? '');
          setDbdev(result.inf_db_dev ?? '');
          setDbprod(result.inf_db_prod ?? '');
          setUrlgit(result.inf_url_git ?? '');
          setFtpurl(result.inf_ftp_url ?? '');
          setFtpsenhas(result.inf_ftp_senhas ?? '');
          setSshurl(result.inf_ssh_url ?? '');
          setSshsenha(result.inf_ssh_senha ?? '');
          setVersao(result.inf_versao_laravel ?? '');
          setCadastro(result.inf_created_at ?? '');
          setIsedit(true)
          setExibe(false)
        }
        console.log('isedit:', isedit, 'exibe:', exibe);
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

  const CompToast = (texto, color, autohide) => (
    <CToast style={{ borderRadius: '5px', color: 'white' }} id="idtoast"
      autohide={autohide} visible={false} color={color} delay="3000"
      className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody style={{ color: 'white' }}>{texto}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );

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
    if (erro === false) handleSave(erro);
  };

  const handleSave = (erro) => {
    const formData = new FormData();
    formData.append('inf_autor', autor);
    formData.append('inf_url_dev', urldev);
    formData.append('inf_url_prod', urlprod);
    formData.append('inf_env_dev', envdev);
    formData.append('inf_env_prod', envprod);
    formData.append('inf_db_dev', dbdev);
    formData.append('inf_db_prod', dbprod);
    formData.append('inf_url_git', urlgit);
    formData.append('inf_ftp_url', ftpurl);
    formData.append('inf_ftp_senhas', ftpsenhas);
    formData.append('inf_ssh_url', sshurl);
    formData.append('inf_ssh_senha', sshsenha);
    formData.append('inf_versao_laravel', versao);

    if (erro === false && idinf == null) {
      setLoadsave(true);
      axios.post(`${endpoint}/informacao-tecnica`, formData, config)
        .then(() => {
          setLoadsave(false);
          addToast(CompToast('Dados Gravados com sucesso !!!', 'success'));
          setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
            tela('ListaInfTecnica');
          }, 2000);
        });
    } else {
      setLoadsave(true);
      formData.append('_method', 'put');
      axios.post(`${endpoint}/informacao-tecnica/${idinf}`, formData, config)
        .then(() => {
          setLoadsave(false);
          addToast(CompToast('Dados Atualizados com sucesso !!!', 'success'));
          setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
            tela('ListaInfTecnica');
          }, 2000);
        });
    }
  };

  const ImageHeader = () => (
    <div style={{ position: 'relative', top: '4px' }}>
      <img className="img-fluid" style={{ borderRadius: '5px' }}
        src={imagem + 'telas/logoheadercadastro.png'} />
      <div style={{ fontSize: '24px', position: 'relative', left: '-62px',
        top: '-39px', color: 'white', fontWeight: 'bold' }}>
        Informação Técnica
      </div>
    </div>
  );

  const CompInput = (label, value, onChange, id, maxLength = 300, feedbackInvalid) => (
    //let valor = isedit && !exibe ? '' : value;
    loadpage
      ? <div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>
      : <CFormInput id={id} label={label} value={isedit && !exibe ? '' : value}
          onChange={(e) => onChange(e.target.value)} maxLength={maxLength}
          feedbackInvalid={feedbackInvalid} required />
  )

  const CompTextarea = (label, value, onChange, id, feedbackInvalid) => (
    loadpage
      ? <div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>
      : <CFormTextarea id={id} label={label} value={isedit && !exibe ? '' : value}
          onChange={(e) => onChange(e.target.value)} rows={4} maxLength={1500}
          feedbackInvalid={feedbackInvalid} required />
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
              <FontAwesomeIcon size="lg" icon={faBars} />&nbsp;Cadastro de Informação Técnica
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 needs-validation" noValidate
                id="form-inf-tecnica" onSubmit={handleSubmit} validated={validated}>
                <CCol md={6}>{CompInput('Autor', autor, setAutor, 'idAutor', 200, 'Informe o Autor')}</CCol>
                <CCol md={6}>{CompInput('URL Desenvolvimento', urldev, setUrldev, 'idUrlDev', 300, 'Informe a Url Desenvolvimento')}</CCol>
                <CCol md={6}>{CompInput('URL Produção', urlprod, setUrlprod, 'idUrlProd', 300, 'Informe a Url Produção')}</CCol>
                <CCol md={6}>{CompInput('URL Git', urlgit, setUrlgit, 'idUrlGit', 300, 'Informe a Url Git')}</CCol>
                <CCol md={6}>{CompTextarea('Ambiente Desenvolvimento', envdev, setEnvdev, 'idEnvDev', 'Informe o Ambiente Desenvolvimento')}</CCol>
                <CCol md={6}>{CompTextarea('Ambiente Produção', envprod, setEnvprod, 'idEnvProd', 'Informe o Ambiente Produção')}</CCol>
                <CCol md={6}>{CompTextarea('Database Desenvolvimento', dbdev, setDbdev, 'idDbDev', 50, 'Informe o Database Desenvolvimento')}</CCol>
                <CCol md={6}>{CompTextarea('Database Produção', dbprod, setDbprod, 'idDbProd', 50, 'Informe o Database Produção')}</CCol>
                <CCol md={6}>{CompInput('FTP URL', ftpurl, setFtpurl, 'idFtpUrl', 300, 'Informe a FTP URL')}</CCol>
                <CCol md={6}>{CompInput('FTP Senhas', ftpsenhas, setFtpsenhas, 'idFtpSenhas', 300, 'Informe as FTP Senhas')}</CCol>
                <CCol md={6}>{CompInput('SSH URL', sshurl, setSshurl, 'idSshUrl', 100, 'Informe a SSH URL')}</CCol>
                <CCol md={6}>{CompInput('SSH Senha', sshsenha, setSshsenha, 'idSshSenha', 100, 'Informe a SSH Senha')}</CCol>
                <CCol md={6}>{CompInput('Versão Laravel', versao, setVersao, 'idVersaoLaravel', 150, 'Informe a Versão Laravel')}</CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar {' '}
                    {loadsave ? <CSpinner size="sm" /> : ''}
                  </CButton>{' '}
                  <CButton color="warning" type="button"
                    onClick={(e) => handleClick(e, 'ListaInfTecnica')}>
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

export default InfTecnica;
