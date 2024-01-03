import React from 'react'
import HomeLayout from '../layouts/HomeLayout'
import AuctionsContainer from '../containers/AuctionsContainer'
import { useQuery } from 'react-query'
import * as API from '../api/Api'

const Auctions: React.FC = () => {
  const { data, isFetching } = useQuery(
    ['fetchAuctions'],
    () => API.fetchAuctions()
  )

  return (
    <HomeLayout>
      <div className='title'>
        <h1>Auctions</h1>
      </div>
      {isFetching ? (
        <h1>Loading...</h1>
      ) : (
        <AuctionsContainer auctions={data.data} />
      )
      }
    </HomeLayout>
  )
}

export default Auctions