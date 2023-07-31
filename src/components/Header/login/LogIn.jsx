import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../../../hooks/useLogout"
import { useAuthContext } from "../../../hooks/useAuthContext"

import "./LogIn.css"

export default function LogIn() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [openProfile, setOpenProfile] = useState(false)
  const dropdownMenuRef = useRef()
  const handleClick = () => {
    logout()
  }

  //Hook that alerts clicks outside of the passed ref

  useEffect(() => {

    const closeDropDown = (e) => {
      console.log(dropdownMenuRef);
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target)) {
        setOpenProfile(false)
      }
    }
    // Bind the event listener
    document.body.addEventListener("mousedown", closeDropDown);
    return () => {
      // Unbind the event listener on clean up
      document.body.removeEventListener("mousedown", closeDropDown);
    };
  }, [dropdownMenuRef]);

  return (
    <>
      <div className="buttons">
        {user && user ? (
          <div className="dropdown-container" 
          ref={dropdownMenuRef}
          onClick={()=>setOpenProfile(prev => !prev)}> 
                
            <span
              className={
                openProfile
                  ? "header-dropdown-menu active"
                  : "header-dropdown-menu"
              }
>
              {user.userName}
            </span>
            {openProfile && (
              <ul className="dropdown-menu" >
                <Link to={"/profile/" + user.id}>
                  <li >profile</li>
                </Link>

                <Link to="/anime-list">
                  <li >anime list</li>
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
