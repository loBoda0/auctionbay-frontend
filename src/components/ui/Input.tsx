import clsx from 'clsx'
import React from 'react'

import '../../styles/input.scss'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password'

export type InputProps = {
  id: string
  name: string
  label: string
  placeholder: string
  type?: InputType
  size?: InputSize
  className?: string,
  register: UseFormRegister<FieldValues>;
} 

const Input: React.FC<InputProps> = (
  (
    {
      id,
      name,
      label,
      type = 'text',
      size = 'large',
      placeholder,
      register,
      ...props
    }
  ) => {
    return (
      <div className={clsx('input-wrapper', size)}>
        <label htmlFor={name} className='input-label'>
          {label}
        </label>
        <input
          id={id}
          {...register(name)}
          type={type}
          aria-label={label}
          placeholder={placeholder}
          className='input'
          {...props}
        />
      </div>
    )
  }
)

export default Input
