export interface Sender {
  name: string
  email: string
  phone: string
  address: string
  website: string
  taxId: string
}

export interface Recipient {
  name: string
  company: string
  email: string
  phone: string
  address: string
}

export interface Item {
  id: string
  description: string
  quantity: number
  rate: number
}

export interface BrandingSettings {
  logo: string | null
  themeColor: string
}

export interface ExecutiveSummary {
  objective: string
  solution: string
  objectiveLabel: string
  solutionLabel: string
}

export interface ScopePhase {
  id: string
  title: string
  description: string
}

export interface ExclusionItem {
  id: string
  text: string
}

export interface ScopeOfWork {
  phases: ScopePhase[]
  exclusions: ExclusionItem[]
}

export interface Milestone {
  id: string
  title: string
  date: string
}

export interface Timeline {
  startDate: string
  estimatedDuration: string
  milestones: Milestone[]
}

export interface TermItem {
  id: string
  label: string
  value: string
}

export interface TermsConditions {
  terms: TermItem[]
  additionalTerms: string
}

export interface Acceptance {
  clientName: string
  signatureDate: string
  showSignatureLine: boolean
}

export interface NoteItem {
  id: string
  text: string
}

export type SectionKey =
  | "executiveSummary"
  | "scopeOfWork"
  | "timeline"
  | "financialBreakdown"
  | "termsConditions"
  | "notes"
  | "acceptance"

export interface SectionConfig {
  id: SectionKey
  label: string
  enabled: boolean
}

export interface InvoiceData {
  documentTitle: string
  documentNumber: string
  issueDate: string
  dueDate: string
  sender: Sender
  recipient: Recipient
  items: Item[]
  taxRate: number
  discountAmount: number
  notes: NoteItem[]
  terms: string
  branding: BrandingSettings
  executiveSummary: ExecutiveSummary
  scopeOfWork: ScopeOfWork
  timeline: Timeline
  termsConditions: TermsConditions
  acceptance: Acceptance
  sections: SectionConfig[]
}

export interface InvoiceContextType {
  invoiceData: InvoiceData
  updateSender: (sender: Partial<Sender>) => void
  updateRecipient: (recipient: Partial<Recipient>) => void
  updateDocumentInfo: (
    info: Partial<Pick<InvoiceData, "documentTitle" | "documentNumber" | "issueDate" | "dueDate" | "terms">>,
  ) => void
  updateBranding: (branding: Partial<BrandingSettings>) => void
  addItem: () => void
  updateItem: (id: string, updates: Partial<Item>) => void
  removeItem: (id: string) => void
  updateTaxRate: (rate: number) => void
  updateDiscountAmount: (amount: number) => void
  updateExecutiveSummary: (summary: Partial<ExecutiveSummary>) => void
  updateScopeOfWork: (scope: Partial<ScopeOfWork>) => void
  addPhase: () => void
  updatePhase: (id: string, updates: Partial<ScopePhase>) => void
  removePhase: (id: string) => void
  addExclusion: () => void
  updateExclusion: (id: string, text: string) => void
  removeExclusion: (id: string) => void
  updateTimeline: (timeline: Partial<Timeline>) => void
  addMilestone: () => void
  updateMilestone: (id: string, updates: Partial<Milestone>) => void
  removeMilestone: (id: string) => void
  updateTermsConditions: (terms: Partial<TermsConditions>) => void
  addTerm: () => void
  updateTerm: (id: string, updates: Partial<TermItem>) => void
  removeTerm: (id: string) => void
  updateAcceptance: (acceptance: Partial<Acceptance>) => void
  addNote: () => void
  updateNote: (id: string, text: string) => void
  removeNote: (id: string) => void
  toggleSection: (sectionId: SectionKey, enabled: boolean) => void
  updateSectionLabel: (sectionId: SectionKey, label: string) => void
  isSectionEnabled: (sectionId: SectionKey) => boolean
  isSectionEmpty: (sectionId: SectionKey) => boolean
  getSectionLabel: (sectionId: SectionKey) => string
  calculations: {
    subtotal: number
    taxAmount: number
    grandTotal: number
  }
}
