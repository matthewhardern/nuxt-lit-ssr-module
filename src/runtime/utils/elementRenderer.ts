import { createRequire } from 'module'
import { getWindow, installWindowOnGlobal } from '@lit-labs/ssr/lib/dom-shim.js'
import { ModuleLoader } from '@lit-labs/ssr/lib/module-loader.js'
import { renderVMTemplate } from './renderVMTemplate'

const elementRenderer = async (tagName: string, vNode: any) => {
  if (process.env.NODE_OPTIONS?.includes('--experimental-vm-modules')) {
    // create the window object
    const window = getWindow({
      includeJSBuiltIns: true,
      props: {
        require: createRequire(import.meta.url),
        customElements
      }
    })
    // create the loader
    const loader = new ModuleLoader({ global: window })
    // import module
    const importResult = await loader.importModule(
      './renderVMTemplate.mjs',
      import.meta.url
    )
    const { module } = importResult
    // get render function
    const renderTemplate = module.namespace.renderVMTemplate as Function
    // render result
    return renderTemplate({ tagName, vNode })
  } else {
    installWindowOnGlobal()
    return renderVMTemplate({ tagName, vNode })
  }
}

export default elementRenderer
