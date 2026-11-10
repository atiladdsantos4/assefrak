import { React, useEffect, useState, useRef } from 'react';
import {
    CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTableHead,
    CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupText, CFormInput,
    CPagination, CPaginationItem, CButton, CSpinner, CFormSelect,
    CToaster, CToast, CToastBody, CToastClose
} from '@coreui/react';
import axios from 'axios';
import ModalDelete from '../componentes/ModalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faFile, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ListaInfTecnica = (props) => {
    const { tela, altera } = props;
    const token = import.meta.env.VITE_APP_TOKEN;
    const imagem = import.meta.env.VITE_APP_ENDPOINT_IMG;
    const endpoint = import.meta.env.VITE_APP_ENDPOINT_API;

    const [listainf, setListainf] = useState([]);
    const [listafiltro, setListafiltro] = useState([]);
    const [numnpagination, setNumpagination] = useState(1);
    const [paginaatual, setPaginaatual] = useState(1);
    const [ultimapagina, setUltimapagina] = useState(1);
    const [registroini, setRegistroini] = useState(0);
    const [registrofim, setRegistrofim] = useState(0);
    const [qtderegistros, setQtderegistros] = useState(0);
    const [qtderegistrospagina, setQtderegistrospagina] = useState(10);
    const [pesquisar, setPesquisar] = useState('');
    const [load, setLoad] = useState(false);
    const [openmodalconfirma, setOpenmodalconfirma] = useState(false);
    const [textomodal, setTextomodal] = useState('');
    const [iditemexclusao, setIditemexclusao] = useState(null);
    const toaster = useRef(null);
    const [toast, addToast] = useState();

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
        },
    };

    const atualizaPaginacao = (lista, pagina = 1) => {
        const total = lista.length;
        const paginas = Math.max(1, Math.ceil(total / Number(qtderegistrospagina)));
        const inicio = (pagina - 1) * Number(qtderegistrospagina);
        const fim = Math.min(inicio + Number(qtderegistrospagina), total);

        setQtderegistros(total);
        setNumpagination(paginas);
        setUltimapagina(paginas);
        setPaginaatual(pagina);
        setRegistroini(total > 0 ? inicio + 1 : 0);
        setRegistrofim(fim);
        setListainf(lista.slice(inicio, fim));
    };

    useEffect(() => {
        setLoad(false);
        axios.get(`${endpoint}/informacao-tecnica?listagem=S`, config)
            .then((result) => {
                altera(null);
                const lista = result.data.data || [];
                setListafiltro(lista);
                atualizaPaginacao(lista, 1);
                setLoad(true);
            })
            .catch((error) => {
                console.error(error);
                setLoad(true);
            });
    }, [qtderegistrospagina]);

    const pesquisarGrid = (event) => {
        const valor = event.target.value;
        setPesquisar(valor);

        const lista = listafiltro.filter((item) =>
            String(item.inf_id_inf ?? '').toLowerCase().includes(valor.toLowerCase()) ||
            String(item.inf_autor ?? '').toLowerCase().includes(valor.toLowerCase()) ||
            String(item.inf_url_dev ?? '').toLowerCase().includes(valor.toLowerCase()) ||
            String(item.inf_url_prod ?? '').toLowerCase().includes(valor.toLowerCase()) ||
            String(item.inf_versao_laravel ?? '').toLowerCase().includes(valor.toLowerCase()) ||
            String(item.inf_created_at ?? '').toLowerCase().includes(valor.toLowerCase())
        );

        atualizaPaginacao(lista, 1);
    };

    const clickPagination = (event, pagina) => {
        event?.preventDefault();
        const lista = pesquisar.trim() !== ''
            ? listafiltro.filter((item) =>
                String(item.inf_id_inf ?? '').toLowerCase().includes(pesquisar.toLowerCase()) ||
                String(item.inf_autor ?? '').toLowerCase().includes(pesquisar.toLowerCase()) ||
                String(item.inf_url_dev ?? '').toLowerCase().includes(pesquisar.toLowerCase()) ||
                String(item.inf_url_prod ?? '').toLowerCase().includes(pesquisar.toLowerCase()) ||
                String(item.inf_versao_laravel ?? '').toLowerCase().includes(pesquisar.toLowerCase()) ||
                String(item.inf_created_at ?? '').toLowerCase().includes(pesquisar.toLowerCase())
            )
            : listafiltro;
        atualizaPaginacao(lista, pagina);
    };

    const PreviousPage = (event) => {
        if (paginaatual < ultimapagina) clickPagination(event, paginaatual + 1);
    };

    const PriousPage = (event) => {
        if (paginaatual > 1) clickPagination(event, paginaatual - 1);
    };

    const Pagination = () => {
        const elementos = [];
        for (let i = 1; i <= numnpagination; i++) {
            elementos.push(
                <CPaginationItem key={i} active={i === paginaatual}
                    className="cpointer cl_pagination" onClick={(e) => clickPagination(e, i)}>
                    {i}
                </CPaginationItem>
            );
        }
        return (
            <CPagination aria-label="Page navigation example">
                <CPaginationItem className="cpointer" aria-label="Previous" onClick={PriousPage}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                {elementos}
                <CPaginationItem className="cpointer" aria-label="Next" onClick={PreviousPage}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
            </CPagination>
        );
    };

    const CompToast = (texto, color) => (
        <CToast id="idtoast" visible={false} color={color} delay={3000}
            className="text-white align-items-center" style={{ borderRadius: '5px', color: 'white' }}>
            <div className="d-flex">
                <CToastBody style={{ color: 'white' }}>{texto}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
        </CToast>
    );

    const Delete = (id) => {
        setIditemexclusao(id);
        setTextomodal('Deseja Realmente excluir o registro?');
        setOpenmodalconfirma(true);
    };

    const excluirItemBanco = (idexclusao) => {
        setOpenmodalconfirma(false);

        setListainf((prevItems) => prevItems.map((item) =>
            item.inf_id_inf === idexclusao ? { ...item, inf_loadexclui: true } : item
        ));
        setListafiltro((prevItems) => prevItems.map((item) =>
            item.inf_id_inf === idexclusao ? { ...item, inf_loadexclui: true } : item
        ));

        axios.delete(`${endpoint}/informacao-tecnica/${idexclusao}`, config)
            .then((result) => {
                if (result.data.status === true) {
                    setListafiltro((prevItems) => prevItems.map((item) =>
                        item.inf_id_inf === idexclusao
                            ? { ...item, inf_loadexclui: false, inf_exclui: true }
                            : item
                    ));
                    setListainf((prevItems) => prevItems.map((item) =>
                        item.inf_id_inf === idexclusao
                            ? { ...item, inf_loadexclui: false, inf_exclui: true }
                            : item
                    ));

                    addToast(CompToast('Exclusão Realizada com sucesso !!!', 'success'));
                    setTimeout(() => {
                        const toastElement = document.getElementById('idtoast');
                        if (toastElement) {
                            toastElement.classList.remove('show');
                            toastElement.remove();
                        }
                    }, 2000);
                } else {
                    setListainf((prevItems) => prevItems.map((item) =>
                        item.inf_id_inf === idexclusao ? { ...item, inf_loadexclui: false } : item
                    ));
                    setListafiltro((prevItems) => prevItems.map((item) =>
                        item.inf_id_inf === idexclusao ? { ...item, inf_loadexclui: false } : item
                    ));
                }
            })
            .catch(() => {
                setListainf((prevItems) => prevItems.map((item) =>
                    item.inf_id_inf === idexclusao ? { ...item, inf_loadexclui: false } : item
                ));
                setListafiltro((prevItems) => prevItems.map((item) =>
                    item.inf_id_inf === idexclusao ? { ...item, inf_loadexclui: false } : item
                ));
            });
    };

    const EditaRegistro = (event, id) => {
        event.preventDefault();
        altera(id);
        tela('InfTecnica');
    };

    const ItensAcao = ({ id, exclui, loadexclui }) => (
        <>
            {loadexclui
                ? <CSpinner className="spinner_div" size="sm" />
                : exclui
                    ? <span style={{ color: 'red' }}>Excluído</span>
                    : <FontAwesomeIcon size="xl" onClick={() => Delete(id)}
                        style={{ color: 'red', cursor: 'pointer' }} icon={faTrash} />}
            &nbsp;&nbsp;
            {!exclui && <FontAwesomeIcon size="xl" onClick={(e) => EditaRegistro(e, id)}
                style={{ color: 'blue', cursor: 'pointer' }} icon={faEdit} />}
        </>
    );

    const CorpoTabela = ({ lista }) => {
        if (lista.length === 0) {
            return <CTableRow><CTableDataCell colSpan="7" style={{ textAlign: 'center' }}>
                Não há Registros para Listagem</CTableDataCell></CTableRow>;
        }

        return lista.map((item, index) => (
            <CTableRow key={item.inf_id_inf}
                color={index % 2 === 0 ? 'primary' : 'secondary'}>
                <CTableDataCell className="sticky-col">{item.inf_id_inf}</CTableDataCell>
                <CTableDataCell>{item.inf_autor}</CTableDataCell>
                <CTableDataCell>{item.inf_url_dev}</CTableDataCell>
                <CTableDataCell>{item.inf_url_prod}</CTableDataCell>
                <CTableDataCell>{item.inf_versao_laravel}</CTableDataCell>
                <CTableDataCell>{item.inf_created_at}</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <ItensAcao id={item.inf_id_inf}
                        exclui={item.inf_exclui}
                        loadexclui={item.inf_loadexclui} />
                </CTableDataCell>
            </CTableRow>
        ));
    };

    const ImageHeader = () => (
        <div style={{ position: 'relative', top: '4px' }}>
            <img className="img-fluid" style={{ borderRadius: '5px' }}
                src={imagem + 'telas/logoheaderlistagem.png'} />
            <div style={{ fontSize: '24px', position: 'relative', left: '-56px',
                top: '-35px', color: 'white', fontWeight: 'bold' }}>
                Informação Técnica
            </div>
        </div>
    );

    return (
        <div data-aos="zoom-in">
            <section id="hero" className="hero section light-background">
                <div className="container section-title box-title mb-2" data-aos="fade-up">
                    <ImageHeader />
                </div>
                <div className="container">
                    <CCard>
                        <CCardHeader className="fundo_head">
                            <FontAwesomeIcon size="lg" icon={faList} />&nbsp;Listagem de Informações Técnicas
                        </CCardHeader>
                        <CCardBody className="mt-1 mb-4">
                            <div className="mb-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <CButton color="primary" onClick={() => tela('InfTecnica')}>
                                    Nova Informação Técnica&nbsp;<FontAwesomeIcon size="lg" icon={faFile} />
                                </CButton>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: '1' }}>
                                    <CInputGroup style={{ maxWidth: '200px' }} className="mb-2 mt-2">
                                        <CInputGroupText className="clinputtext">Qtde Registros</CInputGroupText>
                                        <CFormSelect value={qtderegistrospagina}
                                            onChange={(e) => setQtderegistrospagina(Number(e.target.value))}>
                                            {[5, 10, 15, 20, 25, 30].map((qtd) =>
                                                <option key={qtd} value={qtd}>{qtd}</option>)}
                                        </CFormSelect>
                                    </CInputGroup>
                                </div>
                                <div style={{ justifySelf: 'end', alignSelf: 'end' }}>
                                    <CInputGroup style={{ maxWidth: '400px' }} className="mb-2 mt-2">
                                        <CInputGroupText className="clinputtext">Pesquisar</CInputGroupText>
                                        <CFormInput placeholder="Digite um valor" value={pesquisar}
                                            onChange={pesquisarGrid} />
                                    </CInputGroup>
                                </div>
                            </div>
                            <CTable className="tabela" responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell className="clthinputtext sticky-col"
                                            style={{ borderRadius: '5px 0px 0px 0px' }} scope="col">ID</CTableHeaderCell>
                                        <CTableHeaderCell className="clthinterno" scope="col">Autor</CTableHeaderCell>
                                        <CTableHeaderCell className="clthinterno" scope="col">URL Desenvolvimento</CTableHeaderCell>
                                        <CTableHeaderCell className="clthinterno" scope="col">URL Produção</CTableHeaderCell>
                                        <CTableHeaderCell className="clthinterno" scope="col">Versão Laravel</CTableHeaderCell>
                                        <CTableHeaderCell className="clthinterno" scope="col">Cadastro</CTableHeaderCell>
                                        <CTableHeaderCell className="clthinterno"
                                            style={{ textAlign: 'center', borderRadius: '0px 5px 0px 0px' }} scope="col">Ação</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {load
                                        ? <CorpoTabela lista={listainf} />
                                        : <CTableRow><CTableDataCell colSpan="7" style={{ textAlign: 'center' }}>
                                            <CSpinner color="info" /></CTableDataCell></CTableRow>}
                                </CTableBody>
                            </CTable>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <div className="exibepagination">
                                        <div>Pagina:&nbsp;{paginaatual}&nbsp;</div>
                                        <div>Registros:&nbsp;{registroini + '...' + registrofim + ' num Total de ' + qtderegistros}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', top: '-5px' }}>
                                    <Pagination />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </div>
            </section>
            <CToaster ref={toaster} placement="top-end">{toast}</CToaster>
            <ModalDelete
                id={iditemexclusao}
                funcret={() => excluirItemBanco(iditemexclusao)}
                open={openmodalconfirma}
                close={() => setOpenmodalconfirma(false)}
                texto={textomodal}
            />
        </div>
    );
};

export default ListaInfTecnica;
