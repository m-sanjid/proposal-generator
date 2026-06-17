"use client"

import { cn } from "@/lib/utils"
import { isHtmlContent, sanitizeHtml } from "@/lib/sanitize-html"

interface RichTextContentProps {
  html: string
  className?: string
}

export function RichTextContent({ html, className }: RichTextContentProps) {
  if (!html) return null

  if (!isHtmlContent(html)) {
    return (
      <div className={cn("whitespace-pre-wrap text-sm leading-relaxed", className)}>
        {html}
      </div>
    )
  }

  const sanitized = sanitizeHtml(html)

  return (
    <div
      className={cn(
        "rich-text-content text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-2 [&_ul]:list-disc [&_ul]:pl-5",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
