import { useEffect, useState } from "react"
import Card from "../../components/Cards/Card"
import Pagination from "../../components/Pagination/Pagination"
import { getAllAnimes } from "../../Services/animeFetchService"

import "./Home.css"

export default function Home() {
  
  const [animes, setAnimes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(24)

  useEffect(() => {
    const fetchedData = async () => {
      const data = await getAllAnimes()
      if (data) {
        setAnimes(data)
      }
    }
    fetchedData()
  }, [])

  const lastIndex = currentPage * postsPerPage
  const firstIndex = lastIndex - postsPerPage
  const currentPosts = animes.slice(firstIndex, lastIndex)

  return (
    <div className="home page">
      <div className="carosella">{/* {carosella bs} */}</div>

      <Pagination
        totalPosts={animes?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="anime-grid">
        {Array.isArray(currentPosts)
          ? currentPosts.map((anime) => (
              <Card cardData={anime} key={anime._id} />
            ))
          : "loading..."}
      </div>

      <Pagination
        totalPosts={animes?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
