import React, { ChangeEvent, useState } from 'react'
import { useAddEditAuction } from '../hooks/useAddEditAuction'
import Trash from "/icons/Delete.svg";
import { Controller } from 'react-hook-form';
import Input from './ui/Input';

interface Props {
  isEdit: boolean
}

const AddEditAuction: React.FC<Props> = ({isEdit}) => {
  const  { handleSubmit, errors, control} = useAddEditAuction({})
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

  return (
    <>
      <div className="form-title">
        <h4>{title}</h4>
      </div>
    <form>
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
          />
        )}
      />
      <div className="inter">
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
            />
          )}
        />
      </div>
      </div>
    </form>
    <div className="modal-footer">
      { isEdit ? <>
          <button className='button tertiary'>Discard changes</button>
          <button className='button secondary'>Edit auction</button>
        </>
      : <>
        <button className='button tertiary'>Cancel</button>
        <button className='button primary'>Start auction</button>
      </>
      }
    </div>
    </>
  )
}

export default AddEditAuction