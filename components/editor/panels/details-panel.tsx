"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { DetailsPanelProps } from "./types"

const TEXTAREA_CLASSES = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"

export function DetailsPanel({
  invoiceData,
  updateDocumentInfo,
  updateSender,
  updateRecipient,
}: DetailsPanelProps) {
  return (
    <>
      {/* Document Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Document Info</h3>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="docTitle">Document Title</Label>
            <Input
              id="docTitle"
              value={invoiceData.documentTitle}
              onChange={(e) => updateDocumentInfo({ documentTitle: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="docNumber">Document Number</Label>
            <Input
              id="docNumber"
              value={invoiceData.documentNumber}
              onChange={(e) => updateDocumentInfo({ documentNumber: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={invoiceData.issueDate}
                onChange={(e) => updateDocumentInfo({ issueDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Valid Until</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateDocumentInfo({ dueDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* From (Provider) */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">From (Provider)</h3>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="senderName">Company Name</Label>
            <Input
              id="senderName"
              value={invoiceData.sender.name}
              onChange={(e) => updateSender({ name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="senderTaxId">Tax ID / VAT Number</Label>
            <Input
              id="senderTaxId"
              value={invoiceData.sender.taxId}
              onChange={(e) => updateSender({ taxId: e.target.value })}
              placeholder="e.g., US12-3456789"
            />
          </div>
          <div>
            <Label htmlFor="senderEmail">Email</Label>
            <Input
              id="senderEmail"
              type="email"
              value={invoiceData.sender.email}
              onChange={(e) => updateSender({ email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="senderPhone">Phone</Label>
            <Input
              id="senderPhone"
              value={invoiceData.sender.phone}
              onChange={(e) => updateSender({ phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="senderAddress">Address</Label>
            <textarea
              id="senderAddress"
              className={TEXTAREA_CLASSES}
              value={invoiceData.sender.address}
              onChange={(e) => updateSender({ address: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="senderWebsite">Website</Label>
            <Input
              id="senderWebsite"
              value={invoiceData.sender.website}
              onChange={(e) => updateSender({ website: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* To (Client) */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">To (Client)</h3>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="recipientName">Contact Person</Label>
            <Input
              id="recipientName"
              value={invoiceData.recipient.name}
              onChange={(e) => updateRecipient({ name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="recipientCompany">Company Name</Label>
            <Input
              id="recipientCompany"
              value={invoiceData.recipient.company}
              onChange={(e) => updateRecipient({ company: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="recipientEmail">Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={invoiceData.recipient.email}
              onChange={(e) => updateRecipient({ email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="recipientPhone">Phone</Label>
            <Input
              id="recipientPhone"
              value={invoiceData.recipient.phone}
              onChange={(e) => updateRecipient({ phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="recipientAddress">Billing Address</Label>
            <textarea
              id="recipientAddress"
              className={TEXTAREA_CLASSES}
              value={invoiceData.recipient.address}
              onChange={(e) => updateRecipient({ address: e.target.value })}
            />
          </div>
        </div>
      </div>
    </>
  )
}
