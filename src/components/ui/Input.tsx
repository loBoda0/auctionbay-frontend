import clsx from 'clsx'
import React from 'react'

import '../../styles/input.scss'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password'

export type InputProps = {
  name: string
  label: string
  placeholder: string
  type?: InputType
  size?: InputSize
  className?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
} 

const controllerInput: React.FC<InputProps> = (
  (
    {
      name,
      label,
      type = 'text',
      size = 'large',
      placeholder,
      control,
      errors,
    }
  ) => {
    return (
      <div className={clsx('input-wrapper', size)}>
        <label htmlFor={name} className='input-label'>
          {label}
        </label>
        <input
          type={type}
          aria-label={label}
          placeholder={placeholder}
          className='input'
          {...control}
        />
        {errors[name] && (
        <div>
          {errors[name].message}
        </div>
      )}
      </div>
    )
  }
)

export default controllerInput
