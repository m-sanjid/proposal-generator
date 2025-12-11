import type {
  InvoiceData,
  SectionKey,
  Sender,
  Recipient,
  ExecutiveSummary,
  ScopePhase,
  ExclusionItem,
  Timeline,
  Milestone,
  Item,
  TermItem,
  TermsConditions,
  NoteItem,
  Acceptance,
  BrandingSettings,
  SectionConfig,
} from "@/types"

// Base props shared by section panels
export interface BaseSectionProps {
  getSectionLabel: (sectionId: SectionKey) => string
  isSectionEnabled: (sectionId: SectionKey) => boolean
  isSectionEmpty: (sectionId: SectionKey) => boolean
  toggleSection: (sectionId: SectionKey, enabled: boolean) => void
  updateSectionLabel: (sectionId: SectionKey, label: string) => void
}

export interface DetailsPanelProps {
  invoiceData: InvoiceData
  updateDocumentInfo: (info: Partial<Pick<InvoiceData, "documentTitle" | "documentNumber" | "issueDate" | "dueDate">>) => void
  updateSender: (sender: Partial<Sender>) => void
  updateRecipient: (recipient: Partial<Recipient>) => void
}

export interface ExecutiveSummaryPanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  updateExecutiveSummary: (summary: Partial<ExecutiveSummary>) => void
  onClear: () => void
}

export interface ScopeOfWorkPanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  addPhase: () => void
  updatePhase: (id: string, updates: Partial<ScopePhase>) => void
  removePhase: (id: string) => void
  addExclusion: () => void
  updateExclusion: (id: string, text: string) => void
  removeExclusion: (id: string) => void
  onClear: () => void
}

export interface TimelinePanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  updateTimeline: (timeline: Partial<Timeline>) => void
  addMilestone: () => void
  updateMilestone: (id: string, updates: Partial<Milestone>) => void
  removeMilestone: (id: string) => void
  onClear: () => void
}

export interface FinancialBreakdownPanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  addItem: () => void
  updateItem: (id: string, updates: Partial<Item>) => void
  removeItem: (id: string) => void
  updateTaxRate: (rate: number) => void
  updateDiscountAmount: (amount: number) => void
}

export interface TermsPanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  addTerm: () => void
  updateTerm: (id: string, updates: Partial<TermItem>) => void
  removeTerm: (id: string) => void
  updateTermsConditions: (terms: Partial<TermsConditions>) => void
  onClear: () => void
}

export interface NotesPanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  addNote: () => void
  updateNote: (id: string, text: string) => void
  removeNote: (id: string) => void
  onClear: () => void
}

export interface AcceptancePanelProps extends BaseSectionProps {
  invoiceData: InvoiceData
  updateAcceptance: (acceptance: Partial<Acceptance>) => void
  onClear: () => void
}

export interface SettingsPanelProps {
  invoiceData: InvoiceData
  updateTaxRate: (rate: number) => void
  updateDiscountAmount: (amount: number) => void
  toggleSection: (sectionId: SectionKey, enabled: boolean) => void
}

export interface BrandingPanelProps {
  invoiceData: InvoiceData
  updateBranding: (branding: Partial<BrandingSettings>) => void
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
}
