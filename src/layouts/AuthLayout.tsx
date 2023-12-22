import { PassChildren } from '../interfaces'
import AuthImage from '/auth-image.svg'
import '../styles/auth.scss'

const AuthLayout: React.FC<PassChildren> = ({children}) => {
  return (
    <div className='page-wrapper'>
      <div className='auth-left'>
        <img src={AuthImage} alt="Placeholder image" />
      </div>
      <div className='auth-right'>
        {children}
      </div> 
    </div>
  )
}

export default AuthLayout