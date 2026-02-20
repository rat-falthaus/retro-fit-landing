/// <reference types="vite/client" />
/// <reference types="vite-ssg/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'aos' {
  export interface AosOptions {
    offset?: number
    delay?: number
    duration?: number
    easing?: string
    once?: boolean
    mirror?: boolean
    anchorPlacement?: string
  }

  export default class AOS {
    static init(options?: AosOptions): void
    static refresh(): void
    static refreshHard(): void
  }
}
