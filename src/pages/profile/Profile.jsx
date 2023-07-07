import React from 'react'
import './profile.css'
import { useAuthContext } from '../../hooks/useAuthContext'
export default function Profile() {
  const { user } = useAuthContext()
  
  return (
    <div className='profile page'>
      <div className="profile-info">
        {user && <img src='' alt={user.username} />}
      </div>
      <div className="main-page">

      </div>
    </div>
  )
}
