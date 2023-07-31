
import { Link } from "react-router-dom"
import "./Header.css"
import LogIn from "./login/LogIn"

export default function Header() {
  return (
    <div className="row">
      <header>
        <Link to='/'>
        <div className="logo">YourAnimeList</div>
        </Link>
        <LogIn/>
      </header>
    </div>
  )
}
