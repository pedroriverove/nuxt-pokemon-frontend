<script setup lang="ts">
import iconPokemon from '~/assets/images/icons/icon-pokemon.png'
</script>

<template>
  <div class="misc-wrapper">
    <AccessControl />
    <VBtn
      to="/"
      class="bg-primary mt-6 mb-6"
    >
      Inicio
    </VBtn>
    <div class="misc-avatar w-100 text-center">
      <VImg
        :max-width="200"
        :src="iconPokemon"
        alt="Pokemon"
        class="mx-auto"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/main.scss";
</style>
