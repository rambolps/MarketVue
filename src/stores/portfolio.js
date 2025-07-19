import { defineStore } from 'pinia';
import { useStockStore } from './stocks';

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    items: [],
  }),
  getters: {
    getPortfolioItems: (state) => state.items,
    getPortfolioTotal: (state) => {
        const stockStore = useStockStore();
        return state.items.reduce((total, item) => {
            const stock = stockStore.getStockByTicker(item.ticker);
            if (stock) {
                const latestPrice = parseFloat(stock.data[0].Close.replace(/,/g, ''));
                if (!isNaN(latestPrice)) {
                    return total + (item.quantity * latestPrice);
                }
            }
            return total;
        }, 0);
    }
  },
  actions: {
    addToPortfolio(item) {
        const existingItem = this.items.find(i => i.ticker === item.ticker);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    },
    removeFromPortfolio(ticker) {
        this.items = this.items.filter(i => i.ticker !== ticker);
    },
    updateQuantity(ticker, quantity) {
        const item = this.items.find(i => i.ticker === ticker);
        if (item) {
            item.quantity = quantity;
        }
    }
  },
});
