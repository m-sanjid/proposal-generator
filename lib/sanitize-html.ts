import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "a"]
const ALLOWED_ATTR = ["href", "target", "rel"]

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  })
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim()
}

export function isHtmlContent(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(value)
}

export function normalizeEditorHtml(html: string): string {
  const trimmed = html.trim()
  if (!trimmed || trimmed === "<p></p>" || trimmed === "<p><br></p>") {
    return ""
  }
  return trimmed
}
