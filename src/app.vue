<script lang="ts">
import { defineComponent } from 'vue'
import { useThemeConfig } from '~/composable/useThemeConfig'

export default defineComponent({
  data() {
    return {
      themeConfig: useThemeConfig,
    }
  },
})
</script>

<template>
  <VApp id="inspire" :theme="themeConfig().getTheme">
    <HeaderComponent />
    <VMain>
      <VContainer>
        <RouterView />
      </VContainer>
    </VMain>
  </VApp>
</template>
