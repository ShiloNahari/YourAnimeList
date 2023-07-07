import "./Footer.css"
import { Link, Outlet } from "react-router-dom"

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { name: "Privacy Policy", link: "/privacy", innerText: "Privacy Policy" },
    { name: "Cookie Policy", link: "/Cookie", innerText: "Cookie Policy" },
  ]
  return (
    <div className="Footer">

      <p>Shilo © {year}</p>

      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.link} >
              {link.innerText}
            </Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  )
}
