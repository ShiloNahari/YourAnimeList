import { Outlet, Link } from "react-router-dom"
import "../Page.css"
import "./Layout.css"

export default function Layout() {
  const links = [
    { to: "/", innerHTML: "Home" },
    { to: "/blogs", innerHTML: "Blogs" },
    { to: "/contacts", innerHTML: "Contact" },
  ]
  return (
    <>
      <nav>
        <ul className="nav-buttons">
          {links.map((button) => (
            <li key={button.innerHTML}>
              <button type="button" className=""><Link to={button.to}>{button.innerHTML}</Link></button>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
