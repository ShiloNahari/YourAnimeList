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
  const handleLogout = () => {
    logout()
  }

  //Hook that alerts clicks outside of the passed ref

  useEffect(() => {

    const closeDropDown = (e) => {
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
            {openProfile &&  user.role === "user" && (
              <ul className="dropdown-menu" >
                <Link to={"/profile/" + user.id}>
                  <li >profile</li>
                </Link>

                <Link to={"/anime-list/"+ user.id}>
                  <li >anime list</li>
                </Link>
                <Link to="/">
                  <li onClick={handleLogout}>LOGOUT</li>
                </Link>
              </ul>
            )}
            {openProfile &&  user.role === "admin" && (
              <ul className="dropdown-menu">
                <Link to={"/admin-panel"}>
                  <li>admin panel</li>
                </Link>
                <Link to={"/profile/" + user.id}>
                  <li>profile</li>
                </Link>

                <Link to={"/anime-list/"+ user.id}>
                  <li>anime list</li>
                </Link>
                <Link to="/">
                  <li onClick={handleLogout}>LOGOUT</li>
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
