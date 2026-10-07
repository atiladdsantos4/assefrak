import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CPagination,CPaginationItem,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CBadge} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import AOS from 'aos';
registerLocale("ptBR", ptBR);



// The Main component receives props passed from the Laravel controller
const Acolhido = (props) => {
  console.log('estado:'+props.estadovalor)
  const { tela,altera,setacolhido } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadcidade, setLoadcidade] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idacolhido, setIdacolhido] = useState(null)
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [sexo, setSexo] = useState('')
  const [tipotelefone, setTipotelefone] = useState('')
  const [telefone, setTelefone] = useState('')
  const [faixa, setFaixa] = useState('')
  const [ativo, setAtivo] = useState(false)
  const [listaestado, setListaestado] = useState([])
  const [listacidade, setListacidade] = useState([])
  const [estado, setEstado] = useState(21)
  const [cidade, setCidade] = useState(null)
  const [nascimento, setNascimento] = useState(null)
  const [cadastro, setCadastro] = useState('')
  const [startDate, setStartDate] = useState();
  const [saved,setSaved] = useState(false)
  const [temtratamento,setTemtratamento] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)
  const [paramestado, setParamestado] = useState(props.estadovalor)
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //rotina listagem
  const [pesquisar,setPesquisar] = useState('')
  const [load, setLoad] = useState(false)
  const [listatratamento,setListatratamento] = useState([])
  const [listafiltro,setListafiltro] = useState([])
  const [est,setEst] = useState(false)
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  //aco_id_aco,aco_name,aco_cpf,aco_email,aco_tipo_telefone,aco_telefone,aco_ativo,aco_created_at,aco_updated_at,aco_deleted_at


   const arraylabels = [
    {textclass:'',classe:''},
    {textclass:'light',classe:'badge2'},
    {textclass:'light',classe:'badge1'},
    {textclass:'light',classe:'badge4'},
    {textclass:'light',classe:'badge3'},
    {textclass:'light',classe:'badge5'},
    {textclass:'dark',classe:'badge6'},
   ]
      /*
         1	Tratamento Inicializado
         2	Tratamento em Andamento
         3	Tratamento Reinicializado
         4	Tratamento Finalizado
         6	Tratamento em Aberto
         5	Tratamento Cancelado
     */

  const closeModal = () =>{
     setOpenmodal(false)
  }

  useEffect(()=>{
    AOS.init({
          // Força o AOS a ouvir o scroll deste elemento específico em vez da window
          container: '.scction-title',
    });
    let data = formatDate(new Date());
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
                    axios.get(`${endpoint}/acolhido/${param}`, {
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
                    axios.get(`${endpoint}/tratamento?listagem=S&acolhido=${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })
                ]

            const responses = await Promise.all(requests);
            let result_estado = responses[0]
            let result_acolhido = responses[1]
            let result_cidade = responses[2]
            let result_tratamento = responses[3]
            if(result_tratamento.data.data.length > 0){
              console.log('tem tratamento')
              setListatratamento(result_tratamento.data.data.sort((a,b)=>b.tra_id_tra - a.tra_id_tra))
              setListafiltro(result_tratamento.data.data.sort((a,b)=>b.tra_id_tra - a.tra_id_tra))
              setTemtratamento(true)
              setLoad(true)
            }

            //lista estados
            setListaestado(result_estado.data.data)
            setListacidade(result_cidade.data.data)


            //acolhidos
            let ativock = result_acolhido.data.data.aco_ativo == 1 ? true : false
            setIdacolhido(result_acolhido.data.data.aco_id_aco)
            setNome(result_acolhido.data.data.aco_name)
            setCpf(result_acolhido.data.data.aco_cpf)
            setEmail(result_acolhido.data.data.aco_email)
            setTipotelefone(result_acolhido.data.data.aco_tipo_telefone)
            setTelefone(result_acolhido.data.data.aco_telefone)
            setSexo(result_acolhido.data.data.aco_sexo)
            setCadastro(result_acolhido.data.data.aco_created_at)
            setAtivo(ativock)
            setFaixa(result_acolhido.data.data.aco_faixa)
            setEstado(result_acolhido.data.data.aco_estado)
            setCidade(result_acolhido.data.data.aco_cidade)
            let nasc = new Date(result_acolhido.data.data.aco_nascimento_form)
            mudaData(nasc)
            console.log('teste')
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
                setListaestado(result_estado.data.data)
                setListacidade(result_cidade.data.data)
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

    if( erro == false && idacolhido == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('aco_name', nome)
        formData.append('aco_cpf', cpf)
        formData.append('aco_email', email)
        formData.append('aco_sexo', sexo)
        formData.append('aco_tipo_telefone', tipotelefone)
        formData.append('aco_telefone', telefone)
        formData.append('aco_faixa', faixa)
        formData.append('aco_nascimento', nascimento)
        formData.append('aco_cidade', cidade)
        formData.append('aco_estado', estado)
        let status = ativo ? 1 : 0
        formData.append('aco_ativo', status)
        axios
        .post(`${endpoint}/acolhido`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaAcolhidos'
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
        formData.append('aco_name', nome)
        formData.append('aco_cpf', cpf)
        formData.append('aco_email', email)
        formData.append('aco_sexo', sexo)
        formData.append('aco_tipo_telefone', tipotelefone)
        formData.append('aco_telefone', telefone)
        formData.append('aco_faixa', faixa)
        formData.append('aco_nascimento', nascimento)
        formData.append('aco_cidade', cidade)
        formData.append('aco_estado', estado)
        let status = ativo ? 1 : 0
        formData.append('aco_ativo', status)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/acolhido/${idacolhido}`, formData, {
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
                tela('ListaAcolhidos')
            }, 2000)
        })
    }
 }

 const CompTelefone = () =>{
   return(
     <>
     <CFormLabel htmlFor="exampleForm">Telefone</CFormLabel>
     { tipotelefone == 1 ? <FixoInput telefone={telefone}/> : <CelularInput telefone={telefone}/>}
     <CFormFeedback invalid>{'Digite o Telefone do Acolhido'}</CFormFeedback>
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

 const CompFaixas = () =>{
    return(
        listafaixas.map((item,index)=>{
        return(
            <option key={index} value={item.faixa}>{item.descricao}</option>
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

  //rotinas listagem
  const QtdeRegistrosPagina = () =>{
      return(
          <CFormSelect
              value={qtderegistrospagina}
              onChange={(e)=>setQtderegistrospagina(e.target.value)}
              >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
          </CFormSelect>
      )
  }

  const pesquisarGrid = (event) => {
       //console.log(listafiltro)
       //console.log(event.target.value)
       let valor =  event.target.value
       if( valor.trim() != ''){
          let lista = listafiltro.filter(
              (item)=>item.tra_acolhido.toLowerCase().includes(valor.toLowerCase()) ||
                      item.tra_status.toLowerCase().includes(valor.toLowerCase()) ||
                      item.tra_tipo.toLowerCase().includes(valor.toLowerCase()) ||
                      item.tra_colaborador.toLowerCase().includes(valor.toLowerCase())
          )
          //listafiltro.filter((item)=> item.tes_id_tes == event.target.value)
          console.log(lista)
          setListatratamento(lista.slice(0,qtderegistrospagina))
       } else {
          setListatratamento(listafiltro.slice(0,qtderegistrospagina))
       }
    }


    //--> Exibe o componente de paginação
    const PaginationExibe = (props) => {
       return(
          // <div style={{fontSize:'14px',paddingLeft:'3px',paddingRight:'3px',backgroundColor:'#722E56',color:'white',display:'flex',borderRadius:'5px 5px 5px 5px'}}>
          <div className='exibepagination'>
              <div>Pagina:&nbsp;{props.pagina}&nbsp;</div>
              <div>Regitros:&nbsp;{registroini+'...'+registrofim+' num Total de '+qtderegistros}</div>
         </div>
       )
    }

    const PreviousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual < ultimapagina){
         page = page + 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    const PriousPage =(event)=>{
      let page = paginaatual
      console.log('paginaatual:'+paginaatual)
      console.log('ultimapagina:'+ultimapagina)
      if(paginaatual > 1){
         page = page - 1
         console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    //--> Efetuar a pesquisa pelo click
    const clickPagination = (event,idx) =>{
      //  0,5,5,10
      setPaginaatual(idx)
      let ref = idx == 1 ? 0 : idx
      let inicio = ref == 0 ? ref : (ref * qtderegistrospagina) - qtderegistrospagina
      let fim = idx * qtderegistrospagina
      let lista = null
      lista = listafiltro.slice(inicio,fim)
      setRegistroini(inicio+1)
      if(fim > qtderegistros){
         setRegistrofim(qtderegistros)
      } else {
         setRegistrofim(fim)
      }
      setListatratamento(lista)
    }

    const Pagination = (props) => {
      let elemento = []

      for(let i = 1; i <= props.pages; i++ ){
        if( i == paginaatual){
           elemento.push(<CPaginationItem active={true} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        } else {
           elemento.push(<CPaginationItem active={false} className='cpointer cl_pagination' onClick={(e)=>clickPagination(e,i)}>{i}</CPaginationItem>)
        }
      }

      return (
          <CPagination aria-label="Page navigation example">
              <CPaginationItem className='cpointer' aria-label="Previous" onClick={(e)=>PriousPage(e)}>
                  <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              { elemento }
              <CPaginationItem className='cpointer' aria-label="Next" onClick={(e)=>PreviousPage(e)}>
                  <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
          </CPagination>
      )
  }

  const CorpoTabela = (props) =>{
        let classe = null
        let cont = 0
        let cl = null
        return(
           props.lista.map((item,index)=>{
              cont++
              classe = index % 2 == 0 ? 'primary' : 'secondary'
              cl = arraylabels[item.tra_id_stt]
              if(cont > qtderegistrospagina){
                 return
              } else {
                 return(
                  <CTableRow color={classe}>
                      <CTableDataCell>#</CTableDataCell>
                      <CTableDataCell style={{textAlign:'center'}}>{item.tra_id_tra}</CTableDataCell>
                      <CTableDataCell>{item.tra_acolhido}</CTableDataCell>
                      <CTableDataCell>{item.tra_tipo}</CTableDataCell>
                      <CTableDataCell>{item.tra_colaborador}</CTableDataCell>
                      <CTableDataCell style={{textAlign:'left'}}><CBadge textColor={cl.textclass} className={cl.classe}>{item.tra_status}</CBadge></CTableDataCell>
                      <CTableDataCell>{item.tra_created_at}</CTableDataCell>
                      <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.tra_id_tra} acolhido={item.tra_id_aco}/></CTableDataCell>
                  </CTableRow>
                 )
              }
           })
        )
  }

  //--> Display dos Ícones no grid
  const ItensAcao = (props) => {
    return(
       <>
       <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
       &nbsp;
       <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id,props.acolhido)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
       </>
    )
  }

  const EditaRegistro = (event,valor,acolhido) =>{
      altera(valor)
      setacolhido(acolhido)
      tela('Tratamento')
  }



  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" data-aos="fade-up">
          <h2>Acolhidos</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard className='card_bottom mb-4'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Acolhidos</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idNome"
                                    label="Acolhido"
                                    placeholder="Digite o nome do Acolhido"
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
                                <CFormFeedback invalid>{'Digite o CPF do Acolhido'}</CFormFeedback>
                                </>
                                )}

                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idEmail"
                                    label="Email"
                                    placeholder="Digite o Email do Acolhido"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    defaultValue={email}
                                    feedbackInvalid="O Email precisa ser preenchido"
                                    required
                                    onChange={(e)=>setEmail(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={4}>
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
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CompTelefone/>
                                )}
                                {/* <CFormLabel htmlFor="exampleForm">Telefone</CFormLabel>
                                { tipotelefone == 1 ? <FixoInput telefone={telefone}/> : <CelularInput telefone={telefone}/>}
                                <CFormFeedback invalid>{'Digite o Telefone do Acolhido'}</CFormFeedback> */}
                            </CCol>
                            <CCol md={4}>
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
                                <CompCidades/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idFaixa"
                                    label="Faixa de Idade"
                                    value={faixa}
                                    feedbackInvalid="A Faixa de idade deve ser informado"
                                    onChange={(e)=>setFaixa(e.target.value)}
                                    required
                                >
                                <CompFaixas/>
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
                                { validated && startDate == null ?
                                   (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data de Nascimento deve ser prenchida </div>)
                                  : (<></>)}

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
                                    label="Acolhido Ativo"
                                    feedbackInvalid="Informe se Acolhido esta Ativo"
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
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaAcolhidos')}>Listar</CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
            {
              temtratamento ? (
                <CCard className='card_bottom mb-4'>
                   <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Histórico de Tratamentos do Acolhido</CCardHeader>
                   <CCardBody className='mt-1 mb-4'>
                        <div style={{display:'flex'}}>
                            <div style={{flex:'1'}}>
                                <CInputGroup style={{maxWidth:'400px'}} className="mb-2 mt-2">
                                    <CInputGroupText style={props.estilo} className="clinputtext">Pesquisar</CInputGroupText>
                                    <CFormInput placeholder={'Digite um valor'} value={pesquisar} onChange={(e)=>pesquisarGrid(e)}/>
                                </CInputGroup>
                            </div>
                            <div style={{justifySelf:'end',alignSelf:'end'}}>
                                <CInputGroup style={{maxWidth:'200px'}} className="mb-2 mt-2">
                                    <CInputGroupText style={props.estilo} className="clinputtext">Qtde Registros</CInputGroupText>
                                    <QtdeRegistrosPagina/>
                                </CInputGroup>
                            </div>
                        </div>
                        <CTable className='tabela'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' scope="col">Nº Tratamento</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' scope="col">Acolhido</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' scope="col">Tipo</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' scope="col">Colaborador</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' scope="col">Status</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                    <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {load
                                ? (<CorpoTabela lista={listatratamento} estado={est}/>)
                                : (<CTableRow><CTableDataCell colspan="9" style={{textAlign:'center'}}><CSpinner color="info"></CSpinner></CTableDataCell></CTableRow>)}
                            </CTableBody>
                        </CTable>
                        <div>
                            <div style={{display:'flex',justifyContent:'flex-start'}}>
                                <PaginationExibe pagina={paginaatual}/>
                            </div>
                            <div style={{display:'flex',justifyContent:'flex-end',top:'-5px'}}>
                                <Pagination pages={numnpagination}/>
                            </div>
                        </div>
                   </CCardBody>
                </CCard>) : (<></>)
              }
        </div>
        </section>
    </div>
  )
}
export default Acolhido
