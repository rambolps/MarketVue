import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    portfolio: 'Portfolio (CA$)',
    stocks: 'Stocks (CA$)',
    language: 'Language',
    english: 'English',
    french: 'French',
    compareStocks: 'Compare Stocks (CA$)',
    portfolioPerformance: 'Portfolio Performance',
    totalValue: 'Total Value',
    addToPortfolioButton: 'Add to Portfolio',
    addToPortfolioDialogHeader: 'Add to Portfolio',
    portfolioValue: 'Portfolio Value',
    quantity: 'Quantity',
    ticker: 'Ticker',
    actions: 'Actions',
    VGRO: 'Vanguard Growth ETF Portfolio (VGRO)',
    VFV: 'Vanguard S&P 500 Index ETF (VFV)',
    VDY: 'Vanguard FTSE Canadian High Dividend Yield Index ETF (VDY)',
    VRE: 'Vanguard FTSE Canadian Capped REIT Index ETF (VRE)',
    XQQ: 'iShares NASDAQ 100 Index ETF (CAD-Hedged) (XQQ)',
    XEG: 'iShares S&P/TSX Capped Energy Index ETF (XEG)',
    XIU: 'iShares S&P/TSX 60 Index ETF (XIU)',
    XUS: 'iShares Core S&P 500 Index ETF (XUS)',
  },
  fr: {
    portfolio: 'Portefeuille (CA$)',
    stocks: 'Actions (CA$)',
    language: 'Langue',
    english: 'Anglais',
    french: 'Français',
    compareStocks: 'Comparer les actions (CA$)',
    portfolioPerformance: 'Performance du portefeuille',
    totalValue: 'Valeur totale',
    addToPortfolioButton: 'Ajouter au portefeuille',
    addToPortfolioDialogHeader: 'Ajouter au portefeuille',
    portfolioValue: 'Valeur du portefeuille',
    quantity: 'Quantité',
    ticker: 'Symbole',
    actions: 'Actions',
    VGRO: "FNB de portefeuille d'actions de croissance Vanguard (VGRO)",
    VFV: 'FNB Vanguard S&P 500 (VFV)',
    VDY: 'FNB Vanguard FTSE rendement des dividendes élevés (VDY)',
    VRE: 'FNB Vanguard FTSE Plafonné canadien REIT Indice (VRE)',
    XQQ: 'FNB iShares NASDAQ 100 Indice (couvert en CAD) (XQQ)',
    XEG: 'FNB iShares S&P/TSX Énergie plafonnée Indice (XEG)',
    XIU: 'FNB iShares S&P/TSX 60 Indice (XIU)',
    XUS: 'FNB iShares Core S&P 500 Indice (XUS)',
  },
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
