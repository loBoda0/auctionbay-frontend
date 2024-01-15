import React, { useState } from 'react'
import { Auction } from '../interfaces/auction'
import '../styles/auctions.scss'
import AuctionCard from '../components/AuctionCard'

interface ChildProps {
    auctions: Auction[]
}

const AuctionsContainer: React.FC<ChildProps> = ({ auctions: initialAuctions }) => {
  const [auctions, setAuctions] = useState(initialAuctions)
  
  const handleRemoveAuction = (auctionId: string) => {
    // Filter out the auction with the specified ID
    const updatedAuctions = auctions.filter((auction) => auction.id !== auctionId);
    // Update the state with the modified array
    setAuctions(updatedAuctions);
  };

  const sortedAuctions = auctions.slice().sort((a, b) => {
    const dateA = new Date(a.end_date).getTime();
    const dateB = new Date(b.end_date).getTime();
    return dateB - dateA;
  });

  return (
    <div className='auctions-wrapper'>
      {sortedAuctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} removeAuction={handleRemoveAuction} />
      ))}
    </div>
  )
}

export default AuctionsContainer