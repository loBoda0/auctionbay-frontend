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
  const [auction, setAuction] = useState<Auction | null>(null)
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

  if(auction?.winner && auction?.winner.id === user?.id)
    biddigState = {
      style: 'winning',
      text: 'Winning'
    }
  else {
    auction?.bids.forEach(bid => {
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
          setAuction(data)
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
    const timeDiff = endDate.getTime() - currentDate.getTime()
    return Math.max(0, timeDiff);
  }
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const backgroundImageStyle = {
    backgroundImage: auction?.image
      ? `url(http://localhost:3000/public/${auction.image})`
      : `url(${NoImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  useEffect(() => {
    if (!bids) {
      return
    }
    setBids(bids)
    if (auction) {
      const highestBid = bids.reduce((maxBid, currentBid) => {
        return currentBid.bid_amount > maxBid ? currentBid.bid_amount : maxBid;
      }, auction?.starting_price);
      setValue("bid_amount", highestBid)
      setMinValue(highestBid + 1)
    }
  }, [bids, auction, setValue])
  
  const getHighestBidder = () =>{
    return bids.reduce((highestAuctioner, currentAuctioner) => (currentAuctioner.bid_amount > highestAuctioner.bid_amount ? `${currentAuctioner.bidder.first_name} + ${currentAuctioner.bidder.last_name}` : highestAuctioner), `${bids[0].bidder.first_name} ${bids[0].bidder.last_name}`)
  }

  const onSubmit = handleSubmit(async(data: CreateBidFields) => {
    if (auction?.auctioner.id === user?.id) {
      alert("That's your auction, you idiot!")
      return
    }
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
        auction && bids ? <div className="inner">
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
                Done
              </div> 
            }
            {
              days ? 
                <div className="tag">
                  <p>{days} days</p>
                  <img src={Time} alt="time" />
                </div> 
              : timeRemaining !== 0 && <div className="tag danger">
                  <p>{hours}h</p>
                  <img src={Time} alt="time" />
                </div>
            }
            </div>
            <h1>{auction?.title}</h1>
            <p>{auction?.description}</p>
            {
              timeRemaining !== 0 ? 
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
            </form> : 
            <p>The winner is {getHighestBidder()}</p>
            }
          </div>
          <div className="auction-content biders">
            <h1>Bidding history({bids.length})</h1>
            {
              bids.length === 0 ? <EmptyState type='bidders' /> :
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