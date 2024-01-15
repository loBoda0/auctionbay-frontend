import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Auctions from './pages/Auctions';
import Profile from './pages/Profile';
import Signup from './pages/Register';
import Auction from './pages/Auction';
import ResetPassword from './pages/ResetPassword';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/auctions' element={<Auctions />} />
      <Route path='/auctions/:id' element={<Auction />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/reset-password/:id' element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App
