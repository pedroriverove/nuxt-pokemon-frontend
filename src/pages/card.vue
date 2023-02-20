<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { VIcon } from 'vuetify/components'
import PokemonService from '~/services/pokemon.service'
import {
  capitalizedLabel,
  convertBase,
  resolvePokemonTypes,
} from '~/utils/formatters'

export default defineComponent({
  name: 'PokemonCard',
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

<template>
  <VCard v-if="notFound" color="primary">
    <VCarousel
      :continuous="false"
      :delimiter-icon="() => h(iconRenderer, { icon: 'mdi-pokemon-go', size: '10' })"
      :show-arrows="false"
      class="carousel-delimiter-top-end"
      :height="140"
      hide-delimiter-background
    >
      <VCarouselItem>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <h6 class="text-h6 text-white mb-1 mt-2">
                No hay ningún pokemon que coincida con tu búsqueda
              </h6>
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
  <VCard v-else color="primary">
    <VCarousel
      :continuous="false"
      :delimiter-icon="() => h(iconRenderer, { icon: 'mdi-pokemon-go', size: '10' })"
      :show-arrows="false"
      class="carousel-delimiter-top-end"
      height="auto"
      hide-delimiter-background
    >
      <VCarouselItem>
        <VCardText>
          <VRow>
            <VCol cols="4">
              <h6 class="text-h6 text-white mb-1">
                {{ capitalizedLabel(pokemon.name) }}
              </h6>
              <p class="text-sm mb-0">
                #{{ pokemon.order }}
              </p>
            </VCol>
            <VCol cols="8">
              <VAvatar
                v-for="evolution in pokemon.evolutions"
                class="me-2"
                size="40"
                variant="tonal"
              >
                <VTooltip
                  activator="parent"
                  location="bottom"
                >
                  {{ capitalizedLabel(evolution.name) }}
                </VTooltip>
                <VImg :src="slideImg(evolution)" />
              </VAvatar>
            </VCol>
            <VCol
              cols="12"
              order-sm="1"
              order="2"
              sm="6"
            >
              <VRow>
                <VCol
                  class="pb-0"
                  cols="12"
                >
                  <p class="font-weight-semibold">
                    Tipo
                  </p>
                </VCol>
                <VCol
                  v-for="pokemonType in pokemon.types"
                  :key="pokemonType"
                  class="text-no-wrap"
                  cols="6"
                >
                  <VBtn
                    size="x-small"
                    :color="resolvePokemonTypes(pokemonType).color"
                    class="me-2"
                  >
                    {{ pokemonType }}
                    <VIcon
                      end
                      :icon="resolvePokemonTypes(pokemonType).icon"
                    />
                  </VBtn>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  cols="6"
                  class="text-no-wrap"
                >
                  <VChip
                    label
                    class="me-2"
                  >
                    Peso
                  </VChip>
                  <span>{{ convertBase(pokemon.weight) }}kg</span>
                </VCol>
                <VCol
                  cols="6"
                  class="text-no-wrap"
                >
                  <VChip
                    label
                    class="me-2"
                  >
                    Altura
                  </VChip>
                  <span>{{ convertBase(pokemon.height) }}m</span>
                </VCol>
              </VRow>
            </VCol>
            <VCol
              class="position-relative text-center"
              cols="12"
              order-sm="2"
              order="1"
              sm="6"
            >
              <img
                v-if="pokemon"
                :src="src"
                class="card-website-analytics-img"
                :alt="pokemon.name"
              >
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<style lang="scss">
@use "../assets/scss/card.scss";
</style>
