import React, { useState } from 'react'
import EditUser from '../components/EditUser'
import { userStorage } from '../stores/userStorage'
import UpdatePassword from '../components/UpdatePassword'
import UpdateAvatar from '../components/UpdateAvatar'

interface Props {
  onClose: () => void
}

export type Forms = 'user' | 'password' | 'avatar'

const SettingsLayout: React.FC<Props> = ({onClose}) => {
  const [activeForm, setActiveForm] = useState<Forms>('user')
  const user = userStorage.getUser()

  const handleChangeForm = (newForm: Forms) => {
    setActiveForm(newForm)
  };

  return (
    <div>
      {
        activeForm === 'user' && user && <EditUser defaultValues={user} onClose={onClose} changeForm={handleChangeForm} />
      }
      {
        activeForm === 'password' && user && <UpdatePassword userId={user.id} onClose={onClose} />
      }
      {
        activeForm === 'avatar' && user && <UpdateAvatar user={user} onClose={onClose} />
      }
    </div>
  )
}

export default SettingsLayout