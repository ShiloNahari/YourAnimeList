import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../../components/Cards/Card"
import { getAnimeByName } from "../../Services/animeFetchService"


export default function Home({data}) {
  const [results, setResults] = useState(null)
  const { animeTitle } = useParams()
  useEffect(() => {
    const fetchedData = async () => {
      const reponse = await getAnimeByName(animeTitle)
      setResults(reponse)
    }
    fetchedData()
  }, [animeTitle])


  return (
    <div className="home page">

      <div className="anime-grid">
        {Array.isArray(results) && results.length <= 0
          ? "didn't find an anime by that name :("
          : results.map((anime) => (
              <Card cardData={anime} key={anime._id} />
            ))
          }
      </div>

    </div>
  )
}
