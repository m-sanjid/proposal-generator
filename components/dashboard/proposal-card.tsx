"use client"

import { motion, AnimatePresence } from "motion/react"
import {
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  FileText,
} from "lucide-react"
import { useState, useRef } from "react"
import { SavedProposal } from "@/lib/storage-utils"

interface ProposalCardProps {
  proposal: SavedProposal
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

export function ProposalCard({
  proposal,
  onEdit,
  onDuplicate,
  onDelete,
}: ProposalCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  const total = proposal.data.items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/70 backdrop-blur-xl shadow-sm transition-all hover:shadow-xl"
    >
      {/* ---------- Thumbnail ---------- */}
      <div className="relative h-36 w-full overflow-hidden rounded-b-none rounded-t-2xl bg-neutral-100">
        {proposal.data.logo ? (
          <img
            src={proposal.data.logo}
            alt={`${proposal.name || 'Proposal'} thumbnail`}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src="/images/thumbnail.webp"
            alt="Default thumbnail"
            className="h-full w-full object-cover"
            onError={(e) => {
              // If fallback image fails, show FileText icon
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement?.classList.add('fallback-icon')
            }}
          />
        )}

        {/* subtle gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-neutral-900">
          {proposal.name || proposal.data.documentTitle}
        </h3>

        {/* Recipient */}
        <p className="line-clamp-1 text-sm text-neutral-500">
          {proposal.data.recipient.company ||
            proposal.data.recipient.name ||
            "No recipient"}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-neutral-400">
            Updated {formatDate(proposal.updatedAt)}
          </span>

          <span className="rounded-lg bg-neutral-900 px-3 py-1 text-sm font-medium text-white">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* ---------- Action Menu ---------- */}
      <div
        ref={menuRef}
        className="absolute right-3 top-3 z-20"
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen((v) => !v)
          }}
          className="rounded-lg p-2 text-neutral-500 opacity-0 transition-all hover:bg-neutral-100 hover:text-neutral-800 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
          aria-label="Open actions"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* click outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-neutral-200 bg-white p-1 shadow-xl"
              >
                <Action
                  icon={<Edit className="h-4 w-4" />}
                  label="Edit"
                  onClick={() => onEdit(proposal.id)}
                />
                <Action
                  icon={<Copy className="h-4 w-4" />}
                  label="Duplicate"
                  onClick={() => onDuplicate(proposal.id)}
                />
                <Action
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  danger
                  onClick={() => onDelete(proposal.id)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Full Click Overlay ---------- */}
      <button
        onClick={() => onEdit(proposal.id)}
        aria-label={`Edit ${proposal.name}`}
        className="absolute inset-0 z-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
      />
    </motion.article>
  )
}

/* ---------- Menu Item ---------- */

function Action({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-neutral-700 hover:bg-neutral-100",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  )
}
