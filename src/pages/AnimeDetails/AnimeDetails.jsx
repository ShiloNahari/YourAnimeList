import { useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom"
import { getAnimeById } from "../../Services/animeFetchService"
import { addAnimeToList } from "../../Services/animeFetchService"
import { useAuthContext } from "../../hooks/useAuthContext"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"

import "./AnimeDetails.css"

export default function AnimeDetails(props) {
  const [anime, setAnime] = useState({})
  const [status, setStatus] = useState(1)
  const [episodesWatched, setEpisodesWatched] = useState(0)
  const [rating, setRating] = useState(0)
  const { user } = useAuthContext()


  const { id } = useParams()
  
  let breadcrumbItems = [
    { label: 'Top', link: '/' },
    { label: 'Subcategory', link: `/anime/${anime.type}` }, /* TODO make /ova | /ona | etc, filtered by status */
    { label: `${anime.title}`, link: `/anime/${anime._id}` },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      userId: user.id,
      animeId: anime._id,
      status,
      episodesSeen:episodesWatched,
      rating,
    }
    if (status > 5){
      setStatus(1)
    }
    if (episodesWatched>anime.episodes){
      setEpisodesWatched(anime.episodes)
    }
    await addAnimeToList(data)

  }
  useEffect(() => {    
    const fetchAnimeById = async () => {
      const data = await getAnimeById(id)
      console.log(data)
      setAnime(data)
    }
    fetchAnimeById()
  }, [id])
  


  return (
    <div className="AnimeDetails page">
      <h1 className="anime-details-title">{anime.title}</h1>
      {anime && anime ? (
        <div className="anime-details">
          <div className="side-stuff">
          <img src={anime.image} alt={anime.title + 'poster'} />

            <div className="status-edit"> 
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                  <label htmlFor="status">status </label> 
                  <select name="status" id="status" onChange={(e)=>{setStatus(e.target.value)}}>
                    <option value={1} >watching</option>
                    <option value={2} >completed</option>
                    <option value={3} >on hold</option>
                    <option value={4} >plan to watch</option>
                    <option value={5} >dropped</option>
                  </select>
                </div>
              
                <div className="seen">
                  <label htmlFor="rating">episodes seen </label>
                  <input type="number" onChange={(e)=>setEpisodesWatched(e.target.value)}/><span> / {anime.episodes}</span>
                </div>

                <div>
                  <label htmlFor="rating">Your rating</label>
                  <select name="score" id="rating" onChange={e=>setRating(e.target.value)}>
                    <option defaultValue={0} value={0}>Select</option>
                    <option value={10} >(10) Masterpiece</option>
                    <option value={9} >(9) Great</option>
                    <option value={8} >(8) Very Good</option>
                    <option value={7} >(7) Good</option>
                    <option value={6} >(6) Fine</option>
                    <option value={5} >(5) Average</option>
                    <option value={4} >(4) Bad</option>
                    <option value={3} >(3) Very Bad</option>
                    <option value={2} >(2) Horrible</option>
                    <option value={1} >(1) Appalling</option>
                  </select>
                </div>

              <button type="submit">Add</button>
            </form>

            </div>


            <p>
              <strong>alernative names:</strong>
              {anime.alternativeTitles?.map((item, index) => {
                if (index === (anime.alternativeTitles.length - 1)) {
                  return item
                }
                return item + ", "
              })}
            </p>
            
              <p> <strong>information</strong></p>
              <hr />
              <p>
              <strong>type:</strong> {anime.type}
              </p>
              <p>
              <strong>status:</strong> {anime.status}
              </p>
              <p><strong>ranking:</strong> #{anime.ranking}</p>
              <p><strong>status:</strong> {anime.status}</p>
              <p><strong>episodes:</strong> {anime.episodes}</p>
              <Link to={anime.link} target="_blank">
                <p className="link">
                MAL link
                </p>
              </Link>
            
            
          </div>

          {/* <div className="anime-main-page">
              <Breadcrumbs items={breadcrumbItems} />
          </div> */}

        </div>
      ) : (
        "loading..."
        )}
    </div>
  )
}

// const {  _id, title, alternativeTitles, genres, hasEpisode, status, synopsis, type, thump, ranking } = data