"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/editor/section-card"
import { ConfirmationDialog } from "@/components/editor/confirmation-dialog"
import type { FinancialBreakdownPanelProps } from "./types"

export function FinancialBreakdownPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  addItem,
  updateItem,
  removeItem,
  updateTaxRate,
  updateDiscountAmount,
}: FinancialBreakdownPanelProps) {
  const { items, taxRate, discountAmount } = invoiceData

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`

  return (
    <SectionCard
      id="financialBreakdown"
      title={getSectionLabel("financialBreakdown")}
      enabled={isSectionEnabled("financialBreakdown")}
      isEmpty={isSectionEmpty("financialBreakdown")}
      onToggle={(enabled) => toggleSection("financialBreakdown", enabled)}
      onTitleChange={(label) => updateSectionLabel("financialBreakdown", label)}
    >
      <div className="space-y-4">
        {/* Line Items Header */}
        <div className="flex items-center justify-between">
          <Label>Line Items</Label>
          <Button onClick={addItem} size="sm" variant="outline">
            <Plus className="mr-1 h-3 w-3" />
            Add Item
          </Button>
        </div>

        {/* Line Items List */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="rounded-lg border bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Item {index + 1}
                </span>
                <ConfirmationDialog
                  title="Delete Item?"
                  description={`This will remove "${item.description}" from your proposal.`}
                  confirmLabel="Delete"
                  onConfirm={() => removeItem(item.id)}
                />
              </div>
              <div className="grid gap-2">
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  placeholder="Description"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Qty/Hours</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, { quantity: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Unit Price ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, { rate: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  Total:{" "}
                  <span className="font-medium text-foreground">
                    {formatCurrency(item.quantity * item.rate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tax & Discount */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              value={taxRate}
              onChange={(e) => updateTaxRate(Number.parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount ($)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              value={discountAmount}
              onChange={(e) => updateDiscountAmount(Number.parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
