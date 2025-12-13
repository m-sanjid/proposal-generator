import React from 'react'


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col scrollbar-hide relative max-w-7xl mx-auto w-full border">
      {children}
    </div>
  )
}

export default EditorLayout


