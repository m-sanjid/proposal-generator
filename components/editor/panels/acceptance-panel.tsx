"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SectionCard } from "@/components/editor/section-card"
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
      <div className="grid gap-3">
        {/* Show Signature Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="showSignature">Show Signature Line</Label>
          <Switch
            id="showSignature"
            checked={showSignatureLine}
            onCheckedChange={(checked) => updateAcceptance({ showSignatureLine: checked })}
          />
        </div>

        {/* Client Name */}
        <div>
          <Label htmlFor="clientSignatureName">Client Name (pre-fill)</Label>
          <Input
            id="clientSignatureName"
            value={clientName}
            onChange={(e) => updateAcceptance({ clientName: e.target.value })}
            placeholder="Leave blank for client to fill"
          />
        </div>

        {/* Signature Date */}
        <div>
          <Label htmlFor="signatureDate">Date</Label>
          <Input
            id="signatureDate"
            type="date"
            value={signatureDate}
            onChange={(e) => updateAcceptance({ signatureDate: e.target.value })}
          />
        </div>
      </div>
    </SectionCard>
  )
}
