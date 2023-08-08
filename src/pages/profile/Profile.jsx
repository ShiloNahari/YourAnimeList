import { useAuthContext } from '../../hooks/useAuthContext'
import AnimeList from '../../components/AnimeList/AnimeList'

import './profile.css'

export default function Profile() {
  const { user } = useAuthContext()
  
  return (
    <div className='profile page'>
      <div className="profile-info">
        {user && <img src={user.profilePicture} alt={user.userName} />}
      </div>
      <div className="main-page">
        <AnimeList />
      </div>
    </div>
  )
}
