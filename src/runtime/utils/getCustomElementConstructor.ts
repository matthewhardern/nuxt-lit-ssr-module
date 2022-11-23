import isCustomElementTag from './isCustomElementTag'

const getCustomElementConstructor = (name: string) => {
  if (typeof customElements !== 'undefined' && isCustomElementTag(name)) {
    return customElements.get(name) || null
  } else if (typeof name === 'function') {
    return name
  }
  return null
}

export default getCustomElementConstructor
