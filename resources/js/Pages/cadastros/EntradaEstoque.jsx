import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,CBadge,
  CDropdown, CDropdownHeader, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faEraser } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props Fortenecimentod from the Laravel controller
const EntradaEstoque = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [identrada, setIdentrada] = useState(null)
  const [listalivro, setListalivro] = useState([])
  const [itematualtexto,setItematualtexto] = useState('')
  const [listaclasse, setListaclasse] = useState([])
  const [livro, setLivro] = useState(null)
  const [qtde, setQtde] = useState(null)
  const [valorunit, setValorunit] = useState(null)
  const [valortotal, setValortotal] = useState(null)
  const [saida, setSaida] = useState(0)
  const [descricao, setDescricao] = useState('')
  const [cadastro, setCadastro] = useState('')
  const [saved,setSaved] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  const toaster = useRef(null)
  const [mostramenu,setMostramenu] = useState(false)
  const [listafiltro, setListafiltro] = useState([])
  const style_placeholder = {paddingBottom:'15px'}

  const customVars = {
  '--cui-dropdown-color': '#581a1a',
  '--cui-dropdown-bg': '#efefef',
  '--cui-dropdown-zindex':100000
 }
  //ene_id_ene,ene_id_liv,ene_qtde,ene_valor_unit,ene_valor_total,ene_saida,ene_created_at,ene_updated_at,ene_deleted_at

  /*
  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
       setLoadpage(true)
       axios
        .get(`${endpoint}/entradaestoque/${param}`, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setIdentrada(result.data.data.ene_id_ene)
            setDescricao(result.data.data.ene_descricao)
            setCadastro(result.data.data.ene_created_at)
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

  useEffect(()=>{
      console.log('useEffect(()')
      let data = formatDate(new Date());
      setCadastro(data)
      if( props.param != null){
          console.log('useEffect(() param')
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
                      axios.get(`${endpoint}/precolivro?listagem=S`, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token,//dentro do env//
                        },
                      }),
                      axios.get(`${endpoint}/entradaestoque/${param}`, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + token,//dentro do env//
                        },
                      }),
                  ]
                  const responses = await Promise.all(requests);
                  let result_livro= responses[0]
                  let result_precolivro = responses[1]
                  let result_entrada = responses[2]
                  console.log(result_entrada)
                  let array_liv = result_livro.data.data.filter((item)=>item.liv_ativo == 1)
                  //array_liv.unshift({liv_id_liv:'',liv_autor:'',liv_titulo:'Selecione o Livro'})
                  setListalivro(array_liv)
                  setListafiltro(array_liv)
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
                  setIdentrada(result_entrada.data.data.ene_id_ene)
                  setLivro(result_entrada.data.data.ene_id_liv)
                  setQtde(result_entrada.data.data.ene_qtde)
                  setValorunit(result_entrada.data.data.ene_valor_unit)
                  setValortotal(result_entrada.data.data.ene_valor_total)
                  setSaida(result_entrada.data.data.ene_saida)
                  setItematualtexto(result_entrada.data.data.ene_livro+' - '+result_entrada.data.data.ene_autor)
                  setLoadpage(false)
              }
              catch (error) {
                  console.error("One of the requests failed", error);
              }
          }
          fetchData()
      } else {
         const fetchData = async () => {
               console.log('useEffect(() sem param')
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
                  let result_livro= responses[0]
                  let result_precolivro = responses[1]
                  let array_liv = result_livro.data.data.filter((item)=>item.liv_ativo == 1)
                  setListafiltro(array_liv)
                  //array_liv.unshift({liv_id_liv:'',liv_titulo:'Selecione o Livro'})
                  setListalivro(array_liv)
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
                setLoadpage(false)
              }
              catch (error) {
                  console.error("One of the requests failed", error);
              }
          }
         fetchData()
      }
  },[])

  const AlteraEscolha = (event,id,titulo) =>{
    if(titulo.indexOf('ecione') >= 0){
        //console.log('titulo:vazio')
        setItematualtexto('')
        return
    }
    //console.log('titulo:'+titulo)
    setMostramenu(false)
    setItematualtexto(titulo)
    setLivro(id)
    //console.log(id)
  }

  const LimparFiltro = () =>{
    setItematualtexto('')
    setMostramenu(false)
    setListalivro(listafiltro)
  }



  const SelectLivros = (props) =>{
         let classedrop  = mostramenu ? 'dropdown-menu show dropdown-class showdropdown' : 'dropdown-class'
         let array =['badge1','badge2','badge3','badge4','badge5','badge6','badge7','badge8','badge9','badge10']
         let classe = ''
         let idxclasse = -1
         let existe = []
         let cl = null
         return(
             <><CFormLabel htmlFor="exampleFormControlInput1">Listagem de Livros</CFormLabel><br/>
             <CInputGroup className="mb-3">
                 <CInputGroupText className="clinputtext has-validation">Livros</CInputGroupText>
                 <CDropdown id="myDropdown" autoClose="inside" variant="btn-group">
                     <CDropdownToggle size="sm" style={{maxHeight:'38px',borderRadius:'0px 0px 0px 0px'}} color={'secondary'}>Escolher</CDropdownToggle>
                     <CDropdownMenu className={classedrop}>
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
                                 if( idxclasse > 10){
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
                 &nbsp;<div className='mt-2'><FontAwesomeIcon onClick={()=>LimparFiltro()}style={{top:'2px',color:'red',cursor:'pointer'}} size="lg" icon={faEraser} /></div>
                 {/* <CFormInput value={itematualtexto} placeholder='Item selecionado' feedbackInvalid="O Livro deve ser informado" required /> */}
             </CInputGroup>
             </>
         )
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


  const ValorUnitario = (props) => {
        const [value, setValue] = useState(props.valor)
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Valor Unitário</CFormLabel><br/>
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
                onBlur = {(e)=>setValorunit(value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
            <CFormFeedback invalid>O Valor Unitário Precisa ser Informado</CFormFeedback>
            </>
        );
  };

  const ValorTotal = (props) => {
        const [value, setValue] = useState(props.valor)
        return (
            <>
            <CFormLabel htmlFor="exampleFormControlInput1">Valor Total</CFormLabel><br/>
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
                onBlur = {(e)=>setValortotal(value)}
                defaultValue={value}
                placeholder="0,00"
                required
            />
            <CFormFeedback invalid>O Valor Total Precisa ser Informado</CFormFeedback>
            </>
        );
  };

  const  handleSave = (erro) =>{

    if( erro == false && identrada == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        ////ene_id_ene,ene_id_liv,ene_qtde,ene_valor_unit,ene_valor_total,ene_saida,ene_created_at,ene_updated_at,ene_deleted_at
        const formData = new FormData()
        formData.append('ene_id_liv', livro)
        formData.append('ene_qtde', qtde)
        formData.append('ene_saida', 0)
        formData.append('ene_valor_unit', valorunit)
        formData.append('ene_valor_total', valortotal)
        axios
        .post(`${endpoint}/entradaestoque`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaEntradasEstoque'
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
        formData.append('ene_id_liv', livro)
        formData.append('ene_qtde', qtde)
        formData.append('ene_valor_unit', valorunit)
        formData.append('ene_valor_total', valortotal)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/entradaestoque/${identrada}`, formData, {
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
                tela('ListaEntradasEstoque')
            }, 2000)
        })
    }
 }

 const Calcula = () =>{
   let qt = qtde
   let valor = valorunit
   let total = qtde * valorunit
   setValortotal(total)
 }

 const pesquisarLivro = (val) => {
    console.log(listafiltro)
     console.log('valor'+val)
     setItematualtexto(val)
     setMostramenu(true)
     let valor =  val
     if( valor.trim() != ''){
        let lista = listafiltro.filter(
            (item)=>item.liv_autor.toLowerCase().includes(valor.toLowerCase()) ||
                    item.liv_titulo.toLowerCase().includes(valor.toLowerCase())
        )
        setListalivro(lista.slice(0,10))
     } else {
        setListalivro(listafiltro)
     }
}

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'400px'}} data-aos="fade-up">
          <h2>Entrada de Estoque</h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard className='card_bottom'>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Cadastro de Entrada de Estoques de Segurança</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CCol md={2}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<SelectLivros/>)}
                            </CCol>
                            <CCol md={4} style={{left:'-10px'}}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                        style={{height:'38px'}}
                                        label="Digite a Pesquisa"
                                        onChange={(e)=>pesquisarLivro(e.target.value)}
                                        value={itematualtexto}
                                        placeholder='Item selecionado'
                                        feedbackInvalid="O Livro deve ser informado" required
                                    />)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<ValorUnitario valor={valorunit}/>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="identrada"
                                    type='number'
                                    label="Quantidade"
                                    placeholder="Informe a Qtde"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    value={qtde}
                                    onBlur={(e)=>Calcula(e)}
                                    feedbackInvalid="A Qtde precisa ser preenchida"
                                    required
                                    onChange={(e)=>setQtde(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<ValorTotal valor={valortotal}/>)}
                            </CCol>
                            <CCol md={3}>
                                { loadpage
                                ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                : (<CFormInput
                                    id="idsaida"
                                    label="Saidas do Estoque"
                                    placeholder="Informe Qtde de Saída do Estoque"
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    value={saida}
                                    feedbackInvalid="A Descrição precisa ser preenchida"
                                    required
                                    onChange={(e)=>setSaida(e.target.value)}
                                />)}
                            </CCol>
                            <CCol md={6}>
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
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaEntradasEstoque')}>Listar</CButton>
                            </CCol>
                        </CForm>

                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default EntradaEstoque
