<script lang="ts">
import { defineComponent } from 'vue'
import slider from '~/assets/images/illustrations/sidebar.png'
import PokemonService from '~/services/pokemon.service'
import {
  capitalizedLabel,
  convertBase,
  resolvePokemonStats,
  resolvePokemonTypes,
} from '~/utils/formatters'

export default defineComponent({
  name: 'PokemonDetailComponent',
  props: ['pokemon'],
  emits: ['switchVisible'],
  data() {
    return {
      capitalizedLabel,
      convertBase,
      grid: true,
      knowledge: 82,
      pokemonService: new PokemonService(),
      resolvePokemonStats,
      resolvePokemonTypes,
      slider,
      detail: '',
    }
  },
  async beforeMount() {
    this.detail = await this.pokemonService.getDetails(this.pokemon)
  },
  methods: {
    switchVisible() {
      this.$emit('switchVisible')
    },
    slideImg(pokemon: any) {
      return (
        pokemon.sprites.other.dream_world.front_default
          || pokemon.sprites.other.home.front_default
          || pokemon.sprites.other['official-artwork'].front_default
      )
    },
  },
})
</script>

<template src="./pokemon-detail.template.html" />

<style lang="scss" src="./pokemon-detail.style.scss" />
