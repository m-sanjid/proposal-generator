/**
 * Utility functions for PDF generation
 */

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
 * Formats a number as INR currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}
