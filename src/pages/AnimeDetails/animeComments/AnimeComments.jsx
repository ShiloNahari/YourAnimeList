import { Link } from "react-router-dom"

import "./AnimeComments.css"

export default function AnimeComments(props) {
  const { user, comment, time } = props
  return (
    <div className="comment">
      <img src={user.profilePicture} alt="" srcset="" />
      <div>
        <Link to={`/profile/${user.id}`}>
          <div className="user-name">@ {user.userName} <span className="faded">{time.slice(0,10)}</span></div>
        </Link>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  )
}
