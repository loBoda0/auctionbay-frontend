import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export interface LoginUserFields {
  email: string
  password: string
}

export const useLoginForm = () =>{
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      /* .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      ) */
      .required(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
  })

  return {
    handleSubmit,
    errors,
    control
  }
}