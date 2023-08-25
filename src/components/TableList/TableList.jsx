import { useEffect, useState } from "react"
import { fetchAnimeList } from "../../Services/animeFetchService"
import { useParams } from "react-router-dom"

export default function TableList () {
  const {userId} = useParams()
  const [userAnime, setUserAnime] = useState([])
  useEffect(()=>{
    const fetchAnimes = async() =>{
      const anime = await fetchAnimeList(userId)
      setUserAnime(anime)
    }
    fetchAnimes()

},[userId])
  return (
    <>
      {Array.isArray(userAnime) && userAnime.length >0
      ?
        <table className='TableList '>
          <thead>
            <tr>
              <th>image</th>
              <th>Name</th>
              <th>episodes seen</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            {userAnime.map(anime => (
              
              <tr>
                <td><img src={anime.thumb} alt="" srcset="" /></td>
                <td>{anime.title}</td>
                <td>{anime.episodesSeen}</td>
                <td>{anime.rating}/10</td>
              </tr>
            ))} 
          
          </tbody>
      </table>
          :'hi'}
        
    </>
  )
}