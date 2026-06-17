import type { ReactNode } from "react"
import { Link, Text, View } from "@react-pdf/renderer"
import type { Style } from "@react-pdf/stylesheet"
import { isHtmlContent, sanitizeHtml, stripHtmlTags } from "@/lib/sanitize-html"

type PdfStyle = Style | Style[]

interface RichTextPdfProps {
  content: string
  style?: PdfStyle
}

function toStyleArray(base: PdfStyle | undefined): Style[] {
  if (!base) return []
  return Array.isArray(base) ? base : [base]
}

function mergeStyles(base: PdfStyle | undefined, extra: Style): PdfStyle {
  return [...toStyleArray(base), extra]
}

function renderInlineNodes(
  node: ChildNode,
  baseStyle: PdfStyle | undefined,
  key: string,
): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? ""
    if (!text) return null
    return (
      <Text key={key} style={baseStyle}>
        {text}
      </Text>
    )
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null

  const element = node as HTMLElement
  const tag = element.tagName.toLowerCase()
  const children = Array.from(element.childNodes)
    .map((child, index) => renderInlineNodes(child, baseStyle, `${key}-${index}`))
    .filter(Boolean)

  switch (tag) {
    case "strong":
    case "b":
      return (
        <Text key={key} style={mergeStyles(baseStyle, { fontWeight: 700 })}>
          {children}
        </Text>
      )
    case "em":
    case "i":
      return (
        <Text key={key} style={mergeStyles(baseStyle, { fontStyle: "italic" })}>
          {children}
        </Text>
      )
    case "u":
      return (
        <Text key={key} style={mergeStyles(baseStyle, { textDecoration: "underline" })}>
          {children}
        </Text>
      )
    case "a": {
      const href = element.getAttribute("href")
      if (!href) {
        return (
          <Text key={key} style={mergeStyles(baseStyle, { textDecoration: "underline" })}>
            {children}
          </Text>
        )
      }
      return (
        <Link key={key} src={href} style={mergeStyles(baseStyle, { color: "#2563eb", textDecoration: "underline" })}>
          {children}
        </Link>
      )
    }
    case "br":
      return "\n"
    case "p":
    case "li":
    case "span":
      return (
        <Text key={key} style={baseStyle}>
          {children}
        </Text>
      )
    default:
      return (
        <Text key={key} style={baseStyle}>
          {children}
        </Text>
      )
  }
}

function renderBlockNodes(
  nodes: ChildNode[],
  baseStyle: PdfStyle | undefined,
  keyPrefix: string,
): ReactNode[] {
  const blocks: ReactNode[] = []
  let listCounter = 0

  nodes.forEach((node, index) => {
    const key = `${keyPrefix}-${index}`

    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? "").trim()
      if (text) {
        blocks.push(
          <Text key={key} style={[...toStyleArray(baseStyle), { marginBottom: 4 }]}>
            {text}
          </Text>,
        )
      }
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return

    const element = node as HTMLElement
    const tag = element.tagName.toLowerCase()

    if (tag === "p") {
      const inline = Array.from(element.childNodes)
        .map((child, childIndex) => renderInlineNodes(child, baseStyle, `${key}-inline-${childIndex}`))
        .filter(Boolean)

      if (inline.length > 0) {
        blocks.push(
          <Text key={key} style={[...toStyleArray(baseStyle), { marginBottom: 4 }]}>
            {inline}
          </Text>,
        )
      }
      return
    }

    if (tag === "ul" || tag === "ol") {
      listCounter = 0
      const listItems = Array.from(element.children).filter(
        (child) => child.tagName.toLowerCase() === "li",
      )

      listItems.forEach((li, liIndex) => {
        listCounter += 1
        const prefix = tag === "ol" ? `${listCounter}. ` : "• "
        const inline = Array.from(li.childNodes)
          .map((child, childIndex) =>
            renderInlineNodes(child, baseStyle, `${key}-li-${liIndex}-${childIndex}`),
          )
          .filter(Boolean)

        blocks.push(
          <View key={`${key}-li-${liIndex}`} style={{ flexDirection: "row", marginBottom: 2 }}>
            <Text style={[...toStyleArray(baseStyle), { width: 14 }]}>{prefix}</Text>
            <Text style={[...toStyleArray(baseStyle), { flex: 1 }]}>{inline}</Text>
          </View>,
        )
      })
      return
    }

    if (tag === "br") {
      blocks.push(<Text key={key}>{"\n"}</Text>)
      return
    }

    const fallback = renderInlineNodes(node, baseStyle, key)
    if (fallback) {
      blocks.push(
        <Text key={key} style={[...toStyleArray(baseStyle), { marginBottom: 4 }]}>
          {fallback}
        </Text>,
      )
    }
  })

  return blocks
}

function htmlToPdfBlocks(content: string, baseStyle: PdfStyle | undefined): ReactNode[] {
  if (typeof DOMParser === "undefined") {
    return [
      <Text key="fallback" style={baseStyle}>
        {stripHtmlTags(content)}
      </Text>,
    ]
  }

  const sanitized = sanitizeHtml(content)
  const doc = new DOMParser().parseFromString(
    `<div>${sanitized}</div>`,
    "text/html",
  )
  const container = doc.body.firstChild

  if (!container) {
    return [
      <Text key="empty" style={baseStyle}>
        {stripHtmlTags(content)}
      </Text>,
    ]
  }

  return renderBlockNodes(Array.from(container.childNodes), baseStyle, "block")
}

export function RichTextPdf({ content, style }: RichTextPdfProps) {
  if (!content) return null

  if (!isHtmlContent(content)) {
    return <Text style={style}>{content}</Text>
  }

  try {
    const blocks = htmlToPdfBlocks(content, style)
    return <View>{blocks}</View>
  } catch {
    return <Text style={style}>{stripHtmlTags(content)}</Text>
  }
}
