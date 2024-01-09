import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { User } from '../interfaces/user'

export interface UpdateUserFields {
  first_name: string | undefined
  last_name: string | undefined
  email: string
}

type Props = {
  defaultValues: User | null
}

export const useUpdateUser = ({defaultValues}: Props) =>{
  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name'),
    last_name: Yup.string().required('Please enter your last name'),
    email: Yup.string().email().required('Please enter a valid email'),
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
      ...defaultValues
    },
    mode: 'onSubmit',
    resolver: yupResolver(UpdateUserSchema),
  })

  return {
    handleSubmit,
    errors,
    control
  }
}