import { featureDetectAndPolyfill } from '../../utils/shadowRootPolyfill'
// @ts-ignore
import { defineNuxtPlugin } from '#imports'

// @ts-ignore
featureDetectAndPolyfill()

export default defineNuxtPlugin(() => {})
