import type { InvoiceData } from "@/types"
import type { PdfStyles } from "./styles"

/**
 * Base props shared by all PDF section components
 */
export interface BasePdfSectionProps {
  data: InvoiceData
  styles: PdfStyles
}

/**
 * Props for sections that have a configurable label
 */
export interface LabeledPdfSectionProps extends BasePdfSectionProps {
  label: string
}

/**
 * Props for the financial breakdown section
 */
export interface FinancialSectionProps extends LabeledPdfSectionProps {
  calculations: {
    subtotal: number
    taxAmount: number
    grandTotal: number
  }
}
