async function polyfill (): Promise<void> {
  // @ts-ignore
  const { hydrateShadowRoots } = await import('@webcomponents/template-shadowroot/template-shadowroot.js')
  window.addEventListener('DOMContentLoaded', () => hydrateShadowRoots(document.body), {
    once: true
  })
}

export function featureDetectAndPolyfill (string: string, type: DOMParserSupportedType) {
  // Feature detect from https://github.com/webcomponents/template-shadowroot/blob/master/src/_implementation/feature_detect.ts
  const polyfillCheckEl = new DOMParser()
    // @ts-ignore
    .parseFromString('<p><template shadowroot="open"></template></p>', 'text/html', {
      includeShadowRoots: true
    })
    .querySelector('p')

  if (!polyfillCheckEl || !polyfillCheckEl.shadowRoot) {
    polyfill()
  }
}
