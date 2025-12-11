"use client"

import { useState } from "react"
import { Download, Save, Eye, FileDown, Image, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { pdf } from "@react-pdf/renderer"
import { ProposalPDF } from "@/components/editor/proposal-pdf"
import { saveProposal } from "@/lib/storage-utils"
import { toast } from "sonner"
import { DropdownMenuContent, Menu, MenuItem, MenuSeparator, MenuTrigger } from "../ui/menu"
import { useInvoice } from "@/context/invoice-context"

export function DownloadMenu() {
  const { invoiceData, calculations } = useInvoice()
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const handleSaveProposal = () => {
    try {
      const proposalName = `${invoiceData.documentTitle} - ${invoiceData.documentNumber}`
      saveProposal({
        name: proposalName,
        data: invoiceData,
      })
      toast.success("Proposal saved successfully!")
    } catch (error) {
      toast.error("Failed to save proposal")
      console.error(error)
    }
  }

  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = <ProposalPDF data={invoiceData} calculations={calculations} />
    const blob = await pdf(doc).toBlob()
    return blob
  }

  const handleViewPDF = async () => {
    setIsLoading(true)
    setLoadingAction("preview")
    try {
      const blob = await generatePDFBlob()
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
      setPdfPreviewOpen(true)
      toast.success("PDF generated successfully!")
    } catch (error) {
      toast.error("Failed to generate PDF preview")
      console.error(error)
    } finally {
      setIsLoading(false)
      setLoadingAction(null)
    }
  }

  const handleDownloadPDF = async () => {
    setIsLoading(true)
    setLoadingAction("pdf")
    try {
      const blob = await generatePDFBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${invoiceData.documentTitle}-${invoiceData.documentNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast.success("PDF downloaded successfully!")
    } catch (error) {
      toast.error("Failed to download PDF. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
      setLoadingAction(null)
    }
  }

  const handleDownloadPNG = async () => {
    setIsLoading(true)
    setLoadingAction("png")
    try {
      // For PNG export, we still need html2canvas as react-pdf can't export to PNG
      // Import dynamically to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default
      const element = document.getElementById("document-preview")

      if (!element) {
        throw new Error("Document preview element not found")
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `${invoiceData.documentTitle}-${invoiceData.documentNumber}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          toast.success("PNG downloaded successfully!")
        } else {
          throw new Error("Failed to create image blob")
        }
      }, "image/png", 1.0)
    } catch (error) {
      toast.error("Failed to download PNG. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
      setLoadingAction(null)
    }
  }

  const handleClosePdfPreview = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
      setPdfUrl(null)
    }
    setPdfPreviewOpen(false)
  }

  return (
    <>
      <Menu>
        <MenuTrigger render={<Button />} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Processing..." : "Download"}
        </MenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <MenuItem onClick={handleSaveProposal} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Invoice
          </MenuItem>
          <MenuSeparator />
          <MenuItem onClick={handleViewPDF} disabled={isLoading}>
            {loadingAction === "preview" ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            View PDF
          </MenuItem>
          <MenuItem onClick={handleDownloadPDF} disabled={isLoading}>
            {loadingAction === "pdf" ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4 mr-2" />
            )}
            Download PDF
          </MenuItem>
          <MenuItem onClick={handleDownloadPNG} disabled={isLoading}>
            {loadingAction === "png" ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Image className="h-4 w-4 mr-2" />
            )}
            Download PNG
          </MenuItem>
        </DropdownMenuContent>
      </Menu>

      {/* PDF Preview Dialog */}
      <Dialog open={pdfPreviewOpen} onOpenChange={handleClosePdfPreview}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>PDF Preview</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                className="w-full h-full border rounded-lg"
                title="PDF Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
