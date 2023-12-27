import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/ui/Input'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const serverData = await axios.post('http://localhost:3000/signup', data)
      console.log(serverData)
      navigate('/login')
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
          <div className="inter">
            <Input
              id="firstName"
              name="first_name"
              label="First Name"
              placeholder="First Name"
              size='medium'
              register={register}
              />
            <Input
              id="lastName"
              name="last_name"
              label="Last Name"
              placeholder="Last Name"
              size='medium'
              register={register}
              />
          </div>
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
        <Input
          id="repeatPassword"
          type="password"
          name="repeat_password"
          label="Repeat password"
          placeholder="Repeat password"
          register={register}
        />
        <button className='button primary' type='submit'>Submit Form</button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Signup