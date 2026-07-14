import React from "react"

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto w-full max-w-[1600px]">{children}</div>
}

export default EditorLayout
