<script lang="ts">
import { defineComponent } from 'vue'
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
      pokemonService: new PokemonService(),
      resolvePokemonStats,
      resolvePokemonTypes,
      description: '',
    }
  },
  async beforeMount() {
    this.description = await this.pokemonService.getDescription(this.pokemon.order)
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
