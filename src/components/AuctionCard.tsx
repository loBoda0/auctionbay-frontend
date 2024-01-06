import React, { MouseEventHandler, useState } from 'react'
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

interface AuctionProps {
  auction: Auction
  removeAuction: (auctionId: string) => void
}

const AuctionCard: React.FC<AuctionProps> = ({auction, removeAuction}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const user = userStorage.getUser() 
  
  const currentDate = new Date()
  const auctionStatus = new Date(auction.end_date) >= currentDate

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
      <div className={clsx('auction-card', auction.auctioner === user?.id ? 'is-editable' : null)} onClick={() => navigate(`/auctions/${auction.id}`)}>
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
          <img src={auction.image ? auctionImg : NoImage} alt="" />
          {auction.auctioner == user?.id ? 
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
      <Modal isOpen={isModalOpen} onClose={closeModal} key={auction.id}>
        <AddEditAuction isEdit={true} onClose={closeModal} defaultValues={auction} />
      </Modal>
    </>
  )
}

export default AuctionCard