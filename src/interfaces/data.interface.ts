export interface PokemonList {
  next: string
  previous: string
  results: Results[]
}

export interface Results {
  name: string
  url: string
}

export interface PokemonEvolution {
  evolves_to: any
}

export interface EvolutionChain {
  species?: {
    url: string
  }
}
