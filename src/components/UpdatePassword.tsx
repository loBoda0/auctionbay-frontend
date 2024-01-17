import React, { useState } from 'react'
import { useUpdatePassword } from '../hooks/useUpdatePassword'
import { Controller } from 'react-hook-form'
import Input, {InputType} from './ui/Input'
import * as API from '../api/Api'

interface Props {
  userId: string
  onClose: () => void
}

const UpdatePassword: React.FC<Props> = ({userId, onClose}) => {
  const [togglePassword, setTogglePassword] = useState<InputType>('password')
  const [toggleNewPassword, setToggleNewPassword] = useState<InputType>('password')
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState<InputType>('password')
  const { handleSubmit, errors, control } = useUpdatePassword()

  const showPassword = () => {
    setTogglePassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  }

  const showNewPassword = () => {
    setToggleNewPassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  }

  const showConfirmPassword = () => {
    setToggleConfirmPassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  }
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: resData } = await API.updateUser(userId, data)
      console.log(resData)
      if (resData.error) {
        // TODO: display error message to user
        console.log(resData.error)
      }
      else {
        alert('Password updated successfully')
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <h3 className="mb-2">Change password</h3>
      <form onSubmit={onSubmit} >
        <div className="inputs">
          <Controller
            control={control}
            name='password'
            render={({field}) => (
              <Input
                type={togglePassword}
                label="Password"
                name='password'
                placeholder="Password"
                control={field}
                errors={errors}
                togglePassword={showPassword}
              />
            )}
          />
          <Controller
            control={control}
            name='new_password'
            render={({field}) => (
              <Input
                type={toggleNewPassword}
                label="Password"
                name='password'
                placeholder="Password"
                control={field}
                errors={errors}
                togglePassword={showNewPassword}
              />
            )}
          />
          <Controller
            control={control}
            name='confirm_password'
            render={({field}) => (
              <Input
                type={toggleConfirmPassword}
                label="Repeat password"
                name='repeat_password'
                placeholder="Repeat password"
                control={field}
                errors={errors}
                togglePassword={showConfirmPassword}
              />
            )}
          />
        </div>
        <div className="modal-footer mt-2">
          <button className='button tertiary' onClick={onClose}>Cancel</button>
          <button className='button primary' type='submit'>Save changes</button>
        </div>
      </form>
      </>
  )
}

export default UpdatePassword