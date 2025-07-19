import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    portfolio: 'Portfolio',
    stocks: 'Stocks',
    language: 'Language',
    english: 'English',
    french: 'French',
    compareStocks: 'Compare Stocks',
    portfolioPerformance: 'Portfolio Performance',
    totalValue: 'Total Value',
    addToPortfolioButton: 'Add to Portfolio',
    addToPortfolioDialogHeader: 'Add to Portfolio',
    quantity: 'Quantity',
    VGRO: 'Vanguard Growth ETF Portfolio',
    VFV: 'Vanguard S&P 500 Index ETF',
    VDY: 'Vanguard FTSE Canadian High Dividend Yield Index ETF',
    VRE: 'Vanguard FTSE Canadian Capped REIT Index ETF',
    XQQ: 'iShares NASDAQ 100 Index ETF (CAD-Hedged)',
    XEG: 'iShares S&P/TSX Capped Energy Index ETF',
    XIU: 'iShares S&P/TSX 60 Index ETF',
    XUS: 'iShares Core S&P 500 Index ETF',
  },
  fr: {
    portfolio: 'Portefeuille',
    stocks: 'Actions',
    language: 'Langue',
    english: 'Anglais',
    french: 'Français',
    compareStocks: 'Comparer les actions',
    portfolioPerformance: 'Performance du portefeuille',
    totalValue: 'Valeur totale',
    addToPortfolioButton: 'Ajouter au portefeuille',
    addToPortfolioDialogHeader: 'Ajouter au portefeuille',
    quantity: 'Quantité',
    VGRO: "FNB de portefeuille d'actions de croissance Vanguard",
    VFV: 'FNB Vanguard S&P 500',
    VDY: 'FNB Vanguard FTSE Canadian High Dividend Yield Index',
    VRE: 'FNB Vanguard FTSE Canadian Capped REIT Index',
    XQQ: 'FNB iShares NASDAQ 100 Index (couvert en CAD)',
    XEG: 'FNB iShares S&P/TSX Capped Energy Index',
    XIU: 'FNB iShares S&P/TSX 60 Index',
    XUS: 'FNB iShares Core S&P 500 Index',
  },
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
