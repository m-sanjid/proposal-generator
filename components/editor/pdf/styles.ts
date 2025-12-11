import { StyleSheet } from "@react-pdf/renderer"

/**
 * Creates PDF styles with the given theme color.
 * Extracted for reusability and maintainability.
 */
export const createPdfStyles = (themeColor: string) =>
  StyleSheet.create({
    // Page Layout
    page: {
      padding: 40,
      fontSize: 10,
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
    },

    // Header Styles
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

    // Info Section Styles
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

    // Section Styles
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

    // Phase Styles
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

    // Timeline Styles
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

    // Table Styles
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

    // Table Column Widths
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

    // Totals Styles
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

    // Terms Styles
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

    // Notes Styles
    noteItem: {
      fontSize: 9,
      color: "#666666",
      marginBottom: 6,
      paddingLeft: 10,
    },

    // Signature Styles
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

    // Footer Styles
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

export type PdfStyles = ReturnType<typeof createPdfStyles>
