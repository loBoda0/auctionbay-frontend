import AuthImage from '/auth-image.svg'
import logo from '/logo.svg'
import '../styles/auth.scss'
import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

interface ComponentProps {
  children: ReactNode
}

const AuthLayout: React.FC<ComponentProps> = ({children}) => {
  const { pathname } = useLocation()

  return (
    <div className='page-wrapper'>
      <div className='image'>
        <img src={AuthImage} alt="Placeholder image" />
      </div>
      <div className='auth-right'>
        <img src={logo} alt="logo" className='logo' />
        {children}
        <div className='auth-footer'>
        {pathname == '/signup'? 
          <>
            <p>Already have an account?</p>
            <Link className='text-wrapper' to={'/login'}>
              Log in
            </Link>
          </> : 
          null
        }
        {pathname === '/login'? 
          <>
            <p>Don't have an account?</p>
            <Link className='text-wrapper' to={'/signup'}>
              Sign Up
            </Link>
          </> :
          null
        }
          </div>
      </div> 
    </div>
  )
}

export default AuthLayout