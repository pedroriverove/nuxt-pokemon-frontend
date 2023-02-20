// @ts-expect-error
import type { Config } from './types'
import pokemon from '~/assets/images/pokemon.svg?raw'
// @ts-expect-error
import loader from '~/assets/images/loader.svg?raw'

export const config: Config = {
  app: {
    loader: h('div', { innerHTML: loader }),
    logo: h('div', { innerHTML: pokemon }),
    title: 'Pokemon',
  },
}
