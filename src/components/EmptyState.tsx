import React from 'react'

type AuctionsPage = 'auctions' | 'my' | 'bidding' | 'won' | 'bidders'

interface EmptyStateProps {
  type: AuctionsPage
}

const EmptyState: React.FC<EmptyStateProps> = ({type}) => {
  let emptyContent

  switch (type) {
    case 'auctions':
      emptyContent = {
        title: 'Oh no, no auctions yet!',
        text: 'To add new auction click "+" button in navigation bar or wait for other users to add new auction.'
      }
      break
    case 'my':
      emptyContent = {
        title: 'Oh no, no auctions added!',
        text: 'To add new auction click “+” button in navigation bar and new auctions will be added here!'
      }
      break
    case 'bidding':
      emptyContent = {
        title: 'No bidding in progress!',
        text: 'Start bidding by finding new items you like on “Auction” page!'
      }
      break
    case 'won':
      emptyContent = {
        title: 'Nothing here yet?',
        text: 'When you win auction items will be displayed here! Go on and bid on your favorite items!'
      }
      break
    case 'bidders':
      emptyContent = {
        title: 'No bids yet!',
        text: 'Place your bid to have a chance to get this item.'
      }
      break
    default:
      emptyContent = {
        title: '',
        text: ''
      }
  }

  return (
    <div className='empty-state'>
      <h3>{emptyContent.title}</h3>
      <p>{emptyContent.text}</p>
    </div>
  )
}

export default EmptyState