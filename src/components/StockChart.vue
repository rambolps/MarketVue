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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#fff',
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
  <Chart type="line" :data="chartData" :options="chartOptions" class="chart" />
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
