/**
 * Utility functions for PDF generation
 */

import { DEFAULT_CURRENCY, formatCurrency as formatCurrencyValue } from "@/lib/currency"

/**
 * Formats a date string to a human-readable format
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number, currencyCode: string = DEFAULT_CURRENCY): string => {
  return formatCurrencyValue(amount, currencyCode)
}
