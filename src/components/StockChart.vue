<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  stockData: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

const chartData = computed(() => {
  const labels = props.stockData.data.map((d) => d.Date).reverse()
  const data = props.stockData.data.map((d) => d.Close).reverse()

  return {
    labels: labels,
    datasets: [
      {
        label: t(props.stockData.fullName) || '',
        data: data,
        fill: true,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
    ],
  }
})

const chartOptions = computed(() => {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  }
})
</script>

<template>
  <Chart v-if="stockData" type="line" :data="chartData" :options="chartOptions" />
  <div v-else>No stock data available.</div>
</template>
