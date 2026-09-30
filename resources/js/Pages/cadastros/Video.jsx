import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props PublicoAlvod from the Laravel controller
const Video = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idvideo, setIdvideo] = useState(null)
  //vid_id_vid,vid_id_cav,vid_descricao,vid_hash_link,vid_ativo,vid_created_at,vid_updated_at,vid_deleted_at
  const [categoria, setCategoria] = useState('')
  const [hashvideo, setHashvideo] = useState('')
  const [ativo, setAtivo] = useState(true)
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [listacategoriavideo, setListacategoriavideo] = useState([])
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}


  useEffect(()=>{
      let data = formatDate(new Date());
      setCadastro(data)
      if( props.param != null){
          const fetchData = async () =>{
             try {
                  setLoadpage(true)
                  const requests = [
                      axios.get(`${endpoint}/categoriavideo?listagem=S`,{
                              headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'multipart/form-data',
                                  Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                              },
                      }),
                      axios.get(`${endpoint}/video/${param}`,{
                              headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'multipart/form-data',
                                  Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                              },
                      })
                  ]

                  const responses = await Promise.all(requests);
                  let result_categoria= responses[0]
                  let result_video= responses[1]
                  let array_cat = result_categoria.data.data
                  array_cat.unshift({cav_id_cav:'',cav_descricao:'Selecione a Categoria'})
                  setListacategoriavideo(array_cat)
                  //vid_id_vid,vid_id_cav,vid_descricao,vid_hash_link,vid_ativo,vid_created_at,vid_updated_at,vid_deleted_at
                  setIdvideo(result_video.data.data.vid_id_vid)
                  setDescricao(result_video.data.data.vid_descricao)
                  setCategoria(result_video.data.data.vid_id_cav)
                  setHashvideo(result_video.data.data.vid_hash_link)
                  let ck = result_video.data.data.vid_ativo == 1 ? true : false
                  setAtivo(ck)
                  setCadastro(result_video.data.data.vid_created_at)
                  setLoadpage(false)
              }
              catch (error) {
                  console.error("One of the requests failed", error);
              }
          }
          fetchData()
      } else {
         const fetchData = async () => {

              try {
                  setLoadpage(true)
                  const requests = [
                      axios.get(`${endpoint}/categoriavideo?listagem=S`,{
                              headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'multipart/form-data',
                                  Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                              },
                      }),
                  ]
                  const responses = await Promise.all(requests);
                  let result_categoria= responses[0]
                  let array_cat = result_categoria.data.data
                  array_cat.unshift({cav_id_cav:'',cav_descricao:'Selecione a Categoria'})
                  setListacategoriavideo(array_cat)
                  setLoadpage(false)
                  setLoad(false)
              }
              catch (error) {
                  console.error("One of the requests failed", error);
              }
          }
          fetchData()
      }
  },[])

  /*
  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
       setLoadpage(true)
       axios
        .get(`${endpoint}/categoriavideo/${param}`, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setIdvideo(result.data.data.cav_id_cav)
            setDescricao(result.data.data.cav_descricao)
            setCadastro(result.data.data.cav_created_at)
            console.log('teste')
            setLoadpage(false)
        })
    } else {
       setLoadpage(false)
    }
  },[])
  */

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

    if( erro == false && idvideo == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        //vid_id_vid,vid_id_cav,vid_descricao,vid_hash_link,vid_ativo,vid_created_at,vid_updated_at,vid_deleted_at
        formData.append('vid_id_cav', categoria)
        formData.append('vid_descricao', descricao)
        formData.append('vid_hash_link', hashvideo)
        let ck = ativo ? 1 : 0
        formData.append('vid_ativo',ck)
        axios
        .post(`${endpoint}/video`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaVideos'
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
        formData.append('vid_id_cav', categoria)
        formData.append('vid_descricao', descricao)
        formData.append('vid_hash_link', hashvideo)
        let ck = ativo ? 1 : 0
        formData.append('vid_ativo',ck)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/video/${idvideo}`, formData, {
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
                tela('ListaVideos')
            }, 2000)
        })
    }
 }

 const CompCategoria = () =>{
        //listacidade.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
      return(
         listacategoriavideo.map((item,index)=>{
            return(
                <option key={index} value={item.cav_id_cav}>{item.cav_descricao}</option>
                )
        })
      )
 }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'600px'}} data-aos="fade-up">
          <h2> Vídeos</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Vídeos</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idvideo"
                                    label="Descrição Vídeo"
                                    placeholder="Digite o descricao do Video" 
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={descricao}
                                    feedbackInvalid="A Descrição precisa ser preenchida"
                                    required
                                    onChange={(e)=>setDescricao(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idCategoria"
                                    label="Categoria do Vídeo"
                                    value={categoria}
                                    feedbackInvalid="A Categoria do Vídeo deve ser informada"
                                    onChange={(e)=>setCategoria(e.target.value)}
                                    required
                                >
                                <CompCategoria/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idhash"
                                    label="Hash do Vídeo"
                                    placeholder="Digite o Hash do Video" 
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={hashvideo}
                                    feedbackInvalid="O Hash do Vídeo precisa ser preenchida"
                                    required
                                    onChange={(e)=>setHashvideo(e.target.value)}
                                />)}
                            </CCol>
                             <CCol xs={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Vídeo Ativo"
                                    feedbackInvalid="Informe se Acolhido esta Ativo"
                                    checked={ativo}
                                    onChange={(e)=>setAtivo(e.target.checked)}
                                    required
                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormInput
                                    type="text"
                                    id="IdCadastro"
                                    label="Cadastro"
                                    defaultValue={cadastro}
                                    feedbackInvalid="Please provide a valid zip."
                                    readOnly
                                    required
                                />)}
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaVideos')}>Listar</CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default Video
