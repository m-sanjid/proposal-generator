import { Text, View, Image } from "@react-pdf/renderer"
import { formatDate, formatCurrency } from "./utils"
import type {
  BasePdfSectionProps,
  LabeledPdfSectionProps,
  FinancialSectionProps,
} from "./types"

/**
 * Header section with logo, title, and document info
 */
export function HeaderSection({ data, styles }: BasePdfSectionProps) {
  return (
    <View style={styles.header}>
      <View>
        {data.branding.logo && (
          <Image src={data.branding.logo} style={styles.logo} />
        )}
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.documentTitle}>{data.documentTitle}</Text>
        <Text style={styles.documentNumber}>{data.documentNumber}</Text>
        <Text style={styles.infoText}>Issued: {formatDate(data.issueDate)}</Text>
        <Text style={styles.infoText}>Valid Until: {formatDate(data.dueDate)}</Text>
      </View>
    </View>
  )
}

/**
 * From/To information section
 */
export function InfoSection({ data, styles }: BasePdfSectionProps) {
  return (
    <View style={styles.infoSection}>
      {/* From */}
      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>From</Text>
        <Text style={styles.infoTitle}>{data.sender.name}</Text>
        {data.sender.taxId && (
          <Text style={styles.infoText}>Tax ID: {data.sender.taxId}</Text>
        )}
        <Text style={styles.infoText}>{data.sender.address}</Text>
        <Text style={styles.infoText}>{data.sender.email}</Text>
        <Text style={styles.infoText}>{data.sender.phone}</Text>
        {data.sender.website && (
          <Text style={styles.infoText}>{data.sender.website}</Text>
        )}
      </View>

      {/* To */}
      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>To</Text>
        <Text style={styles.infoTitle}>{data.recipient.name}</Text>
        {data.recipient.company && (
          <Text style={styles.infoText}>{data.recipient.company}</Text>
        )}
        <Text style={styles.infoText}>{data.recipient.address}</Text>
        <Text style={styles.infoText}>{data.recipient.email}</Text>
        <Text style={styles.infoText}>{data.recipient.phone}</Text>
      </View>
    </View>
  )
}

/**
 * Executive Summary section
 */
export function ExecutiveSummarySection({
  data,
  styles,
  label,
}: LabeledPdfSectionProps) {
  const { objective, objectiveLabel, solution, solutionLabel } = data.executiveSummary

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>

      {objective && (
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.infoLabel, { marginBottom: 4 }]}>
            {objectiveLabel}
          </Text>
          <Text style={styles.sectionContent}>{objective}</Text>
        </View>
      )}

      {solution && (
        <View>
          <Text style={[styles.infoLabel, { marginBottom: 4 }]}>
            {solutionLabel}
          </Text>
          <Text style={styles.sectionContent}>{solution}</Text>
        </View>
      )}
    </View>
  )
}

/**
 * Scope of Work section with phases and exclusions
 */
export function ScopeOfWorkSection({
  data,
  styles,
  label,
}: LabeledPdfSectionProps) {
  const { phases, exclusions } = data.scopeOfWork

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>

      {/* Phases */}
      {phases.length > 0 && (
        <View style={{ marginBottom: 15 }}>
          {phases.map((phase) => (
            <View key={phase.id} style={styles.phaseItem}>
              <Text style={styles.phaseTitle}>{phase.title}</Text>
              <Text style={styles.phaseDescription}>{phase.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Exclusions */}
      {exclusions.length > 0 && (
        <View>
          <Text style={[styles.infoLabel, { marginBottom: 8 }]}>Exclusions</Text>
          {exclusions.map((exc) => (
            <Text key={exc.id} style={styles.exclusionItem}>
              • {exc.text}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}

/**
 * Timeline section with milestones
 */
export function TimelineSection({ data, styles, label }: LabeledPdfSectionProps) {
  const { startDate, estimatedDuration, milestones } = data.timeline

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>

      {/* Timeline Info */}
      <View style={styles.timelineInfo}>
        <View>
          <Text style={styles.timelineLabel}>Start Date</Text>
          <Text style={styles.timelineValue}>{formatDate(startDate)}</Text>
        </View>
        <View>
          <Text style={styles.timelineLabel}>Duration</Text>
          <Text style={styles.timelineValue}>{estimatedDuration}</Text>
        </View>
      </View>

      {/* Milestones */}
      {milestones.length > 0 && (
        <View>
          <Text style={[styles.infoLabel, { marginBottom: 8 }]}>Milestones</Text>
          {milestones.map((ms) => (
            <View key={ms.id} style={styles.milestoneItem}>
              <View style={styles.milestoneDot} />
              <Text style={styles.milestoneTitle}>{ms.title}</Text>
              <Text style={styles.milestoneDate}>{formatDate(ms.date)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

/**
 * Financial Breakdown section with items table and totals
 */
export function FinancialBreakdownSection({
  data,
  calculations,
  styles,
  label,
}: FinancialSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>

      {/* Items Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDescription]}>
            Description
          </Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.colRate]}>Rate</Text>
          <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
        </View>

        {/* Table Rows */}
        {data.items.map((item, index) => (
          <View
            key={item.id}
            style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
          >
            <Text style={[styles.tableCell, styles.colDescription]}>
              {item.description}
            </Text>
            <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, styles.colRate]}>
              {formatCurrency(item.rate)}
            </Text>
            <Text style={[styles.tableCell, styles.colAmount]}>
              {formatCurrency(item.quantity * item.rate)}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(calculations.subtotal)}
          </Text>
        </View>

        {data.discountAmount > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount</Text>
            <Text style={styles.totalValue}>
              -{formatCurrency(data.discountAmount)}
            </Text>
          </View>
        )}

        {data.taxRate > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({data.taxRate}%)</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(calculations.taxAmount)}
            </Text>
          </View>
        )}

        <View style={styles.grandTotalRow}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>
            {formatCurrency(calculations.grandTotal)}
          </Text>
        </View>
      </View>
    </View>
  )
}

/**
 * Terms & Conditions section
 */
export function TermsConditionsSection({
  data,
  styles,
  label,
}: LabeledPdfSectionProps) {
  const { terms, additionalTerms } = data.termsConditions

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>

      {terms.map((term) => (
        <View key={term.id} style={styles.termItem}>
          <Text style={styles.termLabel}>{term.label}:</Text>
          <Text style={styles.termValue}>{term.value}</Text>
        </View>
      ))}

      {additionalTerms && (
        <Text style={[styles.sectionContent, { marginTop: 10 }]}>
          {additionalTerms}
        </Text>
      )}
    </View>
  )
}

/**
 * Notes section
 */
export function NotesSection({ data, styles, label }: LabeledPdfSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {data.notes.map((note, index) => (
        <Text key={note.id} style={styles.noteItem}>
          {index + 1}. {note.text}
        </Text>
      ))}
    </View>
  )
}

/**
 * Acceptance/Signature section
 */
export function AcceptanceSection({ data, styles, label }: LabeledPdfSectionProps) {
  const { clientName, signatureDate } = data.acceptance

  return (
    <View style={styles.signature}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <Text style={styles.sectionContent}>
        By signing below, Client agrees to the terms and conditions outlined in
        this proposal.
      </Text>
      <View style={styles.signatureLine} />
      <Text style={styles.signatureLabel}>
        Client Signature {clientName && `(${clientName})`}
      </Text>
      {signatureDate && (
        <Text style={[styles.signatureLabel, { marginTop: 4 }]}>
          Date: {formatDate(signatureDate)}
        </Text>
      )}
    </View>
  )
}

/**
 * Footer section (fixed at bottom)
 */
export function FooterSection({ data, styles }: BasePdfSectionProps) {
  return (
    <View style={styles.footer} fixed>
      <Text>
        {data.sender.name} • {data.sender.email} • {data.sender.phone}
      </Text>
    </View>
  )
}
