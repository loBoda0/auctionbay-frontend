import React, { useEffect, useState } from 'react'
import { Bid } from '../interfaces/bid'
import Avatar from '/Avatar.svg'
import Eur from '/icons/Eur.svg'

import '../styles/bid-card.scss'

interface Props {
  bid: Bid
}

const BidCard: React.FC<Props> = ({bid}) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const dateObject = new Date(bid.created_at);

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour12: false, // Use 24-hour clock
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(dateObject);

    const formattedTime = `${parts[6].value}:${parts[8].value}`;
    const formattedDate = `${formattedTime} ${parts[2].value}.${parts[0].value}.${parts[4].value}`;
    
    setFormattedDate(formattedDate);
  }, [bid.created_at]);
  
  const bidderImg = `http://localhost:3000/public/${bid.bidder.avatar}`

  return (
    <div className='bid-item'>
      <div className="bidder-data">
        <img src={bid.bidder.avatar ? bidderImg : Avatar} alt="avatar" className='avatar' />
        <p>{bid.bidder.first_name} {bid.bidder.last_name}</p>
      </div>
      <p>{formattedDate}</p>
      <div className="price">
        {bid.bid_amount} <img src={Eur} alt="€" />
      </div>
    </div>
  )
}

export default BidCard