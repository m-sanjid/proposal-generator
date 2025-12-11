import { InvoiceData } from "@/types"

const STORAGE_KEY = "proposalcraft_proposals"

export interface SavedProposal {
  id: string
  name: string
  data: InvoiceData
  createdAt: string
  updatedAt: string
}

export function saveProposal(proposal: Omit<SavedProposal, "id" | "createdAt" | "updatedAt">): SavedProposal {
  const proposals = getAllProposals()
  const newProposal: SavedProposal = {
    ...proposal,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  proposals.push(newProposal)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals))
  return newProposal
}

export function updateProposal(id: string, data: Partial<SavedProposal>): SavedProposal | null {
  const proposals = getAllProposals()
  const index = proposals.findIndex((p) => p.id === id)

  if (index === -1) return null

  proposals[index] = {
    ...proposals[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals))
  return proposals[index]
}

export function deleteProposal(id: string): boolean {
  const proposals = getAllProposals()
  const filtered = proposals.filter((p) => p.id !== id)

  if (filtered.length === proposals.length) return false

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

export function getProposal(id: string): SavedProposal | null {
  const proposals = getAllProposals()
  return proposals.find((p) => p.id === id) || null
}

export function getAllProposals(): SavedProposal[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading proposals from localStorage:", error)
    return []
  }
}

export function clearAllProposals(): void {
  localStorage.removeItem(STORAGE_KEY)
}
