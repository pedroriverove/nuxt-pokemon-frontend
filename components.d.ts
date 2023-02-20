import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AccessControl: typeof import('~/components/access-control.vue')['default']
    HeaderComponent: typeof import('~/components/header/header.component.vue')['default']
  }
}
