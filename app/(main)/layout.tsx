import { AppSidebar } from '@/components/app-sidebar'
import { Navbar } from '@/components/editor/navbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      className="relative">
      <AppSidebar />
      <SidebarInset className='relative'>
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout