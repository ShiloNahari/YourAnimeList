import { useAuthContext } from '../../hooks/useAuthContext'
import AnimeList from '../../components/AnimeList/AnimeList'

import { useEffect, useState } from 'react'
import { fetchAnimeList } from '../../Services/animeFetchService'
import { useParams } from 'react-router-dom'

import './profile.css'

export default function Profile() {
    const { id } = useParams()
  const [animeList, setAnimeList] = useState([])
  const { user } = useAuthContext()
  useEffect(()=>{
    const fetchYourList = async() =>{
      const yourlist = await fetchAnimeList(id)
      setAnimeList(yourlist)
    }
    fetchYourList()
  },[id])
  return (
    <div className='profile page'>
      <div className="profile-info">
        {user && <img src={user.profilePicture} alt={user.userName} />}
      </div>
      <div className="main-page">
        <AnimeList animeList={animeList}/>
      </div>
    </div>
  )
}
