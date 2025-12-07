"use client"

import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from "react"
import type {
  InvoiceData,
  InvoiceContextType,
  Sender,
  Recipient,
  Item,
  BrandingSettings,
  ExecutiveSummary,
  ScopeOfWork,
  ScopePhase,
  ExclusionItem,
  Timeline,
  Milestone,
  TermsConditions,
  TermItem,
  Acceptance,
  NoteItem,
  SectionKey,
  SectionConfig,
} from "@/types"

const defaultSections: SectionConfig[] = [
  { id: "executiveSummary", label: "Executive Summary", enabled: true },
  { id: "scopeOfWork", label: "Scope of Work", enabled: true },
  { id: "timeline", label: "Timeline", enabled: true },
  { id: "financialBreakdown", label: "Financial Breakdown", enabled: true },
  { id: "termsConditions", label: "Terms & Conditions", enabled: true },
  { id: "notes", label: "Notes", enabled: true },
  { id: "acceptance", label: "Acceptance", enabled: true },
]

const defaultInvoiceData: InvoiceData = {
  documentTitle: "PROPOSAL",
  documentNumber: "PRO-001",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  sender: {
    name: "Your Company Name",
    email: "hello@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, Suite 100\nNew York, NY 10001",
    website: "www.company.com",
    taxId: "",
  },
  recipient: {
    name: "Client Name",
    company: "Client Company",
    email: "client@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Client Avenue\nLos Angeles, CA 90001",
  },
  items: [
    { id: "1", description: "Web Design & Development", quantity: 1, rate: 5000 },
    { id: "2", description: "Brand Identity Package", quantity: 1, rate: 2500 },
  ],
  taxRate: 10,
  discountAmount: 0,
  notes: [{ id: "1", text: "Thank you for considering our services. We look forward to working with you!" }],
  terms: "Payment is due within 30 days of invoice date. Late payments may incur a 2% monthly fee.",
  branding: {
    logo: null,
    themeColor: "#2563eb",
  },
  executiveSummary: {
    objective:
      "To enhance your digital presence and streamline your business operations through a modern, user-friendly web solution.",
    solution:
      "We propose developing a custom web application that addresses your specific needs, incorporating modern design principles and robust functionality.",
    objectiveLabel: "Objective",
    solutionLabel: "Proposed Solution",
  },
  scopeOfWork: {
    phases: [
      {
        id: "1",
        title: "Phase 1: Discovery & Planning",
        description: "Requirements gathering, research, and project planning.",
      },
      { id: "2", title: "Phase 2: Design", description: "UI/UX design, wireframes, and visual mockups." },
      { id: "3", title: "Phase 3: Development", description: "Frontend and backend development, integrations." },
      { id: "4", title: "Phase 4: Launch", description: "Testing, deployment, and handover." },
    ],
    exclusions: [
      { id: "1", text: "Content creation and copywriting" },
      { id: "2", text: "Stock photography and media assets" },
      { id: "3", text: "Third-party service subscriptions" },
      { id: "4", text: "Ongoing maintenance beyond initial launch" },
    ],
  },
  timeline: {
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    estimatedDuration: "4 Weeks",
    milestones: [
      {
        id: "1",
        title: "Design Approval",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
      {
        id: "2",
        title: "Development Complete",
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
      {
        id: "3",
        title: "Project Launch",
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    ],
  },
  termsConditions: {
    terms: [
      { id: "1", label: "Payment", value: "50% Upfront, 50% on Delivery" },
      { id: "2", label: "Revisions", value: "Includes 2 rounds of revisions per phase" },
      { id: "3", label: "Validity", value: "This quote is valid for 14 days from the issue date" },
    ],
    additionalTerms: "All work remains the property of the provider until full payment is received.",
  },
  acceptance: {
    clientName: "",
    signatureDate: "",
    showSignatureLine: true,
  },
  sections: defaultSections,
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData)

  const updateSender = (sender: Partial<Sender>) => {
    setInvoiceData((prev) => ({
      ...prev,
      sender: { ...prev.sender, ...sender },
    }))
  }

  const updateRecipient = (recipient: Partial<Recipient>) => {
    setInvoiceData((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, ...recipient },
    }))
  }

  const updateDocumentInfo = (
    info: Partial<Pick<InvoiceData, "documentTitle" | "documentNumber" | "issueDate" | "dueDate" | "terms">>,
  ) => {
    setInvoiceData((prev) => ({ ...prev, ...info }))
  }

  const updateBranding = (branding: Partial<BrandingSettings>) => {
    setInvoiceData((prev) => ({
      ...prev,
      branding: { ...prev.branding, ...branding },
    }))
  }

  const addItem = () => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      description: "New Item",
      quantity: 1,
      rate: 0,
    }
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }

  const updateItem = (id: string, updates: Partial<Item>) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }))
  }

  const removeItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const updateTaxRate = (rate: number) => {
    setInvoiceData((prev) => ({ ...prev, taxRate: rate }))
  }

  const updateDiscountAmount = (amount: number) => {
    setInvoiceData((prev) => ({ ...prev, discountAmount: amount }))
  }

  const updateExecutiveSummary = (summary: Partial<ExecutiveSummary>) => {
    setInvoiceData((prev) => ({
      ...prev,
      executiveSummary: { ...prev.executiveSummary, ...summary },
    }))
  }

  const updateScopeOfWork = (scope: Partial<ScopeOfWork>) => {
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: { ...prev.scopeOfWork, ...scope },
    }))
  }

  const addPhase = () => {
    const newPhase: ScopePhase = {
      id: crypto.randomUUID(),
      title: "New Phase",
      description: "Description of deliverables.",
    }
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: {
        ...prev.scopeOfWork,
        phases: [...prev.scopeOfWork.phases, newPhase],
      },
    }))
  }

  const updatePhase = (id: string, updates: Partial<ScopePhase>) => {
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: {
        ...prev.scopeOfWork,
        phases: prev.scopeOfWork.phases.map((phase) => (phase.id === id ? { ...phase, ...updates } : phase)),
      },
    }))
  }

  const removePhase = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: {
        ...prev.scopeOfWork,
        phases: prev.scopeOfWork.phases.filter((phase) => phase.id !== id),
      },
    }))
  }

  const addExclusion = () => {
    const newExclusion: ExclusionItem = {
      id: crypto.randomUUID(),
      text: "New exclusion item",
    }
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: {
        ...prev.scopeOfWork,
        exclusions: [...prev.scopeOfWork.exclusions, newExclusion],
      },
    }))
  }

  const updateExclusion = (id: string, text: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: {
        ...prev.scopeOfWork,
        exclusions: prev.scopeOfWork.exclusions.map((exc) => (exc.id === id ? { ...exc, text } : exc)),
      },
    }))
  }

  const removeExclusion = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      scopeOfWork: {
        ...prev.scopeOfWork,
        exclusions: prev.scopeOfWork.exclusions.filter((exc) => exc.id !== id),
      },
    }))
  }

  const updateTimeline = (timeline: Partial<Timeline>) => {
    setInvoiceData((prev) => ({
      ...prev,
      timeline: { ...prev.timeline, ...timeline },
    }))
  }

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: crypto.randomUUID(),
      title: "New Milestone",
      date: new Date().toISOString().split("T")[0],
    }
    setInvoiceData((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: [...prev.timeline.milestones, newMilestone],
      },
    }))
  }

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setInvoiceData((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: prev.timeline.milestones.map((ms) => (ms.id === id ? { ...ms, ...updates } : ms)),
      },
    }))
  }

  const removeMilestone = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: prev.timeline.milestones.filter((ms) => ms.id !== id),
      },
    }))
  }

  const updateTermsConditions = (terms: Partial<TermsConditions>) => {
    setInvoiceData((prev) => ({
      ...prev,
      termsConditions: { ...prev.termsConditions, ...terms },
    }))
  }

  const addTerm = () => {
    const newTerm: TermItem = {
      id: crypto.randomUUID(),
      label: "New Term",
      value: "Term description",
    }
    setInvoiceData((prev) => ({
      ...prev,
      termsConditions: {
        ...prev.termsConditions,
        terms: [...prev.termsConditions.terms, newTerm],
      },
    }))
  }

  const updateTerm = (id: string, updates: Partial<TermItem>) => {
    setInvoiceData((prev) => ({
      ...prev,
      termsConditions: {
        ...prev.termsConditions,
        terms: prev.termsConditions.terms.map((term) => (term.id === id ? { ...term, ...updates } : term)),
      },
    }))
  }

  const removeTerm = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      termsConditions: {
        ...prev.termsConditions,
        terms: prev.termsConditions.terms.filter((term) => term.id !== id),
      },
    }))
  }

  const updateAcceptance = (acceptance: Partial<Acceptance>) => {
    setInvoiceData((prev) => ({
      ...prev,
      acceptance: { ...prev.acceptance, ...acceptance },
    }))
  }

  const addNote = () => {
    const newNote: NoteItem = {
      id: crypto.randomUUID(),
      text: "New note",
    }
    setInvoiceData((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }))
  }

  const updateNote = (id: string, text: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      notes: prev.notes.map((note) => (note.id === id ? { ...note, text } : note)),
    }))
  }

  const removeNote = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      notes: prev.notes.filter((note) => note.id !== id),
    }))
  }

  const toggleSection = useCallback((sectionId: SectionKey, enabled: boolean) => {
    setInvoiceData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, enabled } : s)),
    }))
  }, [])

  const updateSectionLabel = useCallback((sectionId: SectionKey, label: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, label } : s)),
    }))
  }, [])

  const isSectionEnabled = useCallback(
    (sectionId: SectionKey): boolean => {
      return invoiceData.sections.find((s) => s.id === sectionId)?.enabled ?? false
    },
    [invoiceData.sections],
  )

  const getSectionLabel = useCallback(
    (sectionId: SectionKey): string => {
      return invoiceData.sections.find((s) => s.id === sectionId)?.label ?? ""
    },
    [invoiceData.sections],
  )

  const isSectionEmpty = useCallback(
    (sectionId: SectionKey): boolean => {
      switch (sectionId) {
        case "executiveSummary":
          return !invoiceData.executiveSummary.objective && !invoiceData.executiveSummary.solution
        case "scopeOfWork":
          return invoiceData.scopeOfWork.phases.length === 0 && invoiceData.scopeOfWork.exclusions.length === 0
        case "timeline":
          return !invoiceData.timeline.startDate && invoiceData.timeline.milestones.length === 0
        case "financialBreakdown":
          return invoiceData.items.length === 0
        case "termsConditions":
          return invoiceData.termsConditions.terms.length === 0 && !invoiceData.termsConditions.additionalTerms
        case "notes":
          return invoiceData.notes.length === 0
        case "acceptance":
          return !invoiceData.acceptance.showSignatureLine
        default:
          return false
      }
    },
    [invoiceData],
  )

  const calculations = useMemo(() => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
    const taxAmount = (subtotal - invoiceData.discountAmount) * (invoiceData.taxRate / 100)
    const grandTotal = subtotal - invoiceData.discountAmount + taxAmount
    return { subtotal, taxAmount, grandTotal }
  }, [invoiceData.items, invoiceData.taxRate, invoiceData.discountAmount])

  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        updateSender,
        updateRecipient,
        updateDocumentInfo,
        updateBranding,
        addItem,
        updateItem,
        removeItem,
        updateTaxRate,
        updateDiscountAmount,
        updateExecutiveSummary,
        updateScopeOfWork,
        addPhase,
        updatePhase,
        removePhase,
        addExclusion,
        updateExclusion,
        removeExclusion,
        updateTimeline,
        addMilestone,
        updateMilestone,
        removeMilestone,
        updateTermsConditions,
        addTerm,
        updateTerm,
        removeTerm,
        updateAcceptance,
        addNote,
        updateNote,
        removeNote,
        toggleSection,
        updateSectionLabel,
        isSectionEnabled,
        isSectionEmpty,
        getSectionLabel,
        calculations,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoice() {
  const context = useContext(InvoiceContext)
  if (context === undefined) {
    throw new Error("useInvoice must be used within an InvoiceProvider")
  }
  return context
}
