import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { fetchAnimeList } from './../../Services/animeFetchService'
import './AnimeList.css'

export default function AnimeList (props) {
  const { user } = useAuthContext()

  useEffect(()=>{
    const pullAnimesFromDB = async () => {
      const animeList = await fetchAnimeList(user.id)


    }
    pullAnimesFromDB()
  })
  return (
    <div className='AnimeList '>
      
    </div>
  )
}