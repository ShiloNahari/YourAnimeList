import { useEffect, useState } from "react"
import {
  deleteUserById,
  getAllUsers,
} from "../../Services/adminService"
import { Link } from "react-router-dom"
import UserModal from "./UserModal"

export default function AllUsers() {
  const [users, setUsers] = useState(null)
  const [done, setDone] = useState(null)
  const [editUser, setEditUser] = useState(false)
  useEffect(() => {
    const fetchUsersFromDB = async () => {
      const response = await getAllUsers()
      setUsers(response)
    }
    fetchUsersFromDB()
  }, [])

  const handleClick = async (e, id) => {
    e.preventDefault()
    switch (e.target.innerText) {
      case "Delete":
        try {
          const response = await deleteUserById(id)
          setDone(response.email)

          break
        } catch (error) {
          console.log(error)
          break
        }

      case "Update":
        setEditUser(id)
        break;


      default:
        return
    }
  }
  return (
    <div className="AllUsers ">
      {users &&
        users.map((user) => (
          <div className="users" key={user._id}>
            {editUser === user._id
            ?<UserModal id={user._id} props={user} setEditMode={setEditUser}/>
            :(<>
            <Link to={`/profile/${user._id}`}>
              {user.userName}
            </Link>
            <div>  
              <button onClick={(e) => handleClick(e, user._id)}>Delete</button>
              <button onClick={(e) => handleClick(e, user._id)}>Update</button>
            </div>
            </>)}
          </div>
        ))}
    </div>
  )
}
