"use client"

import { PhoneInput } from "@/components/reui/phone-input"
import { ProposalDateField } from "@/components/reui/proposal-date-field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CURRENCY_OPTIONS } from "@/lib/currency"
import type { DetailsPanelProps } from "./types"

const TEXTAREA_CLASSES =
  "flex min-h-[92px] w-full rounded-2xl border border-input bg-background px-3.5 py-2.5 text-sm shadow-xs transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

const SURFACE_CLASSES = "rounded-[20px] border border-border/60 bg-background/78 shadow-sm"
const SURFACE_HEADER_CLASSES = "border-b border-border/60 px-4 py-3"
const SURFACE_BODY_CLASSES = "grid gap-4 px-4 py-4"

function DetailsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className={SURFACE_CLASSES}>
      <div className={SURFACE_HEADER_CLASSES}>
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={SURFACE_BODY_CLASSES}>{children}</div>
    </section>
  )
}

export function DetailsPanel({
  invoiceData,
  updateDocumentInfo,
  updateSender,
  updateRecipient,
}: DetailsPanelProps) {
  return (
    <div className="space-y-4">
      <DetailsSection title="Document info" description="Title, reference number, and validity dates.">
        <div className="grid gap-2">
          <Label htmlFor="docTitle">Document title</Label>
          <Input
            id="docTitle"
            value={invoiceData.documentTitle}
            onChange={(event) => updateDocumentInfo({ documentTitle: event.target.value })}
            className="rounded-2xl"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="docNumber">Document number</Label>
          <Input
            id="docNumber"
            value={invoiceData.documentNumber}
            onChange={(event) => updateDocumentInfo({ documentNumber: event.target.value })}
            className="rounded-2xl font-mono"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="issueDate">Issue date</Label>
            <ProposalDateField
              value={invoiceData.issueDate}
              onChange={(issueDate) => updateDocumentInfo({ issueDate })}
              placeholder="Select issue date"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Valid until</Label>
            <ProposalDateField
              value={invoiceData.dueDate}
              onChange={(dueDate) => updateDocumentInfo({ dueDate })}
              placeholder="Select valid until date"
            />
          </div>
          <div className="grid gap-2 md:col-span-2 xl:col-span-1">
            <Label htmlFor="currency">Currency</Label>
            <Select value={invoiceData.currency} onValueChange={(currency) => currency && updateDocumentInfo({ currency })}>
              <SelectTrigger id="currency" className="h-11 rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} · {currency.label} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DetailsSection>

      <DetailsSection title="From (provider)" description="Your business details shown on the proposal.">
        <div className="grid gap-2">
          <Label htmlFor="senderName">Company name</Label>
          <Input
            id="senderName"
            value={invoiceData.sender.name}
            onChange={(event) => updateSender({ name: event.target.value })}
            className="rounded-2xl"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="senderTaxId">Tax ID / VAT number</Label>
          <Input
            id="senderTaxId"
            value={invoiceData.sender.taxId}
            onChange={(event) => updateSender({ taxId: event.target.value })}
            placeholder="e.g., US12-3456789"
            className="rounded-2xl"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="senderEmail">Email</Label>
            <Input
              id="senderEmail"
              type="email"
              value={invoiceData.sender.email}
              onChange={(event) => updateSender({ email: event.target.value })}
              className="rounded-2xl"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="senderPhone">Phone</Label>
            <PhoneInput
              id="senderPhone"
              value={invoiceData.sender.phone}
              onChange={(phone) => updateSender({ phone: phone ?? "" })}
              defaultCountry="US"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="senderAddress">Address</Label>
          <textarea
            id="senderAddress"
            className={TEXTAREA_CLASSES}
            value={invoiceData.sender.address}
            onChange={(event) => updateSender({ address: event.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="senderWebsite">Website</Label>
          <Input
            id="senderWebsite"
            value={invoiceData.sender.website}
            onChange={(event) => updateSender({ website: event.target.value })}
            className="rounded-2xl"
          />
        </div>
      </DetailsSection>

      <DetailsSection title="To (client)" description="Recipient contact and billing details.">
        <div className="grid gap-2">
          <Label htmlFor="recipientName">Contact person</Label>
          <Input
            id="recipientName"
            value={invoiceData.recipient.name}
            onChange={(event) => updateRecipient({ name: event.target.value })}
            className="rounded-2xl"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="recipientCompany">Company name</Label>
          <Input
            id="recipientCompany"
            value={invoiceData.recipient.company}
            onChange={(event) => updateRecipient({ company: event.target.value })}
            className="rounded-2xl"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="recipientEmail">Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={invoiceData.recipient.email}
              onChange={(event) => updateRecipient({ email: event.target.value })}
              className="rounded-2xl"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recipientPhone">Phone</Label>
            <PhoneInput
              id="recipientPhone"
              value={invoiceData.recipient.phone}
              onChange={(phone) => updateRecipient({ phone: phone ?? "" })}
              defaultCountry="US"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="recipientAddress">Billing address</Label>
          <textarea
            id="recipientAddress"
            className={TEXTAREA_CLASSES}
            value={invoiceData.recipient.address}
            onChange={(event) => updateRecipient({ address: event.target.value })}
          />
        </div>
      </DetailsSection>
    </div>
  )
}
