<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'
import { usePortfolioStore } from '@/stores/portfolio'
import { useStockStore } from '@/stores/stocks'
import { useI18n } from 'vue-i18n'

const portfolioStore = usePortfolioStore()
const stockStore = useStockStore()
const { t } = useI18n()

const chartData = computed(() => {
  const portfolioItems = portfolioStore.getPortfolioItems
  if (portfolioItems.length === 0) {
    return {
      labels: [],
      datasets: [],
    }
  }

  const allDates = new Set()
  portfolioItems.forEach((item) => {
    const stock = stockStore.getStockByTicker(item.ticker)
    if (stock) {
      stock.data.forEach((d) => allDates.add(d.Date))
    }
  })

  const labels = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b))

  const portfolioHistory = labels.map((date) => {
    return portfolioItems.reduce((total, item) => {
      const stock = stockStore.getStockByTicker(item.ticker)
      if (stock) {
        const priceOnDate = stock.data.find((d) => d.Date === date)
        if (priceOnDate) {
          return total + item.quantity * parseFloat(priceOnDate.Close)
        }
      }
      return total
    }, 0)
  })

  return {
    labels: labels,
    datasets: [
      {
        label: t('portfolioValue'),
        data: portfolioHistory,
        fill: false,
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
