export interface Pokemon {
  height: number
  name: string
  order: string | number
  sprites: Sprites
  types: Array<string>
  weight: number
}

export interface Sprites {
  other: Home
}

export interface Home {
  ['official-artwork']?: { front_default: string }
  dream_world?: { front_default: string }
  home?: { front_default: string }
}
