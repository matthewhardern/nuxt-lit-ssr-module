// @ts-ignore
import '@lit-labs/ssr/lib/install-global-dom-shim.js'
import { transform } from 'ultrahtml'
import swap from 'ultrahtml/transformers/swap'
import { NuxtRenderHTMLContext } from 'nuxt/dist/core/runtime/nitro/renderer'
import type { NitroAppPlugin } from 'nitropack'
import renderLitElement from '../../utils/renderLitElement'

export default <NitroAppPlugin> function (nitroApp) {
  nitroApp.hooks.hook('render:html', async (htmlContext: NuxtRenderHTMLContext) => {
    await renderAllElements(htmlContext)
  })
}

async function renderAllElements (htmlContext: NuxtRenderHTMLContext) {
  for (let i = 0; i < htmlContext.body.length; i++) {
    const markup = htmlContext.body[i]

    const customElementList: {[key: string]: (props: {[key: string]: string}, children: Node[]) => Promise<{ value: string }>} = {}

    // @ts-ignore
    for (const key of customElements.__definitions.keys()) {
      customElementList[key] = async (props: {[key: string]: string}, children: Node[]) => {
        return await renderLitElement(key, { children, props })
      }
    }

    htmlContext.body[i] = await transform(markup, [
      swap(customElementList)
    ])
  }
}
