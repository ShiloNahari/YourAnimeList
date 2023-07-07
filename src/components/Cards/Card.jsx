import './Card.css'
export default function Card({ cardData }) {
  return (
    <div className="card">
      <img src={cardData.main_picture.medium} alt={cardData.title} />
      <h2>{cardData.title}</h2>
    </div>
  )
}
