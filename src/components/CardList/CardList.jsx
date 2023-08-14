import { useEffect } from 'react'
import './CardList.css'

export default function CardList ({anime}) {
  useEffect(()=>{
    console.log(anime);
  })
  return (
    <div className="card">
      <img src={anime.thumb} alt={anime.title} />
      {anime.animeId}

    </div>
  )
}