import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  deleteAnimeFromList,
  getAnimeById,
  updateAnimeInList,
} from "../../Services/animeFetchService"
import { addAnimeToList } from "../../Services/animeFetchService"
import { useAuthContext } from "../../hooks/useAuthContext"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"

import "./AnimeDetails.css"
import { getCommentsByAnimeId, postComment } from "../../Services/fetchComments"
import AnimeComments from "./animeComments/AnimeComments"

export default function AnimeDetails(props) {
  const [anime, setAnime] = useState({})
  const [status, setStatus] = useState(1)
  const [episodesSeen, setEpisodesSeen] = useState(0)
  const [rating, setRating] = useState(0)
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)
  const { user } = useAuthContext()
  const { animeId } = useParams()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  

  const handleEditStatus = async (e) => {
    e.preventDefault()

    if (!user) return setError("please log in")

    const data = {
      userId: user.id,
      animeId: anime._id,
      status,
      episodesSeen: episodesSeen,
      rating,
    }

    try {

      if (status > 5) setStatus(5)

      if (episodesSeen > anime.episodes) setEpisodesSeen(anime.episodes)

      const respose = await updateAnimeInList(data)

      setResponse(respose)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      return setError("please log in")
    }
    const data = {
      title: anime.title,
      thumb: anime.thumb,
      type: anime.type,
      userId: user.id,
      animeId: anime._id,
      status,
      episodesSeen: episodesSeen,
      rating,
    }

    try {
      if (status > 5) setStatus(5)

      if (episodesSeen > anime.episodes) {
        setEpisodesSeen(anime.episodes)
      }

      const respose = await addAnimeToList(data)
      console.log(respose);
      setResponse(respose)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const handleDeleteButton = async(e) => {
    e.preventDefault()

    if (!user) return setError("please log in")

    
    try {
      const respose = await deleteAnimeFromList(anime._id)
      setResponse(respose)
    } catch (error) {
      setError(error)
    }
  }

  const handleComment = async() =>{
    try {
      if (user.role === null) return 
      await postComment({user, animeId, comment})
      setComment('')
    } catch (error) {
      alert('log in to comment!')
    }
  }

  useEffect(()=>{
    const fetchComments = async()=>{
      const comments = await getCommentsByAnimeId(animeId)
      setComments(comments)
    }
    fetchComments()
  },[animeId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null)
      setResponse(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [error, response])

  useEffect(() => {
    const fetchAnimeById = async () => {
      const data = await getAnimeById(animeId)
      setAnime(data)
    }
    fetchAnimeById()
  }, [animeId])

  useEffect(()=>{
    setBreadCrumbs([
      { label: "Top", link: "/" },
      {
        label: "Subcategory",
        link: `/anime/${anime.type}`,
      } /* TODO make /ova | /ona | etc, filtered by status */,
      { label: `${anime.title}`, link: `/anime/${anime._id}` },
    ])
  },[anime])

  return (
    <div className="AnimeDetails page">
      <h1 className="anime-details-title">{anime.title}</h1>
      {!Array.isArray(anime) && anime ? (
        <div className="anime-details">
          <div className="side-stuff">
            <img src={anime.image} alt={anime.title + "poster"} />

            <div className="status-edit">
              <form>
                <div>
                  <label htmlFor="status">status </label>
                  <select
                    name="status"
                    id="status"
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option value={1}>watching</option>
                    <option value={2}>completed</option>
                    <option value={3}>on hold</option>
                    <option value={4}>plan to watch</option>
                    <option value={5}>dropped</option>
                  </select>
                </div>

                <div className="seen">
                  <label htmlFor="rating">episodes seen </label>
                  <input
                    type="number"
                    onChange={(e) => setEpisodesSeen(e.target.value)}
                  />
                  <span> / {anime.episodes}</span>
                </div>

                <div>
                  <label htmlFor="rating">Your rating</label>
                  <select
                    name="score"
                    id="rating"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option defaultValue={0} value={0}>
                      Select
                    </option>
                    <option value={10}>(10) Masterpiece</option>
                    <option value={9}>(9) Great</option>
                    <option value={8}>(8) Very Good</option>
                    <option value={7}>(7) Good</option>
                    <option value={6}>(6) Fine</option>
                    <option value={5}>(5) Average</option>
                    <option value={4}>(4) Bad</option>
                    <option value={3}>(3) Very Bad</option>
                    <option value={2}>(2) Horrible</option>
                    <option value={1}>(1) Appalling</option>
                  </select>
                </div>

                <button
                  className="addBtn"
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                >
                  Add
                </button>
                <button
                  className="updateBtn"
                  onClick={(e) => handleEditStatus(e)}
                  type="submit"
                >
                  update
                </button>
                <button
                  className="deleteBtn"
                  onClick={(e) => handleDeleteButton(e)}
                  type="submit"
                >
                  delete
                </button>
              </form>
              <div className="error">{error}</div>
              <div className="response">{response}</div>
            </div>

            <p>
              <strong>alernative names:</strong>
              {anime.alternativeTitles?.map((item, index) => {
                if (index === anime.alternativeTitles.length - 1) {
                  return item
                }
                return item + ", "
              })}
            </p>

            <p>
              {" "}
              <strong>information</strong>
            </p>
            <hr />
            <p>
              <strong>type:</strong> {anime.type}
            </p>
            <p>
              <strong>status:</strong> {anime.status}
            </p>
            <p>
              <strong>ranking:</strong> #{anime.ranking}
            </p>
            <p>
              <strong>status:</strong> {anime.status}
            </p>
            <p>
              <strong>episodes:</strong> {anime.episodes}
            </p>
            <Link to={anime.link} target="_blank">
              <p className="link">MAL link</p>
            </Link>
          </div>

          <div className="anime-main-page">
              <Breadcrumbs items={breadCrumbs} />

              <h2>Details</h2>
              <div className="details">{anime.synopsis}</div>

              <div className="comment-section">
                <div className="new-comment">
                {user && <img src={user.profilePicture} alt="user profile"/>}
                <input className="comment-input" value={comment} onChange={e=>setComment(e.target.value)} type="text" placeholder="Add a comment..." dir="auto"/>
                <button type="button" onClick={handleComment}>Comment</button>
                <button type="button" onClick={()=>setComment('')}>Cancel </button>
                </div>

                <div className="user-comments">
                  {Array.isArray(comments) && comments.length <= 0
                  ?'be the first to comment!'
                  :comments.map((comment)=>(
                    <AnimeComments key={comment._id} comment={comment}/>
                  ))}
                </div>
              </div>

          </div>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  )
}

// const {  _id, title, alternativeTitles, genres, hasEpisode, status, synopsis, type, thump, ranking } = data
