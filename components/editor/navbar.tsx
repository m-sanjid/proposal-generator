"use client"

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useScroll, AnimatePresence } from 'motion/react'
import { Logo } from '../logo'
import ThemeToggle from '../theme-toggle'
import { DownloadMenu } from './download-menu'
import { cn } from '@/lib/utils'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { Header } from '../landing/header'
import { Plus } from 'lucide-react'
import { TemplatePicker } from '../dashboard/template-picker'
import { Template } from '@/lib/templates'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const { scrollYProgress } = useScroll()
  const router = useRouter()
  const pathname = usePathname()

  scrollYProgress.onChange(() => {
    if (scrollYProgress.get() > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  const isHome = pathname === '/'
  const isDashboard = pathname === '/dashboard'
  const isEditor = pathname === '/editor'

  const handleSelectTemplate = (template: Template) => {
    sessionStorage.setItem("newProposalTemplate", JSON.stringify(template.data))
    setShowTemplatePicker(false)
    router.push("/editor?new=true")
  }

  if (isHome) {
    return <Header />
  }

  return (
    <>
      <header className={cn('sticky top-0 left-0 right-0 z-50 bg-neutral-50 dark:bg-neutral-900 transition-transform duration-300 ease-in-out', isScrolled && 'bg-white dark:bg-black border-b')}>
        <nav className='h-16 flex items-center justify-between max-w-7xl mx-auto px-2 md:px-4 w-full'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className="-ml-1 text-neutral-500 hover:text-neutral-900 md:hidden" />
            <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
            <Logo />
          </div>
          <div className='flex items-center gap-2'>
            {isDashboard ? (
              <motion.button
                onClick={() => setShowTemplatePicker(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-white dark:text-neutral-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-100 sm:px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Proposal</span>
              </motion.button>
            ) : isEditor ? (
              <DownloadMenu />
            ) : null}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Template Picker Modal */}
      <AnimatePresence>
        {showTemplatePicker && (
          <TemplatePicker
            onSelect={handleSelectTemplate}
            onClose={() => setShowTemplatePicker(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
