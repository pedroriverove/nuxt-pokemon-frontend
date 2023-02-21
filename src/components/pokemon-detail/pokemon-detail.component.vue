<script lang="ts">
import { defineComponent } from 'vue'
import slider from '~/assets/images/illustrations/sidebar.png'

export default defineComponent({
  name: 'PokemonDetailComponent',
  emits: ['visible'],
  data() {
    return {
      grid: true,
      knowledge: 82,
      slider,
    }
  },
  methods: {
    closeDialog() {
      this.$emit('visible')
    },
  },
})
</script>

<template src="./pokemon-detail.template.html" />

<style lang="scss" src="./pokemon-detail.style.scss" />
