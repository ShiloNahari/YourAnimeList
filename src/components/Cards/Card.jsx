import { Link } from 'react-router-dom'
import './Card.css'

export default function Card({ cardData }) {
  return (
    <Link to={`/anime/${cardData._id}`} className="card">
      <div >
        <img src={cardData.image} alt={cardData.title + "image"} />
        <h3>{cardData.title}</h3>
      </div>
    </Link>
  )
}
