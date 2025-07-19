<script setup>
import { computed, ref, watch } from 'vue'
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
  <div class="header-wrapper">
    <header class="app-header container">
      <h1 class="app-title">Market<span class="green-text">Vue</span></h1>
      <SelectButton
        v-model="lang"
        :options="langOptions"
        optionLabel="label"
        optionValue="value"
        class="language-selector"
      />
    </header>
  </div>

  <HomeView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@700;800&display=swap');

.header-wrapper {
  background-color: #0d223a;
  border-bottom: 1px solid #1a436f;
  margin-bottom: 2rem;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.app-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
}

.green-text {
  color: #42b883;
}
</style>
