import { React, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCardTitle,CCol,CButton,CCardImage,
  CForm, CFormCheck,CFormFeedback,CFormInput,CSpinner,CFormLabel,CInputGroup,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPerson,faSave,faCheck,faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput,IMaskMixin } from 'react-imask';
import axios from 'axios';




// The Main component receives props Fortalecimentod from the Laravel controller
const Ficha = (props) => {
  console.log(props.param)
  const { tela } = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
  const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
  const endpoint_report =import.meta.env.VITE_APP_ENDPOINT
  const token  = import.meta.env.VITE_APP_TOKEN
  const [validated, setValidated] = useState(false)
  const [loadpage, setLoadpage] = useState(false)
  const [loadsave, setLoadsave] = useState(false)
  const [fechacentro, setFechacentro] = useState(1)
  const [idtipotratamento, setIdtipotratamento] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [qtde, setQdte] = useState('')
  const [qtdeagua, setQdteagua] = useState('')
  const [diasemana, setDiasemana] = useState('TERÇA-FEIRA')
  const [cadastro, setCadastro] = useState('')
  const [semanas,setSemanas] = useState([])
  const [estado,setEstado] = useState(false)
  const [toast, addToast] = useState()//toast
  const [param, setParam] = useState(props.param)//toast
  //--> constantes cartao <--//
  const [cabecalho, setCabecalho] = useState('Associação Espírita Fraternidade Kardecista')
  const [endereco1, setEndereco1] = useState('End. Rua da Ambrósio, nº 183')
  const [endereco2, setEndereco2] = useState('2 de Julho / Camaçari-Ba')
  const [titulo, setTitulo] = useState('CARTÃO DE TRATAMENTO FLUIDOTERAPIA Nº______')
  const [nome,setNome] =useState('Nome:______________________________________________')
  const [horario,setHorario] =useState('TERÇA-FEIRA: 18:00 ÀS 18:50h')
  const [fechamento,setFechamento] =useState('FECHAMENTO DO PORTÃO ÀS 19:30h')
  const [inicio,setInício] = useState('INÍCIO: ____/____/_____')
  const [passes,setPasses] = useState('Passes ('+qtde+') Semanas')
  const [agua,setAgua] = useState('Beber Água fluidificda:('+qtde+') Semanas ( ) vezes ao dia')
//   $table->Increments('mnt_id_mnt');
//             $table->string('mnt_cabecalho',500);
//             $table->string('mnt_endereco1',300);
//             $table->string('mnt_endereco2',300);
//             $table->string('mnt_titulo_horario',300);
//             $table->string('mnt_titulo_fechamento',300);
//             $table->string('mnt_inicio',40);
//             $table->string('mnt_texto_passes',40);
//             $table->string('mnt_texto_agua',40);
//             $table->string('mnt_itens_obs',3000);
//             $table->timestamp('man_created_at');
//             $table->string('mnt_texto_controle',40);


  const toaster = useRef(null)
  const style_placeholder = {paddingBottom:'15px'}
  //tit_id_aco,tit_name,tit_cpf,tit_email,tit_tipo_telefone,tit_telefone,tit_ativo,tit_created_at,tit_updated_at,tit_deleted_at

  useEffect(()=>{
    let data = formatDate(new Date());
    setCadastro(data)
    if( props.param != null){
       setLoadpage(true)
       axios
        .get(`${endpoint}/tipotratamento/${param}`, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            setIdtipotratamento(result.data.data.tit_id_tit)
            setDescricao(result.data.data.tit_descricao)
            setQdte(result.data.data.tit_qtde_semana)
            setCadastro(result.data.data.tit_created_at)
            setLoadpage(false)
        })
    } else {
       setLoadpage(false)
    }
  },[])

  const Icon = () =>{
    return(<FontAwesomeIcon icon={faCheck}/>)
  }

  const lista_obs =[
    { icone:<Icon/>, texto:'Trazer 01 garrafa de água.'},
    { icone:<Icon/>, texto:'Não traga criança nas reuniões de tratamento.'},
    { icone:<Icon/>, texto:'Chegue no horário marcado e traga o cartão.'},
    { icone:<Icon/>, texto:'Se tiver vícios reduza-os ao máximo possível, se possível, suspenda-os, pelo menos durante o tratamento.'},
    { icone:<Icon/>, texto:'Evite grandes dispêndios de energias físicas mentais.'},
    { icone:<Icon/>, texto:'Fazer Leitura Edificante.'},
    { icone:<Icon/>, texto:'Estando em tratamento mécico, não suspender.'},
    { icone:<Icon/>, texto:'Após a interrupção por 2(duas) vezes seguidas, reiniciará os passes'},
  ]

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

  const mudaTratamento = (event,valor) =>{
    setQdte(valor)
    setPasses('Passes ('+valor+') Semanas')
    setAgua('Beber Água fluidificada:('+valor+') Semanas ('+qtdeagua+') ao dia')
    ListaSemana(valor)
  }

  const mudaAgua = (event,valor) =>{
    setQdteagua(valor)
    setAgua('Beber Água fluidificada:('+qtde+') Semanas ('+valor+') vezes ao dia')
  }

  const mudaDia = (event,valor) =>{
    console.log(valor)
    setDiasemana(valor)
    let intervalo = valor == 'TERÇA-FEIRA' ? ': 18:00 ÀS 18:50h' : ': 08:00 ÀS 08:50h'
    if( valor === 'TERÇA-FEIRA'){
        setFechamento('FECHAMENTO DO PORTÃO ÀS 19:30h')
        setFechacentro(1)
    } else {
        setFechamento('FECHAMENTO DO PORTÃO ÀS 9:30h')
        setFechacentro(0)
    }
    setHorario(valor+intervalo)
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

    if( erro == false && idtipotratamento == null) {
        console.log('entre_aqui_post')
        setLoadsave(false)
        const formData = new FormData()
        formData.append('tit_descricao', descricao)
        formData.append('tit_qtde_semana',qtde)
        axios
        .post(`${endpoint}/tipotratamento`, formData, {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,//dentro do env//
            },
        })
        .then((result) => {
            //setSaved(!saved)
            let valor = 'ListaFichas'
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
        formData.append('tit_descricao', descricao)
        formData.append('tit_qtde_semana',qtde)
        formData.append('_method', 'put')
        axios
         .post(`${endpoint}/tipotratamento/${idtipotratamento}`, formData, {
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
                tela('ListaFichas')
            }, 2000)
        })
    }
 }

 const ListaSemana = (valor)=>{
    let array = []
    for(let i = 0; i < valor; i++){
       array.push({item:'item:'+i})
    }
    console.log(array)
    setSemanas(array)
    setEstado(!estado)
 }

 const Colunas = () =>{
    console.log('entrei colunas')
    const style = qtde == 4 ? {maxWidth:'100px',textAlign:'center',border:'1px solid black'} : {maxWidth:'67px',textAlign:'center',border:'1px solid black'}
    // const style_8 = ''
    return(
        <div class="container">
           <div class="row align-items-center" style={{Height: '200px'}}>
            {
                semanas.map((item,index) =>{
                    return(
                      <div className="col" style={style}>{index+1+'ª'}</div>
                    )
                })
            }
            </div>
       </div>
    )
 }

 const ColunasOk = () =>{
    console.log('entrei colunas')
    const style = qtde == 4 ? {maxWidth:'100px',textAlign:'center',border:'1px solid black'} : {maxWidth:'67px',textAlign:'center',border:'1px solid black'}
    return(
        <div class="container">
           <div class="row align-items-center" style={{Height: '200px'}}>
            {
                semanas.map((item,index) =>{
                    return(
                      <div className="col" style={style}>&nbsp;</div>
                    )
                })
            }
            </div>
       </div>
    )
 }

  return (
    <div data-aos="zoom-in">
        <section id="hero" class="hero section light-background">
        <div class="container section-title box-title mb-2" style={{minWidth:'700px'}} data-aos="fade-up">
          <h2> Impressão de Fichas Tratamento </h2>
          <p>Cadastro</p>
        </div>
        <div class="container">
                <CToaster className="p-3" placement="middle-end" push={toast} ref={toaster} />
                <CCard>
                <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faPerson} />&nbsp;Geração Impressão de Fichas Tratamento</CCardHeader>
                <CCardBody>
                    <CForm className="row g-3 needs-validation" noValidate  id="form-acolhido" onSubmit={handleSubmit} validated={validated}>
                            <CRow>
                                <CCol md={6}>
                                    <CFormSelect
                                        id="idTipodeTratamento"
                                        label="Tipo de Tratamento"
                                        value={qtde}
                                        feedbackInvalid="A Quantidade Semanas deve ser informada"
                                        onChange={(e)=>mudaTratamento(e,e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="4">Duração de 4 semanas</option>
                                        <option value="6">Duração de 6 Semanas</option>
                                        <option value="8">Constante</option>
                                    </CFormSelect>
                                    <CFormSelect
                                        id="idAgua"
                                        label="Doses Água Fluidificada"
                                        value={qtdeagua}
                                        feedbackInvalid="A Quantidade Agua deve ser informada"
                                        onChange={(e)=>mudaAgua(e,e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="3">3 Vezes ao dia</option>
                                        <option value="4">4 Vezes ao dia</option>
                                        <option value="5">5 Vezes ao dia</option>
                                        <option value="6">6 Vezes ao dia</option>
                                    </CFormSelect>
                                    <CFormSelect
                                        id="idAgua"
                                        label="Dia de Tratamento"
                                        value={diasemana}
                                        feedbackInvalid="A Quantidade Agua deve ser informada"
                                        onChange={(e)=>mudaDia(e,e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="TERÇA-FEIRA">TERÇA-FEIRA</option>
                                        <option value="DOMINGO">DOMINGO</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol md={6} className='mt-4'>
                                    <div class="justify-content-center">
                                        <CCard id="card_ficha" style={{ width: '26rem',border:'2px solid black' }}>
                                            <CRow className='mt-2 mb-2 ms-1'>
                                                <CCol md={2}>
                                                    <CCardImage orientation="top" style={{width:'48px',height:'48px'}} src={imagem+'/favicon.png'} />
                                                </CCol>
                                                <CCol md={10}>
                                                    <CCardTitle className="cabecalho">
                                                        <p>{cabecalho}<br/>{endereco1}<br/>{endereco2}</p>
                                                    </CCardTitle>
                                                </CCol>
                                            </CRow>
                                            <CRow className='mt-2 mb-2 ms-1'>
                                                <CCol style={{fontSize:'14px',textAlign:'center'}} md={12}>
                                                    {titulo}
                                                </CCol>
                                            </CRow>
                                            <CRow className='mt-2 mb-1 ms-1'>
                                                <CCol style={{fontSize:'14px',textAlign:'center'}} md={12}>
                                                    {nome}
                                                    <p style={{fontWeight:'bold'}}>{horario}<br/>{fechamento}</p>
                                                </CCol>
                                            </CRow>
                                            <CRow className='ms-1 mb-2'>
                                                <CCol style={{fontSize:'14px',textAlign:'center'}} md={6}>
                                                    {inicio}
                                                </CCol>
                                                <CCol style={{fontSize:'14px',textAlign:'center'}} md={6}>
                                                    {passes}
                                                </CCol>
                                                <CCol style={{fontSize:'14px',textAlign:'left',marginLeft:'24px'}} md={12}>
                                                    {agua}
                                                </CCol>
                                            </CRow>
                                            <CRow className='ms-0'>
                                                <CCol style={{fontSize:'12px',textAlign:'left'}} md={12}>
                                                    <ul style={{listStyle:'none'}}>
                                                    {
                                                        lista_obs.map((item,index)=>{
                                                        return(
                                                            <li key={index}><Icon/>&nbsp;{item.texto}</li>
                                                        )
                                                        })
                                                    }
                                                    </ul>
                                                </CCol>
                                            </CRow>
                                            <CRow className='ms-1 mb-4 align-items-center'>
                                            <p style={{marginLeft:'-3px',textAlign:'center',fontSize:'14px',fontWeight:'bold',lineHeight:'0.5'}}>CONTROLE PERÍODO DO TRATAMENTO</p>
                                            <Colunas est={estado}/>
                                            <ColunasOk est={estado}/>
                                            </CRow>
                                        </CCard>
                                    </div>
                                </CCol>
                            </CRow>
                            <CCol xs={12}>
                                {/* <CButton color="primary" type="submit">
                                <FontAwesomeIcon size="lg" icon={faSave} />&nbsp;Salvar
                                {' '}
                                {loadsave? <CSpinner size="sm" /> : ''}
                                </CButton>
                                {' '}
                                <CButton color="warning" type="button" onClick={(e)=>handleClick(e,'ListaFichas')}>Listar</CButton>
                                {' '} */}
                                <CButton as="a" color="danger" role="button" target="_blank" href={endpoint_report+'/relatorio/ficha?relatorio=ficha&qtdeagua='+qtdeagua+'&qtdpasses='+qtde+'&horario='+horario+'&fechamento='+fechamento+'&fechacentro='+fechacentro}>
                                <FontAwesomeIcon size="lg" icon={faFilePdf} />&nbsp; Imprimir
                                </CButton>
                            </CCol>
                        </CForm>
                </CCardBody>
            </CCard>
        </div>
        </section>
    </div>
  )
}
export default Ficha
