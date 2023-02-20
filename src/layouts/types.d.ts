import type { VNode } from 'vue'

export interface UserConfig {
  app: {
    title: string
    logo: VNode
  }
}

export interface Config {
  app: {
    loader: UserConfig['app']['logo']
    logo: UserConfig['app']['logo']
    title: UserConfig['app']['title']
  }
}
