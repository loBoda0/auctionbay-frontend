import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/ui/Input'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LoginUserFields, useLoginForm } from '../hooks/react-hook-form/useLoginForm'
import axios, { AxiosError } from 'axios'
import * as API from '../api/Api'

const Login: React.FC = () => {
  const { handleSubmit, errors, control } = useLoginForm()
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    try {
      const { data: userData } = await API.login(data)
      console.log(userData[1])
      login(userData[0], userData[1])
      navigate('/profile')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          // Handle BadRequestException
          console.error(axiosError.response.data)
        } else {
          // Handle other errors
          console.error('Unexpected error:', axiosError.message);
        }
      } else {
        // Handle non-Axios errors
        console.error('Non-Axios error:', error);
      }
    }
  })
  return (
    <AuthLayout>
      <form onSubmit={onSubmit} >
        <div className="inputs">
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
        <Controller
          control={control}
          name='password'
          render={({field}) => (
            <Input
              type="password"
              label="Password"
              name='password'
              placeholder="Password"
              control={field}
              errors={errors}
            />
          )}
        />
        <button className='button primary' type='submit'>Submit Form</button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login