import React from 'react'
import { Auction } from '../interfaces/auction'
import { userStorage } from '../stores/userStorage'
import NoImage from '/no-image.svg'
import Trash from '/icons/Delete.svg'
import Edit from '/icons/Edit.svg'

import '../styles/auction-card.scss'
import clsx from 'clsx'

interface AuctionProps {
  auction: Auction
}

const AuctionCard: React.FC<AuctionProps> = ({auction}) => {
  const user = userStorage.getUser()
  
  const currentDate = new Date()

  const auctionStatus = new Date(auction.end_date) >= currentDate

  return (
    <div className={clsx('auction-card', auction.auctioner === user?.id ? 'is-editable' : null)}>
      <div className="auction-header">
        <div className="auction-info">
          {auctionStatus ? 
            <>
              <p>In Progress</p>
              <p>24h</p>
            </>
            : <p>Done</p>
          }
        </div>
        <div className="auction-title">
          {auction.title}
        </div>
        <div className="auction-price">
          {auction.starting_price} €
        </div>
      </div>
      <div className="auction-body">
        <img src={auction.image ? auction.image : NoImage} alt="" />
        {auction.auctioner == user?.id ? 
          <div className="auction-edit">
            <button className='button tertiary'>
              <img src={Trash} alt="Delete" />
            </button>
            <button className='button secondary'> <img src={Edit} alt="" /> Edit</button>
          </div> : 
          null
        }
        
      </div>
    </div>
  )
}

export default AuctionCard