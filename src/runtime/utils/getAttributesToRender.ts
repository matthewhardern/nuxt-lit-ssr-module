import type { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer'
import iterableToString from './iterableToString'

const getAttributesToRender = (renderer: LitElementRenderer) => {
  if (renderer.element.attributes) {
    return iterableToString(renderer.renderAttributes())
  }
  return ''
}
export default getAttributesToRender
