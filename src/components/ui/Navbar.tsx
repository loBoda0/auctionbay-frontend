
import logo from '/logo.svg'
import CTAButton from '/CTA Button.svg'
import Avatar from '/Avatar.svg'
import Home from '/icons/Home.svg'
import Person from '/icons/Person.svg'
import '../../styles/navigation.scss'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useAuth } from '../../hooks/useAuth'

const Navbar: React.FC = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const avatarImg = `http://localhost:3000/public/${user?.avatar}`

  return (
    <nav>
      <div className='nav-left'>
          <img src={logo} alt="logo" className='logo' />
          <div className="nav-tabs">
            <Link to={'/auctions'} className={clsx('nav-tab', pathname === '/auctions' ? 'active' : null)}>
              <img src={Home} alt="home" />
              Auctions
            </Link>
            <Link to={'/profile'} className={clsx('nav-tab', pathname === '/profile' ? 'active' : null)}>
              <img src={Person} alt="profile" />
              Profile
            </Link>
          </div>
        </div>
        
        <div className='nav-right'>
          <div className="nav-tabs">
            <button>
              <img src={CTAButton} alt="add auction" className='button-img' />
            </button>
            <button>
              <img src={user?.avatar ? avatarImg : Avatar} alt="avatar" className='button-img' />
            </button>
          </div>
        </div>
    </nav>
  )
}

export default Navbar