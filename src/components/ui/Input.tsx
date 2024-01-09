import clsx from 'clsx'
import React from 'react'
import Eye from '/icons/Eye.svg'
import Time from '/icons/Time.svg'
import Eur from '/icons/Eur.svg'

import '../../styles/input.scss'

export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password' | 'date' | 'number' | 'textbox'

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
  togglePassword?: () => void 
} 

const Input: React.FC<InputProps> = (
  (
    {
      name,
      label,
      type = 'text',
      size = 'large',
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
        {
          type === 'textbox' ? <textarea 
            {...control} 
            aria-label={label}
            placeholder={placeholder}
          /> : 
        <input
          {...control}
          type={type}
          aria-label={label}
          placeholder={placeholder}
        />
        }
        {togglePassword && <img src={Eye} alt="toggle password" onClick={togglePassword} className='input-img' />}
        {type === 'number' && <img src={Eur} alt="toggle password" className='input-img' />}
        {type === 'date' && <img src={Time} alt="toggle password" className='input-img' />}
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
