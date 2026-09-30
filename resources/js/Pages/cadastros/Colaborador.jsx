import { React, useEffect, useState, useRef, useMemo,memo  } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CBadge } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faMagnifyingGlassPlus,faMagnifyingGlassMinus,faCircleXmark  } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
registerLocale("ptBR", ptBR);



// The Main component receives props passed from the Laravel controller
const Colaborador = (props) => {
  console.log('estado:'+props.estadovalor)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadcidade, setLoadcidade] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [loadsaveimage, setLoadsaveimage] = useState(false)
  const [idcolaborador, setIdcolaborador] = useState(null)
  const [folder,setFolder] =  useState(null)//toast
  const [imagefolder,setImagefolder] =  useState(null)//toast
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [sexo, setSexo] = useState('')
  const [tipotelefone, setTipotelefone] = useState('')
  const [telefone, setTelefone] = useState('')
  const [faixa, setFaixa] = useState('')
  const [ocupacao, setOcupacao] = useState('')
  const [titulo, setTitulo] = useState('')
  const [ativo, setAtivo] = useState(false)
  const [listaestado, setListaestado] = useState([])
  const [listacidade, setListacidade] = useState([])
  const [listaocupacao, setListaocupacao] = useState([])
  const [estado, setEstado] = useState(21)
  const [cidade, setCidade] = useState(null)
  const [nascimento, setNascimento] = useState(null)
  const [cadastro, setCadastro] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)
  const [paramestado, setParamestado] = useState(props.estadovalor)
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  const style_imagem_plus = {width:'110%',zIndex:'20'}
  const style_imagem_minus = {width:'30%',zIndex:'20'}
  const [tamimagem,setTamimagem] = useState(style_imagem_minus)
  const [iconimagem,setIconimagem] = useState(faMagnifyingGlassPlus)
  const [memocidades,setMemocidades] = useState(false)
  //col_id_aco,col_name,col_cpf,col_email,col_tipo_telefone,col_telefone,col_ativo,col_created_at,col_updated_at,col_deleted_at

  useEffect(()=>{
    let data = formatDate(new Date());
    console.log('parametro:'+props.estadovalor)
    console.log('parametro_col:'+props.param)
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/estado?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/colaborador/${param}`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/cidade?listagem=S&estado=${paramestado}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/ocupacao?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })
                ]

            const responses = await Promise.all(requests);
            let result_estado = responses[0]
            let result_colaborador = responses[1]
            let result_cidade = responses[2]
            let result_ocupacao = responses[3]

            //lista estados
            setListaestado(result_estado.data.data)
            let array_city = result_cidade.data.data
            array_city.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
            setListacidade(array_city)
            let array_ocu = result_ocupacao.data.data
            array_ocu.unshift({ocu_id_ocu:'',ocu_descricao:'Selecione a Ocupacao'})
            setListaocupacao(array_ocu)
            //setListaocupacao((result_ocupacao.data.data))
            //listacidade.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})


            //colaboradors
            let ativock = result_colaborador.data.data.col_ativo === "1" ? true : false
            setIdcolaborador(result_colaborador.data.data.col_id_col)
            setNome(result_colaborador.data.data.col_name)
            setCpf(result_colaborador.data.data.col_cpf)
            setEmail(result_colaborador.data.data.col_email)
            setTipotelefone(result_colaborador.data.data.col_tipo_telefone)
            setTelefone(result_colaborador.data.data.col_telefone)
            setSexo(result_colaborador.data.data.col_sexo)
            setTitulo(result_colaborador.data.data.col_titulo)
            setCadastro(result_colaborador.data.data.col_created_at)
            setAtivo(ativock)
            setFaixa(result_colaborador.data.data.col_faixa)
            setOcupacao(result_colaborador.data.data.col_ocupacao)
            setEstado(result_colaborador.data.data.col_estado)
            setCidade(result_colaborador.data.data.col_cidade)
            let nasc = new Date(result_colaborador.data.data.col_nascimento_form)
            mudaData(nasc)
            if( result_colaborador.data.data.col_imagem != null ){
                let string = JSON.parse(result_colaborador.data.data.col_imagem)
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
                    axios.get(`${endpoint}/estado?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/cidade?listagem=S&estado=29`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/ocupacao?listagem=S`,{
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

                let result_estado = responses[0]
                let result_cidade = responses[1]
                let result_ocupacao = responses[2]
                let array_ocu = result_ocupacao.data.data
                array_ocu.unshift({ocu_id_ocu:'',ocu_descricao:'Selecione a Ocupacao'})
                setListaocupacao(array_ocu)
                setListaestado(result_estado.data.data)
                let array_city = result_cidade.data.data
                array_city.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
                setListacidade(array_city)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
    }
  },[])

  const listafaixas = [
    { faixa: '', descricao: 'Selecione a Faixa' },
    { faixa: '1', descricao: '0 à 19 Anos' },
    { faixa: '2', descricao: '20 à 59 Anos' },
    { faixa: '3', descricao: '60 ou mais' },
  ]

  const lista_estados = [
    { uf: 'AC', nome: 'Acre' },
    { uf: 'AL', nome: 'Alagoas' },
    { uf: 'AP', nome: 'Amapá' },
    { uf: 'AM', nome: 'Amazonas' },
    { uf: 'BA', nome: 'Bahia' },
    { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' },
    { uf: 'ES', nome: 'Espirito Santo' },
    { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' },
    { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MT', nome: 'Mato Grosso' },
    { uf: 'MG', nome: 'Minas Gerais' },
    { uf: 'PA', nome: 'Pará' },
    { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'PE', nome: 'Pernambuco' },
    { uf: 'PI', nome: 'Piauí' },
    { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'RN', nome: 'Rio Grande do Norte' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'RO', nome: 'Rondônia' },
    { uf: 'RR', nome: 'Roraima' },
    { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SP', nome: 'São Paulo' },
    { uf: 'SE', nome: 'Sergipe' },
    { uf: 'TO', nome: 'Tocantins' }
  ]

  const mudaData = (data) =>{
     console.log(data)
     setStartDate(data)
     let formattedDate = data.toISOString().slice(0, 10);
     setNascimento(formattedDate)
     console.log('format data:'+formattedDate)
  }

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
                // required
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

    if( erro == false && idcolaborador == null) {
        setLoadsave(true)
        const formData = new FormData()
        formData.append('col_name', nome)
        formData.append('col_cpf', cpf)
        formData.append('col_email', email)
        formData.append('col_sexo', sexo)
        formData.append('col_ocupacao', ocupacao)
        formData.append('col_titulo', titulo)
        formData.append('col_tipo_telefone', tipotelefone)
        formData.append('col_telefone', telefone)
        formData.append('col_nascimento', nascimento)
        formData.append('col_cidade', cidade)
        formData.append('col_estado', estado)
        let status = ativo ? 1 : 0
        formData.append('col_ativo', status)
        if(folder != null){
           let pal_dados_inf =  MontaJsonImagem()
           formData.append('col_imagem', pal_dados_inf)
           formData.append('has_image', true)
           formData.append('file', imagefolder)
        }
        axios
        .post(`${endpoint}/colaborador`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaColaboradores'
            setLoadsave(false)
            addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela(valor)
            }, 2000)
        })
    } else {
        setLoadsave(true)
        const formData = new FormData()
        formData.append('col_name', nome)
        formData.append('col_cpf', cpf)
        formData.append('col_email', email)
        formData.append('col_sexo', sexo)
        formData.append('col_tipo_telefone', tipotelefone)
        formData.append('col_ocupacao', ocupacao)
        formData.append('col_titulo', titulo)
        formData.append('col_telefone', telefone)
        formData.append('col_nascimento', nascimento)
        formData.append('col_cidade', cidade)
        formData.append('col_estado', estado)
        let status = ativo ? 1 : 0
        formData.append('col_ativo', status)
        if(folder != null && imagefolder != null ){
           let pal_dados_inf =  MontaJsonImagem()
           formData.append('col_imagem', pal_dados_inf)
           formData.append('has_image', true)
           formData.append('file', imagefolder)
        }
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/colaborador/${idcolaborador}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsave(false)
            addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                tela('ListaColaboradores')
            }, 2000)
        })
    }
 }

 const CompTelefone = () =>{
   return(
     <>
     <CFormLabel htmlFor="exampleForm">Telefone</CFormLabel>
     { tipotelefone == 1 ? <FixoInput telefone={telefone}/> : <CelularInput telefone={telefone}/>}
     <CFormFeedback invalid>{'Digite o Telefone do Colaborador'}</CFormFeedback>
     </>
   )
 }

 const CompEstados = () =>{
    return(
        listaestado.map((item,index)=>{
        return(
            <option key={index} value={item.est_id_est}>{item.est_sigla +' - '+item.est_nome}</option>
            )
        })
    )
 }


 const CompCidades = () =>{
    return(
        listacidade.map((item,index)=>{
        return(
            <option key={index} value={item.cid_id_cid}>{item.cid_descricao}</option>
            )
        })
    )
 }

 //const memoCidades = useMemo(() => <CompCidades active={memocidades} />, [memocidades]);

// const CompCidades = memo(function cidade({memocidades}) {
//   console.log("Rendered!");
//   return(
//         listacidade.map((item,index)=>{
//         return(
//             <option key={index} value={item.cid_id_cid}>{item.cid_descricao}</option>
//             )
//         })
//     )
//  })

 const CompOcupacao = (props) =>{
    return(
        listaocupacao.map((item,index)=>{
            return(
                <option key={index} value={item.ocu_id_ocu} selected>{item.ocu_descricao}</option>
            )
        })

    )
 }

 const mudaEstado = (valor) =>{
       setEstado(valor)
       setLoadcidade(true)
       let uf_filtro = listaestado.filter((item)=>item.est_id_est == valor)
       console.log(uf_filtro)
       axios.get(`${endpoint}/cidade?listagem=S&estado=${uf_filtro[0].est_codigo}`,{
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
            },
       })
       .then((result) => {
           setLoadcidade(false)
           setListacidade(result.data.data)
       });

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
        path:'equipe/'+folder,
        exibe:true
    }
    arrayitens.push(obj)
    objfinal = {
        "meta":arrayitens
    }
    return JSON.stringify(objfinal)
  }


  const ImagemPalestra = () =>{
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
                          idcolaborador != null ?
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
                       <img style={tamimagem} data-aos="zoom-in" src={imagem + 'equipe/'+folder}/>
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


  const SalvarImagem = (event) =>{
        setLoadsaveimage(true)
        event.preventDefault()
        event.stopPropagation()
        let col_dados_inf =  MontaJsonImagem()
        const formData = new FormData()
        formData.append('file', imagefolder)
        formData.append('has_only_image', true)
        formData.append('col_id_col', idcolaborador)
        formData.append('col_imagem', col_dados_inf)
        if(imagefolder == null){
                addToast(CompToast('Nenhuma Imagem foi Selecionada', 'danger')) //--> usa toast
                setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                    setLoadsaveimage(false)
                }, 2000)
                return
        }
        formData.append('_method', 'put')
        axios.post(`${endpoint}/colaborador/${idcolaborador}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsaveimage(false)
            //setImagesaved(true)
            addToast(CompToast('Imagem Atualizada com sucesso !!!', 'success')) //--> usa toast
            //setIdeventoitem(result.data.enventoitemid)
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                //setEstimg(!estimg)
            }, 2000)
            //setListacidade(result.data.data)
        });

  }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" data-aos="fade-up">
          <h2> Colaboradores </h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Colaboradors</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idNome"
                                    label="Colaborador"
                                    placeholder="Digite o nome do Colaborador"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={nome}
                                    feedbackInvalid="O nome precisa ser preenchido"
                                    required
                                    onChange={(e)=>setNome(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<><CFormLabel htmlFor="exampleForm">CPF</CFormLabel>
                                <CPFInput cpf={cpf}/>
                                <CFormFeedback invalid>{'Digite o CPF do Colaborador'}</CFormFeedback>
                                </>
                                )}

                            </CCol>
                           <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idEmail"
                                    label="Email"
                                    placeholder="Digite o Email do Colaborador"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={email}
                                    feedbackInvalid="O Email precisa ser preenchido"
                                    required
                                    onChange={(e)=>setEmail(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idTipoTelefone"
                                    label="Tipo de Telefone"
                                    feedbackInvalid="O Tipo de Telefone deve ser informado"
                                    value={tipotelefone}
                                    onChange={(e)=>mudaTipoTelefone(e,e.target.value)}
                                    required
                                >
                                <option value="">Selecione...</option>
                                <option value="1">Fixo</option>
                                <option value="2">Celular</option>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CompTelefone/>
                                )}
                                {/* <CFormLabel htmlFor="exampleForm">Telefone</CFormLabel>
                                { tipotelefone == 1 ? <FixoInput telefone={telefone}/> : <CelularInput telefone={telefone}/>}
                                <CFormFeedback invalid>{'Digite o Telefone do Colaborador'}</CFormFeedback> */}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idSexo"
                                    label="Sexo"
                                    value={sexo}
                                    feedbackInvalid="O Sexo deve ser informado"
                                    onChange={(e)=>setSexo(e.target.value)}
                                    required
                                >
                                <option value="">Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outros</option>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idTitulo"
                                    label="Título"
                                    placeholder="Digite o Titulo de Exbição do Colaborador"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={titulo}
                                    feedbackInvalid="O Título precisa ser preenchido"
                                    required
                                    onChange={(e)=>setTitulo(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={12}>
                                <ImagemPalestra/>
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idEstado"
                                    label="Estado"
                                    value={estado}
                                    feedbackInvalid="O Estado deve ser informado"
                                    onChange={(e)=>mudaEstado(e.target.value)}
                                    required
                                >
                                <CompEstados/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage || loadcidade
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idCidade"
                                    label="Cidade"
                                    value={cidade}
                                    feedbackInvalid="A Cidade deve ser informado"
                                    onChange={(e)=>setCidade(e.target.value)}
                                    required
                                >
                                <CompCidades ok={memocidades}/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idOcupacao"
                                    label="Ocupacao"
                                    value={ocupacao}
                                    feedbackInvalid="A Ocupacao deve ser informada"
                                    onChange={(e)=>setOcupacao(e.target.value)}
                                    required
                                >
                                <CompOcupacao val={ocupacao}/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Data de Nascimento</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    locale="ptBR"
                                    dateFormat="dd/MM/yyyy"
                                    showIcon
                                    selected={startDate}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => mudaData(date)}
                                    />
                                    </>
                                //    <DatePicker dateFormat="dd/MM/yyyy" showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                                // <CFormInput
                                //     id="idNascimento"
                                //     label="Nascimento"
                                //     placeholder="Digite a Data de Nascimento"
                                //     aria-label="Example text with button addon"
                                //     aria-describedby="button-addon1"
                                //     defaultValue={email}
                                //     feedbackInvalid="A Digite a Data de Nascimento precisa ser preenchido"
                                //     required
                                //     onChange={(e)=>setEmail(e.target.value)}
                                // />
                                )}
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
                                    label="Colaborador Ativo"
                                    feedbackInvalid="Informe se Colaborador esta Ativo"
                                    checked={ativo}
                                    onChange={(e)=>setAtivo(e.target.checked)}
                                    required
                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
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
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaColaboradores')}>Listar</CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default Colaborador
