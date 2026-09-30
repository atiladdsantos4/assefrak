import { React, useEffect, useState, useRef } from 'react';
import { CCard,CRow,CCardBody,CCardHeader,CCol,CButton,CBadge,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CTable,CTableBody,CTableHead,CTableRow,CTableHeaderCell,CTableDataCell,CPagination,CPaginationItem } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faTrash,faEdit,faFile, faF, faArrowTrendUp  } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ptBR", ptBR);




// The Main component receives props Fortalecimentod from the Laravel controller
//prl_id_prl,prl_id_liv,prl_data_vigor,prl_max_desconto,prl_valor_desconto,prl_valor,prl_valor_atual
const Pix = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [load, setLoad] = useState(false)
  const [loadsave, setLoadsave] = useState(false)

  const [idpix, setIdpix] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [chave, setChave] = useState(null)
  const [banco, setBanco] = useState(null)
  const [recebedor, setRecebedor] = useState(null)
  const [cidade, setCidade] = useState(null)
  const [cadastro, setCadastro] = useState('')
  const [ativo, setAtivo] = useState(false)
  const [atual, setAtual] = useState(false)

  const [listatipo,setListatipo] = useState([
    {valor:'',descricao:'Selecione o Tipo da Chave',classe:''},
    {valor:'random',descricao:'Chave Aleatória',classe:'badge1'},
    {valor:'document',descricao:'CPF/CNPJ',classe:'badge2'},
    {valor:'email',descricao:'Email',classe:'badge3'},
    {valor:'phone',descricao:'Telefone',classe:'badge4'},
  ])
  const [listabanco, setListabanco] = useState([])
  /*option value="" selected="">Selecione o Tipo da Chave</option>
  <option value="random">Chave Aleatória</option>
  <option value="document">CPF/CNPJ</option>
  <option value="email">Email</option>
  <option value="phone">Telefone</option>
  */

  const [idprecolivro, setIdprecolivro] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [livro, setLivro] = useState('')
  const [valoratual, setValoratual] = useState(false)

  const [itematualtexto,setItematualtexto] = useState('')
  const [listapix, setListapix] = useState([])
  const [listalivro, setListalivro] = useState([])
  const [listafiltro, setListafiltro] = useState([])
  const [listaclasse, setListaclasse] = useState([])
  const [saved,setSaved] = useState(false)
  const [est,setEst] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}

  //variaveis de paginação
  const [numnpagination,setNumpagination] = useState(null)
  const [paginaatual,setPaginaatual] = useState(null)
  const [ultimapagina,setUltimapagina] = useState(null)
  const [registroini,setRegistroini] = useState(0)
  const [registrofim,setRegistrofim] = useState(0)
  const [registrototal,setRegistrototal] = useState(0)
  const [qtderegistros,setQtderegistros] = useState(0)
  const [qtderegistrospagina,setQtderegistrospagina] = useState(5)
  const [pesquisar,setPesquisar] = useState(null)
  //ale_id_aco,ale_name,ale_cpf,ale_email,ale_tipo_telefone,ale_telefone,ale_ativo,ale_created_at,ale_updated_at,ale_deleted_at

  const scrollToId = (id) => {
       const element = document.getElementById(id);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
  };

  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
        const fetchData = async () =>{
           try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/livro?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/precolivro/${param}`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/bancos?listagem=S`,{
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]

            const responses = await Promise.all(requests);
            let result_estado = responses[0]
            let result_acolhido = responses[1]


            // //lista estados
            // setListaestado(result_estado.data.data)
            // setListacidade(result_cidade.data.data)


            // //acolhidos
            // let ativock = result_acolhido.data.data.aco_ativo == 1 ? true : false
            // setIdacolhido(result_acolhido.data.data.aco_id_aco)
            // setNome(result_acolhido.data.data.aco_name)
            // setCpf(result_acolhido.data.data.aco_cpf)
            // setEmail(result_acolhido.data.data.aco_email)
            // setTipotelefone(result_acolhido.data.data.aco_tipo_telefone)
            // setTelefone(result_acolhido.data.data.aco_telefone)
            // setSexo(result_acolhido.data.data.aco_sexo)
            // setCadastro(result_acolhido.data.data.aco_created_at)
            // setAtivo(ativock)
            // setFaixa(result_acolhido.data.data.aco_faixa)
            // setEstado(result_acolhido.data.data.aco_estado)
            // setCidade(result_acolhido.data.data.aco_cidade)
            // let nasc = new Date(result_acolhido.data.data.aco_nascimento_form)
            // mudaData(nasc)
            // console.log('teste')
            setLoadpage(false)
            setLoad(false)
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
                    axios.get(`${endpoint}/pix?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                    axios.get(`${endpoint}/bancos?listagem=S`,{
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]
                const responses = await Promise.all(requests);

                let result_pix = responses[0]
                let result_bancos = responses[1]
                setRegistrototal(result_pix.data.data.length)
                let vet_filtro = []
                let vet_banco = []
                let existe = []
                let obj = null
                let cont = 1
                let tam  = null
                vet_banco = result_bancos.data.data
                vet_banco.unshift({ban_id_ban:'',ban_nome:'Selecione o Banco',ban_sigla:''})
                tam = result_pix.data.data.length
                setQtderegistros(tam)
                let res = tam / qtderegistrospagina
                let resposta = res.toString().split('.');
                if( parseInt(resposta[1]) === 0 || resposta[1] === undefined){
                     setNumpagination(res)
                } else {
                     res = parseInt(resposta[0]) + 1
                     let numpag = res.toFixed(0)
                     setNumpagination(numpag)
                }
                setUltimapagina(res)
                setPaginaatual(1)
                if( tam > 0){
                    setRegistroini(1)
                    setRegistrofim(qtderegistrospagina)
                }
                setListapix(result_pix.data.data)
                setListafiltro(result_pix.data.data)
                setListabanco(vet_banco)
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

  const formatDateHora = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}-${d} ${hh}:${mi}:${ss}`;
  };

  const formatDateBanco = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}-${m}-${d}`;
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

  const  handleSave = (erro) =>{

    if( erro == false && idpix == null) {
        console.log('entre_aqui_post')
        setLoadsave(true)
        const formData = new FormData()
        let val_ativo = ativo ? 1 : 0;
        let val_atual = atual ? 1 : 0;
        formData.append('pix_tipo', tipo)
        formData.append('pix_chave', chave)
        formData.append('pix_nome_fantasia', recebedor)
        formData.append('pix_id_ban', banco)
        formData.append('pix_cidade', cidade)
        formData.append('pix_ativo', val_ativo)
        formData.append('pix_atual', val_atual)
        axios
        .post(`${endpoint}/pix`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            //let valor = 'ListaAlertas'
            setLoadsave(false)
            LimpaCampos()

            addToast(CompToast('Dados Gravados com sucesso !!!', 'success')) //--> usa toast
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                AtualizaListaPix()
            }, 2000)
        })
        .catch(function(error){
            let mens = error.response.data
            addToast(CompToast(mens.error.prl_id_liv, 'info')) //--> usa toast
               setTimeout(() => {
                    document.getElementById('idtoast').classList.remove('show')
                    document.getElementById('idtoast').remove()
                   setLoadsave(false)
               }, 2500)
            }
        )
    } else {
        setLoadsave(true)
        const formData = new FormData()
        let val_ativo = ativo ? 1 : 0;
        let val_atual = atual ? 1 : 0;
        formData.append('pix_tipo', tipo)
        formData.append('pix_chave', chave)
        formData.append('pix_nome_fantasia', recebedor)
        formData.append('pix_id_ban', banco)
        formData.append('pix_cidade', cidade)
        formData.append('pix_ativo', val_ativo)
        formData.append('pix_atual', val_atual)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/pix/${idpix}`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setLoadsave(false)
            addToast(CompToast('Dados Atualizados com sucesso !!!', 'success')) //--> usa toast
            LimpaCampos()
            setValidated(false)
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                AtualizaListaPix()
            }, 2000)
        })
    }
 }

 const CompBancos = () =>{
    return(
        listabanco.map((item,index)=>{
        return(
            <option key={index} value={item.ban_id_ban}>{item.ban_nome+' - '+item.ban_sigla}</option>
            )
        })
    )
 }

 const LimpaCampos = () =>{
    setTipo('')
    setItematualtexto('')
    setChave('')
    setBanco('')
    setCidade('')
    setAtivo(false)
    setAtual(false)
    setRecebedor('')
    setIdpix(null)
 }

 const AlteraEscolha = (event,id,titulo) =>{
    if(titulo.indexOf('ecione') >= 0){
        console.log('titulo:vazio')
        setItematualtexto('')
        return
    }
    console.log('titulo:'+titulo)
    setItematualtexto(titulo)
    setTipo(id)
    console.log(id)
 }

 const SelectTipos = (props) =>{
       let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7']
       let classe = ''
       let idxclasse = -1
       let existe = []
       let cl = null
       return(
           <><CFormLabel htmlFor="exampleFormControlInput1">Tipos de Chave</CFormLabel><br/>
           <CInputGroup className="mb-3">
               <CInputGroupText className="clinputtext has-validation">Chaves</CInputGroupText>
               <CDropdown variant="btn-group">
                   <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Escolher</CDropdownToggle>
                   <CDropdownMenu>
                   {
                       listatipo.map((item,index)=>{
                            if(item.classe == '' ){
                               cl ={display:'inline'}
                            } else {
                               cl = item.classe
                            }
                            return(
                              <>
                              <CDropdownItem style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraEscolha(e,item.valor,item.descricao+' - '+item.valor)}>
                                 {item.descricao}&nbsp;<CBadge className={cl}>{item.valor}</CBadge>
                              </CDropdownItem>
                              </>
                           )
                       })
                   }
                   </CDropdownMenu>
               </CDropdown>
               <CFormInput style={{borderRadius: '0px 5px 5px 0px'}} value={itematualtexto} placeholder='Item selecionado' feedbackInvalid="O Livro deve ser informado" required />
           </CInputGroup>
           </>
       )
 }

 const SelectLivros = (props) =>{
       let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7']
       console.log('//--> Componente Input type text')
       console.log(props)
       let classe = ''
       let idxclasse = -1
       let existe = []
       let cl = null
       return(
           <><CFormLabel htmlFor="exampleFormControlInput1">Listagem de Livros</CFormLabel><br/>
           <CInputGroup className="mb-3">
               <CInputGroupText className="clinputtext has-validation">Livros</CInputGroupText>
               <CDropdown variant="btn-group">
                   <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Escolher</CDropdownToggle>
                   <CDropdownMenu>
                   {
                       //   <option value="">{''}</option>
                       listalivro.map((item,index)=>{
                            existe = listaclasse.filter((it)=>it.nome == item.liv_autor)
                            if(existe.length == 0 ){
                               cl ={display:'inline'}
                            } else {
                               cl =  existe[0].classe
                            }
                            console.log(existe)
                            if( item.liv_autor != classe){
                               classe = item.liv_autor
                               idxclasse++
                               if( idxclasse > 7){
                                  idxclasse=0
                               }
                            }
                            return(
                              <>
                              <CDropdownItem style={{fontSize:'13px'}} href="#" onClick={(e)=>AlteraEscolha(e,item.liv_id_liv,item.liv_titulo+' - '+item.liv_autor)}>
                                 {item.liv_titulo}&nbsp;<CBadge className={cl} color="success">{item.liv_autor}</CBadge>
                              </CDropdownItem>
                              </>
                               // <option value={item.tra_id_tra}>{item.tra_servico.ser_titulo+' - '+item.tra_titulo}</option>
                           )
                       })
                   }

                   </CDropdownMenu>
               </CDropdown>
               <CFormInput value={itematualtexto} placeholder='Item selecionado' feedbackInvalid="O Livro deve ser informado" required />
           </CInputGroup>
           </>
       )
 }

 const AtualizaListaPix = () =>{
    setLoad(true)
    setListapix(null)
    axios
      .get(`${endpoint}/pix?listagem=S`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
          },
      })
      .then((result) => {
          setListapix(result.data.data)
          setListafiltro(result.data.data)
        //   Repaginar(5)
        //   setQtderegistros(5)
        //   setEst(!est)
          setLoad(false)
      })
  }

  const AtualizaStatus = (event,id,param) =>{
    let ck = event.target.checked ? 1 : 0
    //setLoad(true)

    const formData = new FormData()
    if(param === 'ativo'){
      formData.append('pix_ativo', ck)
      setListapix(prevItems =>
          prevItems.map(item =>
             item.pix_id_pix === id ? { ...item, pix_ativo: ck, pix_ativo_load: true } : item
          )
      )
    }

    if(param === 'atual'){
      formData.append('pix_atual', ck)
      setListapix((prevItems) => {
        return prevItems.map((item) => {
            // Defina sua condição aqui para identificar quais itens atualizar
            if (item.pix_id_pix === id) {
                return {
                    ...item,
                    pix_atual: ck,
                    pix_load: true
                }; // Atualiza o item mantendo as outras propriedades intactas'
            } else {
               return {
                    ...item,
                    pix_atual: 0,
                }; // Atualiza o item mantendo as outras propriedades intactas'
            }
            //return item; // Retorna o item sem alterações se não bater com a condição
        });
     });
    //   setListapix(prevItems =>
    //       prevItems.map(item =>
    //          item.pix_id_pix === id ? { ...item, pix_atual: ck, pix_load: true } : item
    //       )
    //   )
    }

    formData.append('_method', 'put')
    axios
      .post(`${endpoint}/pix/${id}`,formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
          },
      })
      .then((result) => {
         console.log(result.data.data)
         addToast(CompToast('Registro Atualizado com sucesso !!!', 'success')) //--> usa toast
         setListapix(prevItems =>
          prevItems.map(item =>
             item.pix_id_pix === id ? { ...item, pix_ativo_load: false,pix_load: false } : item
          )
         )
         //LimpaCampos()
         setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                AtualizaListaPix()
         }, 2000)
        //   setListapix(result.data.data)
        //   setListafiltro(result.data.data)
        //   Repaginar(5)
        //   setQtderegistros(5)
        //   setEst(!est)
        //   setLoad(false)
      })
  }
  //--> Exibe os dados da Tabela
  const CorpoTabela = (props) =>{
        let classe = null
        let cont = 0
        let tam = props.lista.length
        if( tam == 0){
           return(
              <CTableRow color={classe}>
                  <CTableDataCell colspan="4" style={{textAlign:'center'}}>Não há Registros para Listagem</CTableDataCell>
              </CTableRow>
          )
        }
        return(
           //pix_id_pix,pix_tipo,pix_chave,pix_nome_fantasia,pix_cidade,pix_id_ban,pix_ativo,pix_atual,pix_created_at,pix_updated_at,pix_deleted_at
           props.lista.map((item,index)=>{
              cont++
              classe = index % 2 == 0 ? 'primary' : 'secondary'
              if(cont > qtderegistrospagina){
                 return
              } else {
                 return(
                  <CTableRow color={classe}>
                      <CTableDataCell>#-{cont}</CTableDataCell>
                      <CTableDataCell><CompChebox label="ativo" id={item.pix_id_pix} check={item.pix_ativo} load={item.pix_ativo_load} /></CTableDataCell>
                      <CTableDataCell><CompChebox label="atual" id={item.pix_id_pix} check={item.pix_atual} load={item.pix_load}/></CTableDataCell>
                      <CTableDataCell>{item.pix_tipo}</CTableDataCell>
                      <CTableDataCell>{item.pix_chave}</CTableDataCell>
                      <CTableDataCell>{item.pix_id_ban}</CTableDataCell>
                      <CTableDataCell>{item.pix_nome_fantasia}</CTableDataCell>
                      <CTableDataCell>{item.pix_cidade}</CTableDataCell>
                      <CTableDataCell>{item.pix_created_at}</CTableDataCell>
                      <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.pix_id_pix}/></CTableDataCell>
                      {/* <CTableDataCell style={{textAlign:'center'}}></CTableDataCell> */}
                  </CTableRow>
                 )
              }
           })
        )
   }

   const CompChebox = (props) =>{
     let ck = props.check == 1  ? true : false
     const [check,setCheck] = useState(ck)

     function altera(event,param,id){
       AtualizaStatus(event,id,param)
       console.log('param'+param)
       console.log('id'+id)
     }

     return(
        <>
        <CFormCheck
            style={{cursor:'pointer'}}
            type="checkbox"
            id="invalidCheck"
            onClick ={(e)=>altera(e,props.label,props.id)}
            checked={check}
            onChange={(e)=>setCheck(e.target.checked)}
        />
        &nbsp;
        { props.load ? (<CSpinner size="sm"/>) : (<></>)}
        </>
     )
   }
  //--> Display dos Ícones no grid
    const ItensAcao = (props) => {
      return(
         <>
         <FontAwesomeIcon style={{color:'red',cursor:'pointer'}} icon={faTrash}/>
         &nbsp;
         <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
         </>
      )
    }

    const EditaRegistro = (event,valor) =>{
        setLoadpage(true)
        scrollToId('topo')
        setTimeout(() => {

            let dados = listafiltro.filter((item)=>item.pix_id_pix == valor)[0]
            setIdpix(dados.pix_id_pix)
            setChave(dados.pix_chave)
            setRecebedor(dados.pix_nome_fantasia)
            let tipo = listatipo.filter((item)=>item.valor == dados.pix_tipo)[0]
            setTipo(tipo.valor)
            setItematualtexto(tipo.descricao+' - '+tipo.valor)
            setBanco(dados.pix_id_ban)
            setCidade(dados.pix_cidade)
            let ckativo = dados.pix_ativo === "1" ? true : false
            let ckatual = dados.pix_atual === "1" ? true : false
            setAtivo(ckativo)
            setAtual(ckatual)
            setLoadpage(false)
        }, 500);

        //setDatavigor(ned)
        // altera(valor)
        // tela('Livro')
    }

    const QtdeRegistrosPagina = (props) =>{
        const [qtde,setQdte] = useState(props.valor)
        function teste(valor){
            console.log(valor)
            setQtderegistros(valor)
            //setQtderegistrospagina(valor)
            Repaginar(valor)
        }
        return(
            <CFormSelect
                value={qtde}
                onChange={(e)=>teste(e.target.value)}
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
     let valor =  event.target.value
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.prl_livro.liv_titulo.toLowerCase().includes(valor.toLowerCase()) ||
            item.prl_livro.editora.edi_descricao.toLowerCase().includes(valor.toLowerCase()) ||
            item.prl_livro.autor.aut_nome.toLowerCase().includes(valor.toLowerCase())
        )
        console.log(lista)
        /*
        <CTableDataCell>{item.prl_livro.liv_titulo}</CTableDataCell>
                      <CTableDataCell>{item.prl_livro.editora.edi_descricao}</CTableDataCell>
                      <CTableDataCell>{item.prl_livro.autor.aut_nome}</CTableDataCell>
        */
        setListapix(lista.slice(0,qtderegistrospagina))
     } else {
        setListapix(listafiltro.slice(0,qtderegistrospagina))
     }
  }

  //--> Exibe o componente de paginação
    const PaginationExibe = (props) => {
       return(
          // <div style={{fontSize:'14px',paddingLeft:'3px',paddingRight:'3px',backgroundColor:'#722E56',color:'white',display:'flex',borderRadius:'5px 5px 5px 5px'}}>
          <div className='exibepagination'>
              <div>Pagina:&nbsp;{props.pagina}&nbsp;</div>
              <div>Regitros:&nbsp;{registroini+'...'+registrofim+' num Total de '+registrototal}</div>
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
      setListapix(lista)
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

  const Repaginar = (valor) =>{
        let tam = listapix.length
        setQtderegistrospagina(valor)
        let res = tam / valor
        let resposta = res.toString().split('.');
        if( parseInt(resposta[1]) === 0 || resposta[1] === undefined){
                setNumpagination(res)
        } else {
                res = parseInt(resposta[0]) + 1
                let numpag = res.toFixed(0)
                setNumpagination(numpag)
        }
        setUltimapagina(res)
        setPaginaatual(1)
        if( tam > 0){
            setRegistroini(1)
            setRegistrofim(valor)
        }
        setListapix(listafiltro)
  }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div id="topo" class="container section-title box-title mb-2" style={{minWidth:'400px'}} data-aos="fade-up">
          <h2>Gerenciar Chave Pix</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                {/* <div id="topo"></div> */}
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Gerenciar Chave Pix</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<SelectTipos/>)}
                            </CCol>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormInput
                                    type="text"
                                    id="IdChave"
                                    label="Chave"
                                    value={chave}
                                    onChange={(e)=>setChave(e.target.value)}
                                    feedbackInvalid="A Chave precisa a ser informada"
                                    required
                                />)}
                            </CCol>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormSelect
                                    id="idBanco"
                                    label="Listagem de Bancos"
                                    value={banco}
                                    feedbackInvalid="O Nome do Banco deve ser informado"
                                    onChange={(e)=>setBanco(e.target.value)}
                                    required
                                >
                                <CompBancos/>
                                </CFormSelect>)}
                            </CCol>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormInput
                                    type="text"
                                    id="IdRecebedor"
                                    label="Nome do Recebedor"
                                    value={recebedor}
                                    onChange={(e)=>setRecebedor(e.target.value)}
                                    feedbackInvalid="O Nome do Recebedor precisa a ser informado"
                                    required
                                />)}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <CFormInput
                                    type="text"
                                    id="IdCidade"
                                    label="Cidade"
                                    value={cidade}
                                    onChange={(e)=>setCidade(e.target.value)}
                                    feedbackInvalid="A Cidade precisa ser informada"
                                    required
                                />)}
                            </CCol>
                            <CCol md={2}>
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
                            <CCol xs={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad38full' xs={4} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">&nbsp;</CFormLabel><br/>
                                <CFormCheck
                                    type="checkbox"
                                    id="invalidCheck"
                                    label="Ativo"
                                    feedbackInvalid="Informe o Status"
                                    checked={ativo}
                                    onChange={(e)=>setAtivo(e.target.checked)}
                                    required
                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
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
                                    label="Pix Atual"
                                    feedbackInvalid="Informe se é pix Atual"
                                    checked={atual}
                                    onChange={(e)=>setAtual(e.target.checked)}
                                />
                                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                                </>)}
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                { idprecolivro == null ?
                                (<><FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar</>)
                                :
                                (<><FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Editar</>)}
                                {' '}
                                {loadsave ? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {/* {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaAlertas')}>Listar</CButton> */}
                                {' '}
                                <CButton color="info" type="button" onClick={(e)=>LimpaCampos()}><FontAwesomeIcon size="lg" icon={faFile} />&nbsp;Novo</CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
            <CCard className='card_bottom mt-3'>
               <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Lista de Chave Pix</CCardHeader>
               <CCardBody>
                  <CRow>
                    <CCol xs={12}>
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
                                    <QtdeRegistrosPagina valor={qtderegistros}/>
                                </CInputGroup>
                            </div>
                        </div>
                        <CTable className='tabela'>
                                <CTableHead style={{fontSize:'11px !important'}}>
                                    <CTableRow>
                                        <CTableHeaderCell className='clthinputtext'style={{borderRadius:'5px 0px 0px 0px',fontSize:'11px !important'}} scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Ativo</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Atual</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Tipo</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Chave</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Banco</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Recebedor</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Cidade</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                           <CTableBody>
                            {load == false
                              ? (<CorpoTabela lista={listapix} estado={est}/>)
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
                    </CCol>
                  </CRow>
               </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default Pix
