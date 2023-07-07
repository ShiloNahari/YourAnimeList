import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../../../hooks/useLogout"
import { useAuthContext } from "../../../hooks/useAuthContext"

import "./LogIn.css"

export default function LogIn() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [openProfile, setOpenProfile] = useState(false)
  const handleClick = () => {
    logout()
  }
  const handleOpenMenu = () => {
    setOpenProfile((prev) => !prev)
  }
  return (
    <>
      <div className="buttons">
        {user && user ? (
          <div className="dropdown-container">
            <span
              className={
                openProfile
                  ? "header-dropdown-menu active"
                  : "header-dropdown-menu"
              }
              onClick={handleOpenMenu}
            >
              {user.username}
            </span>
            {openProfile && (
              <ul className="dropdown-menu">
                <Link to={"/profile/" + user._id}>
                  <li>profile</li>
                </Link>

                <Link to="/anime-list">
                  <li>anime list</li>
                </Link>
                <Link to="/">
                  <li onClick={handleClick}>LOGOUT</li>
                </Link>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button type="button" className="login">
                LOGIN
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="signup">
                REGISTER
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}
