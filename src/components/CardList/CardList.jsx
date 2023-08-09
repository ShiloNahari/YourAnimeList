import { useEffect } from 'react'
import './CardList.css'

export default function CardList ({anime}) {
  useEffect(()=>{
    console.log(anime);
  })
  return (
    <div className="cardList">
      {anime.animeId}
      {anime.thumb}

    </div>
  )
}