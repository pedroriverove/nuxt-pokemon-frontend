import axios from 'axios'
import { Pokemon } from '~/interfaces/pokemon.interface'
import { EvolutionChain, PokemonEvolution, PokemonList } from '~/interfaces/data.interface'

export default class PokemonService {
  protected readonly url: string = 'https://pokeapi.co/api/v2'

  protected evolutions: any = []

  async getPokemonList(): Promise<PokemonList> {
    try {
      const {
        data: { next, previous, results },
      } = await axios.get(`${this.url}/pokemon/?limit=25`)

      return { next, previous, results }
    }
    catch (err) {
      console.log('🚀 ~ function: getPokemonByID ~ error:', err)

      return { next: '', previous: '', results: [] }
    }
  }

  async getPokemonByID(text: string) {
    try {
      const {
        data: { id, name },
      } = await axios.get(`${this.url}/pokemon/${text}`)

      return { name, url: `${this.url}/pokemon/${id}` }
    }
    catch (err) {
      console.log('🚀 ~ function: getPokemonByID ~ error:', err)

      return { name: '', url: '' }
    }
  }

  async getEvolutions(pokemon: Pokemon) {
    try {
      const { data: specie } = await axios.get(
        `${this.url}/pokemon-species/${pokemon.name}`,
      )

      if (!specie?.evolution_chain?.url)
        return await this.getNewGenPokemon(pokemon, this.url)

      const { data: evolution } = await axios.get(specie.evolution_chain.url)
      const pokemonEvolution = evolution.chain

      await this.pushPokemon(pokemonEvolution, this.evolutions)
      await this.addEvolutions(pokemonEvolution, this.evolutions)

      return this.evolutions.filter(
        (evolution: any) =>
          pokemon.order !== evolution.order,
      )
    }
    catch (err) {
      console.log('🚀 ~ function: getEvolutions ~ error:', err)

      return []
    }
  }

  private async getNewGenPokemon(pokemon: any, url: string) {
    const { data: pokemonData } = await axios.get(`${url}/pokemon/${pokemon.name}`)

    return [pokemonData]
  }

  private async addEvolutions(pokemonEvolution: PokemonEvolution, evolutions: Array<string>) {
    for (const evolutionChain of pokemonEvolution.evolves_to) {
      await this.pushPokemon(evolutionChain, evolutions)
      if (evolutionChain.evolves_to.length !== 0)
        await this.addEvolutions(evolutionChain, evolutions)
    }
  }

  private async pushPokemon(evolutionChain: EvolutionChain, evolutions: any[]) {
    const id = this.getPokemonId(evolutionChain)
    const { data } = await axios.get(`${this.url}/pokemon/${id}`)
    const pokemonData = this.parseData(data)

    evolutions.push(pokemonData)
  }

  private getPokemonId(evolutionChain: EvolutionChain) {
    const url = evolutionChain!.species!.url

    return url.split('/')[6]
  }

  private parseData({ name, id, types, sprites, weight, height }: any) {
    const data = { name, order: id, types, sprites, weight, height }
    data.types = types.map(({ type }: any) => type.name)

    return data
  }
}
