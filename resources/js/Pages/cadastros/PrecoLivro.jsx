import { React, useEffect, useState, useRef } from 'react';
import { CCard,CRow,CCardBody,CCardHeader,CCol,CButton,CBadge,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,CFormTextarea,
  CTable,CTableBody,CTableHead,CTableRow,CTableHeaderCell,CTableDataCell,CPagination,CPaginationItem } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faTrash,faEdit,faFile, faF  } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ptBR", ptBR);




// The Main component receives props Fortalecimentod from the Laravel controller
//prl_id_prl,prl_id_liv,prl_data_vigor,prl_max_desconto,prl_valor_desconto,prl_valor,prl_valor_atual
const PrecoLivro = (props) => {
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [load, setLoad] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [idprecolivro, setIdprecolivro] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [livro, setLivro] = useState('')
  const [datavigor, setDatavigor] = useState(null)
  const [maxdesconto, setMaxdesconto] = useState(0)
  const [valordesconto, setValordesconto] = useState(0)
  const [valor, setValor] = useState(0)
  const [valoratual, setValoratual] = useState(false)
  const [cadastro, setCadastro] = useState('')
  const [itematualtexto,setItematualtexto] = useState('')
  const [qrcode,setQrcode] = useState('')
  const [copia,setCopia] = useState('')
  const [listaprecolivro, setListaprecolivro] = useState([])
  const [listalivro, setListalivro] = useState([])
  const [listafiltro, setListafiltro] = useState([])
  const [listaclasse, setListaclasse] = useState([])
  const [saved,setSaved] = useState(false)
  const [est,setEst] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  const largura = {width:'120px',cursor:'pointer'}

  //variaveis de paginação
  const [filtroradio,setFiltroradio] = useState(false)
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

  async function writeClipboardText() {
    var text = document.getElementById('idcopiaqr').value;
    if (navigator.clipboard && window.isSecureContext) {
        var copyText = document.getElementById('idvalor');
        // Standard modern Clipboard API
        await navigator.clipboard.writeText(text);
    } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        // Prevent scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          //setShowAlert(true)
          document.execCommand('copy');
          addToast(CompToast('Texto Copiado !!!', 'info')) //--> usa toast
          setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
          }, 2000)
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  }

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
            // //console.log('teste')
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
                    axios.get(`${endpoint}/livro?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/precolivro?listagem=S`, {
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,//dentro do env//
                        },
                    }),
                ]
                const responses = await Promise.all(requests);

                let result_livro = responses[0]
                let result_precolivro = responses[1]
                setRegistrototal(result_precolivro.data.data.length)
                let vet = result_livro.data.data
                let vet_filtro = []
                let existe = []
                let obj = null
                let cont = 1
                result_precolivro.data.data.map((item,index)=>{
                   existe = vet_filtro.filter((it)=>it.nome == item.prl_livro.autor.aut_nome)
                   obj = {
                      classe:'badge'+cont,
                      nome:item.prl_livro.autor.aut_nome
                   }
                   if(existe.length == 0){
                      cont++
                      vet_filtro.push(obj)
                   }
                })
                setListaclasse(vet_filtro)
                ////console.log(vet_filtro)
                vet.unshift({liv_id_liv:'',liv_titulo:'Selecione o Livro',liv_autor:''})
                let tam = result_precolivro.data.data.length
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
                setListalivro(vet)
                setListaprecolivro(result_precolivro.data.data)
                setListafiltro(result_precolivro.data.data)
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
     //console.log('teste:'+valor)
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
        //console.log('submit')
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
           // //console.log(valor)
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

    if( erro == false && idprecolivro == null) {
        //console.log('entre_aqui_post')
        setLoadsave(true)
        const formData = new FormData()
        //prl_id_prl,prl_id_liv,prl_data_vigor,prl_max_desconto,prl_valor_desconto,prl_valor,prl_valor_atual
        let ck = valoratual ? 1 : 0
        formData.append('prl_id_liv', livro)
        formData.append('prl_data_vigor', formatDateBanco(new Date(datavigor)))
        formData.append('prl_max_desconto', maxdesconto)
        formData.append('prl_valor_desconto', valordesconto)
        formData.append('prl_valor', valor)
        formData.append('prl_valor_atual', ck)
        axios
        .post(`${endpoint}/precolivro`, formData, {
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
                AtualizaListaLivro(filtroradio)
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
        let ck = valoratual ? 1 : 0
        formData.append('prl_id_liv', livro)
        formData.append('prl_data_vigor', formatDateBanco(new Date(datavigor)))
        formData.append('prl_max_desconto', maxdesconto)
        formData.append('prl_valor_desconto', valordesconto)
        formData.append('prl_valor', valor)
        formData.append('prl_valor_atual', ck)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/precolivro/${idprecolivro}`, formData, {
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
            setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
                AtualizaListaLivro(filtroradio)
            }, 2000)
        })
    }
 }

 const CompLivros = () =>{
    return(
        listalivro.map((item,index)=>{
        return(
            <option key={index} value={item.liv_id_liv}>{item.liv_titulo+' - '+item.liv_autor}</option>
            )
        })
    )
 }

 const LimpaCampos = () =>{
    setQrcode('')
    setCopia('')
    setLivro('')
    setItematualtexto('')
    setValor(0)
    setValordesconto(0)
    setMaxdesconto(0)
    setDatavigor(new Date())
    setValoratual(false)
    setIdprecolivro(null)
 }

 const AlteraEscolha = (event,id,titulo) =>{
    if(titulo.indexOf('ecione') >= 0){
        //console.log('titulo:vazio')
        setItematualtexto('')
        return
    }
    //console.log('titulo:'+titulo)
    setItematualtexto(titulo)
    setLivro(id)
    //console.log(id)
 }

 const SelectLivros = (props) =>{
       let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7']
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
                   <CDropdownMenu className='dropdown-class'>
                   {
                       //   <option value="">{''}</option>
                       listalivro.map((item,index)=>{
                            existe = listaclasse.filter((it)=>it.nome == item.liv_autor)
                            if(existe.length == 0 ){
                               cl ={display:'inline'}
                            } else {
                               cl =  existe[0].classe
                            }
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

 const ValorInput = (props) => {
        const [value, setValue] = useState(props.valor)
        function calcula(val){
            setValor(val)
            let valatual = val
            let total = parseFloat(valatual) - (parseFloat(val) * parseFloat(maxdesconto) / 100)
            setValordesconto(total)
        }
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Preço Real</CFormLabel><br/>
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value)
                }}
                onBlur = {(e)=>calcula(value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
            </>
        );
    };

   const ValorDescontoInput = (props) => {
        const [value, setValue] = useState(props.valor)
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Preço Desconto</CFormLabel><br/>
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value)
                }}
                onBlur = {(e)=>setValordesconto(value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
            </>
        );
   };

   const DescontoInput = (props) => {
      const [value, setValue] = useState(props.valor)
      function calcula(val){
        setMaxdesconto(val)
        let valatual = valor
        let total = parseFloat(valor) - (parseFloat(valatual) * parseFloat(val) / 100)
        setValordesconto(total)
      }
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Máximo Desconto</CFormLabel><br/>
            <IMaskInput
                className="form-control"
                mask={Number} // Define o tipo da máscara como numérico
                scale={2} // Quantidade de casas decimais
                signed={false} // Se permite números negativos
                //thousandsSeparator="." // Separador de milhar
                padFractionalZeros={true} // Se deve preencher com zeros (ex: 1.2 -> 1.20)
                normalizeZeros={true} // Remove zeros desnecessários à esquerda
                radix="." // Separador decimal (ex: vírgula para PT-BR)
                mapToRadix={['.']} // Mapeia o ponto do teclado numérico para a vírgula
                min={0} // Valor mínimo aceito
                max={999.99} // Valor máximo aceito

                // Captura o valor aceito (pode ser unmasked ou typed)
                onAccept={(value, mask) => {
                   setValue(value);
                }}
                //onBlur = {(e)=>handleBlur(e,'desconto')}
                onBlur = {(e)=>calcula(value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
          </>
        );
  };

  const AtualizaListaLivro = (valor) =>{
    setLoad(true)
    setListaprecolivro(null)
    axios
      .get(`${endpoint}/precolivro?listagem=S`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
          },
      })
      .then((result) => {
          let dados =null

          if(valor == true){
             dados = result.data.data.filter((item)=>item.prl_valor_atual ==  1)
          } else {
             dados = result.data.data
          }
          setListafiltro(dados)
          setListaprecolivro(dados)
          Repaginar(5,dados)
          setQtderegistros(5)
          //setEst(!est)
          setLoad(false)
      })
  }

  const LoadQrCode = (id) =>{
    //setLoad(true)
    let resp = false
    axios
      .get(`${endpoint}/livropix/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
          },
      })
      .then((result) => {
          ////console.log(result.data.data)
          setQrcode(result.data.data.lip_qrcode)
          setCopia(result.data.data.lip_copy_qrcode)
          return resp
          //setLoad(false)
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
           props.lista.map((item,index)=>{
              cont++
              classe = index % 2 == 0 ? 'primary' : 'secondary'
              if(cont > qtderegistrospagina){
                 return
              } else {
                 return(
                  <CTableRow color={classe}>
                      <CTableDataCell>#-{cont}</CTableDataCell>
                      <CTableDataCell>{item.prl_id_prl+' - '+item.prl_livro.liv_titulo}</CTableDataCell>
                      <CTableDataCell>{item.prl_livro.editora.edi_descricao}</CTableDataCell>
                      <CTableDataCell>{item.prl_livro.autor.aut_nome}</CTableDataCell>
                      <CTableDataCell>{item.prl_data_vigor}</CTableDataCell>
                      <CTableDataCell>{item.prl_valor}</CTableDataCell>
                      <CTableDataCell>{item.prl_max_desconto+'%'}</CTableDataCell>
                      <CTableDataCell>{item.prl_valor_desconto}</CTableDataCell>
                      <CTableDataCell>{item.prl_valor_atual === "1" ? <CBadge color="success">Preço Atual</CBadge> : 0}</CTableDataCell>
                      <CTableDataCell>{item.prl_qrcode != null  ? <CBadge color="info" style={{color:'black'}}>QrCode Gerado</CBadge> : <CBadge color="danger">Sem QrCode</CBadge>}</CTableDataCell>
                      <CTableDataCell>{item.prl_created_at}</CTableDataCell>
                      <CTableDataCell style={{textAlign:'center'}}><ItensAcao id={item.prl_id_prl}/></CTableDataCell>
                      {/* <CTableDataCell style={{textAlign:'center'}}></CTableDataCell> */}
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
         <FontAwesomeIcon onClick={(e)=>EditaRegistro(e,props.id)} style={{color:'blue',cursor:'pointer'}} icon={faEdit}/>
         </>
      )
    }

    const EditaRegistro = (event,valor) =>{
        scrollToId('topo')
        let dados = listafiltro.filter((item)=>item.prl_id_prl == valor)[0]
        setIdprecolivro(dados.prl_id_prl)
        setLivro(dados.prl_id_liv)
        setItematualtexto(dados.prl_livro.liv_titulo+' - '+dados.prl_livro.autor.aut_nome)
        setMaxdesconto(dados.prl_max_desconto)
        setValordesconto(dados.prl_valor_desconto)
        setValor(dados.prl_valor)
        setDatavigor(new Date(dados.prl_vigor_format))
        let ck = dados.prl_valor_atual === "1" ? true : false
        setValoratual(ck)
        if(dados.prl_qrcode != null){
            let id =  dados.prl_qrcode
            setLoadpage(true)
            axios
            .get(`${endpoint}/livropix/${id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                setQrcode(result.data.data.lip_qrcode)
                setCopia(result.data.data.lip_copy_qrcode)
                setLoadpage(false)
            })
        } else {
            setLoadpage(true)
            setTimeout(() => {
                setQrcode('')
                setCopia('')
                setLoadpage(false)
            }, 500);
        }
    }

    const QtdeRegistrosPagina = (props) =>{
        const [qtde,setQdte] = useState(props.valor)
        function muda(valor){
            //console.log(valor)
            setQtderegistros(valor)
            Repaginar(valor,listafiltro)
        }
        return(
            <CFormSelect
                value={qtde}
                onChange={(e)=>muda(e.target.value)}
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
        //console.log(lista)
        /*
        <CTableDataCell>{item.prl_livro.liv_titulo}</CTableDataCell>
                      <CTableDataCell>{item.prl_livro.editora.edi_descricao}</CTableDataCell>
                      <CTableDataCell>{item.prl_livro.autor.aut_nome}</CTableDataCell>
        */
        setListaprecolivro(lista.slice(0,qtderegistrospagina))
     } else {
        setListaprecolivro(listafiltro.slice(0,qtderegistrospagina))
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
      //console.log('paginaatual:'+paginaatual)
      //console.log('ultimapagina:'+ultimapagina)
      if(paginaatual < ultimapagina){
         page = page + 1
         //console.log('ultimapagina-entrei')
         clickPagination(event,page)
      }
    }

    const PriousPage =(event)=>{
      let page = paginaatual
      //console.log('paginaatual:'+paginaatual)
      //console.log('ultimapagina:'+ultimapagina)
      if(paginaatual > 1){
         page = page - 1
         //console.log('ultimapagina-entrei')
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
      if(filtroradio){
         lista = listafiltro.filter((item)=>item.prl_valor_atual ==  1).slice(inicio,fim)
      } else {
         lista = listafiltro.slice(inicio,fim)
      }
      setRegistroini(inicio+1)
      if(fim > qtderegistros){
         setRegistrofim(qtderegistros)
      } else {
         setRegistrofim(fim)
      }
      setListaprecolivro(lista)
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

  const Repaginar = (valor,lista) =>{
        let tam = null
        let dados = null
        let res = null
        tam = lista.length
        setQtderegistrospagina(valor)
        if( valor > tam ){
           res = tam / tam
        } else {
           res = tam / valor
        }
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
        setListaprecolivro(lista)
        setEst(!est)
  }

 const RadioLista = () => {
  if(filtroradio){
    return (
        <>
        <CFormCheck
            inline
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            label="Preço Atual"
            onClick={(e)=>ListaAtual(e,'atual')}
            defaultChecked
        />
        <CFormCheck
            inline
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            label="Todos"
            onClick={(e)=>ListaAtual(e,'todos')}

        />
        </>
    )
  } else {
    return (
        <>
        <CFormCheck
            inline
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            label="Preço Atual"
            onClick={(e)=>ListaAtual(e,'atual')}
        />
        <CFormCheck
            inline
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            label="Todos"
            onClick={(e)=>ListaAtual(e,'todos')}
            defaultChecked
        />
      </>
    )
  }
}

  const ListaAtual = (event,param) =>{
    if(param == 'atual'){
       setFiltroradio(true)
       AtualizaListaLivro(true)
    } else {
       setFiltroradio(false)
       AtualizaListaLivro(false)
    }
  }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div id="topo" class="container section-title box-title mb-2" style={{minWidth:'400px'}} data-aos="fade-up">
          <h2>Precificação de Livros</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                {/* <div id="topo"></div> */}
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Preços de Livros</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={6}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<SelectLivros/>)}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                   <ValorInput valor={valor}/>
                                  )}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                   <DescontoInput valor={maxdesconto}/>
                                  )}
                            </CCol>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                   <ValorDescontoInput valor={valordesconto}/>
                                  )}
                            </CCol>
                            <CCol md={4}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (
                                <>
                                <CFormLabel htmlFor="exampleFormControlInput1">Data de Vigor</CFormLabel><br/>
                                <DatePicker
                                    showYearDropdown
                                    showMonthDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                    locale="ptBR"
                                    //dateFormat="dd/MM/yyyy"
                                    dateFormat="dd/MM/yyyy"
                                    showIcon
                                    selected={datavigor}
                                    //selected={new Date("1993/09/28")}
                                    //openToDate={new Date("1993/09/28")}
                                    calendarClassName="form-control"
                                    onChange={(date) => setDatavigor(date)}
                                    />
                                    { validated && datavigor == null
                                    ? (<div style={{color:'red',fontSize:'14px'}} id="data-addon1">A Data de vigor deve ser prenchida </div>)
                                    : (<></>)}
                                    </>
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
                                    label="Preço Atual"
                                    feedbackInvalid="Informe se define o Preco Atual"
                                    checked={valoratual}
                                    onChange={(e)=>setValoratual(e.target.checked)}
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
                            <CCol md={12}>
                                <CRow>
                                  <CCol md={4}>
                                        { loadpage
                                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                        : (
                                        <>
                                        <CFormLabel htmlFor="exampleFormControlInput1">QRcode</CFormLabel><br/>
                                        <div style={{width:'200px',margin:'auto'}}><img src={qrcode}/></div>
                                        </>
                                        )}
                                   </CCol>
                                  <CCol md={8}>
                                    { loadpage
                                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                        : (
                                           <>
                                           <CFormLabel htmlFor="exampleFormControlInput1">Código Copia e Cola</CFormLabel><br/>
                                           <CInputGroup size="sm" className="mb-3 nowrap">
                                              <CInputGroupText onClick={(e)=>writeClipboardText(e)} className="inputwidth" style={largura} id="basic-addon1">Copia e Cola</CInputGroupText>
                                              <CFormTextarea id="idcopiaqr" style={{fontSize:'13px'}} className="input-text" rows={4} disabled aria-label="Username" value={copia}
                                              aria-describedby="basic-addon1"/>
                                           </CInputGroup>
                                           </>
                                        )}
                                  </CCol>
                                </CRow>
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
               <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Lista de Preços</CCardHeader>
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
                            <div className="mt-3" style={{flex:'1'}}><RadioLista/></div>
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
                                        <CTableHeaderCell className='clthinterno' scope="col">Título</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Editora</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Autor</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">DataVigor</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Valor</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Desconto</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Valor Desconto</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Preço Atual</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Qrcode</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' scope="col">Criação</CTableHeaderCell>
                                        <CTableHeaderCell className='clthinterno' style={{textAlign:'center',borderRadius:'0px 5px 0px 0px'}} scope="col">Acão</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                           <CTableBody>
                            {load == false
                              ? (<CorpoTabela lista={listaprecolivro} estado={est}/>)
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
export default PrecoLivro
