import catalogoAdminJson from './catalog/catalogo_admin_exemplo.json'
import catalogTratamentoJson from './catalog/catalog_tratamento.json'
import catalogFichaJson from './catalog/catalog_ficha.json'
import catalogContextJson from './catalog/catalog_context.json'

export const catalogoContext = catalogContextJson
console.log('Catalog Context:', catalogoContext)

export const catalogoFicha = catalogFichaJson
console.log('Catalog Ficha:', catalogoContext)
export const catalogoTratamento = catalogTratamentoJson
console.log('Catalog Tratamento:', catalogoContext)

/**
 *
 * Provider simples do catálogo Admin.
 *
 * Uso:
 * <CatalogoAdmin>
 *   {({ catalogo }) => <MeuComponente catalogo={catalogo} />}
 * </CatalogoAdmin>
 *
 * Ou importe catalogoAdmin diretamente em qualquer componente.
 */
export const catalogoAdmin = catalogoAdminJson

export default function CatalogoAdmin({ children }) {
  if (typeof children === 'function') {
    return children({ catalogo: catalogoAdminJson })
  }

  return children ?? null
}
