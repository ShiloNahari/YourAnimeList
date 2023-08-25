import './CardList.css'
import { Link } from 'react-router-dom';

export default function CardList ({anime}) {

  return (
    <div className="card-list">
      <Link to={`http://localhost:3000/anime/${anime.animeId}`} className='card2'>
      <img src={anime.thumb} alt={anime.title} className='card-list-imgs'/>
      <h3>{anime.title}</h3>
      </Link>
      {}
    </div>
  )
}