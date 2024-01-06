import React, { useEffect, useState } from 'react'
import { Auction } from '../interfaces/auction'
import * as API from '../api/Api'
import { useParams } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout'
import NoImage from '/no-image.svg'
import EmptyState from '../components/EmptyState'

const AuctionPage:React.FC = () => {
  const [data, setData] = useState<Auction>()
  const [isFetching, setIsFetching] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.getAuctionById(id);
        console.log(data)
        setData(data);
        setIsFetching(false);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id])

  const backgroundImageStyle = {
    backgroundImage: data?.image
      ? `url(http://localhost:3000/public/${data.image})`
      : `url(${NoImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  return (
    <HomeLayout>
      {
        isFetching ? <h1>Loading...</h1> :
        <div className="inner">
          <div className="split" style={backgroundImageStyle}>
          </div>
          <div className="split">
            <div className="auction-content">
              <div className="meta-bar">
                <div className="status">In Progress</div>
                <div className="status">24 h</div>
              </div>
              <h1>{data?.title}</h1>
              <p>{data?.description}</p>
              <form className="action-bar">
                <label htmlFor="bid">Bid:</label>
                <input type="number" className='small-input' value={data?.starting_price} min={data?.starting_price} />
                <button className='button primary'>Place bid</button>
              </form>
            </div>
            <div className="auction-content biders">
              <h1>Bidding history({data?.bids.length})</h1>
              <EmptyState type='bidders' />
            </div>
          </div>
        </div>
        }
    </HomeLayout>
  )
}

export default AuctionPage