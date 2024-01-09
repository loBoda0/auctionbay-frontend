import React from 'react'

interface Props {
  onClose: () => void
}

const SettingsLayout: React.FC<Props> = ({onClose}) => {
  return (
    <div>
      <button onClick={onClose}>Close settings</button>
    </div>
  )
}

export default SettingsLayout