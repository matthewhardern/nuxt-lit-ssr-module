import type { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer.js'
import getCustomElementConstructor from './getCustomElementConstructor'

const attachPropsToRenderer = (
  tagName: string,
  vNode: {children: Node[], props: {[key: string]: string}},
  renderer: LitElementRenderer
) => {
  const customElementConstructor = getCustomElementConstructor(tagName)
  const props = vNode.props
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      // check if this is a reactive property
      if (
        customElementConstructor !== null &&
        // @ts-ignore
        customElementConstructor.elementProperties.get(key)
      ) {
        // This gets around the issue of properties having a key but no value
        if (value === '') {
          renderer.setProperty(key, true)
        } else {
          renderer.setProperty(key, value)
        }
      } else {
        renderer.setAttribute(key, value)
      }
    }
  }
}

export default attachPropsToRenderer
