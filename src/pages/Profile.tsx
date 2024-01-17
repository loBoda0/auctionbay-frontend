import React, { useEffect, useState } from 'react'
import HomeLayout from '../layouts/HomeLayout'
import AuctionsContainer from '../containers/AuctionsContainer'
import * as API from '../api/Api'
import { userStorage } from '../stores/userStorage'
import clsx from 'clsx'
import { Auction } from '../interfaces/auction'
import EmptyState from '../components/EmptyState'

type Types = 'my' | 'bidding' | 'won'

const Profile: React.FC = () => {
  const user = userStorage.getUser()
  const [type, setType] = useState<Types>('my')
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      try {
        const { data: receivedData }: {data: Auction[]} = await API.fetchAuctionsByUser(type)
        setAuctions(receivedData)
        setIsFetching(false)
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error)
      }
    }
  
    fetchData()
  }, [type])

  return (
    <HomeLayout>
      <div className='title'>
        <h1>Hello {user?.first_name} {user?.last_name}!</h1>
      </div>
      <div className="profile-tabs-wrapper">
        <div className="profile-tabs">
          <button className={clsx('profile-tab', type === 'my' && 'active')} onClick={() => setType('my')}>My Auctions</button>
          <button className={clsx('profile-tab', type === 'bidding' && 'active')} onClick={() => setType('bidding')}>Bidding</button>
          <button className={clsx('profile-tab', type === 'won' && 'active')} onClick={() => setType('won')}>Won</button>
        </div>
      </div>
      {isFetching ? (
        <h1>Loading...</h1>
      ) : (
        auctions.length === 0 ? <EmptyState type={type}/> :
        <AuctionsContainer auctions={auctions} />
      )
      }
    </HomeLayout>
  )
}

export default Profile