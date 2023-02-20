<script lang="ts">
import { defineComponent } from 'vue'
import slider from '~/assets/images/illustrations/sidebar.png'

export default defineComponent({
  name: 'PokemonDetail',
  data() {
    return {
      grid: true,
      knowledge: 82,
      slider,
    }
  },
  async beforeCreate() {
    console.log('pedro', this.$route.params.id)
  },
})
</script>

<template src="./pokemon-detail.template.html" />

<style lang="scss" src="./pokemon-detail.style.scss" />
