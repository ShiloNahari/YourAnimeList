import AnimeList from "../../components/AnimeList/AnimeList"

import { useEffect, useState } from "react"
import { fetchAnimeList } from "../../Services/animeFetchService"
import {  useParams } from "react-router-dom"

import "./profile.css"
import http from "../../Services/httpService"

export default function Profile() {
  const { id } = useParams()
  const [animeList, setAnimeList] = useState([
    {
      _id: "41467",
      title: "Bleach: Sennen Kessen-hen",
      alternativeTitles: [
        "Bleach: Thousand-Year Blood War Arc",
        "BLEACH 千年血戦篇",
        "Bleach: Thousand-Year Blood War",
      ],
      ranking: 3,
      genres: ["Action", "Adventure", "Fantasy"],
      episodes: 13,
      hasEpisode: true,
      hasRanking: true,
      image: "https://cdn.myanimelist.net/images/anime/1908/135431.webp",
      link: "https://myanimelist.net/anime/41467/Bleach__Sennen_Kessen-hen",
      status: "Finished Airing",
      synopsis:
        "Substitute Soul Reaper Ichigo Kurosaki spends his days fighting against Hollows, dangerous evil spirits that threaten Karakura Town. Ichigo carries out his quest with his closest allies: Orihime Inoue, his childhood friend with a talent for healing; Yasutora Sado, his high school classmate with superhuman strength; and Uryuu Ishida, Ichigo's Quincy rival.\n\nIchigo's vigilante routine is disrupted by the sudden appearance of Asguiaro Ebern, a dangerous Arrancar who heralds the return of Yhwach, an ancient Quincy king. Yhwach seeks to reignite the historic blood feud between Soul Reaper and Quincy, and he sets his sights on erasing both the human world and the Soul Society for good.\n\nYhwach launches a two-pronged invasion into both the Soul Society and Hueco Mundo, the home of Hollows and Arrancar. In retaliation, Ichigo and his friends must fight alongside old allies and enemies alike to end Yhwach's campaign of carnage before the world itself comes to an end.\n\n[Written by MAL Rewrite]",
      thumb:
        "https://cdn.myanimelist.net/r/50x70/images/anime/1908/135431.webp?s=6c10634de66fc83aa64471795de02461",
      type: "TV",
    },
  ])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await http.get(`/api/users/${id}`)
        if (!response) {
          return setUser(null)
        }
        setUser(response.data.data)
      } catch (error) {
        return "404 user not found"
      }
    }
    getUser()
  }, [id])

  useEffect(() => {

    const fetchYourList = async () => {
      const yourList = await fetchAnimeList(id)
      setAnimeList(yourList)
    }
    fetchYourList()
  }, [id])

  return (
    <div className="profile page">
      <div className="profile-info">
        {user && id && (
          <>
            {user.profilePicture ? (
              <img src={user.profilePicture} alt={user.userName} />
            ) : (
              <img
                src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-default-avatar-png-image_5407175.jpg"
                alt={user.userName}
              />
            )}
            <h2>{user.userName}</h2>
            <p>
              { animeList == null ?'no animes added':(animeList.length + ' animes watched!')}
            
            </p>
          </>
        )}
      </div>
      <div className="main-page">
        {user ? <AnimeList animeList={animeList} /> : "404 user not found"}
      </div>
    </div>
  )
}
