
import React, { useState, useEffect, useRef } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faFolderOpen,
  faSearch,
  faDesktop,
  faFile,
  faHistory,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

import CatalogoAdmin from './CatalogoAdmin'
import { catalogoContext } from './CatalogoAdmin'
import { catalogoTratamento } from './CatalogoAdmin'
import { catalogoFicha } from './CatalogoAdmin'
console.log('Context:', catalogoContext)

const ModalPesquisa = (props) => {

  const { open, close, ExibeTela } = props

  const [pesquisa, setPesquisa] = useState('')
  const inputRef = useRef(null)

  const ClickPesquisa = (tela) => {
    console.log('Screen:'+tela)
    ExibeTela(tela)
    close()
  }

  useEffect(() => {
    setPesquisa('')
  }, [open])

  const azul = '#087DEB'
  const azulEscuro = '#142DA8'
  const azulClaro = '#DFF2FF'
  const texto = '#243B75'
  const cinza = '#687895'

  return (
    <CModal
    portal
    id="modal-pesq"
    backdrop="static"
    visible={open}
    onClose={close}
    onOpened={() => inputRef.current?.focus()}
    size="xl"
    >

      {/* HEADER */}
      <CModalHeader
        closeButton
        style={{
          background: 'linear-gradient(110deg, #142DA8 0%, #087DEB 48%, #00B8F0 100%)',
          borderBottom: '4px solid #00B8F0',
          color: 'white',
          padding: '18px 24px'
        }}
      >
        <CModalTitle
          id="LiveDemoExampleLabel"
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600'
          }}
        >
          <FontAwesomeIcon
            icon={faFolderOpen}
            style={{
              marginRight: '12px',
              color: 'white'
            }}
          />

          Pesquisar no Sistema
        </CModalTitle>
      </CModalHeader>

      {/* BODY */}
      <CModalBody
        style={{
          backgroundColor: '#F7FBFF',
          display: 'flex',
          flexDirection: 'column',
          height: '70vh',
          padding: '18px 20px'
        }}
      >

        {/* SEARCH */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            padding: '5px 12px',
            backgroundColor: 'white',
            border: '1px solid #B8DFFF',
            borderRadius: '10px',
            boxShadow: '0 2px 8px #087DEB20'
          }}
        >

          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: azul,
              fontSize: '20px'
            }}
          />

          <CFormInput
            ref={inputRef}
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Pesquisar funcionalidade, tela, menu, campo..."
            aria-label="Pesquisar no sistema"
            style={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
              color: texto,
              padding: '10px 4px'
            }}
          />

          {pesquisa && (
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setPesquisa('')}
              style={{
                color: '#8AA3C7',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '5px'
              }}
            />
          )}

        </div>

        {/* RESULTS */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '5px'
          }}
        >

          <CatalogoAdmin>
            {({ catalogo }) => {

              const listaPesquisa = catalogo.screens.flatMap((screen) => [
                {
                    ...screen,
                    parent: null,
                    tipo: 'Tela'
                },

                     ...screen.functionalities.flatMap((func) => [
                        {
                        ...func,
                        context: catalogoContext.functionalities.find(
                            (ctx) => ctx.id === func.id
                        )?.context,
                        parent: screen.name,
                        tipo: 'Funcionalidade'
                        },

                    ...(func.screenComponents || []).map((component) => ({
                        id: `${func.id}_${component}`,
                        name: component,
                        description: `Componente da funcionalidade ${func.name}`,
                        tags: func.tags || [],
                        parent: func.name,
                        tipo: 'Componente'
                    }))
                ])
            ])

              const termo = pesquisa.toLowerCase()

              const listaFiltrada = listaPesquisa.filter((item) =>
                item.name.toLowerCase().includes(termo) ||
                (item.description || '').toLowerCase().includes(termo) ||
                (item.tags || []).some((tag) =>
                  tag.toLowerCase().includes(termo)
                )
              )
              console.log(
                    'ALL FUNCTIONALITIES:',
                    catalogo.screens.flatMap(
                        screen => screen.functionalities
                    ).map(func => ({
                        id: func.id,
                        name: func.name
                    }))
                )

            //   console.log(
            //         'FUNCTIONALITY IDS:',
            //         listaPesquisa
            //             .filter((item) => item.tipo === 'Funcionalidade')
            //             .map((item) => item.id)
            //   )
            console.log(
                'TRATAMENTO:',
                listaPesquisa.find(item => item.id === 'acessar_tratamento')
            )

              return (
                <>

                  {/* SECTION TITLE */}
                  <div
                    style={{
                      backgroundColor: azulClaro,
                      color: azulEscuro,
                      padding: '10px 15px',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      fontWeight: '600'
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHistory}
                      style={{
                        marginRight: '12px',
                        color: azul
                      }}
                    />

                    Resultados da pesquisa
                  </div>

                  {/* ITEMS */}
                  {listaFiltrada.map((item) => (

                    <div
                      key={item.id}
                      onClick={() =>
                        item.onClick?.functionality &&
                        ClickPesquisa(item.onClick.functionality)
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        padding: '12px 15px',
                        marginBottom: '3px',
                        borderBottom: '1px solid #DCEBFA',
                        borderRadius: '8px',
                        cursor: item.onClick?.functionality
                          ? 'pointer'
                          : 'default',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#DFF2FF'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >

                      {/* ICON */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '48px',
                          height: '48px',
                          backgroundColor: '#E2F3FF',
                          borderRadius: '10px'
                        }}
                      >
                        <FontAwesomeIcon
                          icon={item.parent ? faFile : faDesktop}
                          style={{
                            color: azul,
                            fontSize: '21px'
                          }}
                        />
                      </div>

                      {/* TEXT */}

                      <div style={{ flex: 1 }}>

                        <div
                          style={{
                            color: azulEscuro,
                            fontWeight: '600',
                            fontSize: '15px'
                          }}
                        >
                          {item.name}
                        </div>

                        <small
                          style={{
                            color: cinza,
                            fontSize: '13px'
                          }}
                        >
                          {item.parent && (
                            <>
                              {item.parent} &nbsp; › &nbsp;
                            </>
                          )}

                        {item.description}
                         </small>
                         {/* CONTEXT */}
                         {item.context && (
                            <div style={{ color: cinza, fontSize: '13px', marginTop: '4px' }}>
                                {item.context.description}
                            </div>
                         )}
                         {/* CONTEXT */}
                            {item.context && (
                            <div style={{ color: cinza, fontSize: '13px', marginTop: '4px' }}>
                                {item.context.description}
                            </div>
                            )}

                            {/* RELATED FUNCTIONALITIES */}
                            {item.context?.functionalities && (
                            <div style={{ color: cinza, fontSize: '13px', marginTop: '4px' }}>
                                <strong>Funcionalidades relacionadas:</strong>

                                {item.context.functionalities.map((id) => {
                                  console.log('RELATED IDS:', item.context.functionalities)
                                const relacionada = catalogo.screens
                                    .flatMap((screen) => screen.functionalities)
                                    .find((func) => func.id === id)

                                return relacionada && (
                                    <span key={id}>
                                    {' · '}
                                    {relacionada.name}
                                    </span>
                                )
                             })}
                            </div>
                            )}

                     </div>

                      {/* ACTION ICON */}
                      {(item.onClick?.functionality || item.tipo === 'Componente') && (
                        <FontAwesomeIcon
                            icon={faFolderOpen}
                            style={{
                                color: azul,
                                fontSize: '18px',
                                cursor: 'pointer'
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                 const destino = item.tipo === 'Componente' ? item.name : item.onClick?.functionality;
                                 console.log('TIPO:', item.tipo);
                                 console.log('DESTINO:', destino);
                                ClickPesquisa(
                                    //tem.onClick?.functionality || item.action
                                    destino
                                )
                            }}
                        />
                    )}

                    </div>

                  ))}

                  {/* EMPTY RESULT */}
                  {listaFiltrada.length === 0 && (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '35px',
                        color: cinza
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                          fontSize: '30px',
                          color: '#A8D8FA',
                          marginBottom: '12px'
                        }}
                      />

                      <div>
                        Nenhuma funcionalidade encontrada.
                      </div>
                    </div>
                  )}

                </>
              )
            }}
          </CatalogoAdmin>

        </div>

      </CModalBody>

      {/* FOOTER */}
      <CModalFooter
        style={{
          backgroundColor: '#E7F5FF',
          borderTop: '1px solid #C5E5FF',
          padding: '15px 20px'
        }}
      >

        <span
          style={{
            color: cinza,
            fontSize: '12px',
            marginRight: 'auto'
          }}
        >
          <span style={{ color: azul, fontWeight: '600' }}>
            ↑ ↓
          </span>
          &nbsp; Navegar &nbsp;&nbsp;

          <span style={{ color: azul, fontWeight: '600' }}>
            Enter
          </span>
          &nbsp; Abrir
        </span>

        <CButton
          color="primary"
          onClick={close}
          style={{
            background: 'linear-gradient(110deg, #087DEB, #00A9F0)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 18px'
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{ marginRight: '8px' }}
          />

          Fechar
        </CButton>

      </CModalFooter>

    </CModal>
  )
}

export default ModalPesquisa
