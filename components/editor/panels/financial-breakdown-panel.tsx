"use client"

import { Plus } from "lucide-react"

import { ConfirmationDialog } from "@/components/editor/confirmation-dialog"
import { SectionCard } from "@/components/editor/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/currency"
import type { FinancialBreakdownPanelProps } from "./types"

export function FinancialBreakdownPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  expandedSection,
  onExpandedSectionChange,
  addItem,
  updateItem,
  removeItem,
  updateTaxRate,
  updateDiscountAmount,
}: FinancialBreakdownPanelProps) {
  const { items, taxRate, discountAmount, currency } = invoiceData

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const discountedSubtotal = Math.max(subtotal - discountAmount, 0)
  const taxAmount = discountedSubtotal * (taxRate / 100)
  const grandTotal = discountedSubtotal + taxAmount

  return (
    <SectionCard
      id="financialBreakdown"
      title={getSectionLabel("financialBreakdown")}
      enabled={isSectionEnabled("financialBreakdown")}
      isEmpty={isSectionEmpty("financialBreakdown")}
      onToggle={(enabled) => toggleSection("financialBreakdown", enabled)}
      onTitleChange={(label) => updateSectionLabel("financialBreakdown", label)}
      expanded={expandedSection === "financialBreakdown"}
      onExpandedChange={(expanded) => onExpandedSectionChange(expanded ? "financialBreakdown" : null)}
    >
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Line items", value: items.length },
            { label: "Subtotal", value: formatCurrency(subtotal, currency) },
            { label: "Grand total", value: formatCurrency(grandTotal, currency) },
          ].map((item) => (
            <div key={item.label} className="rounded-[20px] border border-border/60 bg-muted/18 px-4 py-3 shadow-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground tabular-nums">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <Label className="text-sm font-semibold text-foreground">Line items</Label>
            <p className="mt-1 text-sm text-muted-foreground">Each line item flows directly into the live pricing table.</p>
          </div>
          <Button onClick={addItem} size="sm" variant="outline" className="h-10 rounded-2xl px-4">
            <Plus className="h-4 w-4" />
            Add item
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="rounded-[22px] border border-border/60 bg-muted/18 p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Item {index + 1}</p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-foreground">
                    {formatCurrency(item.quantity * item.rate, currency)}
                  </p>
                </div>
                <ConfirmationDialog
                  title="Delete Item?"
                  description={`This will remove "${item.description}" from your proposal.`}
                  confirmLabel="Delete"
                  onConfirm={() => removeItem(item.id)}
                />
              </div>

              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(event) => updateItem(item.id, { description: event.target.value })}
                    placeholder="Description"
                    className="rounded-2xl"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                  <div className="grid gap-2">
                    <Label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Qty / Hours</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(event) =>
                        updateItem(item.id, {
                          quantity: Number.parseFloat(event.target.value) || 0,
                        })
                      }
                      className="rounded-2xl text-right tabular-nums"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Unit price ({currency})</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(event) =>
                        updateItem(item.id, {
                          rate: Number.parseFloat(event.target.value) || 0,
                        })
                      }
                      className="rounded-2xl text-right tabular-nums"
                    />
                  </div>
                  <div className="grid gap-2 sm:min-w-[130px]">
                    <Label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Total</Label>
                    <div className="flex h-11 items-center justify-end rounded-2xl border border-border/60 bg-background/85 px-4 text-sm font-semibold tabular-nums text-foreground shadow-sm">
                      {formatCurrency(item.quantity * item.rate, currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-border/60 bg-muted/18 p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_220px]">
            <div>
              <Label className="text-sm font-semibold text-foreground">Pricing adjustments</Label>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Tax and discount are applied after the line-item subtotal and update the preview instantly.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxRate">Tax rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                value={taxRate}
                onChange={(event) => updateTaxRate(Number.parseFloat(event.target.value) || 0)}
                className="rounded-2xl text-right tabular-nums"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount">Discount ({currency})</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                value={discountAmount}
                onChange={(event) => updateDiscountAmount(Number.parseFloat(event.target.value) || 0)}
                className="rounded-2xl text-right tabular-nums"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
