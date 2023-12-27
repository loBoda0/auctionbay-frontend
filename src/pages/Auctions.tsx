import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Auctions: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
  }

  return (
    <div>Auctions</div>
  )
}

export default Auctions