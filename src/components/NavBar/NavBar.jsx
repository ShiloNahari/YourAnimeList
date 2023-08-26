import { useRef, useState } from "react"
import { Outlet, Link, useNavigate} from "react-router-dom"
import "../../pages/Page.css"
import "./NavBar.css"
import { getAnimeByName } from "../../Services/animeFetchService"

export default function Layout() {
  const nav = useNavigate()
  const searchRef = useRef()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState(null)
  const links = [
    { to: "/", innerHTML: "Home" },
  ]

  const handleSearch = async(e) =>{
    e.preventDefault()
    nav(`/results/${searchTerm}`)
    setResults(await getAnimeByName(searchTerm))
  }
  
  return (
    <>
      <nav className="main-nav">
        <ul className="nav-buttons">
          {links.map((button) => (
            <li key={button.innerHTML}>
              <button type="button" className=""><Link to={button.to}>{button.innerHTML}</Link></button>
            </li>
          ))}
        </ul>
        <div className="search-container">
          <form >
            <input ref={searchRef} value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder="Search..." name="search"/>
            <button onClick={e=>handleSearch(e)} type="submit" disabled={!searchTerm}>search</button>
          </form>
        </div>
      </nav>

      <Outlet />
    </>
  )
}
