<script setup>
import { ref, computed } from 'vue'
import { useStockStore } from '@/stores/stocks'
import { usePortfolioStore } from '@/stores/portfolio'
import StockChart from '@/components/StockChart.vue'
import StockComparisonChart from '@/components/StockComparisonChart.vue'
import PortfolioPieChart from '@/components/PortfolioPieChart.vue'
import PortfolioPerformanceChart from '@/components/PortfolioPerformanceChart.vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stockStore = useStockStore()
const portfolioStore = usePortfolioStore()

const selectedStock = ref(stockStore.getTickerList[0].code)
const quantity = ref(1)
const dialogVisible = ref(false)

const compareStock1 = ref(stockStore.getTickerList[0].code)
const compareStock2 = ref(stockStore.getTickerList[1].code)

const stockData = computed(() => {
  const stock = stockStore.getStockByTicker(selectedStock.value)
  if (stock) {
    return {
      ...stock,
      fullName: t(selectedStock.value),
    }
  }
  return null
})

const translatedCompareStock1 = computed(() => {
  const stock = stockStore.getStockByTicker(compareStock1.value)
  return stock ? { ...stock, fullName: t(compareStock1.value) } : null
})

const translatedCompareStock2 = computed(() => {
  const stock = stockStore.getStockByTicker(compareStock2.value)
  return stock ? { ...stock, fullName: t(compareStock2.value) } : null
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(value)
}

const addToPortfolio = () => {
  portfolioStore.addToPortfolio({ ticker: selectedStock.value, quantity: quantity.value })
  dialogVisible.value = false
}
</script>

<template>
  <div class="container">
    <div class="section-spacing">
      <div class="section">
        <h2>{{ $t('compareStocks') }}</h2>
        <div class="compare-dropdowns">
          <div class="dropdown-wrapper pr-2">
            <Dropdown
              v-model="compareStock1"
              :options="stockStore.getTickerList"
              optionLabel="name"
              optionValue="code"
              class="full-width"
            >
              <template #value="slotProps">
                {{ t(slotProps.value) }}
              </template>
              <template #option="slotProps">
                {{ t(slotProps.option.code) }}
              </template>
            </Dropdown>
          </div>
          <div class="dropdown-wrapper pl-2">
            <Dropdown
              v-model="compareStock2"
              :options="stockStore.getTickerList"
              optionLabel="name"
              optionValue="code"
              class="full-width"
            >
              <template #value="slotProps">
                {{ t(slotProps.value) }}
              </template>
              <template #option="slotProps">
                {{ t(slotProps.option.code) }}
              </template>
            </Dropdown>
          </div>
        </div>
        <StockComparisonChart :stock1="translatedCompareStock1" :stock2="translatedCompareStock2" />
      </div>
      <div class="section mt-4">
        <h2>{{ $t('stocks') }}</h2>
        <div class="stock-controls">
          <Dropdown
            v-model="selectedStock"
            :options="stockStore.getTickerList"
            optionLabel="name"
            optionValue="code"
            class="mr-4"
          >
            <template #value="slotProps">
              {{ t(slotProps.value) }}
            </template>
            <template #option="slotProps">
              {{ t(slotProps.option.code) }}
            </template>
          </Dropdown>
          <Button :label="$t('addToPortfolioButton')" @click="dialogVisible = true" />
        </div>
        <StockChart :stockData="stockData" />
      </div>
      <div class="section mt-4">
        <h2>{{ $t('portfolio') }}</h2>
        <div class="portfolio-layout">
          <div class="portfolio-table">
            <DataTable :value="portfolioStore.getPortfolioItems">
              <Column field="ticker" :header="$t('ticker')"></Column>
              <Column field="quantity" :header="$t('quantity')">
                <template #body="slotProps">
                  <InputNumber
                    v-model="slotProps.data.quantity"
                    @input="portfolioStore.updateQuantity(slotProps.data.ticker, $event.value)"
                    :min="1"
                  />
                </template>
              </Column>
              <Column :header="$t('actions')">
                <template #body="slotProps">
                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-danger"
                    @click="portfolioStore.removeFromPortfolio(slotProps.data.ticker)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
          <div class="portfolio-pie-chart">
            <PortfolioPieChart />
          </div>
        </div>
      </div>
      <div class="section mt-4">
        <h2>{{ $t('portfolioPerformance') }}</h2>
        <h3>{{ $t('totalValue') }}: {{ formatCurrency(portfolioStore.getPortfolioTotal) }}</h3>
        <div class="chart-container">
          <PortfolioPerformanceChart />
        </div>
      </div>
    </div>

    <Dialog :header="$t('addToPortfolioDialogHeader')" v-model:visible="dialogVisible">
      <div class="p-fluid">
        <div class="p-field">
          <label for="quantity">{{ $t('quantity').concat('          ') }}</label>
          <InputNumber id="quantity" v-model="quantity" :min="1" />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="dialogVisible = false"
          class="p-button-text"
        />
        <Button label="Add" icon="pi pi-check" @click="addToPortfolio" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.section-spacing > .section + .section {
  margin-top: 1rem;
}

.compare-dropdowns {
  display: flex;
}

.dropdown-wrapper {
  flex: 1;
}

.dropdown-wrapper.pr-2 {
  padding-right: 0.5rem;
}

.dropdown-wrapper.pl-2 {
  padding-left: 0.5rem;
}

.full-width {
  width: 100%;
}

.stock-controls {
  display: flex;
  align-items: center;
}

.stock-controls .mr-4 {
  margin-right: 1rem;
}

.portfolio-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.portfolio-table {
  flex: 2;
  min-width: 300px;
}

.portfolio-pie-chart {
  flex: 1;
  min-width: 250px;
}

.chart-container {
  height: 30rem;
}
</style>
