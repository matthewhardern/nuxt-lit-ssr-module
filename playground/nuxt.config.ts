import { defineNuxtConfig } from 'nuxt/config'
import NuxtModule from '..'

export default defineNuxtConfig({
  modules: [
    [
      // @ts-ignore
      NuxtModule,
      { litElementPrefix: ['my-', 'simple-'] }
    ]
  ]
})
