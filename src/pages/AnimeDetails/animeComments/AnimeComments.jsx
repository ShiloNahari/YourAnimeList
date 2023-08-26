import { Link } from "react-router-dom"

import "./AnimeComments.css"

export default function AnimeComments(props) {
  const { user, comment, time } = props.comment
  return (
    <div className="comment" key={props._id}>
      <img src={user.profilePicture} alt="" srcSet="" />
      <div>
        <Link to={`/profile/${user.id}`}>
          <div className="user-name">@ {user.userName} <span className="faded"> {time.slice(0,10)}</span></div>
        </Link>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  )
}
