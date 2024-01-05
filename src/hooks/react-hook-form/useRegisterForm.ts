import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export interface RegisterUserFields {
  first_name: string | undefined
  last_name: string | undefined
  email: string
  password: string
  confirm_password: string
}

export const useRegisterForm = () =>{
  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name'),
    last_name: Yup.string().required('Please enter your last name'),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      /* .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      ) */
      .required(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Passwords do not match'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(RegisterSchema),
  })

  return {
    handleSubmit,
    errors,
    control
  }
}