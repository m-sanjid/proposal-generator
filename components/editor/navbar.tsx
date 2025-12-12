"use client"

import { useState } from 'react'
import { Logo } from '../logo'
import ThemeToggle from '../theme-toggle'
import { DownloadMenu } from './download-menu'
import { useScroll } from 'motion/react'
import { cn } from '@/lib/utils'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { usePathname } from 'next/navigation'
import { Header } from '../landing/header'

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
  const isHome = usePathname() === '/'
  return isHome ?

    <Header />
    :
    <header className={cn('sticky top-0 left-0 right-0 z-50 bg-neutral-50 dark:bg-neutral-900 transition-all duration-300 ease-in-out', isScrolled && 'bg-white dark:bg-black border-b')}>
      <nav className='h-16 flex items-center justify-between max-w-7xl mx-auto px-2 md:px-4 w-full'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger className="-ml-1 text-neutral-500 hover:text-neutral-900 md:hidden" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <Logo />
        </div>
        <div className='flex items-center gap-2'>
          <DownloadMenu />
          <ThemeToggle />
        </div>
      </nav>
    </header>

}
