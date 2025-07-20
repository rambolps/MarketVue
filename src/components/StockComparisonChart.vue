<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'
import { useStockStore } from '@/stores/stocks'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  stock1: {
    type: Object,
    required: true,
  },
  stock2: {
    type: Object,
    required: true,
  },
})

const stockStore = useStockStore()
const { t } = useI18n()

const chartData = computed(() => {
  const stock1Data = props.stock1
  const stock2Data = props.stock2

  if (!stock1Data || !stock2Data) {
    return { labels: [], datasets: [] }
  }

  const labels = stock1Data.data.map((d) => d.Date).reverse()
  const data1 = stock1Data.data.map((d) => d.Close).reverse()
  const data2 = stock2Data.data.map((d) => d.Close).reverse()

  return {
    labels: labels,
    datasets: [
      {
        label: t(stock1Data.fullName),
        backgroundColor: '#42A5F5',
        data: data1,
      },
      {
        label: t(stock2Data.fullName),
        backgroundColor: '#66b486',
        data: data2,
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
          color: '#FFFFFF',
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
  <Chart type="bar" :data="chartData" :options="chartOptions" class="chart" />
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
