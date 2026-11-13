import catalogoAdminJson from './catalogo_admin_exemplo.json'

/**
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
