import { html, __unsafeHTML } from 'ultrahtml'
import elementRenderer from './elementRenderer'

const renderLitElement = async (tagName: string, vNode: any) => {
  const { attributes, shadowContents } = await elementRenderer(tagName, vNode)
  // return html
  return html`<${tagName}${attributes}><template shadowroot="open">${__unsafeHTML(shadowContents)}</template>${vNode.children}</${tagName}>`
}

export default renderLitElement
