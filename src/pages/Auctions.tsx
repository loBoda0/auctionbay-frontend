import React, { useEffect, useState } from 'react'
import HomeLayout from '../layouts/HomeLayout'
import AuctionsContainer from '../containers/AuctionsContainer'
import * as API from '../api/Api'
import { Auction } from '../interfaces/auction'
import EmptyState from '../components/EmptyState'

const Auctions: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: Auction[] } = await API.fetchAuctions()
        setAuctions(data)
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error)
      }
    }
  
    fetchData()
  }, [])
  
  

  return (
    <HomeLayout>
      <div className='title'>
        <h1>Auctions</h1>
      </div>
      {!auctions ? (
        <h1>Loading...</h1>
      ) : (
        auctions.length === 0 ? <EmptyState type='auctions'/> :
        <AuctionsContainer auctions={auctions} />
        )
      }
    </HomeLayout>
  )
}

export default Auctions