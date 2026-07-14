export const DEFAULT_CURRENCY = "USD"

export const CURRENCY_OPTIONS = [
  { code: "USD", label: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", label: "Euro", symbol: "€", locale: "de-DE" },
  { code: "GBP", label: "British Pound", symbol: "£", locale: "en-GB" },
  { code: "INR", label: "Indian Rupee", symbol: "₹", locale: "en-IN" },
  { code: "AUD", label: "Australian Dollar", symbol: "$", locale: "en-AU" },
  { code: "CAD", label: "Canadian Dollar", symbol: "$", locale: "en-CA" },
  { code: "AED", label: "UAE Dirham", symbol: "د.إ", locale: "en-AE" },
  { code: "SGD", label: "Singapore Dollar", symbol: "$", locale: "en-SG" },
] as const

export type SupportedCurrencyCode = (typeof CURRENCY_OPTIONS)[number]["code"]

export function getCurrencyOption(currencyCode?: string) {
  return CURRENCY_OPTIONS.find((currency) => currency.code === currencyCode) ?? CURRENCY_OPTIONS[0]
}

export function formatCurrency(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  options?: Intl.NumberFormatOptions,
) {
  const currency = getCurrencyOption(currencyCode)

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount)
}
