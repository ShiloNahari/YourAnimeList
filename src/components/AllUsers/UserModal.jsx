import React, { useState } from 'react'
import { editUserById } from '../../Services/adminService'

export default function UserModal({props, setEditMode}) {
  
  const [userName, setUserName] = useState(props.userName)
  const [role, setRole] = useState(props.role)
  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState('')

  const handleSubmit = async()=>{
    const response = await editUserById(props._id, {userName,role,email, password})
    setEditMode(null)
  }

  const handleCancel = ()=>{
    setEditMode(null)
  }

  return (
    <div>
      <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='username'/>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='new password'/>
      <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} placeholder='role? "user" or "admin" only'/>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
      <button onClick={handleSubmit}>OK</button>
      <button onClick={handleCancel}>cancel</button>
    </div>
  )
}
