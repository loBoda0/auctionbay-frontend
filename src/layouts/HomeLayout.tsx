import React, { useEffect } from 'react'

import { PassChildren } from '../interfaces'
import Navbar from '../components/ui/Navbar'
import { useNavigate } from 'react-router-dom'
import { userStorage } from '../stores/userStorage'


const HomeLayout: React.FC<PassChildren> = ({children}) => {

  const user = userStorage.getUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
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