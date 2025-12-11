"use client"

import { useState } from 'react'
import { Logo } from '../logo'
import ThemeToggle from '../theme-toggle'
import { DownloadMenu } from './download-menu'
import { useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

export const Navbar = () => {
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
    <header className={cn('fixed top-0 left-0 right-0 z-50 bg-neutral-50 dark:bg-neutral-900 transition-all duration-300 ease-in-out', isScrolled && 'bg-white dark:bg-black border-b')}>
      <nav className='h-16 flex items-center justify-between max-w-7xl mx-auto px-2 md:px-4 w-full'>
        <Logo />
        <div className='flex items-center gap-2'>
          <DownloadMenu />
          <ThemeToggle />
        </div>
      </nav>
    </header>

  )
}
