import clsx from 'clsx'
import React from 'react'
import Eye from '/icons/Eye.svg'

import '../../styles/input.scss'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password' | 'date'

export type InputProps = {
  name: string
  label: string
  placeholder: string
  type?: InputType
  size?: InputSize
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
  isPassword?: boolean
  togglePassword?: () => void 
} 

const Input: React.FC<InputProps> = (
  (
    {
      name,
      label,
      type = 'text',
      size = 'large',
      isPassword = false,
      placeholder,
      control,
      errors,
      togglePassword
    }
  ) => {
    return (
      <div className={clsx('input-wrapper', size)}>
        <label htmlFor={name} className='input-label'>
          {label}
        </label>
        <div className="input">
        <input
          {...control}
          type={type}
          aria-label={label}
          placeholder={placeholder}
        />
        {isPassword && <img src={Eye} alt="toggle password" onClick={togglePassword} className='pass-toggle' />}
        </div>
        {errors[name] && (
        <div>
          {errors[name].message}
        </div>
      )}
      </div>
    )
  }
)

export default Input
