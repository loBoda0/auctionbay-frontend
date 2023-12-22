import React from 'react'
import Navbar from '../components/ui/Navbar'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'
import '../styles/home.scss'
import landingImage from '/landing-image.svg'

const Home: React.FC = () => {
  return (
    <>
      <Navbar>
        <div className='nav-left'>
          <img src={logo} alt="logo" />
        </div>
        
        <div className='nav-right'>
          <Link to={'/login'} className='text-wrapper'>Log in</Link>
          <p>or</p>
          <Link to={'/signup'} className='button secondary'>
              Sign Up
          </Link>
        </div>
      </Navbar>
      <div className="home-wrapper">
        <div className="hero-text">
          <h1>
            E-auctions made easy!
          </h1>
          <p>
            Simple way for selling your unused products, or getting a deal on product you want!
          </p>
        </div>
        <Link to={'/signup'} className='button primary bidding'>Start bidding</Link>

        <img src={landingImage} alt="landing image" />
      </div>
    </>
  )
}

export default Home