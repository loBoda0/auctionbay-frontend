import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/ui/Input'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: userData } = await axios.post('http://localhost:3000/login', data)
      login(userData[0], userData[1])
      navigate('/auctions')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          // Handle BadRequestException
          console.log(axiosError.response.data)
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
        <Input
          id="email"
          type="email"
          name="email"
          label="E-mail"
          placeholder="E-mail"
          register={register}
          />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          register={register}
        />
        <button className='button primary' type='submit'>Submit Form</button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login