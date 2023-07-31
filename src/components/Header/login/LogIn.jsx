import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../../../hooks/useLogout"
import { useAuthContext } from "../../../hooks/useAuthContext"

import "./LogIn.css"

export default function LogIn() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [openProfile, setOpenProfile] = useState(false)
  const ref = useRef()
  const handleClick = () => {
    logout()
  }
  const handleOpenMenu = () => {
    setOpenProfile((prev) => !prev)
  }

  //Hook that alerts clicks outside of the passed ref

  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOpenMenu()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div className="buttons">
        {user && user ? (
          <div className="dropdown-container" ref={ref}> 
            <span
              className={
                openProfile
                  ? "header-dropdown-menu active"
                  : "header-dropdown-menu"
              }
              onClick={handleOpenMenu}
            >
              {user.userName}
            </span>
            {openProfile && (
              <ul className="dropdown-menu">
                <Link to={"/profile/" + user.id}>
                  <li onClick={handleOpenMenu}>profile</li>
                </Link>

                <Link to="/anime-list">
                  <li onClick={handleOpenMenu}>anime list</li>
                </Link>
                <Link to="/">
                  <li onClick={()=>{
                    handleClick() 
                    handleOpenMenu()
                    }}>LOGOUT</li>
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
