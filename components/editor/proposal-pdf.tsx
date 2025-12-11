"use client"

import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import type { InvoiceData } from "@/types"

// Register fonts (using Helvetica as default, which is built-in)
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
})

interface ProposalPDFProps {
  data: InvoiceData
  calculations: {
    subtotal: number
    taxAmount: number
    grandTotal: number
  }
}

// Create styles
const createStyles = (themeColor: string) =>
  StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 10,
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
      borderBottomWidth: 2,
      borderBottomColor: themeColor,
      paddingBottom: 20,
    },
    logo: {
      width: 80,
      height: 40,
      objectFit: "contain",
    },
    headerRight: {
      textAlign: "right",
    },
    documentTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: themeColor,
      marginBottom: 4,
    },
    documentNumber: {
      fontSize: 10,
      color: "#666666",
    },
    infoSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    infoBlock: {
      width: "45%",
    },
    infoLabel: {
      fontSize: 8,
      fontWeight: "bold",
      color: "#999999",
      textTransform: "uppercase",
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    infoTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 4,
    },
    infoText: {
      fontSize: 9,
      color: "#666666",
      marginBottom: 2,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: themeColor,
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      paddingBottom: 6,
    },
    sectionContent: {
      fontSize: 9,
      color: "#444444",
      lineHeight: 1.5,
    },
    phaseItem: {
      marginBottom: 12,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderLeftColor: themeColor,
    },
    phaseTitle: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 4,
    },
    phaseDescription: {
      fontSize: 9,
      color: "#666666",
    },
    exclusionItem: {
      fontSize: 9,
      color: "#666666",
      marginBottom: 4,
      paddingLeft: 10,
    },
    timelineInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderRadius: 4,
    },
    timelineLabel: {
      fontSize: 8,
      fontWeight: "bold",
      color: "#999999",
      textTransform: "uppercase",
    },
    timelineValue: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#333333",
      marginTop: 4,
    },
    milestoneItem: {
      flexDirection: "row",
      marginBottom: 8,
      alignItems: "center",
    },
    milestoneDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: themeColor,
      marginRight: 10,
    },
    milestoneTitle: {
      flex: 1,
      fontSize: 9,
      color: "#333333",
    },
    milestoneDate: {
      fontSize: 9,
      color: "#666666",
    },
    table: {
      marginTop: 10,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: themeColor,
      padding: 8,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    tableHeaderText: {
      color: "#ffffff",
      fontSize: 9,
      fontWeight: "bold",
    },
    tableRow: {
      flexDirection: "row",
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
    },
    tableRowAlt: {
      backgroundColor: "#f9f9f9",
    },
    tableCell: {
      fontSize: 9,
      color: "#333333",
    },
    colDescription: {
      width: "50%",
    },
    colQty: {
      width: "15%",
      textAlign: "center",
    },
    colRate: {
      width: "17.5%",
      textAlign: "right",
    },
    colAmount: {
      width: "17.5%",
      textAlign: "right",
    },
    totalsSection: {
      marginTop: 15,
      alignItems: "flex-end",
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 4,
      width: 200,
    },
    totalLabel: {
      fontSize: 9,
      color: "#666666",
      width: 100,
    },
    totalValue: {
      fontSize: 9,
      color: "#333333",
      width: 100,
      textAlign: "right",
    },
    grandTotalRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: themeColor,
      width: 200,
    },
    grandTotalLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: themeColor,
      width: 100,
    },
    grandTotalValue: {
      fontSize: 12,
      fontWeight: "bold",
      color: themeColor,
      width: 100,
      textAlign: "right",
    },
    termItem: {
      flexDirection: "row",
      marginBottom: 8,
    },
    termLabel: {
      fontSize: 9,
      fontWeight: "bold",
      color: "#333333",
      width: 100,
    },
    termValue: {
      fontSize: 9,
      color: "#666666",
      flex: 1,
    },
    noteItem: {
      fontSize: 9,
      color: "#666666",
      marginBottom: 6,
      paddingLeft: 10,
    },
    signature: {
      marginTop: 30,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: "#e5e5e5",
    },
    signatureLine: {
      borderBottomWidth: 1,
      borderBottomColor: "#333333",
      width: 200,
      marginBottom: 8,
      marginTop: 40,
    },
    signatureLabel: {
      fontSize: 8,
      color: "#666666",
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: "center",
      fontSize: 8,
      color: "#999999",
      borderTopWidth: 1,
      borderTopColor: "#e5e5e5",
      paddingTop: 10,
    },
  })

// Helper function to format date
const formatDate = (dateStr: string): string => {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function ProposalPDF({ data, calculations }: ProposalPDFProps) {
  const styles = createStyles(data.branding.themeColor || "#2563eb")
  const isSectionEnabled = (sectionId: string): boolean => {
    return data.sections.find((s) => s.id === sectionId)?.enabled ?? false
  }
  const getSectionLabel = (sectionId: string): string => {
    return data.sections.find((s) => s.id === sectionId)?.label ?? ""
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
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

        {/* From / To Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>From</Text>
            <Text style={styles.infoTitle}>{data.sender.name}</Text>
            {data.sender.taxId && <Text style={styles.infoText}>Tax ID: {data.sender.taxId}</Text>}
            <Text style={styles.infoText}>{data.sender.address}</Text>
            <Text style={styles.infoText}>{data.sender.email}</Text>
            <Text style={styles.infoText}>{data.sender.phone}</Text>
            {data.sender.website && <Text style={styles.infoText}>{data.sender.website}</Text>}
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>To</Text>
            <Text style={styles.infoTitle}>{data.recipient.name}</Text>
            {data.recipient.company && <Text style={styles.infoText}>{data.recipient.company}</Text>}
            <Text style={styles.infoText}>{data.recipient.address}</Text>
            <Text style={styles.infoText}>{data.recipient.email}</Text>
            <Text style={styles.infoText}>{data.recipient.phone}</Text>
          </View>
        </View>

        {/* Executive Summary */}
        {isSectionEnabled("executiveSummary") && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getSectionLabel("executiveSummary")}</Text>
            {data.executiveSummary.objective && (
              <View style={{ marginBottom: 10 }}>
                <Text style={[styles.infoLabel, { marginBottom: 4 }]}>
                  {data.executiveSummary.objectiveLabel}
                </Text>
                <Text style={styles.sectionContent}>{data.executiveSummary.objective}</Text>
              </View>
            )}
            {data.executiveSummary.solution && (
              <View>
                <Text style={[styles.infoLabel, { marginBottom: 4 }]}>
                  {data.executiveSummary.solutionLabel}
                </Text>
                <Text style={styles.sectionContent}>{data.executiveSummary.solution}</Text>
              </View>
            )}
          </View>
        )}

        {/* Scope of Work */}
        {isSectionEnabled("scopeOfWork") && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getSectionLabel("scopeOfWork")}</Text>
            {data.scopeOfWork.phases.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                {data.scopeOfWork.phases.map((phase) => (
                  <View key={phase.id} style={styles.phaseItem}>
                    <Text style={styles.phaseTitle}>{phase.title}</Text>
                    <Text style={styles.phaseDescription}>{phase.description}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.scopeOfWork.exclusions.length > 0 && (
              <View>
                <Text style={[styles.infoLabel, { marginBottom: 8 }]}>Exclusions</Text>
                {data.scopeOfWork.exclusions.map((exc, index) => (
                  <Text key={exc.id} style={styles.exclusionItem}>
                    • {exc.text}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Timeline */}
        {isSectionEnabled("timeline") && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getSectionLabel("timeline")}</Text>
            <View style={styles.timelineInfo}>
              <View>
                <Text style={styles.timelineLabel}>Start Date</Text>
                <Text style={styles.timelineValue}>{formatDate(data.timeline.startDate)}</Text>
              </View>
              <View>
                <Text style={styles.timelineLabel}>Duration</Text>
                <Text style={styles.timelineValue}>{data.timeline.estimatedDuration}</Text>
              </View>
            </View>
            {data.timeline.milestones.length > 0 && (
              <View>
                <Text style={[styles.infoLabel, { marginBottom: 8 }]}>Milestones</Text>
                {data.timeline.milestones.map((ms) => (
                  <View key={ms.id} style={styles.milestoneItem}>
                    <View style={styles.milestoneDot} />
                    <Text style={styles.milestoneTitle}>{ms.title}</Text>
                    <Text style={styles.milestoneDate}>{formatDate(ms.date)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Financial Breakdown */}
        {isSectionEnabled("financialBreakdown") && data.items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getSectionLabel("financialBreakdown")}</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.colDescription]}>Description</Text>
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
                  <Text style={[styles.tableCell, styles.colDescription]}>{item.description}</Text>
                  <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
                  <Text style={[styles.tableCell, styles.colRate]}>{formatCurrency(item.rate)}</Text>
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
                <Text style={styles.totalValue}>{formatCurrency(calculations.subtotal)}</Text>
              </View>
              {data.discountAmount > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount</Text>
                  <Text style={styles.totalValue}>-{formatCurrency(data.discountAmount)}</Text>
                </View>
              )}
              {data.taxRate > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tax ({data.taxRate}%)</Text>
                  <Text style={styles.totalValue}>{formatCurrency(calculations.taxAmount)}</Text>
                </View>
              )}
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>{formatCurrency(calculations.grandTotal)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Terms & Conditions */}
        {isSectionEnabled("termsConditions") && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getSectionLabel("termsConditions")}</Text>
            {data.termsConditions.terms.map((term) => (
              <View key={term.id} style={styles.termItem}>
                <Text style={styles.termLabel}>{term.label}:</Text>
                <Text style={styles.termValue}>{term.value}</Text>
              </View>
            ))}
            {data.termsConditions.additionalTerms && (
              <Text style={[styles.sectionContent, { marginTop: 10 }]}>
                {data.termsConditions.additionalTerms}
              </Text>
            )}
          </View>
        )}

        {/* Notes */}
        {isSectionEnabled("notes") && data.notes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{getSectionLabel("notes")}</Text>
            {data.notes.map((note, index) => (
              <Text key={note.id} style={styles.noteItem}>
                {index + 1}. {note.text}
              </Text>
            ))}
          </View>
        )}

        {/* Acceptance */}
        {isSectionEnabled("acceptance") && data.acceptance.showSignatureLine && (
          <View style={styles.signature}>
            <Text style={styles.sectionTitle}>{getSectionLabel("acceptance")}</Text>
            <Text style={styles.sectionContent}>
              By signing below, Client agrees to the terms and conditions outlined in this proposal.
            </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>
              Client Signature {data.acceptance.clientName && `(${data.acceptance.clientName})`}
            </Text>
            {data.acceptance.signatureDate && (
              <Text style={[styles.signatureLabel, { marginTop: 4 }]}>
                Date: {formatDate(data.acceptance.signatureDate)}
              </Text>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>
            {data.sender.name} • {data.sender.email} • {data.sender.phone}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
