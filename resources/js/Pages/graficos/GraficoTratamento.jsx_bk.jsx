import { React, useEffect, useState, Suspense, useRef } from 'react';
import { CCard, CCardBody,CCardHeader,CCol,CButton, CTable,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
    CTableHead,CForm, CFormCheck,CFormFeedback,CFormInput,CFormLabel,CInputGroup,
  CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,CDropdownDivider,
  CToaster,CToast,CToastBody,CToastClose,CInputGroupText,CFormSelect, CPlaceholder,
  CRow,CFormTextarea,CBadge,CSpinner } from '@coreui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faChartArea, faChartPie, faChartBar, faPerson, faSave, faCheck, faFile, faTrash, faEdit, faPlus, faCirclePlus,faFilePdf,faList } from '@fortawesome/free-solid-svg-icons';
import ListaFocoEnergetico from '../listagem/ListaFocoEnergetico';
import ModalOcorrencia from '../componentes/ModalOcorrencia';
import ModalExibe from '../componentes/ModalExibe';
import {
  Pie,
  PieChart,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
  Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Cell,Rectangle
} from 'recharts';
//import { RechartsDevtools, generateMockData } from '@recharts/devtools';





// The Main component receives props passed from the Laravel controller
const GraficoTratamento = (props) => {
   const { tela, setratamento, setacolhido } = props
   const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG
   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const token  = import.meta.env.VITE_APP_TOKEN
   const endpoint_report =import.meta.env.VITE_APP_ENDPOINT
   const primeiroLoad = useRef(true);
   const [validated, setValidated] = useState(false)
   const [valida, setValida] = useState(false)
   const [loadpage, setLoadpage] = useState(false)
   const [loadtabela, setLoadtabela] = useState(false)
   const [loadsave, setLoadsave] = useState(false)
   const [acaomodal, setAcaomodal] = useState('novo')
   const [est, setEst] = useState(false)
   const [param, setParam] = useState(null)
   const [grupo, setGrupo] = useState(null)
   const [idtratamento, setIdtratamento] = useState(null)
   const [listagrupo, setListagrupo] = useState([])
   const [dadosGrafico1,setdadosGrafico1] = useState([])
   const [grupoAtual, setGrupoAtual] = useState(null);
   const [idbar, setIdBar] = useState(null);
   const [loadini, setLoadini] = useState(false);
   const [loadbar, setLoadbar] = useState(false);
   const [descricao, setDescricao] = useState(null);
   const [titulo, setTitulo] = useState(null);
   const [data, setData] = useState({
        data_sexo: [],
        data_faixa: [],
   });
   const toaster = useRef(null)
   const [toast, addToast] = useState()//toast
   const style_placeholder = {paddingBottom:'15px'}
   const [listaDatas, setListaDatas] = useState([]);
   const [ano, setAno] = useState('');
   const [mes, setMes] = useState('');
   const listaanos = listaDatas.map(item => item.ano);
   const listameses = listaDatas.find(item => item.ano === ano)?.meses ?? [];


  useEffect(()=>{
      let data = formatDate(new Date());
      if (param != null ){
        const fetchData = async () => {
            console.log('parametro_existe')
            try {
                setLoadpage(true)
                const requests = [
                    axios.get(`${endpoint}/colaborador?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/acolhido?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/passe?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/foco?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/condicao?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/fortalecimento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/limpeza?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/alerta?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tipotratamento?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/status?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tratamento/${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/tipoocorrencia?listagem=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                    axios.get(`${endpoint}/ocorrenciapasse?listagem=S&tratamento=${param}`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    })

                ]
                const responses = await Promise.all(requests);

                let result_colaborador = responses[0]
                let result_acolhido = responses[1]
                let result_passe = responses[2]
                let result_foco = responses[3]
                let result_condicao = responses[4]
                let result_fortalecimento = responses[5]
                let result_limpeza = responses[6]
                let result_alerta = responses[7]
                let result_tratamento = responses[8]
                let result_status = responses[9]
                let result_showtratamento = responses[10].data.data
                let result_ocorrencia = responses[11]
                let result_ocorrenciapasse = responses[12]

                //setListapasse(result_passe.data.data)
                setListafoco(result_foco.data.data)
                setListacondicao(result_condicao.data.data)
                setListafortalecimento(result_fortalecimento.data.data)
                setListalimpeza(result_limpeza.data.data)
                setListaalerta(result_alerta.data.data)
                setListastatus(result_status.data.data)
                let lista = result_ocorrenciapasse.data.data.sort((a,b)=>b.ocp_id_ocp > a.ocp_id_ocp)
                setListaocorrenciapasse(lista)
                // setListatratamento(result_tratamento.data.data)

                let array_col = result_colaborador.data.data
                array_col.unshift({col_id_col:'',col_name:'Selecione o Colaborador'})
                setListacolaborador(array_col)
                let array_aco = result_acolhido.data.data
                array_aco.unshift({aco_id_aco:'',aco_name:'Selecione a Acolhido'})
                setListaacolhido(array_aco)
                let array_tra = result_tratamento.data.data
                array_tra.unshift({tit_id_tit:'',tit_descricao:'Selecione o Tipo de Tratamento'})
                setListatratamento(array_tra)
                let array_top = result_ocorrencia.data.data
                array_top.unshift({top_id_top:'',top_descricao:'Selecione o Tipo de Ocorrência'})
                setListaocorrencia(array_top)

                // setListacolaborador(result_estado.data.data)
                // let array_city = result_cidade.data.data
                // array_city.unshift({cid_id_cid:'',cid_descricao:'Selecione a Cidade'})
                // setListacidade(array_city)
                /** tratando a ediçao*/
                console.log('acolhido:'+result_showtratamento.tra_id_aco)
                setAcolhido(result_showtratamento.tra_id_aco)
                setIdentrevista(result_showtratamento.tra_ficha)
                setColaborador(result_showtratamento.tra_id_col)
                let idade = result_acolhido.data.data.filter((item)=>item.aco_id_aco == result_showtratamento.tra_id_aco)
                setIdade(idade[0].aco_idade)
                setCadastro(result_showtratamento.tra_created_at)
                setTipotratamento(result_showtratamento.tra_id_tit)
                setStatus(result_showtratamento.tra_id_stt)
                setPrimeiro(result_showtratamento.tra_pri_impressao)

                //ficha//
                if(result_showtratamento.tra_ficha !=null){
                   setIdentrevistaparam(result_showtratamento.tra_ficha)
                   setTextoentrevistaparam('Ficha de Entrevista Nº '+result_showtratamento.tra_ficha)
                }
                let string  = null

                //string = JSON.parse(result_showtratamento.tra_passe)
                //console.log(string)
                setListapasse(result_showtratamento.tra_passe.meta)

                //string = JSON.parse(result_showtratamento.tra_foco_energetico)
                console.log(string)
                setListafoco(result_showtratamento.tra_foco_energetico.meta)

                //string = JSON.parse(result_showtratamento.tra_cond_energetica)
                //console.log(string)
                setListacondicao(result_showtratamento.tra_cond_energetica.meta)
                //link = string.meta[0].path

                // string = JSON.parse(result_showtratamento.tra_fortalecimento)
                // console.log(string)
                setListafortalecimento(result_showtratamento.tra_fortalecimento.meta)

                //string = JSON.parse(result_showtratamento.tra_limpeza)
                //console.log(string)
                setListalimpeza(result_showtratamento.tra_limpeza.meta)

                //string = JSON.parse(result_showtratamento.tra_alerta)
                //console.log(string)
                setListaalerta(result_showtratamento.tra_alerta.meta)

                setIdtratamento(result_showtratamento.tra_id_tra)

                /** tratando a ediçao*/
                setTurvo('texto-turvo')
                setLoadpage(false)
                setLoadtabela(false)
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
                setLoadtabela(true)
                const requests = [
                    axios.get(`${endpoint}/vtratamento?grupo=S`,{
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'multipart/form-data',
                                Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
                            },
                    }),
                 ]
                const responses = await Promise.all(requests);

                let result_grupo = responses[0]
                // let result_acolhido = responses[1]
                // let result_passe = responses[2]

                let array_gru = result_grupo.data.data
                array_gru.unshift({descricao:'',option:'Selecione o Grupo'})
                setListagrupo(array_gru)
                setLoadpage(false)
            }
            catch (error) {
                console.error("One of the requests failed", error);
            }
        }
        fetchData()
      }
    },[])

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
  }

  const CompGrupo = () =>{
        return(
            listagrupo.map((item,index)=>{
            return(
                <option key={index} value={item.descricao}>{item.option}</option>
                )
            })
        )
  }

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

const dadosGrafico = [
  { name: 'Humor', value: 10 },
  { name: 'Sono', value: 5 },
  { name: 'Gravidade', value: 3 }
];

useEffect(()=>{

    if (primeiroLoad.current) {
        primeiroLoad.current = false;
        return;
    }

    if(ano == '' || mes == ''){
         addToast(CompToast('O Ano e o Mês precisam ser informados!!!', 'danger')) //--> usa toast
         setTimeout(() => {
                document.getElementById('idtoast').classList.remove('show')
                document.getElementById('idtoast').remove()
          }, 2000)
          setValida(false)
          return
    }

    if (!grupo) {
        setdadosGrafico1([]);
        setGrupoAtual(null);
        return;
    }

    setdadosGrafico1([]);
    setGrupoAtual(grupo);
    setLoadini(true)

   axios.get(`${endpoint}/vtratamento?filtro=S&descricao=${grupo}`,{
         headers: {
             Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
         },
   })
   .then((result) => {

       setdadosGrafico1(
          result.data.data.map(item => ({
                id: item.id,
                option: item.option,
                name: item.descricao,
                value: item.total
          }))
        )
    /*
    0	{ id: 2, descricao: "Insônia", total: 7 }
    1	{ id: 3, descricao: "Impulsividade", total: 1 }
    2	{ id: 4, descricao: "Intolerância/Impaciência", total: 7 }
    */
    //    setIdDiaPasse(result.data.data.dip_id_dip)
    //    setDescricao(result.data.data.dip_descricao)
    //    setCadastro(result.data.data.dip_created_at)
       //console.log(dados)
       //setLoadpage(false)
    })
},[grupo])

const RADIAN = Math.PI / 180;
const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#A020F0', // Purple
  '#FF1493', // Deep Pink
  '#32CD32', // Lime Green
  '#DC143C', // Crimson
  '#00BFFF', // Deep Sky Blue
  '#FF6347', // Tomato
  '#8A2BE2', // Blue Violet
  '#20B2AA', // Light Sea Green
  '#FFD700', // Gold
  '#6495ED', // Cornflower Blue
  '#FF69B4', // Hot Pink
  '#2E8B57', // Sea Green
  '#BA55D3', // Medium Orchid
  '#4169E1', // Royal Blue
  '#F08080', // Light Coral
  '#6A5ACD', // Slate Blue
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
        x={x}
        y={y}
        fill="#38231b"
        textAnchor="middle"
        dominantBaseline="central"
        style={{fontWeight:'bold',cursor:'pointer'}}
        fontSize={12}
        >
        <tspan x={x} dy="-0.5em">
            {name.includes('/') ? name.split('/')[0] : name}
        </tspan>

        <tspan x={x} dy="1.2em">
            {name.includes('/') ? name.split('/')[1] : ''}
            {' '}{((percent ?? 1) * 100).toFixed(0)}%
        </tspan>
    </text>
  );
};

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];

  let fillOpacity;

  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }

  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      stroke="none"
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  );
};

const handleClickPie = (data) => {
    console.log('Selected:', data.payload);
    // console.log('Name:', data.name);
    // console.log('Total:', data.payload.value);
    console.log('PAYLOAD:', data.payload);

    ExibeBar(data.payload.id, data.payload.option);
    setTitulo(data.payload.name)
    //setIdBar(data.payload.id)
    //setDescricao(data.payload.option)

    // Later:
    // setItemSelecionado(data);
    // setOpenmodal(true);
};

const PieChartWithCustomizedLabel = ({data,isAnimationActive = true}) => {
  console.log('Dados do gráfico:', data);
  return (
    <PieChart
      style={{
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        aspectRatio: 1
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="value"
        isAnimationActive={isAnimationActive}
        //isAnimationActive={false}
        shape={MyCustomPie}
        onClick={handleClickPie}
      />

      <Legend content={<MinhaLegenda />} />

      {/* <RechartsDevtools /> */}
    </PieChart>
  );
}

const MinhaLegenda = ({ payload }) => {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
      {payload.map((item, index) => (
        <div
          key={index}
          className="d-flex align-items-center mb-1"
          style={{ fontSize: 14 }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: COLORS[index % COLORS.length],
              display: 'inline-block',
              marginRight: 6,
              borderRadius: 2
            }}
          />

          <span style={{ color: '#000' }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const SimpleBarChart = ({data,tipo}) => {
  return (
    <BarChart
      //style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      style={{
          width: '100%',
          maxWidth: '700px',
          height: '250px',
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="name" fontSize={11} />
      <YAxis width="auto" fontSize={11} />
      <Tooltip />
      {/* <Legend /> */}
      {
        tipo === 'faixa'
            ? (
                <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    shape={(props) => (
                        <Rectangle
                            {...props}
                            fill={COLORS[props.index % COLORS.length]}
                        />
                    )}
                />
            )
            : (
                <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    shape={(props) => (
                        <Rectangle
                            {...props}
                            fill={props.name === 'Masculino'
                                ? '#0d6efd'
                                : '#e83e8c'}
                        />
                    )}
                />
            )
      }
      {/* <Bar dataKey="y" radius={[10, 10, 0, 0]} /> */}
      {/* <RechartsDevtools /> */}
    </BarChart>
  );
};

const ExibeBar =(id,descricao) =>{

   setLoadbar(true)
   axios.get(`${endpoint}/vtratamento?drill=S&descricao=${encodeURIComponent(descricao)}&id=${id}`,{
         headers: {
             Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token, //--> Dentro do Env <--//
         },
   })
   .then((result) => {
        setLoadbar(false)
        setData(result.data);

    })
}


    const ImageHeader = () =>{
     return(
        <div style={{position:'relative',top:'4px'}}>
        <img class="img-fluid" style={{borderRadius:'5px'}} src={imagem+'telas/logoheadergraficos.png'}/>
        <div style={{fontSize:'22px',position:'relative',left:'-65px',top:'-35px',color:'white',fontWeight:'bold'}}>
            Gráfico Tratamentos
         </div>
        </div>
    )
 }

 const data1 = [
    { name: 'Agitação', value: 7 },
    { name: 'Desemprego/Crise financeira', value: 6 },
    { name: 'Dor ou sensação de peso', value: 4 },
    { name: 'Em tratamento médico', value: 3 },
    { name: 'Fenômenos mediúnicos', value: 2 },
];

    return(
       <div data-aos="zoom-in">
            <section id="grafico-form" class="hero section light-background">
                <div class="container section-title box-title mb-2" data-aos="fade-up">
                    <ImageHeader/>
                    {/* <h2> Tratamento </h2>
                    <p>Cadastro</p> */}
                </div>
                    <div class="container">
                        <CCard>
                            <CCardHeader className="fundo_head"><FontAwesomeIcon size="lg" icon={faChartPie} />{' '}Estatísticas Tratamentos</CCardHeader>
                            <CCardBody>
                                <CRow>
                                   <CCol md={6}>
                                        { loadpage
                                        ? (<div style={style_placeholder}><CPlaceholder className='grad68full' xs={12} size="lg"/></div>)
                                        : (
                                        <CFormSelect
                                            id="idGrupo"
                                            label="Contexto Avaliado"
                                            size="sm"
                                            value={grupo}
                                            feedbackInvalid="O Acolhido deve ser informado"
                                            onChange={(e)=>setGrupo(e.target.value)}
                                            required
                                        >
                                        <CompGrupo/>
                                        </CFormSelect>)}
                                   </CCol>
                                </CRow>
                                <CRow className="align-items-center">
                                    <CCol md={6}>
                                            {grupoAtual === grupo && dadosGrafico1.length > 0 ? (
                                                <PieChartWithCustomizedLabel data={dadosGrafico1} />
                                            ) : (
                                                <div
                                                    className="d-flex justify-content-center align-items-center"
                                                    style={{
                                                        width: '100%',
                                                        maxWidth: '500px',
                                                        aspectRatio: '1',
                                                    }}
                                                >
                                                    {loadini ? <CSpinner
                                                        color="info"
                                                        variant="grow"
                                                        style={{ width: '3rem', height: '3rem' }}
                                                    /> : <></>}
                                                </div>
                                            )}
                                    </CCol>

                                    <CCol md={6}>
                                        <CRow>
                                            <CCol md={12} className="d-flex flex-column align-items-center justify-content-center">
                                                { loadbar ? <CSpinner
                                                        color="info"
                                                        variant="grow"
                                                        style={{ width: '3rem', height: '3rem' }}
                                                    />  :
                                                    <>
                                                    { titulo != null ? <CFormLabel style={{ marginTop: '-95px' }} htmlFor="exampleForm">{'Contexto: '+titulo}</CFormLabel> : <></>}
                                                    <SimpleBarChart data={data.data_sexo} tipo="sexo" />
                                                    </>
                                                    }
                                            </CCol>

                                            <CCol md={12} className="d-flex align-items-center justify-content-center">
                                                { loadbar ? <CSpinner
                                                        color="info"
                                                        variant="grow"
                                                        style={{ width: '3rem', height: '3rem' }}
                                                    />  : <SimpleBarChart data={data.data_faixa} tipo="faixa" />}
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                                {/* <CRow>
                                    <CCol md={6}>
                                    {grupoAtual === grupo && dadosGrafico1.length > 0 ? (
                                        <PieChartWithCustomizedLabel data={dadosGrafico1}/>
                                    ) : (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                width: '100%',
                                                maxWidth: '500px',
                                                aspectRatio: '1',
                                            }}
                                        >
                                             <CSpinner  color="info" variant="grow" style={{ width: '3rem', height: '3rem' }} />
                                        </div>
                                    )}
                                    </CCol>
                                    <CCol md={3}>
                                        <SimpleBarChart data={data.data_sexo}/>
                                    </CCol>
                                    <CCol md={3}>
                                        <SimpleBarChart data={data.data_faixa}/>
                                    </CCol>
                                </CRow> */}
                            </CCardBody>
                        </CCard>
                    </div>
            </section>
        </div>
    )


}

export default GraficoTratamento
