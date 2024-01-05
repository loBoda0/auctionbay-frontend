import React, { ReactNode } from 'react'

interface ComponentProps {
  children: ReactNode;
}

const EmptyState: React.FC<ComponentProps> = ({children}) => {
  return (
    <div className='empty-state'>
      { children }
    </div>
  )
}

export default EmptyState