import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import * as API from '../api/Api'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      email
    }
    API.forgottenPassword(data)
  }
  
  return (
    <AuthLayout>
        
      <form onSubmit={handleSubmit}>
        <div className="auth-title mb-2">
          <h1>Forgot password?</h1>
          <p>No worries, we will send you reset insturctions</p>
        </div>
        <div className="inputs">
          <div className="input-wrapper">
            <label htmlFor="email" className='input-label'>Email</label>
            <div className="input">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>
        <button
          type="submit"
          value="Submit"
          className="button primary">
          Submit
        </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword