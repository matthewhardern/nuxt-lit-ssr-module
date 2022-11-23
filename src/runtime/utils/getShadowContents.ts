import type { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer'
import iterableToString from './iterableToString'

const getShadowContents = (renderer: LitElementRenderer): {value: string} => {
  // @ts-ignore
  return iterableToString(renderer.renderShadow({}))
}

export default getShadowContents
