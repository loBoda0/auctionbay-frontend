import React, { ReactNode, useEffect, useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { useNavigate } from 'react-router-dom'
import { userStorage } from '../stores/userStorage'
import Modal from '../components/ui/Modal'
import AddEditAuction from '../components/AddEditAuction'

interface ComponentProps {
  children: ReactNode;
}

const HomeLayout: React.FC<ComponentProps> = ({children}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const user = userStorage.getUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
  return (
    <>
      <Navbar openModal={openModal} />
      <div className='main-wrapper'>
        {children}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddEditAuction isEdit={false} />
      </Modal>
    </>
      
  )
}

export default HomeLayout