import { useEffect, useState } from "react"
import Card from "../../components/Cards/Card"
import { getAllAnimes } from "../../Services/animeFetchService"
import { useAuthContext } from "../../hooks/useAuthContext"

import "./Home.css"

export default function Home() {
  const { user, dispatch} = useAuthContext()
  const [animes, setAnimes] = useState(null)
  
  useEffect(() => {
    const fetchedData = async () => {
      const data = await getAllAnimes()
      console.log(data);
      if (data){
        setAnimes(data)
      }
    }
    fetchedData() 
  }, [])
  useEffect(() => {
    console.log(animes)
  }, [animes])
  return (
    <div className="home page">
      <div className="carosella">{/* {carosella bs} */}</div>

      <div className="anime-grid">
        {animes ? 
        animes.map((anime) => <Card cardData={anime} key={anime.id} />)
        : 
        "loading..."}
      </div>
    </div>
  )
}
