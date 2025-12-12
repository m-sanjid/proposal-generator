"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Kbd } from "./ui/kbd"
import { motion } from "motion/react"
import { FolderIcon, GearIcon, HouseIcon, InfoIcon, LayoutIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

interface AppSidebarProps {
  onNewProposal?: () => void
}

// Navigation items
const navItems = [
  { href: "/", icon: HouseIcon, label: "Home", shortcut: "⌘H" },
  { href: "/dashboard", icon: LayoutIcon, label: "Dashboard", shortcut: "⌘D" },
]

const resourceItems = [
  { href: "/templates", icon: FolderIcon, label: "Templates", badge: "Soon" },
  { href: "/settings", icon: GearIcon, label: "Settings", badge: "Soon" },
  { href: "/help", icon: InfoIcon, label: "Help", badge: "Soon" },
]

export function AppSidebar({ onNewProposal }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNewProposal = React.useCallback(() => {
    if (onNewProposal) {
      onNewProposal()
    } else {
      router.push("/editor?new=true")
    }
  }, [onNewProposal, router])

  // Keyboard shortcut for new proposal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        e.preventDefault()
        handleNewProposal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNewProposal])

  const { setOpen, isMobile } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 sticky top-0 h-screen"
    >
      {/* Brand Header */}
      <SidebarHeader className="ml-auto">
        <SidebarTrigger size="icon-xl" className="mt-3" />
      </SidebarHeader>

      <SidebarContent className="mt-2 border-t overflow-x-hidden">
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupContent className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 z-10" />
            <SidebarInput placeholder="Search..." className="pl-5" onKeyDown={(e) => e.key === "Enter" && setOpen(true)} onFocus={() => setOpen(true)} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />

        {/* Quick Action - New Proposal */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleNewProposal}
                  tooltip="New Proposal (⌘H)"
                >
                  <Kbd>⌘H</Kbd>
                  <span className="shrink-0">New Proposal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>

            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href} className="relative"
                >
                  {pathname === item.href && <motion.div layoutId="active-item" className="bg-primary/5 backdrop-blur-3xl inset-0 absolute border dark:border-white border-black" />}

                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <item.icon className="h-4 w-4 relative z-20" />
                      <span className="relative z-20">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Resources */}
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    className="opacity-60 cursor-not-allowed"
                    disabled
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge className="bg-muted text-muted-foreground">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarGroupContent>
          <SidebarGroupLabel>
            Developed by
            <Link href="https://sanjid.in" target="_blank" rel="noopener noreferrer">
              <span className="font-semibold before:content-[' '] before:mr-1">sanjid</span>
            </Link>
          </SidebarGroupLabel>
        </SidebarGroupContent>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}