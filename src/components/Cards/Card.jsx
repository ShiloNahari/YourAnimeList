import './Card.css'
export default function Card({ cardData }) {
  return (
    <div className="card">
      <img src={cardData.image} alt={cardData.title + "image"} />
      <h3>{cardData.title}</h3>

    </div>
  )
}
