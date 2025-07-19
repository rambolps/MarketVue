<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SelectButton from 'primevue/selectbutton'
import HomeView from './views/HomeView.vue'

const { t, locale } = useI18n()

const lang = ref('en')
const langOptions = ref([
  { label: 'English', value: 'en' },
  { label: 'Français', value: 'fr' },
])

watch(lang, (value) => {
  locale.value = value
})
</script>

<template>
  <header class="app-header container">
    <h1 class="app-title">MarketVue</h1>
    <SelectButton
      v-model="lang"
      :options="langOptions"
      optionLabel="label"
      optionValue="value"
      class="language-selector"
    />
  </header>

  <HomeView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@700;800&display=swap');

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.app-title {
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: bold;
}
</style>
