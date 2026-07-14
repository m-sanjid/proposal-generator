"use client"

import { useEffect, useRef, useState } from "react"

import { RichTextContent } from "@/components/ui/rich-text-content"
import { useInvoice } from "@/context/invoice-context"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"

const PREVIEW_BASE_WIDTH = 794
const PREVIEW_BASE_HEIGHT = 1123

export function DocumentPreview({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { invoiceData, calculations, isSectionEnabled, isSectionEmpty, getSectionLabel } = useInvoice()
  const { branding, sender, recipient, items, executiveSummary, scopeOfWork, timeline, termsConditions, acceptance, notes } =
    invoiceData
  const { subtotal, taxAmount, grandTotal } = calculations

  const stageRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const [previewScale, setPreviewScale] = useState(1)
  const [sheetHeight, setSheetHeight] = useState(PREVIEW_BASE_HEIGHT)

  useEffect(() => {
    const stage = stageRef.current
    const sheet = sheetRef.current
    if (!stage || !sheet) return

    const updatePreviewMetrics = () => {
      const stageWidth = stage.clientWidth
      const stageHeight = stage.clientHeight
      const sheetContentHeight = sheet.scrollHeight || PREVIEW_BASE_HEIGHT
      const availableWidth = Math.max(stageWidth - 40, 0)
      const availableHeight = Math.max(stageHeight - 40, 0)
      const widthScale = availableWidth / PREVIEW_BASE_WIDTH
      const heightScale = availableHeight / sheetContentHeight
      const nextScale = compact ? Math.min(1, Math.max(0.34, Math.min(widthScale, heightScale))) : 1

      setPreviewScale((current) => (Math.abs(current - nextScale) > 0.01 ? nextScale : current))
      setSheetHeight((current) => (Math.abs(current - sheetContentHeight) > 1 ? sheetContentHeight : current))
    }

    updatePreviewMetrics()

    const resizeObserver = new ResizeObserver(() => updatePreviewMetrics())
    resizeObserver.observe(stage)
    resizeObserver.observe(sheet)

    window.addEventListener("resize", updatePreviewMetrics)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updatePreviewMetrics)
    }
  }, [compact, invoiceData])

  const formatAmount = (amount: number) => formatCurrency(amount, invoiceData.currency)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const shouldShowSection = (sectionId: Parameters<typeof isSectionEnabled>[0]) => {
    return isSectionEnabled(sectionId) && !isSectionEmpty(sectionId)
  }

  return (
    <div className={cn("editor-preview-shell flex h-full min-h-0 flex-col overflow-hidden", className)}>
      <div className="editor-preview-backdrop flex min-h-full flex-1 min-h-0 flex-col rounded-[24px] p-3 sm:p-4">
        <div
          className={cn(
            "mb-3 shrink-0 rounded-[18px] border border-white/35 bg-background/82 shadow-sm",
            compact
              ? "flex flex-col gap-2 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between"
              : "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <div>
            <p className="text-sm font-medium text-foreground">Live preview</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Scaled to fit the workspace while preserving export fidelity.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Items", value: items.length },
              { label: "Total", value: formatAmount(grandTotal) },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/60 bg-muted/15 px-3 py-2 shadow-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{item.label}</div>
                <div className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={stageRef}
          className="min-h-0 flex-1 overflow-auto rounded-[22px] border border-white/35 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(248,250,252,0.86))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:bg-[radial-gradient(circle_at_top,rgba(39,39,42,0.92),rgba(24,24,27,0.92))] sm:p-4"
        >
          <div className="mx-auto flex h-full w-full justify-center" style={{ minHeight: compact ? "100%" : sheetHeight }}>
            <div
              className="relative"
              style={{
                width: compact ? PREVIEW_BASE_WIDTH * previewScale : PREVIEW_BASE_WIDTH,
                height: compact ? sheetHeight * previewScale : sheetHeight,
              }}
            >
              <div
                ref={sheetRef}
                id="document-preview"
                className="document-preview absolute left-0 top-0 border border-black/10 bg-white text-slate-900 shadow-[0_20px_48px_rgba(15,23,42,0.14)] print:w-full print:shadow-none dark:border-white/10"
                style={{
                  width: PREVIEW_BASE_WIDTH,
                  transform: compact ? `scale(${previewScale})` : undefined,
                  transformOrigin: "top left",
                }}
              >
                <div className="p-6 sm:p-7 print:p-8">
                  <header className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-[60%]">
                      {branding.logo ? (
                        <img
                          src={branding.logo || "/placeholder.svg"}
                          alt="Company logo"
                          className="mb-4 h-14 object-contain outline outline-1 outline-black/10 dark:outline-white/10"
                        />
                      ) : (
                        <div className="mb-4 text-[2rem] font-semibold tracking-[-0.04em] text-balance" style={{ color: branding.themeColor }}>
                          {sender.name}
                        </div>
                      )}
                      <div className="space-y-1 text-sm leading-6 text-slate-600">
                        {sender.address.split("\n").map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                        <div className="tabular-nums">{sender.phone}</div>
                        <div>{sender.email}</div>
                        {sender.website && <div>{sender.website}</div>}
                        {sender.taxId && <div className="pt-1 font-medium text-slate-500">Tax ID: {sender.taxId}</div>}
                      </div>
                    </div>

                    <div className="sm:max-w-[35%] sm:text-right">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Proposal</p>
                      <h1 className="mt-2 text-balance text-[2.15rem] font-semibold tracking-[-0.04em]" style={{ color: branding.themeColor }}>
                        {invoiceData.documentTitle}
                      </h1>
                      <div className="mt-3 space-y-1.5 text-sm text-slate-600 tabular-nums">
                        <div className="font-medium text-slate-900">#{invoiceData.documentNumber}</div>
                        <div>
                          <span className="text-slate-500">Date of issue:</span> {formatDate(invoiceData.issueDate)}
                        </div>
                        <div>
                          <span className="text-slate-500">Valid until:</span> {formatDate(invoiceData.dueDate)}
                        </div>
                      </div>
                    </div>
                  </header>

                  <section className="mb-8 rounded-[20px] border border-slate-200 bg-slate-50 p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)_inset]">
                    <p className="text-sm font-semibold" style={{ color: branding.themeColor }}>
                      Prepared for
                    </p>
                    <div className="mt-3 text-slate-800">
                      <div className="text-lg font-semibold text-balance">{recipient.name}</div>
                      {recipient.company && <div className="mt-1 text-sm font-medium text-slate-600">{recipient.company}</div>}
                      <div className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
                        {recipient.address.split("\n").map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                        <div className="tabular-nums">{recipient.phone}</div>
                        <div>{recipient.email}</div>
                      </div>
                    </div>
                  </section>

                  {shouldShowSection("executiveSummary") && (
                    <section className="mb-8">
                      <h2 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                        {getSectionLabel("executiveSummary")}
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {executiveSummary.objective && (
                          <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">{executiveSummary.objectiveLabel}</h3>
                            <RichTextContent html={executiveSummary.objective} className="text-sm leading-6 text-slate-700" />
                          </div>
                        )}
                        {executiveSummary.solution && (
                          <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                            <h3 className="mb-2 text-sm font-semibold text-slate-900">{executiveSummary.solutionLabel}</h3>
                            <RichTextContent html={executiveSummary.solution} className="text-sm leading-6 text-slate-700" />
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {shouldShowSection("scopeOfWork") && (
                    <section className="mb-8">
                      <h2 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                        {getSectionLabel("scopeOfWork")}
                      </h2>
                      {scopeOfWork.phases.length > 0 && (
                        <div className="space-y-2.5">
                          {scopeOfWork.phases.map((phase, index) => (
                            <div key={phase.id} className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white tabular-nums"
                                  style={{ backgroundColor: branding.themeColor }}
                                >
                                  {index + 1}
                                </div>
                                <div>
                                  <h3 className="text-[15px] font-semibold text-slate-900">{phase.title}</h3>
                                  <RichTextContent html={phase.description} className="mt-1.5 text-sm leading-6 text-slate-700" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {scopeOfWork.exclusions.length > 0 && (
                        <div className="mt-3 rounded-[18px] border border-red-200 bg-red-50 p-4">
                          <h3 className="mb-2 text-sm font-semibold text-red-800">Exclusions</h3>
                          <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-red-700">
                            {scopeOfWork.exclusions.map((exclusion) => (
                              <li key={exclusion.id}>{exclusion.text}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </section>
                  )}

                  {shouldShowSection("timeline") && (
                    <section className="mb-8">
                      <h2 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                        {getSectionLabel("timeline")}
                      </h2>
                      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {timeline.startDate && (
                          <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Start date</span>
                            <div className="mt-1.5 text-sm font-semibold tabular-nums text-slate-900">{formatDate(timeline.startDate)}</div>
                          </div>
                        )}
                        {timeline.estimatedDuration && (
                          <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Estimated duration</span>
                            <div className="mt-1.5 text-sm font-semibold tabular-nums text-slate-900">{timeline.estimatedDuration}</div>
                          </div>
                        )}
                      </div>

                      {timeline.milestones.length > 0 && (
                        <div className="space-y-2">
                          {timeline.milestones.map((milestone, index) => (
                            <div
                              key={milestone.id}
                              className="grid grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border border-slate-200 bg-white px-4 py-3"
                            >
                              <span
                                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white tabular-nums"
                                style={{ backgroundColor: branding.themeColor }}
                              >
                                {index + 1}
                              </span>
                              <span className="text-sm font-medium text-slate-900">{milestone.title}</span>
                              <span className="text-sm tabular-nums text-slate-600">{formatDate(milestone.date)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  )}

                  {shouldShowSection("financialBreakdown") && (
                    <section className="mb-8">
                      <div className="mb-3 flex items-end justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                            {getSectionLabel("financialBreakdown")}
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-slate-600">Line items, pricing, and the final proposal total.</p>
                        </div>
                        <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3.5 py-2 shadow-sm">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Grand total</div>
                          <div className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">{formatAmount(grandTotal)}</div>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-[20px] border border-slate-200">
                        <table className="w-full">
                          <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-[0.14em] text-slate-500">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Item / Service</th>
                              <th className="px-4 py-3 text-right font-semibold">Qty</th>
                              <th className="px-4 py-3 text-right font-semibold">Unit price</th>
                              <th className="px-4 py-3 text-right font-semibold">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, index) => (
                              <tr key={item.id} className={cn("border-t border-slate-200", index % 2 === 0 ? "bg-white" : "bg-slate-50/45")}>
                                <td className="px-4 py-3 text-sm leading-6 text-slate-800">{item.description}</td>
                                <td className="px-4 py-3 text-right text-sm tabular-nums text-slate-600">{item.quantity}</td>
                                <td className="px-4 py-3 text-right text-sm tabular-nums text-slate-600">{formatAmount(item.rate)}</td>
                                <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-slate-900">
                                  {formatAmount(item.quantity * item.rate)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <div className="w-full max-w-[300px] rounded-[20px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-200 py-2 text-sm text-slate-600">
                            <span>Subtotal</span>
                            <span className="font-medium tabular-nums text-slate-900">{formatAmount(subtotal)}</span>
                          </div>
                          {invoiceData.discountAmount > 0 && (
                            <div className="flex items-center justify-between border-b border-slate-200 py-2 text-sm text-slate-600">
                              <span>Discount</span>
                              <span className="font-medium tabular-nums text-red-600">-{formatAmount(invoiceData.discountAmount)}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between border-b border-slate-200 py-2 text-sm text-slate-600">
                            <span>Tax / VAT ({invoiceData.taxRate}%)</span>
                            <span className="font-medium tabular-nums text-slate-900">{formatAmount(taxAmount)}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between rounded-[16px] px-4 py-3 text-white" style={{ backgroundColor: branding.themeColor }}>
                            <span className="text-sm font-semibold">Grand total</span>
                            <span className="text-sm font-semibold tabular-nums">{formatAmount(grandTotal)}</span>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {shouldShowSection("termsConditions") && (
                    <section className="mb-8 border-t border-slate-200 pt-6">
                      <h2 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                        {getSectionLabel("termsConditions")}
                      </h2>
                      {termsConditions.terms.length > 0 && (
                        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {termsConditions.terms.map((term) => (
                            <div key={term.id} className="rounded-[18px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{term.label}</span>
                              <div className="mt-1.5 text-sm font-medium leading-6 text-slate-800">{term.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {termsConditions.additionalTerms && (
                        <RichTextContent html={termsConditions.additionalTerms} className="text-sm leading-6 text-slate-700" />
                      )}
                    </section>
                  )}

                  {shouldShowSection("notes") && (
                    <section className="mb-6">
                      <h2 className="mb-2 text-lg font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                        {getSectionLabel("notes")}
                      </h2>
                      {notes.length === 1 ? (
                        <RichTextContent html={notes[0].text} className="text-sm leading-6 text-slate-700" />
                      ) : (
                        <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-slate-700">
                          {notes.map((note) => (
                            <li key={note.id}>
                              <RichTextContent html={note.text} className="inline text-sm leading-6 text-slate-700" />
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  )}

                  {isSectionEnabled("acceptance") && acceptance.showSignatureLine && (
                    <section className="mt-10 border-t border-slate-200 pt-6">
                      <h2 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-balance" style={{ color: branding.themeColor }}>
                        {getSectionLabel("acceptance")}
                      </h2>
                      <p className="mb-5 text-sm leading-6 text-slate-600">
                        By signing below, you agree to the terms and conditions outlined in this proposal.
                      </p>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <div className="mb-2 border-b border-slate-400 pb-8" />
                          <span className="text-sm text-slate-600">Client signature</span>
                        </div>
                        <div>
                          <div className="mb-2 border-b border-slate-400 pb-8 text-slate-800">
                            {acceptance.clientName && <span>{acceptance.clientName}</span>}
                          </div>
                          <span className="text-sm text-slate-600">Print name</span>
                        </div>
                      </div>
                      <div className="mt-5 w-52">
                        <div className="mb-2 border-b border-slate-400 pb-2 text-slate-800 tabular-nums">
                          {acceptance.signatureDate && <span>{formatDate(acceptance.signatureDate)}</span>}
                        </div>
                        <span className="text-sm text-slate-600">Date</span>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
