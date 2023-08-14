import CardList from '../CardList/CardList'
import './AnimeList.css'

export default function AnimeList (props) {
  const { animeList } = props

  return (
    <div className='AnimeList '>
      <h2>your list</h2>
      {animeList 
      ?animeList.map((anime) => (
        <CardList anime={anime} key={anime._id}/>
      ))
      :'your anime list is empty! D:'
    }
    </div>
  )
}