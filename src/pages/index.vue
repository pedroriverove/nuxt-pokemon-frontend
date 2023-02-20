<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import PokemonCard from '~/pages/card.vue'
import PokemonService from '~/services/pokemon.service'

export default defineComponent({
  name: 'Pokemon',
  components: {
    PokemonCard,
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
      {
        const text = this.message.toLowerCase()
        this.pokemonOnly = await this.pokemonService.getPokemonByID(text)

        this.loadingSearch = true

        setTimeout(() => {
          this.loadingSearch = false
          this.grid = false
        }, 1500)
      }
    },
  },
})
</script>

<template>
  <div class="loading">
    <VProgressCircular
      v-show="showLoading"
      :indeterminate="showLoading"
      :size="70"
      :width="6"
      color="info"
    />
  </div>
  <VRow
    v-show="!showLoading"
    align="start"
    justify="center"
  >
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        v-model="message"
        clear-icon="mdi-close-circle"
        clearable
        type="text"
        variant="outlined"
      >
        <template #prepend>
          <VTooltip location="bottom">
            <template #activator="{ props }">
              <VIcon
                icon="mdi-help-circle-outline"
                v-bind="props"
              />
            </template>
            Buscar un pokemon mediante el nombre
          </VTooltip>
        </template>
        <template #append-inner>
          <VFadeTransition leave-absolute>
            <VProgressCircular
              v-if="loadingSearch"
              color="info"
              indeterminate
              size="24"
            />
          </VFadeTransition>
        </template>
        <template #append>
          <VBtn
            class="mt-n3"
            color="info"
            size="large"
            @click="clickSearch"
          >
            <VIcon icon="mdi-table-search" />
            <span class="ms-3">
              Buscar
            </span>
          </VBtn>
        </template>
      </VTextField>
    </VCol>
  </VRow>
  <VRow
    v-if="!showLoading && !grid"
    align="start"
    justify="center"
  >
    <VCol
      :key="pokemonOnly"
      cols="12"
      md="8"
    >
      <PokemonCard :pokemon-ref="pokemonOnly" />
    </VCol>
  </VRow>
  <VRow v-show="!showLoading && grid">
    <VCol
      v-for="pokemon in pokemonList"
      :key="pokemon"
      cols="12"
      md="6"
    >
      <PokemonCard :pokemon-ref="pokemon" />
    </VCol>
  </VRow>
  <VRow v-show="!showLoading && grid">
    <VCol
      cols="12"
      md="12"
    >
      <div class="text-center mt-4">
        <VBtn
          :disabled="!previous"
          :loading="loadingPrevious"
          class="mr-2"
          color="info"
          @click="getPreviousPokemon"
        >
          <VIcon
            start
            icon="mdi-chevron-left"
          />
          Anterior
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="mdi-refresh" />
            </span>
          </template>
        </VBtn>
        <VBtn
          :disabled="!next"
          :loading="loadingNext"
          class="ml-2"
          color="info"
          @click="getNextPokemon"
        >
          Próximo
          <VIcon
            end
            icon="mdi-chevron-right"
          />
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="mdi-refresh" />
            </span>
          </template>
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.custom-loader {
  display: flex;
  animation: loader 1s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
@use "../assets/scss/main.scss";
</style>
