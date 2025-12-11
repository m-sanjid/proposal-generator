"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  LayoutDashboard,
  FolderOpen,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
} from "lucide-react"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "./logo"
import { Kbd } from "./ui/kbd"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AppSidebarProps {
  onNewProposal?: () => void
}

// Navigation items
const navItems = [
  { href: "/", icon: Home, label: "Home", shortcut: "⌘H" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", shortcut: "⌘D" },
]

const resourceItems = [
  { href: "/templates", icon: FolderOpen, label: "Templates", badge: "Soon" },
  { href: "/settings", icon: Settings, label: "Settings", badge: "Soon" },
  { href: "/help", icon: HelpCircle, label: "Help", badge: "Soon" },
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
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault()
        handleNewProposal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNewProposal])
  const { setOpen, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r-0 sticky top-0">
      {/* Brand Header */}
      <SidebarHeader className="ml-auto">
        <SidebarTrigger size="icon-xl" className="mt-3" />
      </SidebarHeader>

      <SidebarContent className="mt-2 border-t">
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupContent className="relative">
            <SidebarInput placeholder="Search..." onFocus={() => setOpen(true)} />
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
                  tooltip="New Proposal (⌘N)"
                >
                  <span>New Proposal</span>
                  <Kbd>
                    ⌘N
                  </Kbd>
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
                  {pathname === item.href && <motion.div layoutId="active-item" className="bg-primary/5 backdrop-blur-3xl inset-0 absolute rounded-md border-primary" />}

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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-sm font-semibold text-white shadow-sm">
                    U
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">User</span>
                    <span className="truncate text-xs text-muted-foreground">Free Plan</span>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Back to Site</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />

      {isMobile}
    </Sidebar>
  )
}
