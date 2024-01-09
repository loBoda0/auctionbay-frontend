import React from 'react'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { User } from '../interfaces/user'
import { Controller } from 'react-hook-form'
import Input from './ui/Input'
import { Forms } from '../layouts/SettingsLayout'

interface Props {
  defaultValues: User
  changeForm: (data: Forms) => void
  onClose: () => void
}

const EditUser: React.FC<Props> = ({defaultValues, changeForm, onClose}) => {
  const { handleSubmit, errors, control } = useUpdateUser({defaultValues})

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  const setPassForm = () => {
    // Call the changeForm function with the argument 'password'
    changeForm('password');
  }

  return (
    <form onSubmit={onSubmit} >
        <div className="inputs">
          <div className="inner">
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
        <button onClick={setPassForm}>Change password</button>
        <div className="modal-footer">
          <button className='button tertiary' onClick={onClose}>Cancel</button>
          <button className='button primary' type='submit'>Save changes</button>
        </div>
        </div>
      </form>
  )
}

export default EditUser