"use client"


import { useInvoice } from "@/context/invoice-context"
import { cn } from "@/lib/utils"

export function DocumentPreview({ className }: { className?: string }) {
  const { invoiceData, calculations, isSectionEnabled, isSectionEmpty, getSectionLabel } = useInvoice()
  const {
    branding,
    sender,
    recipient,
    items,
    executiveSummary,
    scopeOfWork,
    timeline,
    termsConditions,
    acceptance,
    notes,
  } = invoiceData
  const { subtotal, taxAmount, grandTotal } = calculations

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const shouldShowSection = (sectionId: Parameters<typeof isSectionEnabled>[0]) => {
    return isSectionEnabled(sectionId) && !isSectionEmpty(sectionId)
  }

  return (
    <div className="h-full overflow-auto scrollbar-hide">
      <div id="document-preview" className={cn("document-preview ml-auto w-[210mm] bg-white print:shadow-none print:w-full border", className)}>
        <div className="p-6 sm:p-8 md:p-10 print:p-8">
          {/* Header */}
          <header className="mb-8 flex items-start justify-between">
            <div>
              {branding.logo ? (
                <img src={branding.logo || "/placeholder.svg"} alt="Company logo" className="mb-4 h-16 object-contain" />
              ) : (
                <div className="mb-4 text-3xl font-bold" style={{ color: branding.themeColor }}>
                  {sender.name}
                </div>
              )}
              <div className="text-sm text-gray-600">
                {sender.address.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                <div>{sender.phone}</div>
                <div>{sender.email}</div>
                {sender.website && <div>{sender.website}</div>}
                {sender.taxId && <div className="mt-1 text-gray-500">Tax ID: {sender.taxId}</div>}
              </div>
            </div>
            <div className="text-right">
              <h1 className="mb-2 text-4xl font-bold tracking-tight" style={{ color: branding.themeColor }}>
                {invoiceData.documentTitle}
              </h1>
              <div className="text-sm text-gray-600">
                <div className="font-medium">#{invoiceData.documentNumber}</div>
                <div className="mt-2">
                  <span className="text-gray-500">Date of Issue:</span> {formatDate(invoiceData.issueDate)}
                </div>
                <div>
                  <span className="text-gray-500">Valid Until:</span> {formatDate(invoiceData.dueDate)}
                </div>
              </div>
            </div>
          </header>

          {/* Bill To */}
          <section className="mb-8 rounded-lg bg-gray-50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: branding.themeColor }}>
              Prepared For
            </h2>
            <div className="text-gray-800">
              <div className="font-semibold">{recipient.name}</div>
              {recipient.company && <div className="text-gray-600">{recipient.company}</div>}
              <div className="mt-2 text-sm text-gray-600">
                {recipient.address.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                <div>{recipient.phone}</div>
                <div>{recipient.email}</div>
              </div>
            </div>
          </section>

          <section
            className={cn(
              "mb-8 transition-all duration-300",
              shouldShowSection("executiveSummary") ? "opacity-100" : "hidden",
            )}
          >
            <h2 className="mb-4 text-lg font-semibold" style={{ color: branding.themeColor }}>
              {getSectionLabel("executiveSummary")}
            </h2>
            {executiveSummary.objective && (
              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold text-gray-700">{executiveSummary.objectiveLabel}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{executiveSummary.objective}</p>
              </div>
            )}
            {executiveSummary.solution && (
              <div>
                <h3 className="mb-1 text-sm font-semibold text-gray-700">{executiveSummary.solutionLabel}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{executiveSummary.solution}</p>
              </div>
            )}
          </section>

          <section
            className={cn(
              "mb-8 transition-all duration-300",
              shouldShowSection("scopeOfWork") ? "opacity-100" : "hidden",
            )}
          >
            <h2 className="mb-4 text-lg font-semibold" style={{ color: branding.themeColor }}>
              {getSectionLabel("scopeOfWork")}
            </h2>
            {scopeOfWork.phases.length > 0 && (
              <div className="space-y-3">
                {scopeOfWork.phases.map((phase) => (
                  <div
                    key={phase.id}
                    className="rounded-lg border-l-4 bg-gray-50 p-4"
                    style={{ borderColor: branding.themeColor }}
                  >
                    <h3 className="font-semibold text-gray-800">{phase.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{phase.description}</p>
                  </div>
                ))}
              </div>
            )}
            {scopeOfWork.exclusions.length > 0 && (
              <div className="mt-4 rounded-lg bg-red-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-red-800">Exclusions</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
                  {scopeOfWork.exclusions.map((exclusion) => (
                    <li key={exclusion.id}>{exclusion.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section
            className={cn("mb-8 transition-all duration-300", shouldShowSection("timeline") ? "opacity-100" : "hidden")}
          >
            <h2 className="mb-4 text-lg font-semibold" style={{ color: branding.themeColor }}>
              {getSectionLabel("timeline")}
            </h2>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timeline.startDate && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm text-gray-500">Start Date</span>
                  <div className="font-semibold text-gray-800">{formatDate(timeline.startDate)}</div>
                </div>
              )}
              {timeline.estimatedDuration && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm text-gray-500">Estimated Duration</span>
                  <div className="font-semibold text-gray-800">{timeline.estimatedDuration}</div>
                </div>
              )}
            </div>
            {timeline.milestones.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Milestones</h3>
                <div className="space-y-2">
                  {timeline.milestones.map((milestone, index) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between rounded border-l-2 bg-gray-50 px-4 py-2"
                      style={{ borderColor: branding.themeColor }}
                    >
                      <span className="text-sm text-gray-800">
                        <span className="font-medium">{index + 1}.</span> {milestone.title}
                      </span>
                      <span className="text-sm text-gray-600">{formatDate(milestone.date)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section
            className={cn(
              "mb-8 transition-all duration-300",
              shouldShowSection("financialBreakdown") ? "opacity-100" : "hidden",
            )}
          >
            <h2 className="mb-4 text-lg font-semibold" style={{ color: branding.themeColor }}>
              {getSectionLabel("financialBreakdown")}
            </h2>
            <table className="w-full">
              <thead>
                <tr
                  className="border-b-2 text-left text-sm uppercase tracking-wider"
                  style={{ borderColor: branding.themeColor }}
                >
                  <th className="pb-3 font-semibold text-gray-600">Item / Service</th>
                  <th className="pb-3 text-center font-semibold text-gray-600">Qty / Hours</th>
                  <th className="pb-3 text-right font-semibold text-gray-600">Unit Price</th>
                  <th className="pb-3 text-right font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50/50" : ""}>
                    <td className="py-4 pr-4">{item.description}</td>
                    <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-600">{formatCurrency(item.rate)}</td>
                    <td className="py-4 text-right font-medium">{formatCurrency(item.quantity * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-72">
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {invoiceData.discountAmount > 0 && (
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-red-600">-{formatCurrency(invoiceData.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Tax/VAT ({invoiceData.taxRate}%)</span>
                  <span className="font-medium">{formatCurrency(taxAmount)}</span>
                </div>
                <div
                  className="mt-2 flex justify-between rounded-lg p-3"
                  style={{ backgroundColor: branding.themeColor }}
                >
                  <span className="text-lg font-bold text-white">Grand Total</span>
                  <span className="text-lg font-bold text-white">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </section>

          <section
            className={cn(
              "mb-8 border-t pt-6 transition-all duration-300",
              shouldShowSection("termsConditions") ? "opacity-100" : "hidden",
            )}
          >
            <h2 className="mb-4 text-lg font-semibold" style={{ color: branding.themeColor }}>
              {getSectionLabel("termsConditions")}
            </h2>
            {termsConditions.terms.length > 0 && (
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {termsConditions.terms.map((term) => (
                  <div key={term.id} className="rounded-lg bg-gray-50 p-3">
                    <span className="text-xs uppercase tracking-wider text-gray-500">{term.label}</span>
                    <div className="mt-1 text-sm font-medium text-gray-800">{term.value}</div>
                  </div>
                ))}
              </div>
            )}
            {termsConditions.additionalTerms && (
              <p className="text-xs leading-relaxed text-gray-500">{termsConditions.additionalTerms}</p>
            )}
          </section>

          <section
            className={cn("mb-6 transition-all duration-300", shouldShowSection("notes") ? "opacity-100" : "hidden")}
          >
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: branding.themeColor }}>
              {getSectionLabel("notes")}
            </h2>
            {notes.length === 1 ? (
              <p className="text-sm text-gray-600">{notes[0].text}</p>
            ) : (
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                {notes.map((note) => (
                  <li key={note.id}>{note.text}</li>
                ))}
              </ul>
            )}
          </section>

          <section
            className={cn(
              "mt-12 border-t pt-8 transition-all duration-300",
              isSectionEnabled("acceptance") && acceptance.showSignatureLine ? "opacity-100" : "hidden",
            )}
          >
            <h2 className="mb-6 text-lg font-semibold" style={{ color: branding.themeColor }}>
              {getSectionLabel("acceptance")}
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              By signing below, you agree to the terms and conditions outlined in this proposal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="mb-2 border-b border-gray-400 pb-8" />
                <span className="text-sm text-gray-600">Client Signature</span>
              </div>
              <div>
                <div className="mb-2 border-b border-gray-400 pb-8">
                  {acceptance.clientName && <span className="text-gray-800">{acceptance.clientName}</span>}
                </div>
                <span className="text-sm text-gray-600">Print Name</span>
              </div>
            </div>
            <div className="mt-6 w-48">
              <div className="mb-2 border-b border-gray-400 pb-2">
                {acceptance.signatureDate && (
                  <span className="text-gray-800">{formatDate(acceptance.signatureDate)}</span>
                )}
              </div>
              <span className="text-sm text-gray-600">Date</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
