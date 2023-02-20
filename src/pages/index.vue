<script lang="ts">
import { defineComponent } from 'vue'
import PokemonComponent from '~/components/pokemon/pokemon.component.vue'

export default defineComponent({
  name: 'Pokemon',
  components: {
    PokemonComponent,
  },
})
</script>

<template>
  <div class="container">
    <PokemonComponent />
  </div>
</template>

<style lang="scss" scoped></style>
