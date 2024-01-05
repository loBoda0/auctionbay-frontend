import React, { useEffect, useState } from 'react'
import HomeLayout from '../layouts/HomeLayout'
import AuctionsContainer from '../containers/AuctionsContainer'
import * as API from '../api/Api'
import { Auction } from '../interfaces/auction'

const Auctions: React.FC = () => {
  const [data, setData] = useState<Auction[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: receivedData }: {data: Auction[]} = await API.fetchAuctions();
        console.log('Fetching data', receivedData);
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
        <AuctionsContainer auctions={data} />
        )
      }
    </HomeLayout>
  )
}

export default Auctions