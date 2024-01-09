
import logo from '/logo.svg'
import CTAButton from '/CTA Button.svg'
import Avatar from '/Avatar.svg'
import Home from '/icons/Home.svg'
import Person from '/icons/Person.svg'
import '../../styles/navigation.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { userStorage } from '../../stores/userStorage'
import { useEffect, useRef, useState } from 'react'

import Settings from '/icons/Settings.svg'

interface Props {
  openModal: () => void
  openSettings: () => void
}

const Navbar: React.FC<Props> = ({openModal, openSettings}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [toggleMenu, setToggleMenu] = useState(false)
  const user = userStorage.getUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const avatarImg = `http://localhost:3000/public/${user?.avatar}`

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      handleOpenMenu();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!user) {
    navigate('/')
  }

  const logOut = () => {
    userStorage.clearUser()
    navigate('/')
  }

  const handleOpenMenu = () => {
    setToggleMenu((prevValue) => !prevValue)
  }

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
              <img src={CTAButton} alt="add auction" onClick={openModal} className='button-img' />
            </button>
            <button>
              <img src={user?.avatar ? avatarImg : Avatar} alt="avatar" onClick={handleOpenMenu} className='button-img' />
            </button>
            {
              toggleMenu && <div className='menu'  ref={wrapperRef} onClick={handleOpenMenu}>
                <button className='button' onClick={openSettings}><img src={Settings} alt="settings" />Profile settings</button>
                <button onClick={logOut} className='button tertiary'>Log out</button>
              </div>
            }
          </div>
        </div>
    </nav>
  )
}

export default Navbar