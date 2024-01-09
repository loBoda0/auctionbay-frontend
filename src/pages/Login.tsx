import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Input, { InputType } from '../components/ui/Input'
import { Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUserFields, useLoginForm } from '../hooks/react-hook-form/useLoginForm'
import axios, { AxiosError } from 'axios'
import * as API from '../api/Api'
import { userStorage } from '../stores/userStorage'

const Login: React.FC = () => {
  const { handleSubmit, errors, control } = useLoginForm()
  const navigate = useNavigate()
  const [togglePassword, setTogglePassword] = useState<InputType>('password')
  
  const showPassword = () => {
    setTogglePassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  };
  
  
  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    try {
      const { data: userData } = await API.login(data)
      userStorage.setUser(userData)
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
        <div className="auth-title">
          <h1>Welcome back!</h1>
          <p>Please enter your details</p>
        </div>
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
        <Link to={'/forgot-password'} className='forgot-password'>Forgot password?</Link>
        <button className='button primary' type='submit'>Login</button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login