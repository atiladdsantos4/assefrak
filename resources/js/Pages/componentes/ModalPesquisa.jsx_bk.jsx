import React, { useState, useEffect } from 'react'
import { CBadge,CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormInput,CRow,CCol  } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFolderOpen, faSave, faCheck, faFile, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CatalogoAdmin from './CatalogoAdmin';


const ModalPesquisa = (props) => {
  const {open,close,ExibeTela} = props
  const [pesquisa, setPesquisa] = useState('')

  const ClickPesquisa = (tela) =>{
    ExibeTela(tela)
    close()
  }

  useEffect(()=>{
    setPesquisa('');
  },[open])

  return (
    <>
      <CModal
            id="modal-pesq"
            backdrop="static"
            visible={open}
            onClose={close}
            aria-labelledby="LiveDemoExampleLabel"
            size="xl"
      >
        <CModalHeader style={{backgroundColor:'#6895C1'}}>
          <CModalTitle id="LiveDemoExampleLabel" style={{color:'white'}}>
            <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Pesquisar no Sistema
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{display: 'flex',flexDirection: 'column', height: '70vh'}}>
            <CRow>
               <CCol md="12">
                   <CFormInput
                      label="Pesquisar Escopo"
                      type="text"
                      placeholder="Default input"
                      aria-label="default input example"
                      value={pesquisa}
                      onChange={(e)=>setPesquisa(e.target.value)}
                    />
               </CCol>
            </CRow>
            <CatalogoAdmin>
                {({ catalogo }) => {

                    const listaPesquisa = catalogo.screens.flatMap((screen) => [
                        {
                            ...screen,
                            parent: null
                        },
                        ...screen.functionalities.map((func) => ({
                            ...func,
                            parent: screen.name
                        }))
                    ])

                    const listaFiltrada = listaPesquisa.filter((item) =>
                        item.name.toLowerCase().includes(pesquisa.toLowerCase()) ||
                        (item.description || '').toLowerCase().includes(pesquisa.toLowerCase()) ||
                        (item.tags || []).some((tag) =>
                            tag.toLowerCase().includes(pesquisa.toLowerCase())
                        )
                    )

                    return (
                        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            <h3><CBadge className='badge-protegido'>Informações no Sistema</CBadge></h3>

                            {listaFiltrada.map((item) => (
                                <div key={item.id}>
                                    {item.parent && (
                                        <small>{item.parent} → </small>
                                    )}
                                    {item.name} → {item.description}
                                    {item.onClick?.functionality && (
                                        <FontAwesomeIcon
                                            style={{ color: '#4b41dd', cursor: 'pointer' }}
                                            icon={faFolderOpen}
                                            onClick={() => ClickPesquisa(item.onClick.functionality)}
                                        />
                                     )}
                                </div>
                            ))}
                        </div>
                    )
                }}
            </CatalogoAdmin>
            {/* <CatalogoAdmin>
               {({ catalogo }) => (
                    <div>
                        <h3>Pesquisar no Sistema</h3>

                        {catalogo.screens
                            .filter((item) =>
                                item.name.toLowerCase().includes(pesquisa.toLowerCase())
                            )
                            .map((item) => (
                                <div key={item.id}>
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                )}
            </CatalogoAdmin> */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={close}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalPesquisa
