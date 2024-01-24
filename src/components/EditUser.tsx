import React from 'react'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { User } from '../interfaces/user'
import { Controller } from 'react-hook-form'
import Input from './ui/Input'
import { Forms } from '../layouts/SettingsLayout'
import * as API from '../api/Api'
import { userStorage } from '../stores/userStorage'

interface Props {
  defaultValues: User
  changeForm: (data: Forms) => void
  onClose: () => void
}

const EditUser: React.FC<Props> = ({defaultValues, changeForm, onClose}) => {
  const { handleSubmit, errors, control } = useUpdateUser({defaultValues})

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: userData }: {data: User} = await API.updateUser(defaultValues.id, data)
      userStorage.setUser(userData)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  })

  const setPassForm = () => {
    // Call the changeForm function with the argument 'password'
    changeForm('password')
  }

  const setAvatarForm = () => {
    // Call the changeForm function with the argument 'password'
    changeForm('avatar')
  }

  return (
    <>
    <h3 className="mb-2">Profile settings</h3>
    <form onSubmit={onSubmit} >
        <div className="inputs">
          <div className="inner">
            <Controller
              control={control}
              name='first_name'
              render={({field}) => (
                <Input
                  label="First Name"
                  name='first_name'
                  control={field}
                  placeholder="First Name"
                  errors={errors}
                  size='medium'
                />
              )}
            />
            <Controller
              control={control}
              name='last_name'
              render={({field}) => (
                <Input 
                  label="Last Name"
                  name='last_name'
                  control={field}
                  placeholder="Last Name"
                  errors={errors}
                  size='medium'
                />
              )}
            />
          </div>
        <Controller
          control={control}
          name='email'
          render={({field}) => (
            <Input
              label="E-mail"
              name='email'
              control={field}
              placeholder="E-mail" 
              errors={errors}
            />
          )}
        />
        <button onClick={setPassForm}>Change password</button>
        <button onClick={setAvatarForm}>Change profile picture</button>
        <div className="modal-footer mt-2">
          <button className='button tertiary' onClick={onClose}>Cancel</button>
          <button className='button primary' type='submit'>Save changes</button>
        </div>
        </div>
      </form>
      </>
  )
}

export default EditUser