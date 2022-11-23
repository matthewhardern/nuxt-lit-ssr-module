import '@lit-labs/ssr/lib/render-lit-html.js'
import { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer.js'
import attachPropsToRenderer from './attachPropsToRenderer'
import getShadowContents from './getShadowContents'
import getAttributesToRender from './getAttributesToRender'

export const renderVMTemplate = ({ tagName, vNode }: {tagName: string, vNode: any}) => {
  // create the element renderer
  const renderer = new LitElementRenderer(tagName)
  // attach props
  attachPropsToRenderer(tagName, vNode, renderer)
  // call connected callback
  renderer.connectedCallback()
  // get shadow contents
  const shadowContents = getShadowContents(renderer)
  //
  const attributes = getAttributesToRender(
    renderer
  )

  return {
    shadowContents,
    attributes
  }
}
