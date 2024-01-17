import React, { ChangeEvent, useState } from 'react'
import * as API from '../api/Api'
import { User } from '../interfaces/user'

import Avatar from '/Avatar.svg'
import { userStorage } from '../stores/userStorage'

interface Props {
  user: User
  onClose: () => void
}

const UpdateAvatar: React.FC<Props> = ({user, onClose}) => {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(user.avatar)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const { target } = event
    if (target.files && target.files.length > 0) {
      const myfile = target.files[0]
      if(!isFileTypeValid(myfile)) return
      setFile(myfile)
      // set image preview
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(myfile)
    }
  }

  const isFileTypeValid = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    return allowedTypes.includes(file.type)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    if (file) {
      console.log('object')
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      const data = await API.updateAvatar(formData)
      userStorage.setUser(data.data)
      console.log(data)
      onClose()
    }
  }

  return (
    <>
      <h3 className="mb-2">Profile settings</h3>
      <form onSubmit={handleSubmit}>
        <label
        htmlFor="image"
        className="update-avatar">
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Selected Image"
                width={200}
                height={200}
                className="modal-image"
              />
            </>
          ) : (
            <img
              src={user.avatar ? user.avatar : Avatar}
              alt="Selected Image"
              width={200}
              height={200}
              className="modal-image"
            />
          )}
            <div className="button tertiary">
              Upload new picture
            </div>
            
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            onInput={handleFileChange}
            className='hidden'
          />
        </label>
      <div className="modal-footer mt-2">
        <button className='button tertiary' onClick={onClose}>Cancel</button>
        <button className='button primary' type='submit'>Save changes</button>
      </div>
      </form>
    </>
  )
}

export default UpdateAvatar