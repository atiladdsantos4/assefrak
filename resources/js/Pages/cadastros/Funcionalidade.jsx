import { React, useEffect, useState, useRef } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CButton, CRow, CForm,
  CFormFeedback, CFormInput, CSpinner, CFormLabel, CFormTextarea,
  CToaster, CToast, CToastBody, CToastClose, CFormSelect, CPlaceholder,CInputGroup,CBadge,CInputGroupText
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPerson, faSave,faMagnifyingGlassPlus,faMagnifyingGlassMinus,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Cadastro de Funcionalidade
const Funcionalidade = (props) => {
  console.log(props.param);
  const { tela } = props;
  const imagem = import.meta.env.VITE_APP_ENDPOINT_IMG;
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;
  const token = import.meta.env.VITE_APP_TOKEN;

  const [validated, setValidated] = useState(false);
  const [loadpage, setLoadpage] = useState(false);
  const [loadsave, setLoadsave] = useState(false);
  const [loadsaveimage,setLoadsaveimage] = useState(false);
  const [idfuncionalidade, setIdfuncionalidade] = useState(null);
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [menu, setMenu] = useState(null);
  const [listatipo, setListatipo] = useState([]);
  const [listamenu, setListamenu] = useState([]);
  const [cadastro, setCadastro] = useState('');
  const [toast, addToast] = useState();
  const toaster = useRef(null);
  const style_placeholder = { paddingBottom: '15px' };
  const inputFileRef = useRef(null);

  //Image change
  const [imagefolder,setImagefolder] =  useState(null)//toast
  const [hasimage,setHasimage] =  useState(false)//toast
  const [folder, setFolder] = useState(null);
  const style_imagem_plus = {width:'110%',zIndex:'20'}
  const style_imagem_minus = {width:'30%',zIndex:'20'}
  const [tamimagem,setTamimagem] = useState(style_imagem_minus)
  const [iconimagem,setIconimagem] = useState(faMagnifyingGlassPlus)

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };

  useEffect(() => {
    let data = formatDate(new Date());
    setCadastro(data);

    const fetchData = async () => {
      try {
        setLoadpage(true);

        if (props.param != null) {
          const requests = [
            axios.get(`${endpoint}/tipofuncionalidade?listagem=S`, config),
            axios.get(`${endpoint}/menu?listagem=S&funcionalidade=S`, config),
            axios.get(`${endpoint}/funcionalidade/${props.param}`, config),
          ];

          const responses = await Promise.all(requests);
          let result_tipo = responses[0];
          let result_menu = responses[1];
          let result_fun = responses[2];

          let obj = {
            tfu_id_tfu: '',
            tfu_descricao: 'Selecione o Tipo de Funcionalidade',
          };
          let vet = result_tipo.data.data;
          vet.unshift(obj);
          setListatipo(vet);
          vet = result_menu.data.data;
           obj = {
            men_id_men: '',
            men_name: 'Selecione o Menu',
          };
          vet.unshift(obj);
          setListamenu(vet)


          setIdfuncionalidade(result_fun.data.data.fun_id_fun);
          setTipo(result_fun.data.data.fun_id_tfu);
          setDescricao(result_fun.data.data.fun_descricao);
          setLink(result_fun.data.data.fun_link);
          setCadastro(result_fun.data.data.fun_created_at);
        } else {
          const requests = [
            axios.get(`${endpoint}/tipofuncionalidade?listagem=S`, config),
            axios.get(`${endpoint}/menu?listagem=S&funcionalidade=S`, config),
          ];

          const responses = await Promise.all(requests);
          let result_tipo = responses[0];
          let result_menu = responses[1];
          let obj = {
            tfu_id_tfu: '',
            tfu_descricao: 'Selecione o Tipo de Funcionalidade',
          };
          let vet = result_tipo.data.data;
          vet.unshift(obj);
          setListatipo(vet);
          vet = result_menu.data.data;
           obj = {
            men_id_men: '',
            men_name: 'Selecione o Menu',
          };
          vet.unshift(obj);
          setListamenu(vet)
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
    console.log('teste:' + valor);
    tela(valor);
  };

  //--> Cria Data Atual
  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${d}/${m}/${yyyy} ${hh}:${mi}:${ss}`;
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
    console.log('submit');
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
    if (erro === false && idfuncionalidade == null) {
      if( folder == null){
         addToast(CompToast('A Imagem Precisa se Informada!!!', 'danger'));
         setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
        }, 2000);
        return
      }
      console.log('entre_aqui_post');
      setLoadsave(true);
      const formData = new FormData();

      formData.append('fun_id_tfu', tipo);
      formData.append('fun_descricao', descricao);
      formData.append('fun_link', link);
      formData.append('fun_id_men', menu);
      if(folder != null){
        //formData.append('fun_link', folder)
        formData.append('has_image', true)
        formData.append('file', imagefolder)
      }


      axios.post(`${endpoint}/funcionalidade`, formData, config)
        .then((result) => {
          setLoadsave(false);
          addToast(CompToast('Dados Gravados com sucesso !!!', 'success'));
          setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
            tela('ListaFuncionalidade');
          }, 2000);
        });
    } else {
      setLoadsave(true);

      const formData = new FormData();

      formData.append('fun_id_tfu', tipo);
      formData.append('fun_descricao', descricao);
      formData.append('fun_link', link);
      formData.append('fun_id_men', menu);
      if(folder != null){
        formData.append('fun_link', folder)
        formData.append('has_image', true)
        formData.append('file', imagefolder)
      }
      formData.append('_method', 'put');

      axios.post(`${endpoint}/funcionalidade/${idfuncionalidade}`, formData, config)
        .then((result) => {
          setLoadsave(false);
          addToast(CompToast('Dados Atualizados com sucesso !!!', 'success'));
          setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show');
            document.getElementById('idtoast').remove();
            tela('ListaFuncionalidade');
          }, 2000);
        });
    }
  };

  const CompTipos = () => (
    listatipo.map((item, index) => (
      <option key={index} value={item.tfu_id_tfu}>{item.tfu_descricao}</option>
    ))
  );

  const CompMenus = () => (
    listamenu.map((item, index) => (
      <option key={index} value={item.men_id_men}>{item.men_name}</option>
    ))
  );

  const ImageHeader = () => (
    <div style={{ position: 'relative', top: '4px' }}>
      <img className="img-fluid" style={{ borderRadius: '5px' }} src={imagem + 'telas/logoheadercadastro.png'} />
      <div style={{ fontSize: '24px', position: 'relative', left: '-80px', top: '-35px', color: 'white', fontWeight: 'bold' }}>Funcionalidade</div>
    </div>
  );

  //images
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setFolder(event.target.files[0].name)
        setImagefolder(event.target.files[0])
        setLink(event.target.files[0].name)
        setHasimage(true)
        // console.log(event.target.parentElement.querySelector('.invalid-feedback'))
        // console.log(event.target.classList)
        // event.target.classList.remove('is-invalid')
        // event.target.classList.add('is-valid')
        // event.target.setCustomValidity('')
        // event.target.classList.remove('.invalid-feedback')
        // event.target.classList.add('is-valid')
    }
  }

  const onRemoveAnexo = (event,id) => {
     inputFileRef.current.value = '';
     inputFileRef.current.setCustomValidity('');
     setFolder(null)
     setImagefolder(null)
     setLink(null)
     setHasimage(false)
    //  inputFileRef.current.classList.remove('is-valid')
    //  inputFileRef.current.classList.add('is-invalid')
  }

  const InputImage = () => {

        return(
            <>
                <CFormLabel htmlFor="exampleFormControlInput1">Imagem do Descritivo</CFormLabel><br/>
                <CInputGroup className="mb-1">
                    <CFormInput
                        ref={inputFileRef}
                        type="file"
                        id="inputGroupFile02"
                        onChange={onImageChange}
                        //invalid={!hasimage}
                        feedbackInvalid="A Imagem precisa ser enviada"
                        //required
                    />

                    {
                        idfuncionalidade != null ?
                        (<CInputGroupText as="label" style={{cursor:'pointer'}} htmlFor="inputGroupFile02" onClick={(e)=>SalvarImagem(e)}>
                            Upload&nbsp;{loadsaveimage? <CSpinner size="sm" /> : ''}
                        </CInputGroupText>)
                        :(<></>)
                    }

                </CInputGroup>
                 {hasimage ? (<></>) : (<div className="text-danger">Imagem deve ser informada</div>)}
                <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'1px'}}>
                    <FontAwesomeIcon size="lg" style={{color:'red',cursor:'pointer'}} icon={faCircleXmark} onClick={(e)=>onRemoveAnexo(e)}/>
                    {folder && <p>Arquivo Selecionado: <CBadge color="primary">{folder}</CBadge></p>}
                </div>
           </>
        )
  }

  return (
    <div data-aos="zoom-in">
      <section id="hero" className="hero section light-background">
        <div className="container section-title box-title mb-2" data-aos="fade-up">
          <ImageHeader />
        </div>
        <div className="container">
          <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
          <CCard className="card_bottom">
            <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Funcionalidade</CCardHeader>
            <CCardBody>
              <CForm className="row g-3 needs-validation" noValidate id="form-funcionalidade" onSubmit={handleSubmit} validated={validated}>
                <CCol md={8}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormTextarea
                        id="idDescricao"
                        label="Descrição"
                        placeholder="Digite a descrição da Funcionalidade"
                        aria-label="Descrição da Funcionalidade"
                        aria-describedby="button-addon1"
                        rows={6}
                        value={descricao}
                        feedbackInvalid="A descrição precisa ser preenchida"
                        required
                        onChange={(e) => setDescricao(e.target.value)}
                        style={{ fontSize: '12px' }}
                      />)}
                </CCol>
                <CCol md={4}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<>
                       <CFormSelect
                        className="mb-2"
                        id="idTipo"
                        label="Tipo de Funcionalidade"
                        value={tipo}
                        feedbackInvalid="O Tipo deve ser informado"
                        onChange={(e) => setTipo(e.target.value)}
                        required
                      >
                        <CompTipos />
                      </CFormSelect>
                      <CFormSelect
                        id="idMenu"
                        label="Realcionar Menu"
                        value={menu}
                        feedbackInvalid="O Tipo deve ser informado"
                        onChange={(e) => setMenu(e.target.value)}
                      >
                        <CompMenus />
                      </CFormSelect>
                      </>
                    )}
                </CCol>
                <CCol md={8}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<InputImage/>)}
                </CCol>
                <CCol md={4}>
                  {loadpage
                    ? (<div style={style_placeholder}><CPlaceholder className="grad68full" xs={12} size="lg" /></div>)
                    : (<CFormInput
                        type="text"
                        id="IdCadastro"
                        label="Cadastro"
                        value={cadastro}
                        feedbackInvalid="Informe a data do cadastro"
                        readOnly
                        required
                      />)}
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar {' '}
                    {loadsave ? <CSpinner size="sm" /> : ''}
                  </CButton>
                  {' '}
                  <CButton color="warning" type="button" onClick={(e) => handleClick(e, 'ListaFuncionalidade')}>
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

export default Funcionalidade;


