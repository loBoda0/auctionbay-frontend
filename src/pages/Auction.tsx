import React, { useEffect, useState } from 'react'
import { Auction } from '../interfaces/auction'
import * as API from '../api/Api'
import { useParams } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout'
import NoImage from '/no-image.svg'
import EmptyState from '../components/EmptyState'
import BidsContainer from '../containers/BidsContainer'
import { CreateBidFields, useCreateBid } from '../hooks/useCreateBid'
import { Controller } from 'react-hook-form'
import { Bid } from '../interfaces/bid'

const AuctionPage:React.FC = () => {
  const [data, setData] = useState<Auction | null>(null)
  const [bids, setBids] = useState<Bid[]>([])
  const [minBid, setMinBid] = useState<number | undefined>(0)
  const { id } = useParams<{ id: string }>()
  const { handleSubmit, errors, control } = useCreateBid()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.getAuctionById(id);
        setData(data)
        setBids(data.bids)
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
  }

  useEffect(() => {
    setBids(bids)
    if (data) {
      const highestBid = bids.reduce((maxBid, currentBid) => {
        return currentBid.bid_amount > maxBid ? currentBid.bid_amount : maxBid;
      }, data?.starting_price);
      setMinBid(highestBid)
    }
  }, [bids, data])
  

  const onSubmit = handleSubmit(async(data: CreateBidFields) => {
    const { data: newBid } = await API.placeBid(id!, data)
    if (newBid) {
      setBids(prevBids => [...prevBids, newBid])

    }
  })
  
  return (
    <HomeLayout>
      {
        data && bids ? <div className="inner">
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
            <form className="action-bar" onSubmit={onSubmit}>
              <Controller
                control={control}
                name='bid_amount'
                render={({field}) => (
                  <>
                  <label htmlFor="bid">Bid:</label>
                  <input
                    {...field}
                    type="number"
                    className='small-input'
                    placeholder={String(minBid + 1)}
                    min={minBid + 1}
                  />
                  </>
                )}
              />
              <button className='button primary'>Place bid</button>
            </form>
          </div>
          <div className="auction-content biders">
            <h1>Bidding history({data.bids.length})</h1>
            {
              data.bids.length === 0 ? <EmptyState type='bidders' /> :
              <BidsContainer bids={bids} />
            }
          </div>
        </div>
      </div> : <h1>Loading...</h1>
      }
    </HomeLayout>
  )
}

export default AuctionPage