import { useEffect, useState } from "react"
import { fetchAnimeList } from "../../Services/animeFetchService"
import { Link, useParams } from "react-router-dom"

import "./TableList.css"

export default function TableList() {
  const { userId } = useParams()
  const [userAnime, setUserAnime] = useState([])
  useEffect(() => {
    const fetchAnimes = async () => {
      const anime = await fetchAnimeList(userId)
      setUserAnime(anime)
    }
    fetchAnimes()
  }, [userId])

  return (
    <>
      {Array.isArray(userAnime) && userAnime.length > 0 ? (
        <div className="page">
          <table className="TableList ">
            <thead>
              <tr key={1}>
                <th>image</th>
                <th>Name</th>
                <th>episodes seen</th>
                <th>rating</th>
              </tr>
            </thead>
            <tbody>
              {userAnime.map((anime) => (
                <tr key={anime._id}>
                  <td>
                    <Link to={`/anime/${anime.animeId}`}>
                      <img src={anime.thumb} alt="" srcSet="" />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/anime/${anime.animeId}`}>{anime.title}</Link>
                  </td>
                  <td>{anime.episodesSeen}</td>
                  <td>{anime.rating}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="page">
          no animes in your list!{" "}
          <Link to={"/"} className="link">
            go home to add some
          </Link>
        </div>
      )}
    </>
  )
}
