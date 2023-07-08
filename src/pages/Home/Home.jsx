import { useEffect, useState } from "react"
import Card from "../../components/Cards/Card"
import { getAllAnimes } from "../../Services/animeFetchService"

import "./Home.css"

export default function Home() {
  const temp = 
    [{
      "_id": "5114",
      "title": "Fullmetal Alchemist: Brotherhood",
      "alternativeTitles": [
          "Hagane no Renkinjutsushi: Fullmetal Alchemist",
          "Fullmetal Alchemist (2009)",
          "FMA",
          "FMAB",
          "鋼の錬金術師 FULLMETAL ALCHEMIST",
          "Fullmetal Alchemist: Brotherhood",
          "Fullmetal Alchemist Brotherhood"
      ],
      "ranking": 1,
      "genres": [
          "Action",
          "Adventure",
          "Drama",
          "Fantasy"
      ],
      "episodes": 64,
      "hasEpisode": true,
      "hasRanking": true,
      "image": "https://cdn.myanimelist.net/images/anime/1208/94745.webp",
      "link": "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood",
      "status": "Finished Airing",
      "synopsis": "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.\n\nThe brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry. Known as a bio-mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing \"automail,\" a tough, versatile metal used in robots and combat armor. After years of training, the Elric brothers set off on a quest to restore their bodies by locating the Philosopher's Stone—a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange.\n\nAs Edward becomes an infamous alchemist and gains the nickname \"Fullmetal,\" the boys' journey embroils them in a growing conspiracy that threatens the fate of the world.\n\n[Written by MAL Rewrite]",
      "thumb": "https://cdn.myanimelist.net/r/50x70/images/anime/1208/94745.webp?s=f286786e3bc43d6dc5b4478a1762224b",
      "type": "TV"
  }]
  
  const [animes, setAnimes] = useState(null)
  
  useEffect(() => {
    const fetchedData = async () => {
      const data = await getAllAnimes()
      console.log(data);
      if (data){
        setAnimes(data)
      }
      setAnimes(data)
    }
    fetchedData() 
  }, [])
  return (
    <div className="home page">
      <div className="carosella">{/* {carosella bs} */}</div>

      <div className="anime-grid">
        {Array.isArray(animes) ? 
        animes.map((anime) => <Card cardData={anime} key={anime._id} />)
        : 
        "loading..."}
      </div>
    </div>
  )
}
