import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Input, { InputType } from '../components/ui/Input'
import { Controller } from 'react-hook-form'
import * as API from '../api/Api'
import { RegisterUserFields, useRegisterForm } from '../hooks/react-hook-form/useRegisterForm'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup: React.FC = () => {
  const { handleSubmit, errors, control } = useRegisterForm()
  const navigate = useNavigate()

  const [togglePassword, setTogglePassword] = useState<InputType>('password')
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState<InputType>('password')
  
  const showPassword = () => {
    setTogglePassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  };

  const showConfirmPassword = () => {
    setToggleConfirmPassword((prevToggle) => (prevToggle === 'password' ? 'text' : 'password'))
  }

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    try {
      await API.register(data)
      navigate('/login')
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
          <div className="inter">
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
              isPassword={true}
              togglePassword={showPassword}
            />
          )}
        />
        <Controller
          control={control}
          name='confirm_password'
          render={({field}) => (
            <Input
              type={toggleConfirmPassword 	}
              label="Repeat password"
              name='repeat_password'
              placeholder="Repeat password"
              control={field}
              errors={errors}
              isPassword={true}
              togglePassword={showConfirmPassword}
            />
          )}
        />
        <button className='button primary' type='submit'>Submit Form</button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Signup