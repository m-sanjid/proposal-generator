"use client"

import { motion, useScroll } from "motion/react"
import Link from "next/link"
import { Logo } from "../logo"
import { Button } from "../ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import ThemeToggle from "../theme-toggle"

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  scrollYProgress.onChange(() => {
    if (scrollYProgress.get() > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })
  return (
    <motion.nav
      className={cn('sticky top-0 left-0 right-0 z-50 bg-neutral-50 dark:bg-neutral-900 transition-all duration-300 ease-in-out', isScrolled && 'bg-white dark:bg-black border-b')}
    >
      <div className='h-16 flex items-center justify-between max-w-7xl mx-auto px-2 md:px-4 w-full'>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
          <Logo />
        </motion.div>

        <div className="flex items-center gap-6">
          {/* Nav Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-2">

            <Link href="/editor">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                >
                  Try Now
                </Button>
              </motion.div>
            </Link>
            <ThemeToggle />
          </div>

        </div>
      </div>
    </motion.nav>
  )
}
