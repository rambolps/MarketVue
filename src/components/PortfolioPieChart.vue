<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'
import { usePortfolioStore } from '@/stores/portfolio'
import { useStockStore } from '@/stores/stocks'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const portfolioStore = usePortfolioStore()
const stockStore = useStockStore()

const chartData = computed(() => {
  const portfolioItems = portfolioStore.getPortfolioItems
  const labels = portfolioItems.map((item) => t(item.ticker))
  const data = portfolioItems.map((item) => {
    const stock = stockStore.getStockByTicker(item.ticker)
    const latestPrice = stock.data[0].Close
    return item.quantity * latestPrice
  })

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
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
  }
})
</script>

<template>
  <Chart type="pie" :data="chartData" :options="chartOptions" />
</template>
