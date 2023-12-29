import React, { useEffect, useState } from 'react'
import HomeLayout from '../layouts/HomeLayout'
import { useAuth } from '../hooks/useAuth'
import AuctionsContainer from '../containers/AuctionsContainer'
import { Auction } from '../interfaces/auction'
import axios from 'axios'

const Profile: React.FC = () => {
  const { token, user } = useAuth()
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (!token) {
      return
    }
  
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auctions?type=auctioner`,
          {
            withCredentials: true
          }
        );
  
        if (!signal.aborted) {
          setAuctions(response.data)
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error(error);
        }
      }
    })();
  
    return () => {
      // Cancel the request when the component unmounts
      abortController.abort();
    };
  }, [token]);

  return (
    <HomeLayout>
      <div className='title'>
        <h1>Hello {user?.first_name} {user?.last_name}!</h1>
      </div>
      
      <AuctionsContainer auctions={auctions} />
    </HomeLayout>
  )
}

export default Profile