"use client"

import { useCallback, useEffect, useState } from "react"
import LinkExtension from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverClose,
  PopoverPopup,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import { normalizeEditorHtml } from "@/lib/sanitize-html"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
  minHeight = "80px",
  className,
}: RichTextEditorProps) {
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose-editor outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(normalizeEditorHtml(currentEditor.getHTML()))
    },
  })

  useEffect(() => {
    if (!editor) return

    const currentHtml = normalizeEditorHtml(editor.getHTML())
    const nextValue = value || ""

    if (currentHtml !== nextValue) {
      editor.commands.setContent(nextValue, { emitUpdate: false })
    }
  }, [editor, value])

  const applyLink = useCallback(() => {
    if (!editor) return

    const url = linkUrl.trim()
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
    setLinkOpen(false)
  }, [editor, linkUrl])

  if (!editor) {
    return (
      <div
        className={cn(
          "rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground",
          className,
        )}
        style={{ minHeight }}
      >
        Loading editor...
      </div>
    )
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 px-1 py-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
        >
          <UnderlineIcon className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <List className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered list"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </Toggle>

        <Popover
          open={linkOpen}
          onOpenChange={(open) => {
            if (open) {
              const previousUrl = editor.getAttributes("link").href as string | undefined
              setLinkUrl(previousUrl ?? "")
            }
            setLinkOpen(open)
          }}
        >
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className={cn(editor.isActive("link") && "bg-accent text-accent-foreground")}
                aria-label="Link"
              >
                <Link2 className="h-3.5 w-3.5" />
              </Button>
            }
          />
          <PopoverPopup className="w-72 p-3" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium">Link URL</p>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    applyLink()
                  }
                }}
              />
              <div className="flex justify-end gap-2">
                <PopoverClose render={<Button type="button" variant="outline" size="sm" />}>
                  Cancel
                </PopoverClose>
                <Button type="button" size="sm" onClick={applyLink}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverPopup>
        </Popover>
      </div>

      <EditorContent
        editor={editor}
        className="px-3 py-2 text-sm"
        style={{ minHeight }}
      />
    </div>
  )
}
