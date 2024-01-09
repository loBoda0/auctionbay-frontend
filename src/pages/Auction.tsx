import React, { useEffect, useState } from 'react'
import { Auction } from '../interfaces/auction'
import * as API from '../api/Api'
import { useParams } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout'
import EmptyState from '../components/EmptyState'
import BidsContainer from '../containers/BidsContainer'
import { CreateBidFields, useCreateBid } from '../hooks/useCreateBid'
import { Controller } from 'react-hook-form'
import { Bid } from '../interfaces/bid'

import NoImage from '/no-image.svg'
import Time from '/icons/Time.svg'
import clsx from 'clsx'
import { userStorage } from '../stores/userStorage'

const AuctionPage:React.FC = () => {
  const [data, setData] = useState<Auction | null>(null)
  const [minValue, setMinValue] = useState<number>(0)
  const [bids, setBids] = useState<Bid[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()
  const { id } = useParams<{ id: string }>()
  const { handleSubmit, control, setValue } = useCreateBid()
  const user = userStorage.getUser()

  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  let biddigState = {
    style: 'in-progress',
    text: 'In progress'
  }

  if(data?.winner.id === user?.id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    biddigState = {
      style: 'winning',
      text: 'Winning'
    }
  else {
    data?.bids.forEach(bid => {
      if (bid.bidder.id === user?.id) {
        biddigState = {
          style: 'danger',
          text: 'Outbid'
        }
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.getAuctionById(id);
        if (data.error) {
          setErrorMessage(data.message)
        }
        else {
          setData(data)
          setBids(data.bids)
          setTimeRemaining(getRemaining(data))
        }
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id])

    
  function getRemaining(data: Auction) {
    const currentDate = new Date()
    const endDate = new Date(data?.end_date)
    console.log(endDate)
    const timeDiff = endDate.getTime() - currentDate.getTime()
    return timeDiff
  }
  
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const backgroundImageStyle = {
    backgroundImage: data?.image
      ? `url(http://localhost:3000/public/${data.image})`
      : `url(${NoImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  useEffect(() => {
    if (!bids) {
      return
    }
    setBids(bids)
    if (data) {
      const highestBid = bids.reduce((maxBid, currentBid) => {
        return currentBid.bid_amount > maxBid ? currentBid.bid_amount : maxBid;
      }, data?.starting_price);
      setValue("bid_amount", highestBid)
      setMinValue(highestBid + 1)
    }
  }, [bids, data, setValue])
  

  const onSubmit = handleSubmit(async(data: CreateBidFields) => {
    const { data: newBid } = await API.placeBid(id!, data)
    if (newBid) {
      setBids(prevBids => [...prevBids, newBid])
    }
  })
  
  return (
    <HomeLayout>
      {
        errorMessage && <p>{errorMessage}</p>
      }
      {
        data && bids ? <div className="inner">
        <div className="split" style={backgroundImageStyle}>
        </div>
        <div className="split">
          <div className="auction-content">
            <div className="meta-bar">
            {
              timeRemaining !== 0 ?
              <div className={clsx("tag", biddigState.style)}>
                <p>{biddigState.text}</p>
              </div> : <div className="tag done">
                <p>Done</p>
              </div> 
            }
            {
              timeRemaining !== 0 && days ? 
                <div className="tag">
                  <p>{days} days</p>
                  <img src={Time} alt="time" />
                </div> 
              : <div className="tag danger">
                  <p>{hours}h</p>
                  <img src={Time} alt="time" />
                </div>
            }
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
                    min={minValue}
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
      </div> : !errorMessage && <h1>Loading...</h1>
      }
    </HomeLayout>
  )
}

export default AuctionPage