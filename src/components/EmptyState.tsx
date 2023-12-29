import React from 'react'
import { PassChildren } from '../interfaces'

const EmptyState: React.FC<PassChildren> = ({children}) => {
  return (
    <div className='empty-state'>
      { children }
    </div>
  )
}

export default EmptyState