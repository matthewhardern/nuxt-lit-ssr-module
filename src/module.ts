import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, isNuxt2, isNuxt3 } from '@nuxt/kit'
import { Nuxt } from '@nuxt/schema'
import { transform } from 'ultrahtml'
import swap from 'ultrahtml/transformers/swap'
import renderLitElement from './runtime/utils/renderLitElement'

export interface ModuleOptions {
  litElementPrefix: string[] | string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'litSSRNuxtModule',
    configKey: 'litSSR'
  },
  setup (options, nuxt) {
    // create path to runtime directory
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    // create resolver
    const { resolve } = createResolver(import.meta.url)
    // // add run time to transpile list
    // nuxt.options.build.transpile.push(runtimeDir)
    //
    if (isNuxt3()) {
      setupNuxt3(nuxt, resolve, options)
    }
    if (isNuxt2()) {
      setupNuxt2(nuxt, resolve, options)
    }
  }
})

const setupNuxt3 = (nuxt: Nuxt, resolve: any, options: ModuleOptions) => {
  // add module side effects
  nuxt.options.nitro.moduleSideEffects = nuxt.options.nitro.moduleSideEffects || []
  nuxt.options.nitro.moduleSideEffects.push(
    '@lit-labs/ssr/lib/install-global-dom-shim.js',
    '@lit-labs/ssr/lib/render-lit-html.js'
  )

  // add plugins
  addPlugin(resolve('./runtime/plugins/nuxt3/shim.client'))
  addPlugin(resolve('./runtime/plugins/nuxt3/hydrateSupport.client'))
  addPlugin(resolve('./runtime/plugins/nuxt3/domShim.server'))

  // add nitro plugin
  nuxt.options.nitro.plugins = nuxt.options.nitro.plugins || []
  nuxt.options.nitro.plugins.push(resolve('./runtime/plugins/nitro/nitroLitRenderer'))

  // add prefixes of web components to custom element list
  const isCustomElement = nuxt.options.vue.compilerOptions.isCustomElement || (() => false)
  nuxt.options.vue.compilerOptions.isCustomElement = tag => (Array.isArray(options.litElementPrefix)
    ? options.litElementPrefix.some(p => tag.startsWith(p))
    : tag.startsWith(options.litElementPrefix)) || isCustomElement(tag)
}

const setupNuxt2 = (nuxt: any, resolve: any, options: ModuleOptions) => {
  // we need to transpile for lit and lit ssr
  nuxt.options.build.transpile = ['@lit-labs/ssr', 'lit']

  // This is required to work around lit using node-fetch@3 and nuxt2 using node-fetch@2
  nuxt.options.alias = {
    ...nuxt.options.alias,
    'node-fetch': resolve(__dirname, '../node_modules/node-fetch')
  }

  // add prefixes of web components to custom element list
  nuxt.options.vue.config.ignoredElements = Array.isArray(options.litElementPrefix) ? options.litElementPrefix : [options.litElementPrefix]

  // add plugins
  addPlugin(resolve('./runtime/plugins/nuxt2/shim.client'))
  addPlugin(resolve('./runtime/plugins/nuxt2/hydrateSupport.client'))
  addPlugin(resolve('./runtime/plugins/nuxt2/domShim.server'))

  nuxt.hook('render:route', async (context: any, { html }: any) => {
    const customElementList: {[key: string]: (props: {[key: string]: string}, children: Node[]) => Promise<{value: string}>} = {}

    // @ts-ignore
    for (const key of customElements.__definitions.keys()) {
      customElementList[key] = async (props: {[key: string]: string}, children: Node[]) => {
        return await renderLitElement(key, { children, props })
      }
    }

    html = await transform(html, [
      swap(customElementList)
    ])
  })
}
