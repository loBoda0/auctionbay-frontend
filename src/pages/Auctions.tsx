import React, { useEffect, useState } from 'react'
import HomeLayout from '../layouts/HomeLayout'
import AuctionsContainer from '../containers/AuctionsContainer'
import * as API from '../api/Api'
import { Auction } from '../interfaces/auction'
import EmptyState from '../components/EmptyState'

const Auctions: React.FC = () => {
  const [data, setData] = useState<Auction[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: receivedData }: {data: Auction[]} = await API.fetchAuctions();
        setData(receivedData);
        setIsFetching(false);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <HomeLayout>
      <div className='title'>
        <h1>Auctions</h1>
      </div>
      {isFetching ? (
        <h1>Loading...</h1>
      ) : (
        data.length === 0 ? <EmptyState type='auctions'/> :
        <AuctionsContainer auctions={data} />
        )
      }
    </HomeLayout>
  )
}

export default Auctions