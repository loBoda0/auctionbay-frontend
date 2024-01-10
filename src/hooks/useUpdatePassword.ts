import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export interface UpdatePasswordFields {
  password: string
  new_password: string
  confirm_password: string
}

export const useUpdatePassword = () =>{
  const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string()
      /* .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      ) */
      .required(),
    new_password: Yup.string().required(),
    confirm_password: Yup.string().required()
      .oneOf([Yup.ref('new_password')], 'Passwords do not match')
      .required('Passwords do not match'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(UpdatePasswordSchema),
  })

  return {
    handleSubmit,
    errors,
    control
  }
}