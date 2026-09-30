import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,CRow,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CFormTextarea,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,CBadge } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson,faSave,faMagnifyingGlassPlus,faMagnifyingGlassMinus,faCircleXmark  } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props Fortalecimentod from the Laravel controller
const Livros = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idlivro, setIdlivro] = useState(null)
  //liv_id_liv,liv_id_aut,liv_id_edi,liv_titulo,liv_traducao,liv_sinopse,
  // liv_isbn,liv_paginas,liv_created_at,liv_updated_at,liv_deleted_at
  const [autor, setAutor] = useState('')
  const [editora, setEditora] = useState('')
  const [titulo, setTitulo] = useState('')
  const [traducao, setTraducao] = useState(null)
  const [sinopse, setSinopse] = useState('')
  const [paginas, setPaginas] = useState(null)
  const [isbn, setIsbn] = useState('0000000000000')
  const [edicao, setEdicao] = useState(null)
  const [ativo,setAtivo] = useState(false)
  const [listaeditora, setListaeditora] = useState([])
  const [listaautor, setListaautor] = useState([])
  const [cadastro, setCadastro] = useState('')
  const [loadsaveimage, setLoadsaveimage] = useState(false)
  const [folder,setFolder] =  useState(null)//toast
  const [imagefolder,setImagefolder] =  useState(null)//toast
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  const style_imagem_plus = {width:'110%',zIndex:'20'}
  const style_imagem_minus = {width:'30%',zIndex:'20'}
  const [tamimagem,setTamimagem] = useState(style_imagem_minus)
  const [iconimagem,setIconimagem] = useState(faMagnifyingGlassPlus)

   useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/autor?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/editora?listagem=S&estado=29`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/livro/${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })
                ]

            const responses = await Promise.all(requests);
            let result_autor = responses[0]
            let result_editora = responses[1]
            let result_livro = responses[2]

            //lista estados
            setListaautor(result_autor.data.data)
            setListaeditora(result_editora.data.data)


            //acolhidos
            //let ativock = result_livro.data.data.aco_ativo == 1 ? true : false
            //liv_id_liv,liv_id_aut,liv_id_edi,liv_titulo,liv_traducao,liv_sinopse,liv_isbn,liv_paginas,liv_edicao,liv_imagem,liv_created_at,liv_updated_at,liv_deleted_at
            setIdlivro(result_livro.data.data.liv_id_liv)
            setTitulo(result_livro.data.data.liv_titulo)
            setAutor(result_livro.data.data.liv_id_aut)
            setEditora(result_livro.data.data.liv_id_edi)
            setTraducao(result_livro.data.data.liv_traducao)
            setSinopse(result_livro.data.data.liv_sinopse)
            setIsbn(result_livro.data.data.liv_isbn)
            setCadastro(result_livro.data.data.liv_created_at)
            setPaginas(result_livro.data.data.liv_paginas)
            setEdicao(result_livro.data.data.liv_edicao)
            let ck = result_livro.data.data.liv_ativo == 1 ? true : false
            setAtivo(ck)
            if( result_livro.data.data.liv_imagem != null ){
                let string = JSON.parse(result_livro.data.data.liv_imagem)
                setFolder(string["meta"][0].imagem)
            }
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
                    axios.get(`${endpoint}/autor?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/editora?listagem=S&estado=29`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })
                    //,
                    //    axios.get(`${endpoint}/pacote?listagem=S`,{
                    //         headers: {
                    //             Accept: 'application/json',
                    //             'Content-Type': 'multipart/form-data',
                    //             Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                    //         },
                    //    })
                ]
                const responses = await Promise.all(requests);

                let result_autor = responses[0]
                let result_editora = responses[1]
                let obj = null
                let vet = result_autor.data.data
                obj= {
                  'aut_id_aut':'',
                  'aut_nome':'Selecione o Autor'
                }
                vet.unshift(obj)
                setListaautor(vet)
                obj= {
                  'edi_id_edi':'',
                  'edi_descricao':'Selecione a Editora'
                }
                vet = result_editora.data.data
                vet.unshift(obj)
                setListaeditora(vet)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
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

  const  handleSave = (erro) =>{

    if( erro == false && idlivro == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        //liv_id_liv,liv_id_aut,liv_id_edi,liv_titulo,liv_traducao,liv_sinopse,
  // liv_isbn,liv_paginas,liv_created_at,liv_updated_at,liv_deleted_at

        formData.append('liv_id_aut', autor)
        formData.append('liv_id_edi', editora)
        formData.append('liv_titulo', titulo)
        formData.append('liv_traducao', traducao)
        formData.append('liv_sinopse', sinopse)
        formData.append('liv_isbn', isbn)
        formData.append('liv_paginas', paginas)
        formData.append('liv_edicao', edicao)
        formData.append('liv_imagem', MontaJsonImagem())
        let ck  = ativo ? 1 : 0
        formData.append('liv_ativo', ck)
        if(imagefolder != null > 0){
           formData.append('has_image', true)
           formData.append('file', imagefolder)
        }
        axios
        .post(`${endpoint}/livro`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaLivros'
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
        formData.append('liv_id_aut', autor)
        formData.append('liv_id_edi', editora)
        formData.append('liv_titulo', titulo)
        formData.append('liv_traducao', traducao)
        formData.append('liv_sinopse', sinopse)
        formData.append('liv_isbn', isbn)
        formData.append('liv_paginas', paginas)
        formData.append('liv_edicao', edicao)
        formData.append('liv_imagem', MontaJsonImagem())
        let ck  = ativo ? 1 : 0
        formData.append('liv_ativo', ck)
        if(imagefolder != null ){
           formData.append('has_image', true)
           formData.append('file', imagefolder)
        }
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/livro/${idlivro}`, formData, {
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
                tela('ListaLivros')
            }, 2000)
        })
    }
 }

const CompAutores = () =>{
    return(
        listaautor.map((item,index)=>{
        return(
            <option key={index} value={item.aut_id_aut}>{item.aut_nome}</option>
            )
        })
    )
 }

 const CompEditoras = () =>{
    return(
        listaeditora.map((item,index)=>{
        return(
            <option key={index} value={item.edi_id_edi}>{item.edi_descricao}</option>
            )
        })
    )
 }

 const IsbnInput = (props) => {
       const [value, setValue] = useState(props.valor)
         return (
             <IMaskInput
                 className="form-control"
                //  type="number"
                 mask='0000000000000' // Define o tipo da máscara como numérico
                 signed={false} // Se permite números negativos
                 // Captura o valor aceito (pode ser unmasked ou typed)
                 onAccept={(value, mask) => {
                    setValue(value);
                 }}
                 //onBlur = {(e)=>handleBlur(e,'desconto')}
                 onBlur = {()=>setIsbn(value)}
                 defaultValue={value}
                 placeholder="0000000000000"
                 required
             />
         );
   }

 const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
       setFolder(event.target.files[0].name)
       setImagefolder(event.target.files[0])
    }
  }

  const onRemoveAnexo = (event,id) => {
     setFolder(null)
     setImagefolder(null)
  }

  const MontaJsonImagem = () =>{

    let arrayitens = []
    let obj = null
    let objfinal = null
    arrayitens = []
    obj ={
        imagem:folder,
        path:'livraria/'+folder,
        exibe:true
    }
    arrayitens.push(obj)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
 }



 const ImagemLivro = () =>{
    return (
        <CRow className='mt-3'>
            <CCol md={8}>
            <CFormLabel htmlFor="exampleFormControlInput1">Imagem do Colaborador</CFormLabel><br/>
            <CInputGroup className="mb-3">
                    <CFormInput
                        type="file"
                        id="inputGroupFile02"
                        onChange={(e)=>onImageChange(e)}
                    />
                    {
                    idlivro != null ?
                    (<CInputGroupText as="label" style={{cursor:'pointer'}} htmlFor="inputGroupFile02" onClick={(e)=>SalvarImagem(e)}>
                        Upload&nbsp;{loadsaveimage? <CSpinner size="sm" /> : ''}
                    </CInputGroupText>)
                    :(<></>)
                    }
                </CInputGroup>
                <div className="text-start" style={{display:'flex',gap:'5px',paddingBottom:'1px'}}>
                <FontAwesomeIcon size="lg" style={{color:'red',cursor:'pointer'}} icon={faCircleXmark} onClick={(e)=>onRemoveAnexo(e)}/>
                {folder && <p>Arquivo Selecionado: <CBadge color="primary">{folder}</CBadge></p>}
                </div>
            </CCol>
            { folder != null ?
            (<CCol md={4} className='mt-3 mb-3'>
            <div className="containerimg">
                <img style={tamimagem} data-aos="zoom-in" src={imagem + 'livraria/'+folder}/>
            </div>
            <div style={{position:'relative',top:'-125px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'21'}}>
                <FontAwesomeIcon size="lg" style={{color:'blue',cursor:'pointer'}} icon={iconimagem} onClick={(e)=>expande(e)}/>
            </div>
            </CCol>)
            :('')}
        </CRow>
    )
  }

  const expande = (event) =>{
      if(iconimagem === faMagnifyingGlassPlus){
          setTamimagem(style_imagem_plus)
          setIconimagem(faMagnifyingGlassMinus)
      } else {
          setTamimagem(style_imagem_minus)
          setIconimagem(faMagnifyingGlassPlus)
      }
  }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'400px'}} data-aos="fade-up">
          <h2>Livros</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Livros</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idTitulo"
                                    label="Descrição do Título"
                                    placeholder="Digite a Título do Livro"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={titulo}
                                    feedbackInvalid="O Título precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTitulo(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idAutor"
                                    label="Autor"
                                    value={autor}
                                    feedbackInvalid="O Autor deve ser informado"
                                    onChange={(e)=>setAutor(e.target.value)}
                                    required
                                >
                                 <CompAutores/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={8}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormTextarea
                                    id="idSinopse"
                                    label="Sinopse do Livro"
                                    placeholder="Digite a Sinopse do Livro"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    rows={6}
                                    defaultValue={sinopse}
                                    feedbackInvalid="A Sinopse precisa ser preenchida"
                                    required
                                    onChange={(e)=>setSinopse(e.target.value)}
                                    style={{fontSize:'12px'}}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idEditora"
                                    label="Editora"
                                    value={editora}
                                    feedbackInvalid="A Editora deve ser informada"
                                    onChange={(e)=>setEditora(e.target.value)}
                                    required
                                >
                                 <CompEditoras/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idTraducao"
                                    label="Nome do Tradutor"
                                    placeholder="Digite Nome do Tradutor"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={traducao}
                                    feedbackInvalid="O Nome do Tradutor precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTraducao(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idEdicao"
                                    type="number"
                                    label="Nº Edição"
                                    placeholder="Digite Nº Edição"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={edicao}
                                    feedbackInvalid="O Nº Edição da  precisa ser preenchida"
                                    required
                                    onChange={(e)=>setEdicao(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idEdicao"
                                    type="number"
                                    label="Nº Páginas"
                                    placeholder="Digite Nº de Páginas"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={paginas}
                                    feedbackInvalid="O Nº de Páginas da precisa ser preenchido"
                                    required
                                    onChange={(e)=>setPaginas(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                // <CFormInput
                                //     id="idisbn"
                                //     label="Nº ISBN"
                                //     placeholder="Digite Nº ISBN"
                                //     aria-label="Example text with button addon"
                                //     aria-describedby="button-addon1"
                                //     defaultValue={isbn}
                                //     feedbackInvalid="O Nº ISBN da  precisa ser preenchida"
                                //     required
                                //     onChange={(e)=>setIsbn(e.target.value)}
                                // />
                                <>
                                <CFormLabel htmlFor="exampleForm">Nº ISBN</CFormLabel>
                                <IsbnInput valor={isbn}/>
                                <CFormFeedback invalid>{'Digite o Numero ISBN'}</CFormFeedback>
                                </>
                                )}
                            </CCol>
                            <CCol md={12}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<ImagemLivro/>)}
                            </CCol>
                            <CCol md={4}>
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
                            <CCol xs={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Livro Ativo"
                                    feedbackInvalid="Informe se Cursos foi Ativo"
                                    checked={ativo}
                                    onChange={(e)=>setAtivo(e.target.checked)}

                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaLivros')}>Listar</CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default Livros
