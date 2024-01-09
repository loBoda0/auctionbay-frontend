import React, { ReactNode, useEffect, useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { useNavigate } from 'react-router-dom'
import { userStorage } from '../stores/userStorage'
import Modal from '../components/ui/Modal'
import AddEditAuction from '../components/AddEditAuction'
import SettingsLayout from './SettingsLayout'

interface ComponentProps {
  children: ReactNode;
}

const HomeLayout: React.FC<ComponentProps> = ({children}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSettingsOpen, seSettingsOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSettings = () => {
    seSettingsOpen(true);
  };

  const closeSettings = () => {
    seSettingsOpen(false);
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
      <Navbar openModal={openModal} openSettings={openSettings} />
      <div className='main-wrapper'>
        {children}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddEditAuction isEdit={false} onClose={closeModal} />
      </Modal>
      <Modal isOpen={isSettingsOpen} onClose={closeModal}>
        <SettingsLayout onClose={closeSettings} />
      </Modal>
    </>
      
  )
}

export default HomeLayout