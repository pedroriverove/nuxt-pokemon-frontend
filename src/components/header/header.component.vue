<script lang="ts">
import { defineComponent } from 'vue'
import { VNodeRenderer } from '~/layouts/VNodeRenderer'
import { config } from '~/layouts/config'
import { useThemeConfig } from '~/composable/useThemeConfig'

export default defineComponent({
  name: 'HeaderComponent',
  components: {
    VNodeRenderer,
  },
  data() {
    return {
      themeConfig: useThemeConfig,
      config,
    }
  },
  methods: {
    async clickRefresh() {
      window.location.reload()
    },
  },
})
</script>

<template src="./header.template.html" />

<style lang="scss" src="./header.style.scss" />
