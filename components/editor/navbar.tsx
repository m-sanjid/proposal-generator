"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Plus } from "lucide-react"

import { TemplatePicker } from "../dashboard/template-picker"
import { Logo } from "../logo"
import ThemeToggle from "../theme-toggle"
import { SidebarTrigger } from "../ui/sidebar"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import type { Template } from "@/lib/templates"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isDashboard = pathname === "/dashboard"
  const isEditor = pathname === "/editor"

  const handleSelectTemplate = (template: Template) => {
    sessionStorage.setItem("newProposalTemplate", JSON.stringify(template.data))
    setShowTemplatePicker(false)
    router.push("/editor?new=true")
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 border-b border-transparent bg-background/78 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200",
          isScrolled && "border-border/70 bg-background/90 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]"
        )}
      >
        <nav className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground md:hidden" />
            <Separator orientation="vertical" className="mr-1 h-4 md:hidden" />
            <Logo className="gap-2.5" />
            {isEditor && (
              <span className="hidden min-h-8 items-center rounded-full border border-border/70 bg-muted/40 px-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:inline-flex">
                Editor
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isDashboard && (
              <motion.button
                onClick={() => setShowTemplatePicker(true)}
                className="inline-flex min-h-9 items-center gap-2 rounded-2xl bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-[background-color,transform] duration-200 hover:bg-foreground/90 active:scale-[0.96]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.96 }}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Proposal</span>
              </motion.button>
            )}
            <ThemeToggle className="rounded-2xl" />
          </div>
        </nav>
      </header>

      <AnimatePresence initial={false}>
        {showTemplatePicker && (
          <TemplatePicker onSelect={handleSelectTemplate} onClose={() => setShowTemplatePicker(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
