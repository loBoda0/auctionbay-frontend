import React from 'react'
import { Bid } from '../interfaces/bid'
import BidCard from '../components/BidCard'

interface Props {
  bids: Bid[]
}

const BidsContainer: React.FC<Props> = ({bids}) => {
  return (
    <div className='bids-container'>
      {
        bids?.sort((a, b) => b.bid_amount - a.bid_amount).map((bid) => (
          <BidCard key={bid.id} bid={bid} />)
        )
      }
    </div>
  )
}

export default BidsContainer