import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Input, { InputType } from '../components/ui/Input'
import { Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { NewPasswordFields, useNewPassword } from '../hooks/react-hook-form/useNewPassword'
import * as API from '../api/Api'
import axios, { AxiosError } from 'axios'

const ResetPassword: React.FC = () => {
  const { handleSubmit, errors, control } = useNewPassword()
  const { id } = useParams()
  console.log(id)

  const [togglePassword, setTogglePassword] = useState<InputType>('password')
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState<InputType>('password')
  
  const showPassword = () => {
    setTogglePassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  }

  const showConfirmPassword = () => {
    setToggleConfirmPassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  }

  const onSubmit = handleSubmit(async (data: NewPasswordFields) => {
    console.log(data)
    try {
      await API.setNewPassword(id, data)
      /* navigate('/login') */
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 400) {
          // Handle BadRequestException
          console.error(axiosError.response.data)
        } else {
          // Handle other errors
          console.error('Unexpected error:', axiosError.message)
        }
      } else {
        // Handle non-Axios errors
        console.error('Non-Axios error:', error)
      }
    }
  })

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} >
        <div className="auth-title">
          <h1>Create Password</h1>
          <p>Please enter your new password</p>
        </div>
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
        <button className='button primary' type='submit'>Create new password</button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ResetPassword