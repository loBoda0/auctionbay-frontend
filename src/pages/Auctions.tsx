import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import HomeLayout from '../layouts/HomeLayout'
import axios from 'axios'
import AuctionsContainer from '../containers/AuctionsContainer'
import { Auction } from '../interfaces/auction'

const Auctions: React.FC = () => {
  const { token } = useAuth()
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
          `http://localhost:3000/auctions`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
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
        <h1>Auctions</h1>
      </div>
      <AuctionsContainer auctions={auctions} />
    </HomeLayout>
  )
}

export default Auctions