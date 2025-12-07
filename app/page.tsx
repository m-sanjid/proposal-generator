import { InvoiceProvider } from "@/context/InvoiceContext"
import { EditorSidebar } from "@/components/editor/EditorSidebar"
import { DocumentPreview } from "@/components/preview/DocumentPreview"

export default function Home() {
  return (
    <InvoiceProvider>
      <div className="flex h-screen">
        {/* Left Pane - Editor */}
        <aside className="w-[400px] shrink-0 overflow-hidden border-r bg-card no-print">
          <EditorSidebar />
        </aside>

        {/* Right Pane - Live Preview */}
        <main className="flex-1 overflow-auto bg-muted/50 p-8 print:bg-white print:p-0">
          <DocumentPreview />
        </main>
      </div>
    </InvoiceProvider>
  )
}
