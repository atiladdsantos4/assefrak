import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CBadge } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props Fortalecimentod from the Laravel controller
const InscricaoCursos = (props) => {
  const { tela, dados, publico } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idcurso, setIdCurso] = useState(null)
  const [inscricao, setInscricao] = useState('')
  const [listafoco, setListafoco] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [conteudo, setConteudo] = useState([])
  const [imagecurso, setImagecurso] = useState(null)
  const [imagecursoitens, setImagecursoitens] = useState([])
  const [programacao, setProgramacao] = useState([])
  const [avatar, setAvatar] = useState(null)
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //ale_id_aco,ale_name,ale_cpf,ale_email,ale_tipo_telefone,ale_telefone,ale_ativo,ale_created_at,ale_updated_at,ale_deleted_at

  useEffect(()=>{
    setLoadpage(true)
    setIdCurso(dados.cur_id_cur)
    let data = formatDate(new Date());
    let string = JSON.parse(dados.cur_conteudo)
    setConteudo(string["meta"])
    string = JSON.parse(dados.cur_programacao)
    let datarefini = null
    let datareffim = null
    let d = null
    let m = null
    let yyyy = null
    string["meta"].map((item,index)=>{
       datarefini = new Date(item.dataini)
       datareffim = new Date(item.datafim)
       item.horaini = String(datarefini.getHours()).padStart(2, '0')+':'+String(datarefini.getMinutes()).padStart(2, '0')+'h'
       item.horafim = String(datareffim.getHours()).padStart(2, '0')+':'+String(datareffim.getMinutes()).padStart(2, '0')+'h'
       d = String(datarefini.getDate()).padStart(2, '0');
       m = String(datarefini.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
       yyyy = datarefini.getFullYear();
       item.data = `${d}/${m}/${yyyy}`
    })
    setProgramacao(string["meta"])
    string = JSON.parse(dados.cur_colaborador_avatar)
    setAvatar(string["meta"][0].path)
    let mainimage = dados.cur_itens.filter((item)=>item.cui_tipo_informacao == 'IC')
    string = JSON.parse(mainimage[0].cui_dados_inf)
    setImagecurso(string["meta"][0].path)
    let otimage = dados.cur_itens.filter((item)=>item.cui_tipo_informacao == 'BA')
    let obj = null
    let vetor = []
    otimage.map((item,index)=>{
       console.log('otimage:')
       console.log(item)
       string = JSON.parse(item.cui_dados_inf)
       obj ={
          path:string["meta"][0].path
       }
       vetor.push(obj)
    })
    setImagecursoitens(vetor)
    setListafoco(props.publico)
    setLoadpage(false)
  },[dados])

  const handleClick = (event,valor) =>{
     event.preventDefault();
     tela(valor)
  }

 //--> Cria Data Atual
 const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${d}/${m}/${yyyy} ${hh}:${mi}:${ss}`;
  };

  const formatDateBanco = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}/${d} ${hh}:${mi}:${ss}`;
  };

  //--> Exibe o Toast
  const CompToast = (texto, color, autohide) => {
    return (
      <CToast
        style={{borderRadius:'5px',color:'white'}}
        id="idtoast"
        autohide={autohide}
        visible={false}
        color={color}
        delay="3000"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody style={{color:'white'}}>{texto}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
    )
  }

  //--> Efetua a validação do form e envoia os dados
  const handleSubmit = (event) => {
        const form = event.currentTarget
        let erro = false
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            erro = true
        }
        event.preventDefault()
        setValidated(true)
        if(erro == false){
           handleSave(erro)
        }
  }

  const mudaTipoTelefone = (event,valor) =>{
    setTipotelefone(valor)
    let tel = ''
    setTelefone(tel)
  }

  const CPFInput = (props) => {
      const [value, setValue] = useState(props.cpf)
        return (
            <IMaskInput
                className="form-control"
                mask='000.000.000-00' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setCpf(value)}
                defaultValue={value}
                placeholder="000.000.000-00"
                required
            />
        );
  }

  const FixoInput = (props) => {
      const [value, setValue] = useState(props.telefone)
        return (
            <IMaskInput
                className="form-control"
                mask='(00)0000-0000' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setTelefone(value)}
                defaultValue={value}
                placeholder="(00)0000-0000"
                required
            />
        );
  }

  const CelularInput = (props) => {
      const [value, setValue] = useState(props.telefone)
        return (
            <IMaskInput
                className="form-control"
                mask='(00)00000-0000' // Define o tipo da máscara como numérico
                signed={false} // Se permite números negativos
                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {()=>setTelefone(value)}
                defaultValue={value}
                placeholder="(00)00000-0000"
                required
            />
        );
  }

  const  handleSave = (erro) =>{

    if( erro == false && inscricaocursos == null) {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ale_descricao', descricao)
        axios
        .post(`${endpoint}/InscricaoCursos`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaInscricaoCursoss'
            setLoadsave(false)
            addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela(valor)
            }, 2000)
        })
    } else {
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ale_descricao', descricao)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/InscricaoCursos/${inscricaocursos}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsave(true)
            addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela('ListaInscricaoCursoss')
            }, 2000)
        })
    }
 }

 const EnviaInscricao = (event) =>{
    setLoadsave(true)
    /*
          $table->unsignedBigInteger('ins_id_cur')->nullable();
            $table->unsignedBigInteger('ins_id_eve')->nullable();
            $table->unsignedBigInteger('ins_id_puf');
            $table->string('ins_nome',300);
            $table->string('ins_email',300);
            $table->string('ins_telefone',20);
            $table->char('ins_tipo',1);
            $table->char('ins_ativo',1);
          */
    const formData = new FormData()
    formData.append('inscricao', 'S')
    formData.append('ins_id_cur', idcurso)
    formData.append('ins_nome', nome)
    formData.append('ins_email', email)//atiladdsantos4@gmail.com
    formData.append('ins_telefone', telefone)
    formData.append('ins_envio_email', 'N')
    formData.append('ins_tipo', 'C')
    formData.append('ins_ativo', 1)
    formData.append('ins_id_puf', tipo)
    axios
        .post(`${endpoint}/inscricao`, formData, {
        headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,//dentro do env//
        },
    })
    .then((result) => {
        setLoadsave(false)
        addToast(CompToast('Inscrição efetuada com Sucesso!!!', 'success')) //--> usa toast
        setTimeout(() => {
            document.getElementById('idtoast').classList.remove('show')
            document.getElementById('idtoast').remove()
            //tela('ListaInscricaoCursoss')
        }, 2000)
    })
 }


 const CompFoco = () =>{
    return(
        listafoco.map((item,index)=>{
        return(
            <option key={index} value={item.puf_id_puf}>{item.puf_descricao}</option>
            )
        })
    )
 }


  return (
    <div data-aos="zoom-in">
         <section id="event" class="event section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
        <div class="row">
          <div class="col-lg-8">
            <div class="event-image mb-4" data-aos="fade-up">
              <img src={imagem+imagecurso} alt="Event" class="img-fluid rounded"/>
            </div>

            <div class="event-meta mb-4" data-aos="fade-up" data-aos-delay="100">
              <div class="row g-3">
                <div class="col-md-4 col-6">
                  <div class="meta-item">
                    <i class="bi bi-calendar-date"></i>
                    <span>{dados.cur_data_inicio+' à '+dados.cur_data_fim}</span>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="meta-item">
                    <i class="bi bi-clock"></i>
                    <span>{dados.cur_hora_inicio +' à '+dados.cur_hora_fim}</span>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="meta-item">
                    <i class="bi bi-geo-alt"></i>
                    <span style={{fontSize:'12px'}}>{dados.cur_local}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="event-content" data-aos="fade-up" data-aos-delay="200">
              <h2>{dados.cur_titulo}</h2>
              <p>
               {dados.cur_descricao}
              </p>

              <h3 class="mt-4">Conteúdo Programático</h3>
              <ul class="event-highlights">
                {
                  conteudo.map((item,index)=>{
                    return(
                     <li>
                        <i class="bi bi-check-circle"></i>
                        <span>{item.descricao}</span>
                     </li>
                    )
                  })
                }
              </ul>

              <h3 class="mt-4">Programação do Curso</h3>
              <div class="schedule-table">
                {
                  programacao.map((item,index)=>{
                    return(
                      <div class="schedule-row">
                         <div class="schedule-time col-md-4">{item.data+' - '+item.horaini+' - '+item.horafim}</div>
                         <div class="schedule-activity col-md-8">
                             <h4>{item.titulo}</h4>
                             <p>{item.descricao}</p>
                         </div>
                     </div>
                    )
                  })
                }
              </div>

              <div class="event-gallery mt-5" data-aos="fade-up" data-aos-delay="300">
                <h3>Galeria de Fotos Curso </h3>
                <p>Imagens do curso Anterior:</p>
                <div class="row g-4 mt-2">
                  {
                    imagecursoitens.map((item,index)=>{
                        return(
                            <div class="col-md-4">
                                <a href="assets/img/education/events-1.webp" class="glightbox">
                                <img src={imagem+item.path} alt="Event Gallery" class="img-fluid rounded"/>
                                </a>
                            </div>
                        )
                    })
                  }
                  {/* <div class="col-md-4">
                    <a href="assets/img/education/events-1.webp" class="glightbox">
                      <img src="assets/img/education/events-1.webp" alt="Event Gallery" class="img-fluid rounded"/>
                    </a>
                  </div>
                  <div class="col-md-4">
                    <a href="assets/img/education/events-2.webp" class="glightbox">
                      <img src="assets/img/education/events-2.webp" alt="Event Gallery" class="img-fluid rounded"/>
                    </a>
                  </div>
                  <div class="col-md-4">
                    <a href="assets/img/education/events-3.webp" class="glightbox">
                      <img src="assets/img/education/events-3.webp" alt="Event Gallery" class="img-fluid rounded"/>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="event-sidebar">
              <div class="sidebar-widget registration-form" data-aos="fade-left" data-aos-delay="200">
                <h3>Inscrever-se no Curso:</h3>
                <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                  <div class="mb-3">
                    <label for="name" class="form-label">Nome Completo</label>
                    <input type="text" onChange={(e)=>setNome(e.target.value)} class="form-control" id="name" required=""/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" onChange={(e)=>setEmail(e.target.value)} id="email" required=""/>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">Telefone</label>
                    {/* <input type="tel" class="form-control" id="phone"/> */}
                    <CelularInput telefone={telefone}/>
                  </div>
                  <div class="mb-3">
                    <label for="student-type" class="form-label">Você é</label>
                    <select class="form-select" onChange={(e)=>{setTipo(e.target.value)}} id="student-type">
                      <CompFoco/>
                    </select>
                  </div>
                  <div class="d-grid">
                    <button type="button" class="btn btn-register" onClick={(e)=>EnviaInscricao(e)}>
                        Registrar&nbsp;{ loadsave ? (<CSpinner size="sm"/>) : (<></>)}
                     </button>
                  </div>
                </CForm>
              </div>

              <div class="sidebar-widget organizer-info" data-aos="fade-left" data-aos-delay="300">
                <h3>Palestrante</h3>
                <div class="organizer-details">
                  <div class="organizer-image">
                    <img src={imagem+avatar} class="img-fluid rounded" alt="Organizer"/>
                  </div>
                  <div class="organizer-content">
                    <h4>{dados.cur_colaborador}</h4>
                    <p class="organizer-position">{dados.cur_colaborador_titulo}</p>
                    <p>Quaisquer dúvidas realicionadas ao curso, favor contactar:</p>
                    <div class="organizer-contact">
                      <p><i class="bi bi-envelope"></i>{dados.cur_colaborador_dados.col_email}</p>
                      <p><i class="bi bi-telephone"></i>{dados.cur_colaborador_dados.col_telefone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sidebar-widget related-events" data-aos="fade-left" data-aos-delay="400">
                <h3>Related Events</h3>
                <div class="related-event-item">
                  <div class="related-event-date">
                    <span class="day">15</span>
                    <span class="month">Nov</span>
                  </div>
                  <div class="related-event-info">
                    <h4>Mathematics Olympiad</h4>
                    <p><i class="bi bi-geo-alt"></i> Room 203, East Wing</p>
                  </div>
                </div>
                <div class="related-event-item">
                  <div class="related-event-date">
                    <span class="day">05</span>
                    <span class="month">Dec</span>
                  </div>
                  <div class="related-event-info">
                    <h4>Literature Festival</h4>
                    <p><i class="bi bi-geo-alt"></i> Central Library</p>
                  </div>
                </div>
                <div class="related-event-item">
                  <div class="related-event-date">
                    <span class="day">18</span>
                    <span class="month">Dec</span>
                  </div>
                  <div class="related-event-info">
                    <h4>Annual Sports Meet</h4>
                    <p><i class="bi bi-geo-alt"></i> School Ground</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

    </div>
  )
}
export default InscricaoCursos
