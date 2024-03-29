import React from 'react'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'
import '../styles/home.scss'
import landingImage from '/landing-image.svg'
import landingMobile from '/mobile-image.svg'

const Home: React.FC = () => {
  return (
    <>
      <nav>
        <img src={logo} alt="logo" className='logo' />
        
        <div className='actions'>
          <Link to={'/login'} className='text-wrapper'>Log in</Link>
          <p>or</p>
          <Link to={'/signup'} className='button secondary'>
              Sign Up
          </Link>
        </div>
      </nav>
      <div className="home-wrapper">
        <div className='home-title'>
          <h1>
            E-auctions made easy!
          </h1>
          <p>
            Simple way for selling your unused products, or getting a deal on product you want!
          </p>
        </div>
        <Link to={'/signup'} className='button primary'>Start bidding</Link>

        <picture>
          <source media='(max-width: 450px)' srcSet={landingMobile} />
          <source media='(min-width: 450px)' srcSet={landingImage} />
          <img src={landingImage} alt='hero' />
        </picture>
      </div>
    </>
  )
}

export default Home