"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SectionCard } from "@/components/editor/section-card"
import { ProposalDateField } from "@/components/reui/proposal-date-field"
import type { AcceptancePanelProps } from "./types"

export function AcceptancePanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  updateAcceptance,
  onClear,
}: AcceptancePanelProps) {
  const { clientName, signatureDate, showSignatureLine } = invoiceData.acceptance

  return (
    <SectionCard
      id="acceptance"
      title={getSectionLabel("acceptance")}
      enabled={isSectionEnabled("acceptance")}
      isEmpty={isSectionEmpty("acceptance")}
      onToggle={(enabled) => toggleSection("acceptance", enabled)}
      onDelete={onClear}
      onTitleChange={(label) => updateSectionLabel("acceptance", label)}
    >
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2.5">
          <Label htmlFor="showSignature">Show Signature Line</Label>
          <Switch
            id="showSignature"
            checked={showSignatureLine}
            onCheckedChange={(checked) => updateAcceptance({ showSignatureLine: checked })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="clientSignatureName">Client Name (pre-fill)</Label>
          <Input
            id="clientSignatureName"
            value={clientName}
            onChange={(e) => updateAcceptance({ clientName: e.target.value })}
            placeholder="Leave blank for client to fill"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="signatureDate">Date</Label>
          <ProposalDateField
            value={signatureDate}
            onChange={(value) => updateAcceptance({ signatureDate: value })}
            placeholder="Select signature date"
            compact
          />
        </div>
      </div>
    </SectionCard>
  )
}
