"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { PhoneInput } from "@/components/reui/phone-input"
import { ProposalDateField } from "@/components/reui/proposal-date-field"
import type { DetailsPanelProps } from "./types"

const TEXTAREA_CLASSES =
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

export function DetailsPanel({
  invoiceData,
  updateDocumentInfo,
  updateSender,
  updateRecipient,
}: DetailsPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="gap-0 py-0 shadow-none">
        <CardHeader className="border-b px-5 py-4">
          <CardTitle className="text-base">Document Info</CardTitle>
          <CardDescription>Title, reference number, and validity dates.</CardDescription>
        </CardHeader>
        <CardPanel className="grid gap-4 px-5 py-5">
          <div className="grid gap-2">
            <Label htmlFor="docTitle">Document Title</Label>
            <Input
              id="docTitle"
              value={invoiceData.documentTitle}
              onChange={(e) => updateDocumentInfo({ documentTitle: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="docNumber">Document Number</Label>
            <Input
              id="docNumber"
              value={invoiceData.documentNumber}
              onChange={(e) => updateDocumentInfo({ documentNumber: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <ProposalDateField
                value={invoiceData.issueDate}
                onChange={(issueDate) => updateDocumentInfo({ issueDate })}
                placeholder="Select issue date"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Valid Until</Label>
              <ProposalDateField
                value={invoiceData.dueDate}
                onChange={(dueDate) => updateDocumentInfo({ dueDate })}
                placeholder="Select valid until date"
              />
            </div>
          </div>
        </CardPanel>
      </Card>

      <Card className="gap-0 py-0 shadow-none">
        <CardHeader className="border-b px-5 py-4">
          <CardTitle className="text-base">From (Provider)</CardTitle>
          <CardDescription>Your business details shown on the proposal.</CardDescription>
        </CardHeader>
        <CardPanel className="grid gap-4 px-5 py-5">
          <div className="grid gap-2">
            <Label htmlFor="senderName">Company Name</Label>
            <Input
              id="senderName"
              value={invoiceData.sender.name}
              onChange={(e) => updateSender({ name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="senderTaxId">Tax ID / VAT Number</Label>
            <Input
              id="senderTaxId"
              value={invoiceData.sender.taxId}
              onChange={(e) => updateSender({ taxId: e.target.value })}
              placeholder="e.g., US12-3456789"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="senderEmail">Email</Label>
              <Input
                id="senderEmail"
                type="email"
                value={invoiceData.sender.email}
                onChange={(e) => updateSender({ email: e.target.value })}
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
              onChange={(e) => updateSender({ address: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="senderWebsite">Website</Label>
            <Input
              id="senderWebsite"
              value={invoiceData.sender.website}
              onChange={(e) => updateSender({ website: e.target.value })}
            />
          </div>
        </CardPanel>
      </Card>

      <Card className="gap-0 py-0 shadow-none">
        <CardHeader className="border-b px-5 py-4">
          <CardTitle className="text-base">To (Client)</CardTitle>
          <CardDescription>Recipient contact and billing details.</CardDescription>
        </CardHeader>
        <CardPanel className="grid gap-4 px-5 py-5">
          <div className="grid gap-2">
            <Label htmlFor="recipientName">Contact Person</Label>
            <Input
              id="recipientName"
              value={invoiceData.recipient.name}
              onChange={(e) => updateRecipient({ name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recipientCompany">Company Name</Label>
            <Input
              id="recipientCompany"
              value={invoiceData.recipient.company}
              onChange={(e) => updateRecipient({ company: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="recipientEmail">Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={invoiceData.recipient.email}
                onChange={(e) => updateRecipient({ email: e.target.value })}
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
            <Label htmlFor="recipientAddress">Billing Address</Label>
            <textarea
              id="recipientAddress"
              className={TEXTAREA_CLASSES}
              value={invoiceData.recipient.address}
              onChange={(e) => updateRecipient({ address: e.target.value })}
            />
          </div>
        </CardPanel>
      </Card>
    </div>
  )
}
