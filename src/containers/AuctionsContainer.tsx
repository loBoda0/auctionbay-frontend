import React from 'react'
import { Auction } from '../interfaces/auction'
import '../styles/auctions.scss'
import EmptyState from '../components/EmptyState'
import AuctionCard from '../components/AuctionCard'

interface ChildProps {
    auctions: Auction[]
}

const AuctionsContainer: React.FC<ChildProps> = ({ auctions }) => {
  if (auctions.length == 0) {
    return (
      <EmptyState>
        <h3>Oh no, no auctions yet!</h3>
        <p>To add new auction click "+" button in <br /> navigation bar or wait for other users <br /> to add new auction.</p>
      </EmptyState>
    )
  }
  return (
    <div className='auctions-wrapper'>
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  )
}

export default AuctionsContainer