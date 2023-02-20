import { defineStore } from 'pinia'

export const useThemeConfig = defineStore('useThemeConfig', {
  state: () => ({
    theme: 'light',
    icon: 'mdi-weather-night',
  }) as any,
  getters: {
    getTheme(): any {
      return this.theme
    },
    getIcon(): any {
      return this.icon
    },
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.icon = this.icon === 'mdi-weather-night' ? 'mdi-weather-sunny' : 'mdi-weather-night'
    },
  },
})
