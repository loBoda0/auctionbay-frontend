import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { Auction } from '../interfaces/auction'
import { userStorage } from '../stores/userStorage'
import NoImage from '/no-image.svg'
import Trash from '/icons/Delete.svg'
import Edit from '/icons/Edit.svg'
import * as API from '../api/Api'

import '../styles/auction-card.scss'
import clsx from 'clsx'
import Modal from './ui/Modal'
import AddEditAuction from './AddEditAuction'
import { useNavigate } from 'react-router-dom'
import Time from '/icons/Time.svg'

interface AuctionProps {
  auction: Auction
  removeAuction: (auctionId: string) => void
}

const AuctionCard: React.FC<AuctionProps> = ({auction, removeAuction}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const user = userStorage.getUser()
  const navigate = useNavigate()
  let biddigState = {
    style: 'in-progress',
    text: 'In progress'
  }

  if(auction.winner && auction.winner.id === user?.id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    biddigState = {
      style: 'winning',
      text: 'Winning'
    }
  else {
    auction.bids.forEach(bid => {
      if (bid.bidder.id === user?.id) {
        biddigState = {
          style: 'danger',
          text: 'Outbid'
        }
      }
    })
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  
  const getRemaining = useCallback(() => {
    const currentDate = new Date();
    const endDate = new Date(auction.end_date);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    return Math.max(0, timeDiff);
  }, [auction.end_date]);
  
  useEffect(() => {    
    setTimeRemaining(getRemaining())
  }, [getRemaining])
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const auctionImg = `http://localhost:3000/public/${auction.image}`

  const onDelete = async () => {
    try {
      await API.removeAuction(auction.id)
      removeAuction(auction.id)
    } catch (error) {
      console.log(error)
    }
  }

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={clsx('auction-card', auction.auctioner.id === user?.id ? 'is-editable' : null)} onClick={() => navigate(`/auctions/${auction.id}`)}>
        <div className="auction-header">
          <div className="auction-info">
            {
              timeRemaining !== 0 ?
              <div className={clsx("tag-s", biddigState.style)}>
                <p>{biddigState.text}</p>
              </div> : <div className="tag-s done">
                <p>Done</p>
              </div> 
            }
            {
              days ? 
                <div className="tag-s">
                  <p>{days} days</p>
                  <img src={Time} alt="time" />
                </div> 
              : timeRemaining !== 0 && <div className="tag-s danger">
                  <p>{hours}h</p>
                  <img src={Time} alt="time" />
                </div>
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
          <img src={auction.image ? auctionImg : NoImage} alt="" />
          {auction.auctioner.id == user?.id ? 
            <div className="auction-edit"  onClick={stopPropagation}>
              <button className='button tertiary' onClick={onDelete} >
                <img src={Trash} alt="Delete" />
              </button>
              <button className='button secondary' onClick={openModal} > 
                <img src={Edit} alt="" /> Edit
              </button>
            </div> : 
            null
          }

        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <AddEditAuction isEdit={true} onClose={closeModal} defaultValues={auction} />
      </Modal>
    </>
  )
}

export default AuctionCard