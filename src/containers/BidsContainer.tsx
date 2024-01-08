import React from 'react'
import { Bid } from '../interfaces/bid'
import BidCard from '../components/BidCard'

interface Props {
  bids: Bid[]
}

//For testing purposes
/* 
const testingBids = [
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z",
    updated_at:"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b4d06a85-3f20-4076-85fc-989de3b86091",
    created_at:"2024-01-06T19:25:41.066Z","updated_at":"2024-01-06T19:25:41.066Z",
    bid_amount:300,
    bidder: {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
  {
    id:"b169cd0e-6057-4e78-8681-a9b8a7f44143",
    created_at:"2024-01-06T19:31:05.245Z",
    updated_at:"2024-01-06T19:31:05.245Z",
    bid_amount:300,
    bidder : {
      id:"753b58a8-be1e-4026-a99e-f04b2bcd3505",
      created_at:"2023-12-27T12:09:22.557Z",
      updated_at:"2023-12-27T12:09:22.557Z",
      email:"test2@test.com",
      first_name:"Martin",
      last_name:"Loboda",
      avatar:null
    }
  },
] 
*/

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