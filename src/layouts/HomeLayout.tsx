import React, { useEffect } from 'react'

import { PassChildren } from '../interfaces'
import Navbar from '../components/ui/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const HomeLayout: React.FC<PassChildren> = ({children}) => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user || !token) {
      navigate('/login')
    }
  }, [user, token, navigate])
  
  return (
    <>
      <Navbar />
      <div className='main-wrapper'>
        {children}
      </div>
    </>
      
  )
}

export default HomeLayout