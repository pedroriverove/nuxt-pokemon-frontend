<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import PokemonCardComponent from '~/components/pokemon-card/pokemon-card.component.vue'
import PokemonService from '~/services/pokemon.service'

export default defineComponent({
  name: 'PokemonComponent',
  components: {
    PokemonCardComponent,
  },
  data() {
    return {
      grid: true,
      loadingNext: false,
      loadingPrevious: false,
      loadingSearch: false,
      message: 'Pikachu',
      next: '',
      pokemonList: [],
      pokemonOnly: {
        name: '',
        url: '',
      },
      pokemonService: new PokemonService(),
      previous: '',
      search: '',
      showLoading: true,
      url: 'https://pokeapi.co/api/v2/pokemon/?limit=25',
    }
  },
  watch: {
    async url() {
      await this.getPokemon()
    },
  },
  async beforeMount() {
    await this.getPokemon()

    setInterval(() => {
      this.showLoading = false
    }, 2500)
  },
  methods: {
    async getPokemon() {
      const {
        data: { results, next, previous },
      } = await axios.get(this.url)

      this.pokemonList = results
      this.next = next
      this.previous = previous
    },
    async getNextPokemon() {
      this.url = this.next
      this.loadButtons('next')
    },
    async getPreviousPokemon() {
      this.url = this.previous
      this.loadButtons('previous')
    },
    loadButtons(text: string) {
      if (text === 'next') {
        this.loadingNext = true

        setTimeout(() => {
          this.loadingNext = false
          window.scrollTo(0, 0)
        }, 2500)
      }
      else if (text === 'previous') {
        this.loadingPrevious = true

        setTimeout(() => {
          this.loadingPrevious = false
          window.scrollTo(0, 0)
        }, 2500)
      }
    },
    async clickSearch() {
      const text = this.message.toLowerCase()
      this.pokemonOnly = await this.pokemonService.getPokemonByID(text)

      this.loadingSearch = true

      setTimeout(() => {
        this.loadingSearch = false
        this.grid = false
      }, 1500)
    },
  },
})
</script>

<template src="./pokemon.template.html" />

<style lang="scss" src="./pokemon.style.scss" />
