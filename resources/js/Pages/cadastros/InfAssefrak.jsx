import { React, useEffect, useState, useRef } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CButton,
    CForm,
    CFormInput,
    CFormTextarea,
    CSpinner,
    CToaster,
    CToast,
    CToastBody,
    CToastClose,
    CBadge,
    CFormLabel,
    CContainer,
    CInputGroup,
    CInputGroupText
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faSave, faList, faArrowAltCircleDown, faCircleXmark, faEye, faEyeSlash   } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ModalExibe from '../componentes/ModalExibe';

const Campo = ({ label, value, setter, turvo }) => (
    <CFormInput
        label={label}
        value={value}
        className={turvo}
        onChange={(e) => setter(e.target.value)}
    />
);

const CampoEmail = ({ id, texto, setListaemail, lista }) => {
    console.log(id)
    console.log(texto)
    const Muda = (valor) => {
        setListaemail(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, email: valor }
                    : item
            )
        );
    };

    return (
        <CFormInput
            label="Email"
            value={texto}
            onChange={(e) => Muda(e.target.value)}
        />
    );
};

const CampoPassword = ({ id, texto, tipo, exibe, setListaemail, lista }) => {
   console.log('ID:', id, 'TIPO:', tipo);
   const Muda = (valor) => {
        setListaemail(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, password: valor }
                    : item
            )
        );
   };

   const ExibeSenha = (event, setListaemail, id) => {
        console.log(lista)
        setListaemail(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        exibe_senha: !item.exibe_senha,
                        tipo: item.exibe_senha ? 'password' : 'text'
                    }
                    : item
            )
        );
    };


    return(
        <div>
            <CFormLabel>Password</CFormLabel>
            <CInputGroup>
                <CFormInput
                    type={tipo}
                    value={texto}
                    onChange={(e) => Muda(e.target.value)}
                />
                <CInputGroupText id="basic-addon2">
                    <FontAwesomeIcon style={{cursor:'pointer'}} icon={tipo === 'text' ? faEye : faEyeSlash} onClick={(e)=>ExibeSenha(e,setListaemail,id)}/>
                </CInputGroupText>
            </CInputGroup>
        </div>
   )
}

const CampoPassword1 = ({ id, texto, setListaemail, lista }) => {

    const Muda = (valor) => {
        setListaemail(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, password: valor }
                    : item
            )
        );
    };

    return (
        <CFormInput
            label="Password"
            type="password"
            value={texto}
            onChange={(e) => Muda(e.target.value)}
        />
    );
};



const ItemEmail = ({ est, listaemail, setListaemail }) => {

    return (
        listaemail
            .filter((item) => item.exibe === true)
            .map((item, index) => {
                return (
                    <CRow key={item.id} className='mb-2 align-items-start'>

                        <CCol md={5}>
                            <CampoEmail
                                id={item.id}
                                texto={item.email}
                                setListaemail={setListaemail}
                                lista={listaemail}
                            />
                        </CCol>

                        <CCol md={5}>
                            <CampoPassword
                                 id={item.id}
                                 texto={item.password}
                                 tipo={item.tipo}
                                 setListaemail={setListaemail}
                                 lista={listaemail}
                            />
                        </CCol>

                        <CCol
                            md={1}
                            className='mt-5'
                            style={{
                                    position:'relative',
                                    top: '-10px'
                                }}
                        >
                            <FontAwesomeIcon
                                style={{
                                    color:'red',
                                    cursor:'pointer'
                                }}
                                size="sm"
                                icon={faCircleXmark}
                                onClick={(e) => RemoveItemEmail(e,setListaemail,item.id)}
                            />
                        </CCol>

                    </CRow>
                );
            })
    );
};

const ItemEmail1 = ({ est, listaemail, setListaemail }) => {

    return (
        listaemail
            .filter((item) => item.exibe === true)
            .map((item, index) => {
                return (
                    <CRow key={item.id} className='mb-2'>

                        <CCol md={5}>
                            <CampoEmail
                                id={item.id}
                                texto={item.email}
                                setListaemail={setListaemail}
                                lista={listaemail}
                            />
                        </CCol>

                        <CCol md={5}>
                            <CampoPassword
                                id={item.id}
                                texto={item.password}
                                setListaemail={setListaemail}
                                lista={listaemail}
                            />
                        </CCol>

                        <CCol
                            md={1}
                            style={{
                                display:'flex',
                                alignItems:'center'
                            }}
                        >
                            <FontAwesomeIcon
                                style={{
                                    color:'red',
                                    cursor:'pointer'
                                }}
                                size="sm"
                                icon={faCircleXmark}
                                onClick={(e) => RemoveItemEmail(e,setListaemail,item.id)}
                            />
                        </CCol>

                    </CRow>
                );
            })
    );
};

const RemoveItemEmail = (event, setListaemail, id) => {
    setListaemail(prevItems =>
        prevItems.map(item =>
            item.id === id ? { ...item, exibe: false } : item
        )
    );
};



const InfAssefrak = (props) => {
    const { tela } = props;

    const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;
    const token = import.meta.env.VITE_APP_TOKEN;
    const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
    const [param] = useState(props.param ?? null);
    const [id, setId] = useState(null);
    const [loadpage, setLoadpage] = useState(false);
    const [loadsave, setLoadsave] = useState(false);
    const [validated, setValidated] = useState(false);

    const [nome, setNome] = useState('');
    const [instagram, setInstagram] = useState('');
    const [instagramCredencial, setInstagramCredencial] = useState('');
    const [facebook, setFacebook] = useState('');
    const [facebookCredencial, setFacebookCredencial] = useState('');
    const [site, setSite] = useState('');
    const [siteAdmin, setSiteAdmin] = useState('');
    const [telefoneAdmin, setTelefoneAdmin] = useState('');
    const [telefoneContato, setTelefoneContato] = useState('');
    const [telefoneFinanceiro, setTelefoneFinanceiro] = useState('');
    const [email, setEmail] = useState('');

    const [turvo, setTurvo] = useState('');
    const [openmodalsenha, setOpenmodalsenha] = useState(false);
    const [toast, addToast] = useState();

    const [listaemail, setListaemail] = useState([]);
    const [estemail, setEstemail] = useState(false);

    const toaster = useRef(null);

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
    };


const CompToast = (texto, color) => (
    <CToast
        id="idtoast"
        autohide
        visible={false}
        color={color}
        delay={3000}
        className="text-white align-items-center"
    >
        <div className="d-flex">
            <CToastBody>
                {texto}
            </CToastBody>
            <CToastClose className="me-2 m-auto" white />
        </div>
    </CToast>
);

useEffect(() => {
    if (param == null) return;

    const fetchData = async () => {
        try {
            setLoadpage(true);

            const r = await axios.get(
                `${endpoint}/infassefrak/${param}`,
                { headers }
            );

            const d = r.data.data;

            setId(d.ina_id_ina);
            setNome(d.ina_url_nome_centro ?? '');
            setInstagram(d.ina_url_instagran ?? '');
            setInstagramCredencial(d.ina_url_inst_credencial ?? '');
            setFacebook(d.ina_url_facebook ?? '');
            setFacebookCredencial(d.ina_url_face_credencial ?? '');
            setSite(d.ina_url_site ?? '');
            setSiteAdmin(d.ina_url_site_admin ?? '');
            setTelefoneAdmin(d.ina_telefone_admin ?? '');
            setTelefoneContato(d.ina_telefone_contato ?? '');
            setTelefoneFinanceiro(d.ina_telefone_fincanceiro ?? '');

            setEmail(d.ina_email.meta);
            setListaemail(d.ina_email.meta)


            setTurvo('texto-turvo');
        } catch (e) {
            console.error(e);
        } finally {
            setLoadpage(false);
        }
    };

    fetchData();
}, []);

const salvar = (e) => {

    e.preventDefault();
    e.stopPropagation();
    console.log(listaemail)
    console.log(listaemail.length)
    let mail = null
    //return
    if( listaemail.length > 0 ){
       mail = MontaJsonEmail()
    } else {
       mail = null
    }

    setValidated(true);

    if (!e.currentTarget.checkValidity()) return;

    setLoadsave(true);

    const f = new FormData();

    [
        ['ina_url_nome_centro', nome],
        ['ina_url_instagran', instagram],
        ['ina_url_inst_credencial', instagramCredencial],
        ['ina_url_facebook', facebook],
        ['ina_url_face_credencial', facebookCredencial],
        ['ina_url_site', site],
        ['ina_url_site_admin', siteAdmin],
        ['ina_telefone_admin', telefoneAdmin],
        ['ina_telefone_contato', telefoneContato],
        ['ina_telefone_fincanceiro', telefoneFinanceiro],
        ['ina_email', mail]
    ].forEach(([k, v]) => f.append(k, v));

    if (id != null) f.append('_method', 'put');

    (
        id == null
            ? axios.post(`${endpoint}/infassefrak`, f, { headers })
            : axios.post(`${endpoint}/infassefrak/${id}`, f, { headers })
    )
        .then(() => {
            addToast(
                CompToast('Informações salvas com sucesso!', 'success')
            );

            setTimeout(() => tela('ListaInfAssefrak'), 1000);
        })
        .catch(console.error)
        .finally(() => setLoadsave(false));
};



const MontaJsonEmail = () => {

    const meta = listaemail
        .filter(item => item.exibe === true)
        .map((item, index) => ({
            ...item,
            id: index + 1,
            tipo: 'password',
            exibe_senha: false
        }));

    const objfinal = {
        meta: meta
    };

    console.log(JSON.stringify(objfinal));

    return JSON.stringify(objfinal);
};

const MontaJsonEmail1 = () => {
    let arrayitens = [];
    let obj = null;
    let objfinal = null;
    let cont = 0;

    listaemail
        .filter((item) => item.exibe === true)
        .map((item, index) => {
            cont++;

            obj = {
                id: cont,
                email: item.email,
                tipo:item.tipo,
                exibe_senha:item.exibe_senha,
                password: item.password,
                exibe: true
            };

            arrayitens.push(obj);
        });

    objfinal = {
        "meta": arrayitens
    };

    console.log(JSON.stringify(objfinal));

    return JSON.stringify(objfinal);
};


const NovoEmail = (event) => {
    let obj = {
        id: getLastIndexEmail(listaemail),
        email: '',
        tipo:'password',
        exibe_senha:false,
        password: '',
        exibe: true
    };

    setListaemail(prevItems => [...prevItems, obj]);
    setEstemail(!estemail);
};


const getLastIndexEmail = (listaemail) => {
    //console.log(listaemail)
    if (listaemail.length === 0) return 0;
    let index = Math.max(...listaemail.map(item => item.id)) + 1
    //console.log(index)
    return index;
};






const ImageHeader = () =>{
     return(
        <div style={{position:'relative',top:'4px'}}>
        <img class="img-fluid" style={{borderRadius:'5px'}} src={imagem+'telas/logoheadercadastro.png'}/>
        <div style={{lineHeight: '0.95',fontSize:'24px',position:'relative',left:'-56px',top:'-45px',color:'white',fontWeight:'bold'}}>Informações<br/> Assefrak</div>
        </div>
    )
}

    return (
        <div data-aos="zoom-in">
            <section id="tratamento-id" className="hero section light-background">
                <div className="container section-title box-title mb-2" data-aos="fade-up">
                     <ImageHeader/>
                </div>

                <div className="container">
                    <CToaster
                        className="p-3"
                        placement="middle-end"
                        push={toast}
                        ref={toaster}
                    />

                    <CCard>
                        <CCardHeader className="fundo_head">
                            <FontAwesomeIcon size="lg" icon={faPerson} />{' '}

                            {param == null
                                ? 'Informações Assefrak'
                                : (
                                    <>
                                        Alterar Informações Assefrak Nº{' '}
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                verticalAlign: 'middle'
                                            }}
                                            className="circle_ficha text-ficha"
                                        >
                                            {param}
                                        </span>
                                        <CBadge
                                            color="success"
                                            className="badge-protegido ms-2"
                                            onClick={(e) => setOpenmodalsenha(true)}
                                        >
                                            Confidencial
                                        </CBadge>
                                    </>
                                )
                            }
                        </CCardHeader>

                        <CCardBody>
                            <CForm
                                className="row g-3 needs-validation"
                                noValidate
                                id="form-infassefrak"
                                onSubmit={salvar}
                                validated={validated}
                            >
                                <CRow className={`mt-3 ${turvo}`}>
                                    <CCol md={12} className={`${turvo} mb-3`}>
                                        {loadpage
                                            ? <CSpinner />
                                            : (
                                                <CFormInput
                                                    label="Nome do Centro"
                                                    value={nome}
                                                    required
                                                    onChange={(event) => setNome(event.target.value)}
                                                    feedbackInvalid="O nome do centro deve ser preenchido"
                                                />
                                            )
                                        }
                                    </CCol>

                                    <CCol md={6} className={`${turvo} mb-3`}>
                                        <Campo label="Instagram (URL)" value={instagram} setter={setInstagram} />
                                    </CCol>

                                    <CCol md={6} className={`${turvo} mb-3`}>
                                        <Campo label="Facebook (URL)" value={facebook} setter={setFacebook} />
                                    </CCol>

                                    <CCol md={6} className={`${turvo} mb-3`}>
                                        <CFormTextarea
                                            label="Credencial Instagram"
                                            rows={3}
                                            value={instagramCredencial}
                                            className={turvo}
                                            onChange={(event) => setInstagramCredencial(event.target.value)}
                                        />
                                    </CCol>

                                    <CCol md={6} className={`${turvo} mb-3`}>
                                        <CFormTextarea
                                            label="Credencial Facebook"
                                            rows={3}
                                            value={facebookCredencial}
                                            className={turvo}
                                            onChange={(event) => setFacebookCredencial(event.target.value)}
                                        />
                                    </CCol>

                                    <CCol md={6} className={`${turvo} mb-3`}>
                                        <Campo label="Site" value={site} setter={setSite} />
                                    </CCol>

                                    <CCol md={6} className={`${turvo} mb-3`}>
                                        <Campo label="Site Administrativo" value={siteAdmin} setter={setSiteAdmin} />
                                    </CCol>


                                    <CCol md={4} className={`${turvo} mb-3`}>
                                        <Campo label="Telefone Administrador" value={telefoneAdmin} setter={setTelefoneAdmin} />
                                    </CCol>

                                    <CCol md={4} className={`${turvo} mb-3`}>
                                        <Campo label="Telefone Contato" value={telefoneContato} setter={setTelefoneContato} />
                                    </CCol>

                                    <CCol md={4} className={`${turvo} mb-3`}>
                                        <Campo label="Telefone Financeiro" value={telefoneFinanceiro} setter={setTelefoneFinanceiro} />
                                    </CCol>

                                    {/* <CCol md={12} className={`${turvo} mb-3`}>
                                        <CFormTextarea
                                            label="E-mails"
                                            rows={5}
                                            value={email}
                                            className={turvo}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </CCol> */}
                                    <CCol md={12}>
                                        <CFormLabel>Material</CFormLabel>
                                            <CContainer
                                                style={{
                                                    borderRadius:'5px',
                                                    border:'1px solid #6895C1',
                                                    padding:'4px'
                                                }}
                                            >
                                                <CRow className='mb-2 mt-2'>
                                                    <CCol md="2">
                                                        <CButton
                                                            size="sm"
                                                            color='primary'
                                                            onClick={(e) => NovoEmail(e)}
                                                        >
                                                            Adicionar Email&nbsp;
                                                            <FontAwesomeIcon
                                                                size="lg"
                                                                icon={faArrowAltCircleDown}
                                                            />
                                                        </CButton>
                                                    </CCol>
                                                </CRow>

                                                <ItemEmail
                                                    est={estemail}
                                                    listaemail={listaemail}
                                                    setListaemail={setListaemail}
                                                />
                                            </CContainer>
                                    </CCol>
                                </CRow>

                                <CCol>
                                    <CButton color="primary" type="submit">
                                        <FontAwesomeIcon size="lg" icon={faSave} />{' '}
                                        Salvar {loadsave ? <CSpinner size="sm" /> : ''}
                                    </CButton>
                                    {' '}
                                    <CButton color="warning" type="button" onClick={() => tela('ListaInfAssefrak')}>
                                        Listagem <FontAwesomeIcon size="lg" icon={faList} />
                                    </CButton>
                                </CCol>
                            </CForm>
                        </CCardBody>
                    </CCard>

                    <ModalExibe
                        open={openmodalsenha}
                        close={() => setOpenmodalsenha(false)}
                        classe={setTurvo}
                    />
                </div>
            </section>
        </div>
    );
};

export default InfAssefrak;
