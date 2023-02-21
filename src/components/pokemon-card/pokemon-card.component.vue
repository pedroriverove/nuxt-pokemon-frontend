<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import PokemonService from '~/services/pokemon.service'
import PokemonDetailComponent from '~/components/pokemon-detail/pokemon-detail.component.vue'
import {
  capitalizedLabel,
  convertBase,
  resolvePokemonTypes,
} from '~/utils/formatters'

export default defineComponent({
  name: 'PokemonCardComponent',
  components: {
    PokemonDetailComponent,
  },
  props: {
    pokemonData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      capitalizedLabel,
      convertBase,
      isDialogVisible: false,
      notFound: false,
      pokemon: {
        evolutions: [],
        height: 0,
        name: '',
        order: -1,
        types: [],
        sprites: {
          other: {
            'home': { front_default: '' },
            'official-artwork': { front_default: '' },
            'dream_world': { front_default: '' },
          },
        },
        weight: 0,
      },
      pokemonService: new PokemonService(),
      resolvePokemonTypes,
    }
  },
  computed: {
    src() {
      return (
        this.pokemon.sprites.other.dream_world.front_default
          || this.pokemon.sprites.other.home.front_default
          || this.pokemon.sprites.other['official-artwork'].front_default
      )
    },
  },
  async beforeCreate() {
    if (this.pokemonData.url) {
      const { data }: any = await axios.get(this.pokemonData.url)
      this.pokemon = await this.parseData(data)
    }
  },
  async beforeMount() {
    if (!this.pokemonData.url)
      this.notFound = true
  },
  methods: {
    async parseData({ name, id, types, sprites, weight, height, evolutions }: any) {
      const data = { name, order: id, types, sprites, weight, height, evolutions }
      data.types = types.map(({ type }: any) => type.name)
      data.evolutions = await this.pokemonService.getEvolutions(data)

      return data
    },
    slideImg(evolution: any) {
      return (
        evolution.sprites.other.dream_world.front_default
          || evolution.sprites.other.home.front_default
          || evolution.sprites.other['official-artwork'].front_default
      )
    },
    switchVisible() {
      this.isDialogVisible = false
    },
  },
})
</script>

<template src="./pokemon-card.template.html" />

<style lang="scss" src="./pokemon-card.style.scss" />
