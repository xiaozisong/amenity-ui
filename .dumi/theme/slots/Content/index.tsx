import React from "react"

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div>
    {children}
  </div>
}

export default Content