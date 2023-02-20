<script lang="ts">
import axios from 'axios'
import { VIcon } from 'vuetify/components'
import { defineComponent } from 'vue'
import PokemonService from '~/services/pokemon.service'
import {
  capitalizedLabel,
  convertBase,
  resolvePokemonTypes,
} from '~/utils/formatters'

export default defineComponent({
  name: 'PokemonCardComponent',
  props: ['pokemonRef'],
  data() {
    return {
      capitalizedLabel,
      convertBase,
      iconRenderer: VIcon,
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
    if (this.pokemonRef.url) {
      const { data }: any = await axios.get(this.pokemonRef.url)
      this.pokemon = await this.parseData(data)
    }
  },
  async beforeMount() {
    if (!this.pokemonRef.url)
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
  },
})
</script>

<template src="./pokemon-card.template.html" />

<style lang="scss" src="./pokemon-card.style.scss" />
