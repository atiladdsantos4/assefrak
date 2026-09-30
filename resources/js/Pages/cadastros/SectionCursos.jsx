import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props Fortalecimentod from the Laravel controller
const SectionCursos = (props) => {
  console.log(props.param)
  console.log('dados:'+props.dados)
  const { tela, dados } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idSectionCursos, setIdSectionCursos] = useState(null)
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
    let data = formatDate(new Date());
    let string = JSON.parse(dados.cur_conteudo)
    console.log('conteudo')
    console.log(string["meta"])
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
    console.log(string["meta"][0].path)
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
    console.log(vetor)
    // dados.cur_itens.map((item,index)=>{
    //   console.log(item)
    // })
    //string = JSON.parse(dados.cur_programacao)
  },[])

  const handleClick = (event,valor) =>{
     event.preventDefault();
     console.log('teste:'+valor)
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
        console.log('submit')
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
           // let valor = CriaJsonItens()
           // console.log(valor)
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

    if( erro == false && idSectionCursos == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('ale_descricao', descricao)
        axios
        .post(`${endpoint}/SectionCursos`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaSectionCursoss'
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
         .post(`${endpoint}/SectionCursos/${idSectionCursos}`, formData, {
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
                tela('ListaSectionCursoss')
            }, 2000)
        })
    }
 }

 const EnviaInscricao = (event) =>{
    const formData = new FormData()
    formData.append('inscricao', 'S')
    formData.append('nome', 'S')
    formData.append('email', 'atiladdsantos4@gmail.com')
    formData.append('telefone', 'S')
    axios
        .post(`${endpoint}/email`, formData, {
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
            //tela('ListaSectionCursoss')
        }, 2000)
    })
 }



  return (
    <div data-aos="zoom-in">
         <section id="event" class="event section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">

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
                {/* <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Interactive student presentations of scientific experiments</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Special lecture by renowned physicist Dr. Robert Jenkins</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Robotics competition with prizes for top three teams</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Science demonstrations by faculty members</span>
                </li>
                <li>
                  <i class="bi bi-check-circle"></i>
                  <span>Exhibition of innovative student projects</span>
                </li> */}
              </ul>

              <h3 class="mt-4">Programação do Curso</h3>
              <div class="schedule-table">
                {
                  programacao.map((item,index)=>{
                    return(
                      <div class="schedule-row">
                         <div class="schedule-time col-md-4">{item.data+' - '+item.horaini+' - '+item.horafim}</div>
                         {/* <div class="schedule-time col-md-3">{item.horaini+' - '+item.horafim}</div> */}
                         <div class="schedule-activity col-md-8">
                             <h4>{item.titulo}</h4>
                             <p>{item.descricao}</p>
                         </div>
                     </div>
                    )
                  })
                }
                {/* <div class="schedule-row">
                  <div class="schedule-time">3:00 PM - 3:30 PM</div>
                  <div class="schedule-activity">
                    <h4>Opening Ceremony</h4>
                    <p>Welcome address by Principal and introduction to the event</p>
                  </div>
                </div>
                <div class="schedule-row">
                  <div class="schedule-time">3:30 PM - 4:30 PM</div>
                  <div class="schedule-activity">
                    <h4>Student Project Presentations</h4>
                    <p>Selected students showcase their scientific innovations</p>
                  </div>
                </div>
                <div class="schedule-row">
                  <div class="schedule-time">4:30 PM - 5:15 PM</div>
                  <div class="schedule-activity">
                    <h4>Guest Lecture</h4>
                    <p>Special lecture on "Future of Quantum Computing" by Dr. Robert Jenkins</p>
                  </div>
                </div>
                <div class="schedule-row">
                  <div class="schedule-time">5:15 PM - 5:45 PM</div>
                  <div class="schedule-activity">
                    <h4>Robotics Demonstration</h4>
                    <p>Live demonstration of student-built robots and automation projects</p>
                  </div>
                </div>
                <div class="schedule-row">
                  <div class="schedule-time">5:45 PM - 6:00 PM</div>
                  <div class="schedule-activity">
                    <h4>Award Ceremony &amp; Closing</h4>
                    <p>Distribution of certificates and recognition of outstanding projects</p>
                  </div>
                </div> */}
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
                <form>
                  <div class="mb-3">
                    <label for="name" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" id="name" required=""/>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required=""/>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">Telefone</label>
                    <input type="tel" class="form-control" id="phone"/>
                  </div>
                  <div class="mb-3">
                    <label for="student-type" class="form-label">Você é</label>
                    <select class="form-select" id="student-type">
                      <option selected="">Select an option</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="teacher">Teacher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="d-grid">
                    <button type="button" class="btn btn-register" onClick={(e)=>EnviaInscricao(e)}>Registrar</button>
                  </div>
                </form>
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
export default SectionCursos
