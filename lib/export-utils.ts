"use client"

/**
 * Export utilities for PNG export using html2canvas
 * PDF export is now handled by @react-pdf/renderer in ProposalPDF.tsx
 */

export async function downloadAsPNG(elementId: string, filename: string): Promise<boolean> {
  const html2canvas = (await import("html2canvas")).default
  const element = document.getElementById(elementId)

  if (!element) {
    console.error("Element not found:", elementId)
    throw new Error("Document preview element not found")
  }

  // Temporarily make element visible for capture
  const originalStyle = element.style.cssText
  element.style.opacity = "1"
  element.style.position = "relative"
  element.style.zIndex = "1"

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          resolve(true)
        } else {
          reject(new Error("Failed to create image blob"))
        }
      }, "image/png", 1.0)
    })
  } catch (error) {
    console.error("Error generating PNG:", error)
    throw error
  } finally {
    // Restore original styles
    element.style.cssText = originalStyle
  }
}
