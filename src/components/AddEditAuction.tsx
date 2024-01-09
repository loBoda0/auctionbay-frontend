import React, { ChangeEvent, useEffect, useState } from 'react'
import { CreateAuctionFields, useAddEditAuction } from '../hooks/useAddEditAuction'
import Trash from "/icons/Delete.svg";
import { Controller } from 'react-hook-form';
import Input from './ui/Input';
import * as API from '../api/Api'
import axios, { AxiosError } from 'axios';
import { Auction } from '../interfaces/auction';

interface Props {
  defaultValues?: Auction
  isEdit: boolean
  onClose: () => void
}

const AddEditAuction: React.FC<Props> = ({isEdit, onClose, defaultValues}) => {
  const  { handleSubmit, errors, control} = useAddEditAuction({defaultValues})
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const title = isEdit ? 'Edit Auction' : 'Add Auction';
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const { target } = event
    if (target.files && target.files.length > 0) {
      const myfile = target.files[0];
      if(!isFileTypeValid(myfile)) return
      setFile(myfile);
      // set image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(myfile);
    }
  };

  const isFileTypeValid = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  const onSubmit = handleSubmit(async (data: CreateAuctionFields) => {
    if (!isEdit) createAuction(data)
    else {
      updateAuction(data as Auction)
    }
  })

  const createAuction = async (data: CreateAuctionFields) => {
    try {
      const {data: auction, status} = await API.postAuction(data)
      if (status === 201) {
        if (file !== null && file !== undefined) {
          const formData = new FormData()
          formData.append('image', file, file.name);

          await API.auctionUpdateImage(auction.id, formData)
        }
      }
      onClose()
      window.location.reload()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          // Handle BadRequestException
          console.error(axiosError.response.data)
        } else {
          // Handle other errors
          console.error('Unexpected error:', axiosError.message);
        }
      } else {
        // Handle non-Axios errors
        console.error('Non-Axios error:', error);
      }
    }
  }

  const updateAuction = async (data: Auction) => {
    try {
      if (data) {
        const {data: auction, status} = await API.updateAuction(data.id, data)
        if (status === 201) {
          if (file !== null && file !== undefined && defaultValues?.image !== data.image ) {
            const formData = new FormData()
            formData.append('image', file, file.name);
    
            await API.auctionUpdateImage(auction.id, formData)
          }
        }
      }
      onClose()
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          // Handle BadRequestException
          console.error(axiosError.response.data)
        } else {
          // Handle other errors
          console.error('Unexpected error:', axiosError.message);
        }
      } else {
        // Handle non-Axios errors
        console.error('Non-Axios error:', error);
      }
    }
  }

  useEffect(() => {
    if (defaultValues?.image) {
      setImagePreview(
        `http://localhost:3000/public/${defaultValues.image}`
      );
    }
  }, [defaultValues]);

  return (
    <>
      <div className="form-title">
        <h4>{title}</h4>
      </div>
    <form onSubmit={onSubmit}>
      <div className="inputs">
      <div className="modal-image-wrapper">
       <label
        htmlFor="image"
        className="image-label">
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Selected Image"
                width={200}
                height={200}
                className="modal-image"
              />
              {imagePreview && (
                <div
                  className="button secondary remove-image"
                  onClick={() => {
                    setImagePreview(null);
                    setFile(null);
                  }}>
                  <img src={Trash} />
                </div>
              )}
            </>
          ) : (
            <div className="button tertiary">
              Add image
            </div>
          )}
            
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            onInput={handleFileChange}
            className='hidden'
          />
        </label>
      </div>
      <Controller
        control={control}
        name='title'
        render={({field}) => (
          <Input 
            label="Title"
            name='title'
            control={field}
            placeholder="Write item name here"
            errors={errors}
            size='medium'
          />
        )}
      />
      <Controller
        control={control}
        name='description'
        render={({field}) => (
          <Input 
            label="Description"
            name='description'
            control={field}
            placeholder="Write description here..."
            errors={errors}
            size='medium'
            type='textbox'
          />
        )}
      />
        {
          isEdit ?  
          <Controller
            control={control}
            name='end_date'
            render={({field}) => (
              <Input
                label="End date"
                name='end_date'
                control={field}
                placeholder="burek"
                errors={errors}
                size='medium'
                type='date'
              />
            )}
          /> : <div className="inner">
            <Controller
            control={control}
              name='starting_price'
              render={({field}) => (
                <Input
                  label="Starting price"
                  name='starting_price'
                  control={field}
                  placeholder="Price"
                  errors={errors}
                  size='medium'
                  type='number'
                />
              )}
            />
            <Controller
              control={control}
              name='end_date'
              render={({field}) => (
                <Input 
                  label="End date"
                  name='end_date'
                  control={field}
                  placeholder="dd.mm.YYYY"
                  errors={errors}
                  size='medium'
                  type='date'
                />
              )}
            />
          </div>
        }
      </div>
    <div className="modal-footer">
      { isEdit ? <>
          <button className='button tertiary' onClick={onClose}>Discard changes</button>
          <button className='button secondary' type='submit'>Edit auction</button>
        </>
      : <>
        <button className='button tertiary'  onClick={onClose}>Cancel</button>
        <button className='button primary' type='submit'>Start auction</button>
      </>
      }
    </div>
    </form>
    </>
  )
}

export default AddEditAuction